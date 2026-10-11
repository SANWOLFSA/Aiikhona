import type { FamilyId } from './types';

/**
 * Compact authoring format for the catalog.
 * - `brands` maps a brand display name to its model names.
 * - A model may override sizes with "Model name|size1,size2" or opt out of sizes with "Model name|".
 * - When `key` matches a MASTER_CATALOG key, the legacy brands/models are merged in (and keep their field notes).
 */
export interface TypeSpec {
  key: string;
  name?: string;
  family: FamilyId;
  group: string;
  slug?: string;
  sizeLabel?: string;
  sizes?: string[];
  /** Apply default `sizes` to legacy models too (only where every series really ships in those sizes). */
  legacySizes?: boolean;
  image?: string;
  brands?: Record<string, string[]>;
}

export const GROUP_ORDER = [
  'Kitchen',
  'Laundry & Cleaning',
  'Cooling & Climate',
  'Water Heating',
  'TV & Audio',
  'Computers & Phones',
  'Gaming',
  'Music & Pro Audio',
  'Cameras & Drones',
  'Networking & Smart Home',
  'Power & Backup',
  'Security & Access',
  'Lighting',
  'Personal Care',
  'Health & Medical',
  'Fitness',
  'Home & Hobby',
  'Pool, Water & Garden',
  'Tools & Workshop',
  'Mobility & Automotive',
  'Office & Retail',
];
