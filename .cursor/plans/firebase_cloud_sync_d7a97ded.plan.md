---
name: Firebase Cloud Sync
overview: Add Firebase Authentication (Google + Anonymous) and Firestore cloud sync for saving/loading multiple cities, with a merge prompt when local and cloud data conflict.
todos:
  - id: firebase-setup
    content: Create Firebase project and configure Auth + Firestore via MCP tools
    status: completed
  - id: firebase-lib
    content: Install firebase package and create src/lib/firebase.ts initialization
    status: completed
  - id: auth-context
    content: Create AuthContext with Google/Anonymous auth and account linking
    status: completed
  - id: cloud-storage
    content: Create cloudStorage.ts with Firestore CRUD operations for cities
    status: completed
  - id: game-context-sync
    content: Update GameContext to sync cities to cloud when signed in
    status: completed
  - id: account-ui
    content: Create AccountMenu component for sign-in/out and user display
    status: completed
  - id: sync-conflict
    content: Create SyncConflictDialog for merge prompt on sign-in
    status: completed
  - id: ui-integration
    content: Integrate AccountMenu and sync status into game UI
    status: completed
---

# Firebase Cloud Sync for IsoCity

## Overview

Add Firebase integration to enable user authentication and cloud-based city saves. Users can play anonymously, sign in with Google to sync across devices, and manage multiple cities stored in the cloud.

## Architecture

```mermaid
flowchart TB
    subgraph client [Client]
        GameContext[GameContext]
        AuthContext[AuthContext]
        LocalStorage[LocalStorage]
    end
    
    subgraph firebase [Firebase]
        Auth[Firebase Auth]
        Firestore[Firestore DB]
    end
    
    GameContext --> LocalStorage
    GameContext --> Firestore
    AuthContext --> Auth
    Auth -->|User ID| Firestore
```

**Data Flow:**

- Anonymous users: Local storage only (existing behavior)
- Signed-in users: Cloud sync with Firestore, local storage as cache
- On sign-in with existing local data: Prompt user to merge or replace

## Firebase Project Setup

1. Create a new Firebase project via the Firebase MCP tools
2. Enable Authentication with Google and Anonymous providers
3. Set up Firestore database with security rules
4. Register a web app and get SDK config

## Implementation Steps

### 1. Firebase Configuration

Create [`src/lib/firebase.ts`](src/lib/firebase.ts) with Firebase initialization using environment variables for config. Install `firebase` npm package.

### 2. Authentication Context

Create [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx) to manage:

- `user` state (Firebase User or null)
- `signInWithGoogle()` - Google popup sign-in
- `signInAnonymously()` - Anonymous auth
- `linkGoogleAccount()` - Link anonymous to Google
- `signOut()`
- `isLoading` state for auth initialization

### 3. Cloud Storage Service

Create [`src/lib/cloudStorage.ts`](src/lib/cloudStorage.ts) with functions:

- `saveCloudCity(userId, cityState)` - Save city to Firestore
- `loadCloudCities(userId)` - List user's cloud cities
- `loadCloudCity(userId, cityId)` - Load specific city
- `deleteCloudCity(userId, cityId)` - Delete a cloud city
- `renameCloudCity(userId, cityId, newName)` - Rename

**Firestore Structure:**

```javascript
users/{userId}/cities/{cityId}
    - cityName: string
    - population: number
    - money: number
    - year: number
    - month: number
    - gridSize: number
    - savedAt: timestamp
    - stateData: string (compressed JSON)
```



### 4. Update GameContext

Modify [`src/context/GameContext.tsx`](src/context/GameContext.tsx):

- Add `useAuth()` hook integration
- Add `syncToCloud()` function that saves to Firestore when signed in
- Modify auto-save interval to also sync to cloud (with debouncing)
- Add `cloudCities` state alongside `savedCities`
- Add `isSyncing` state for cloud save indicator

### 5. Merge/Conflict UI

Create [`src/components/game/SyncConflictDialog.tsx`](src/components/game/SyncConflictDialog.tsx):

- Shows when user signs in and has both local and cloud cities
- Options: "Keep Local", "Use Cloud", "Merge Both"
- Lists cities from each source with timestamps

### 6. Account UI

Create [`src/components/game/AccountMenu.tsx`](src/components/game/AccountMenu.tsx):

- Sign in / Sign out button
- User avatar and email when signed in
- "Link Google Account" for anonymous users
- Cloud sync status indicator

### 7. City Manager Updates

Update existing city management UI in [`src/components/game/SavedCitiesPanel.tsx`](src/components/game/SavedCitiesPanel.tsx) (or similar):

- Show cloud sync icon for synced cities
- Indicate local-only vs cloud-synced cities
- Add "Sync Now" button

## Security Rules

Firestore rules will ensure users can only read/write their own cities:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/cities/{cityId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```



## Key Files to Create/Modify