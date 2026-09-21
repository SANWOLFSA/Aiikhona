import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Building2 } from 'lucide-react';
import { DeviceCategory, DeviceBrand } from '../data/deviceCatalog';

interface BrandSelectionViewProps {
  category: DeviceCategory;
  onSelectBrand: (brand: DeviceBrand) => void;
  onBackToDeviceTypes: () => void;
}

export const BrandSelectionView: React.FC<BrandSelectionViewProps> = ({
  category,
  onSelectBrand,
  onBackToDeviceTypes,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Strictly sorted alphabetically A-Z
  const sortedBrands = [...category.brands].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredBrands = sortedBrands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <button
          onClick={onBackToDeviceTypes}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tier 1: Device Types</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Building2 className="w-4 h-4" />
              <span>TIER 2 — BRAND DIRECTORY</span>
            </div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
              Select {category.name} Brand
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Select a manufacturer to open the model or variant directory.
            </p>
          </div>
          <span className="self-start md:self-auto px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold">
            {filteredBrands.length} Brands
          </span>
        </div>

        {/* Brand Search */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-stone-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${category.name} brands (e.g. Samsung, Apple, Defy)...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-3 flex items-center text-xs font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => onSelectBrand(brand)}
            className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-lg hover:border-blue-500 cursor-pointer transition-all duration-200 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-black text-xs flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {brand.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="truncate">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                  {brand.name}
                </h3>
                <p className="text-[11px] text-stone-400 font-medium truncate">
                  {brand.sizes.length} {brand.sizes.length === 1 ? 'Variant / Model' : 'Variants / Models'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 group-hover:text-blue-600 transition-all shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
