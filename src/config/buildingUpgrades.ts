import { BuildingType } from '@/types/game';

export interface BuildingUpgradeConfig {
  costMultiplier: number;
  maintenanceMultiplier: number;
  rangeMultiplier: number;
  effectMagnitudeMultiplier: number;
  pollutionMultiplier: number;
  description: string;
}

export const BUILDING_UPGRADES: Partial<Record<BuildingType, BuildingUpgradeConfig>> = {
  power_plant: {
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMagnitudeMultiplier: 1.5,
    pollutionMultiplier: 0.8,
    description: 'Increases power output range and efficiency. Reduces pollution.',
  },
  water_tower: {
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMagnitudeMultiplier: 1.5,
    pollutionMultiplier: 1, // No pollution change
    description: 'Increases water pressure and service area.',
  },
  police_station: {
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMagnitudeMultiplier: 1.5,
    pollutionMultiplier: 1,
    description: 'Expands patrol routes and officer response effectiveness.',
  },
  fire_station: {
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMagnitudeMultiplier: 1.5,
    pollutionMultiplier: 1,
    description: 'Increases coverage area and fire fighting capability.',
  },
  school: {
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMagnitudeMultiplier: 1.5,
    pollutionMultiplier: 1,
    description: 'Expands school district coverage and improves basic education efficiency.',
  },
  university: {
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMagnitudeMultiplier: 1.5,
    pollutionMultiplier: 1,
    description: 'Attracts more students and increases higher education radius.',
  },
  hospital: {
    costMultiplier: 5,
    maintenanceMultiplier: 2,
    rangeMultiplier: 1.5,
    effectMagnitudeMultiplier: 1.5,
    pollutionMultiplier: 1,
    description: 'Expands healthcare reach and improves medical treatment effectiveness.',
  },
};
