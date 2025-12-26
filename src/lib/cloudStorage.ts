// Cloud storage operations for Firebase Firestore
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';
import { GameState, SavedCityMeta } from '@/types/game';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

// Firestore collection paths
const USERS_COLLECTION = 'users';
const CITIES_SUBCOLLECTION = 'cities';

// Cloud city metadata stored in Firestore
export interface CloudCityMeta extends SavedCityMeta {
  cloudSyncedAt: number;
}

// Get the cities collection reference for a user
function getCitiesCollection(userId: string) {
  const db = getFirebaseDb();
  return collection(db, USERS_COLLECTION, userId, CITIES_SUBCOLLECTION);
}

// Get a specific city document reference
function getCityDoc(userId: string, cityId: string) {
  const db = getFirebaseDb();
  return doc(db, USERS_COLLECTION, userId, CITIES_SUBCOLLECTION, cityId);
}

/**
 * Save a city to Firestore
 * The game state is compressed to reduce storage size
 */
export async function saveCloudCity(userId: string, state: GameState): Promise<void> {
  const cityDoc = getCityDoc(userId, state.id);
  
  // Compress the full game state to reduce storage
  const compressedState = compressToUTF16(JSON.stringify(state));
  
  const cityData = {
    cityName: state.cityName,
    population: state.stats.population,
    money: state.stats.money,
    year: state.year,
    month: state.month,
    gridSize: state.gridSize,
    savedAt: Timestamp.now(),
    stateData: compressedState,
  };
  
  await setDoc(cityDoc, cityData);
}

/**
 * Load all cities for a user (metadata only, not full state)
 */
export async function loadCloudCities(userId: string): Promise<CloudCityMeta[]> {
  const citiesCol = getCitiesCollection(userId);
  const q = query(citiesCol, orderBy('savedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      cityName: data.cityName,
      population: data.population,
      money: data.money,
      year: data.year,
      month: data.month,
      gridSize: data.gridSize,
      savedAt: data.savedAt?.toMillis() ?? Date.now(),
      cloudSyncedAt: data.savedAt?.toMillis() ?? Date.now(),
    };
  });
}

/**
 * Load a specific city's full state from Firestore
 */
export async function loadCloudCity(userId: string, cityId: string): Promise<GameState | null> {
  const cityDoc = getCityDoc(userId, cityId);
  const snapshot = await getDoc(cityDoc);
  
  if (!snapshot.exists()) {
    return null;
  }
  
  const data = snapshot.data();
  if (!data.stateData) {
    return null;
  }
  
  try {
    const decompressed = decompressFromUTF16(data.stateData);
    if (!decompressed) {
      console.error('Failed to decompress city state');
      return null;
    }
    return JSON.parse(decompressed) as GameState;
  } catch (e) {
    console.error('Failed to parse city state:', e);
    return null;
  }
}

/**
 * Delete a city from Firestore
 */
export async function deleteCloudCity(userId: string, cityId: string): Promise<void> {
  const cityDoc = getCityDoc(userId, cityId);
  await deleteDoc(cityDoc);
}

/**
 * Rename a city in Firestore
 */
export async function renameCloudCity(
  userId: string,
  cityId: string,
  newName: string
): Promise<void> {
  const cityDoc = getCityDoc(userId, cityId);
  await updateDoc(cityDoc, { cityName: newName });
}

/**
 * Check if the user has any cities in the cloud
 */
export async function hasCloudCities(userId: string): Promise<boolean> {
  const cities = await loadCloudCities(userId);
  return cities.length > 0;
}

