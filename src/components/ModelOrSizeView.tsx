import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Cpu, Wrench } from 'lucide-react';
import { DeviceCategory, DeviceBrand, DeviceSize } from '../data/deviceCatalog';

interface ModelOrSizeViewProps {
  category: DeviceCategory;
  brand: DeviceBrand;
  onSelectSize: (size: DeviceSize) => void;
  onBackToBrands: () => void;
}

export const ModelOrSizeView: React.FC<ModelOrSizeViewProps> = ({
  category,
  brand,
  onSelectSize,
  onBackToBrands,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Determine route mode label (Route A: Models or Route B: Sizes / Physical Capacities)
  const isModelBased =
    category.name.toLowerCase().includes('phone') ||
    category.name.toLowerCase().includes('tv') ||
    category.name.toLowerCase().includes('living room') ||
    category.name.toLowerCase().includes('computer') ||
    category.name.toLowerCase().includes('security') ||
    category.name.toLowerCase().includes('office');

  const routeTypeLabel = isModelBased ? 'Models / Series' : 'Capacity / Dimensions / Sizes';

  const sortedSizes = [...brand.sizes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredSizes = sortedSizes.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.commonIssues.some((issue) =>
        issue.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <button
          onClick={onBackToBrands}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tier 2: {category.name} Brands</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Cpu className="w-4 h-4" />
              <span>TIER 3 — {routeTypeLabel.toUpperCase()} DIRECTORY</span>
            </div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
              {brand.name} — Select {routeTypeLabel}
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Select a specific model series or size capacity to access component diagnostics and repair protocols.
            </p>
          </div>
          <span className="self-start md:self-auto px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold">
            {filteredSizes.length} {routeTypeLabel}
          </span>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-stone-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Filter ${brand.name} ${routeTypeLabel.toLowerCase()}...`}
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

      {/* Model/Size Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSizes.map((size) => (
          <div
            key={size.id}
            onClick={() => onSelectSize(size)}
            className="group bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-300 flex flex-col justify-between gap-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[11px] font-black uppercase tracking-wider">
                  {brand.name}
                </span>
                <span className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Wrench className="w-4 h-4" />
                </span>
              </div>

              <h2 className="text-base font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors">
                {size.name}
              </h2>

              {size.commonIssues && size.commonIssues.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Common Fault Points:
                  </span>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                    {size.commonIssues.slice(0, 3).map((issue, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                        <span className="truncate">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-all">
              <span>Open Repair Solutions Sheet</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
