// Builds the normalised, routable device catalog by merging the original hand-written
// MASTER_CATALOG (field notes preserved) with the expanded spec files.
import { MASTER_CATALOG } from '../masterCatalogData';
import type { CatalogBrand, CatalogDeviceType, CatalogModel, CatalogSize } from './types';
import type { TypeSpec } from './specTypes';
import { GROUP_ORDER } from './specTypes';
import { HOME_SPECS } from './specHome';
import { TECH_SPECS } from './specTech';
import { POWER_SPECS } from './specPower';
import { EXTRA_SPECS } from './specExtra';
import { brandMetaFor } from './brandMeta';
import { slugify } from './slug';

export * from './types';
export { slugify } from './slug';
export { GROUP_ORDER } from './specTypes';

/** Legacy duplicate categories folded into their canonical type (null = dropped). */
const LEGACY_MERGE: Record<string, string | null> = {
  led_strip: 'led_strip_lights',
  soldering_station: 'soldering_iron',
  stereo: 'amplifier',
  home_appliances: null,
};

const BRAND_DISPLAY: Record<string, string> = {
  DeLonghi: "De'Longhi", Karcher: 'Kärcher', Oral_B: 'Oral-B', D_Link: 'D-Link', TP_Link: 'TP-Link', X_Sense: 'X-Sense', UNI_T: 'UNI-T',
  Xiaomi_70mai: '70mai', Hover_1: 'Hover-1', Black_Decker: 'Black+Decker', Crock_Pot: 'Crock-Pot', Segway_Ninebot: 'Segway-Ninebot',
  Bosch_eBike: 'Bosch eBike Systems', Audio_Technica: 'Audio-Technica', ET_Nice: 'ET Nice', Provision_ISR: 'Provision-ISR',
  Continental_Siemens: 'Continental (Siemens VDO)', Dolce_Gusto: 'Nescafé Dolce Gusto', Philips_Hue: 'Philips Hue', Google_Nest: 'Google Nest',
  Mitsubishi_Electric: 'Mitsubishi Electric', ITRON: 'Itron', ECOHEAT: 'EcoHeat',
  Allen_and_Heath: 'Allen & Heath', Pro_Ject: 'Pro-Ject', Accu_Chek: 'Accu-Chek', E_flite: 'E-flite', be_quiet: 'be quiet!', Auto_Vox: 'Auto-Vox',
  Nokta_Makro: 'Nokta Makro', Texas_Instruments: 'Texas Instruments', Life_Fitness: 'Life Fitness',
};

const BRAND_ALIAS: Record<string, string> = {
  greeelectric: 'gree', lgelectronics: 'lg', dahuatechnology: 'dahua', irobotroomba: 'irobot', ecovacsdeebot: 'ecovacs', smeg: 'smeg',
  hpthewlettpackard: 'hp', instantbrands: 'instantpot', kärcher: 'karcher', krcher: 'karcher', delonghi: 'delonghi', blackdecker: 'blackdecker',
  apcschneiderelectric: 'apc', univiewunv: 'uniview', ezviz: 'ezviz',
};

const CATEGORY_SUFFIX = /\b(tv|kettle|radio|speaker)\b/gi;

function brandKey(name: string): string {
  const k = name.toLowerCase().replace(/\(.*?\)/g, '').replace(CATEGORY_SUFFIX, '').replace(/[^a-z0-9]/g, '');
  return BRAND_ALIAS[k] || k;
}

