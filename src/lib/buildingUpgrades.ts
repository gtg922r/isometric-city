import { BuildingType } from '@/types/game';

export interface BuildingUpgradeDefinition {
  id: string;
  buildingType: BuildingType;
  name: string;
  description: string;
  costMultiplier: number; // Multiplied by base building cost
  maintenanceMultiplier: number; // Multiplied by base maintenance
  rangeMultiplier: number; // 1.5 for 50% larger
  effectMultiplier: number; // 1.5 for 50% more positive effect
  pollutionMultiplier: number; // 0.8 for 20% less pollution
}

export const BUILDING_UPGRADES: Record<string, BuildingUpgradeDefinition> = {
  power_plant_upgrade: {
    id: 'power_plant_upgrade',
    buildingType: 'power_plant',
    name: 'Advanced Turbines',
    description: 'Improves efficiency and reduces pollution.',
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMultiplier: 1.5,
    pollutionMultiplier: 0.8,
  },
  water_tower_upgrade: {
    id: 'water_tower_upgrade',
    buildingType: 'water_tower',
    name: 'High-Pressure Pump',
    description: 'Increases water pressure and distribution range.',
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMultiplier: 1.5,
    pollutionMultiplier: 0.8,
  },
  police_station_upgrade: {
    id: 'police_station_upgrade',
    buildingType: 'police_station',
    name: 'Detective Wing',
    description: 'Adds specialized units to cover a larger area.',
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMultiplier: 1.5,
    pollutionMultiplier: 0.8,
  },
  fire_station_upgrade: {
    id: 'fire_station_upgrade',
    buildingType: 'fire_station',
    name: 'Hazmat Unit',
    description: 'Equips the station to handle more complex emergencies.',
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMultiplier: 1.5,
    pollutionMultiplier: 0.8,
  },
};

export function getUpgradeForBuilding(buildingType: BuildingType): BuildingUpgradeDefinition | undefined {
  return Object.values(BUILDING_UPGRADES).find(u => u.buildingType === buildingType);
}
