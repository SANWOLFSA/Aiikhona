import React, { useState } from 'react';
import { Search, ChevronRight, Wrench, Layers } from 'lucide-react';
import { DeviceCategory } from '../data/deviceCatalog';

interface DeviceTypesViewProps {
  categories: DeviceCategory[];
  onSelectCategory: (category: DeviceCategory) => void;
}

export const DeviceTypesView: React.FC<DeviceTypesViewProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Strictly sorted alphabetically A-Z
  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredCategories = sortedCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tier 1 Header & Search */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Layers className="w-4 h-4" />
              <span>TIER 1 — ROOT DIRECTORY</span>
            </div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
              Select Device Type
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Browse hardware categories in alphabetical order. Select a device type to view manufacturers.
            </p>
          </div>
          <span className="self-start md:self-auto px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono font-bold">
            {filteredCategories.length} Device Types
          </span>
        </div>

        {/* Filter Input */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-stone-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter device types (e.g. Mobile Phone, TV, Air Fryer)..."
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

      {/* Device Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className="group bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-300 flex flex-col justify-between gap-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[11px] font-black uppercase tracking-wider">
                  {cat.brands.length} Brands Available
                </span>
                <span className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Wrench className="w-4 h-4" />
                </span>
              </div>

              <h2 className="text-base font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h2>

              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-all">
              <span>View Brands Matrix</span>
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