const SIZE_IN_NAME = /\d+(\.\d+)?\s*("|”|inch|\s?L\b|kg|btu|kva|va\b|kw|mah|cm\b|mm\b)/i;

function sizesFrom(list: string[] | undefined): CatalogSize[] {
  return (list || []).map((s) => ({ name: s, slug: slugify(s) }));
}

function uniqueSlug(base: string, used: Set<string>): string {
  let slug = base;
  let i = 2;
  while (used.has(slug)) slug = `${base}-${i++}`;
  used.add(slug);
  return slug;
}

const ALL_SPECS: TypeSpec[] = [...HOME_SPECS, ...TECH_SPECS, ...POWER_SPECS, ...EXTRA_SPECS];

function titleCase(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function build(): CatalogDeviceType[] {
  const specByKey = new Map(ALL_SPECS.map((s) => [s.key, s]));
  const types = new Map<string, CatalogDeviceType>();
  const brandIndex = new Map<string, Map<string, CatalogBrand>>(); // typeKey -> brandKey -> brand
  const modelSlugs = new Map<CatalogBrand, Set<string>>();
  const modelNames = new Map<CatalogBrand, Set<string>>();

  const ensureType = (key: string, legacyName?: string): CatalogDeviceType | null => {
    if (types.has(key)) return types.get(key)!;
    const spec = specByKey.get(key);
    if (!spec && !legacyName) return null;
    const t: CatalogDeviceType = {
      key,
      slug: spec?.slug || key.replace(/_/g, '-'),
      name: spec?.name || legacyName || titleCase(key),
      group: spec?.group || 'Home & Hobby',
      family: spec?.family || 'small_heating',
      sizeLabel: spec?.sizeLabel,
      brands: [],
    };
    types.set(key, t);
    brandIndex.set(key, new Map());
    return t;
  };

  const ensureBrand = (t: CatalogDeviceType, name: string): CatalogBrand => {
    const idx = brandIndex.get(t.key)!;
    const k = brandKey(name);
    let b = idx.get(k);
    if (!b) {
      const meta = brandMetaFor(name);
      b = { slug: '', name, domain: meta.domain, simpleIconSlug: meta.simpleIconSlug, models: [] };
      const used = new Set(t.brands.map((x) => x.slug));
      b.slug = uniqueSlug(slugify(name), used);
      t.brands.push(b);
      idx.set(k, b);
      modelSlugs.set(b, new Set());
      modelNames.set(b, new Set());
    }
    return b;
  };

  const addModel = (b: CatalogBrand, model: Omit<CatalogModel, 'slug'>) => {
    const names = modelNames.get(b)!;
    const nk = model.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (names.has(nk)) return;
    names.add(nk);
    b.models.push({ ...model, slug: uniqueSlug(slugify(model.name), modelSlugs.get(b)!) });
  };

  // 1. Legacy hand-written catalog (keeps field notes).
  for (const [legacyKey, cat] of Object.entries(MASTER_CATALOG)) {
    const target = legacyKey in LEGACY_MERGE ? LEGACY_MERGE[legacyKey] : legacyKey;
    if (!target) continue;
    const t = ensureType(target, cat.name);
    if (!t) continue;
    const spec = specByKey.get(target);
    for (const brand of Object.values(cat.brands)) {
      const b = ensureBrand(t, brand.name);
      const dict = (brand.hasModels ? brand.models : brand.sizes) || {};
      for (const [itemKey, item] of Object.entries(dict)) {
        const name = item.name || itemKey;
        const sizes = spec?.legacySizes && !SIZE_IN_NAME.test(name) ? sizesFrom(spec.sizes) : [];
        addModel(b, {
          name,
          sizes,
          legacy: { steps: item.steps || [], tools: item.tools || [], commonIssues: item.commonIssues || [] },
        });
      }
    }
  }

  // 2. Expanded specs (new types, new brands, more models).
  for (const spec of ALL_SPECS) {
    const t = ensureType(spec.key)!;
    if (spec.name && !MASTER_CATALOG[spec.key]) t.name = spec.name;
    for (const [rawBrand, models] of Object.entries(spec.brands || {})) {
      const b = ensureBrand(t, BRAND_DISPLAY[rawBrand] || rawBrand.replace(/_/g, ' '));
      for (const raw of models) {
        const [name, sizeOverride] = raw.split('|');
        const sizes = sizeOverride === undefined ? sizesFrom(spec.sizes) : sizesFrom(sizeOverride ? sizeOverride.split(',') : []);
        addModel(b, { name: name.trim(), sizes });
      }
    }
  }

  const groupRank = (g: string) => {
    const i = GROUP_ORDER.indexOf(g);
    return i === -1 ? 99 : i;
  };
  const list = [...types.values()].filter((t) => t.brands.length > 0);
  for (const t of list) {
    t.brands.sort((a, b) => a.name.localeCompare(b.name));
    for (const b of t.brands) b.models.sort((x, y) => x.name.localeCompare(y.name, undefined, { numeric: true }));
  }
  return list.sort((a, b) => groupRank(a.group) - groupRank(b.group) || a.name.localeCompare(b.name));
}

export const CATALOG: CatalogDeviceType[] = build();

const TYPE_BY_SLUG = new Map(CATALOG.map((t) => [t.slug, t]));
// Accept legacy keys / underscore forms in URLs too.
for (const t of CATALOG) {
  TYPE_BY_SLUG.set(t.key, t);
  TYPE_BY_SLUG.set(t.key.replace(/_/g, '-'), t);
}
for (const [from, to] of Object.entries(LEGACY_MERGE)) {
  const t = to ? CATALOG.find((x) => x.key === to) : undefined;
  if (t) { TYPE_BY_SLUG.set(from, t); TYPE_BY_SLUG.set(from.replace(/_/g, '-'), t); }
}

export function findType(slug?: string) {
  return slug ? TYPE_BY_SLUG.get(decodeURIComponent(slug).toLowerCase()) : undefined;
}
export function findBrand(t: CatalogDeviceType | undefined, slug?: string) {
  return t && slug ? t.brands.find((b) => b.slug === slug) : undefined;
}
export function findModel(b: CatalogBrand | undefined, slug?: string) {
  return b && slug ? b.models.find((m) => m.slug === slug) : undefined;
}
export function findSize(m: CatalogModel | undefined, slug?: string) {
  return m && slug ? m.sizes.find((s) => s.slug === slug) : undefined;
}

export const CATALOG_STATS = (() => {
  let brands = 0, models = 0, leaves = 0;
  const uniqueBrands = new Set<string>();
  for (const t of CATALOG) {
    brands += t.brands.length;
    for (const b of t.brands) {
      uniqueBrands.add(brandKey(b.name));
      models += b.models.length;
      for (const m of b.models) leaves += Math.max(1, m.sizes.length);
    }
  }
  return { deviceTypes: CATALOG.length, brandEntries: brands, uniqueBrands: uniqueBrands.size, models, leaves };
})();

export interface CatalogHit {
  kind: 'type' | 'brand' | 'model';
  label: string;
  sub: string;
  path: string; // relative to the devices base path
  type: CatalogDeviceType;
  brand?: CatalogBrand;
  model?: CatalogModel;
}

export function searchCatalog(query: string, limit = 60): CatalogHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  const match = (s: string) => terms.every((term) => s.includes(term));
  const hits: CatalogHit[] = [];
  for (const t of CATALOG) {
    if (match(t.name.toLowerCase())) hits.push({ kind: 'type', label: t.name, sub: `${t.brands.length} brands`, path: `/${t.slug}`, type: t });
  }
  for (const t of CATALOG) {
    for (const b of t.brands) {
      const bn = b.name.toLowerCase();
      if (match(`${bn} ${t.name.toLowerCase()}`) && terms.some((term) => bn.includes(term))) {
        hits.push({ kind: 'brand', label: b.name, sub: t.name, path: `/${t.slug}/${b.slug}`, type: t, brand: b });
      }
      for (const m of b.models) {
        if (hits.length >= limit * 3) break;
        if (match(`${bn} ${m.name.toLowerCase()} ${t.name.toLowerCase()}`) && terms.some((term) => m.name.toLowerCase().includes(term) || bn.includes(term))) {
          hits.push({ kind: 'model', label: `${b.name} ${m.name}`, sub: t.name, path: `/${t.slug}/${b.slug}/${m.slug}`, type: t, brand: b, model: m });
        }
      }
    }
  }
  const rank = { type: 0, brand: 1, model: 2 } as const;
  return hits.sort((a, b) => rank[a.kind] - rank[b.kind]).slice(0, limit);
}
