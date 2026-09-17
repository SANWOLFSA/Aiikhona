import { useState, useMemo } from 'react';
import { Layers, Search, Cpu, Truck, FileText, X } from 'lucide-react';
import type { SparePart } from '../types';

export default function SpareParts({ 
  parts, 
  initialSearchQuery = '', 
  onSelectMarketplace 
}: { 
  parts: SparePart[]; 
  initialSearchQuery?: string; 
  onSelectMarketplace: (brand: string) => void 
}) {
  const [search, setSearch] = useState(initialSearchQuery);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);

  const categories = ["All", "IC Chip", "MOSFET / Transistor", "Capacitor", "Display Screen", "Battery", "Connector / Port"];
  const BRANDS = ["All", "Apple", "Sony", "Nintendo", "Samsung", "Dell", "Microsoft", "Lenovo", "Asus", "DJI", "LG"];

  const filteredParts = useMemo(() => {
    return parts.filter(p => {
      if (category !== "All" && p.category !== category) return false;
      if (brand !== "All") {
        const lowerBrand = brand.toLowerCase();
        const inDevices = p.typicalDevices.some(d => d.toLowerCase().includes(lowerBrand));
        const inName = p.name.toLowerCase().includes(lowerBrand);
        const inDesc = p.description.toLowerCase().includes(lowerBrand);
        if (!inDevices && !inName && !inDesc) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchPN = p.partNumber.toLowerCase().includes(q);
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchDevices = p.typicalDevices.some(d => d.toLowerCase().includes(q));
        const matchSubs = p.substitutes.some(s => s.toLowerCase().includes(q));
        if (!matchPN && !matchName && !matchDesc && !matchDevices && !matchSubs) return false;
      }
      return true;
    });
  }, [parts, category, brand, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Searchable Component Library</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Spare Parts & IC Cross-Reference Database</h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Source authentic semiconductors, BGA controllers, power MOSFETs, and passives. Cross-reference pinouts and verified supplier stock to avoid counterfeit parts.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
          <span className="font-bold text-stone-800 dark:text-stone-200 block">Verified Distributor Network</span>
          <p className="text-stone-500 text-[11px]">
            Companies with the gold badge have submitted certified trading licenses verified by DIYELECTRONICS admins.
          </p>
        </div>
      </div>

      <div className="space-y-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search part number (e.g. M92T36, CD3215), footprint, or device..." 
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400" 
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)} 
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${category === cat ? "bg-amber-400 text-stone-950 shadow-xs" : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span>Device Brand:</span>
          </span>
          {BRANDS.map(b => (
            <button 
              key={b}
              onClick={() => setBrand(b)} 
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap border ${brand === b ? "bg-stone-950 text-amber-400 border-stone-950 dark:bg-amber-400 dark:text-stone-950 dark:border-amber-400 font-bold shadow-xs" : "bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-amber-400"}`}
            >
              {b === "All" ? "All Brands" : b}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map(p => (
          <div key={p.id} className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase tracking-wider">{p.category}</span>
                  <h3 className="text-lg font-black font-mono text-stone-900 dark:text-stone-100 mt-1">{p.partNumber}</h3>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">{p.packageFootprint}</span>
              </div>
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 line-clamp-2">{p.name}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">{p.description}</p>
              
              <div className="pt-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Commonly Found In:</span>
                <div className="flex flex-wrap gap-1">
                  {p.typicalDevices.map((dev, gIdx) => (
                    <span key={gIdx} className="text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">{dev}</span>
                  ))}
                </div>
              </div>
              
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{p.supplier.name}</span>
                  {p.supplier.isVerifiedCompany && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded" title="Verified registered trading company">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.9L10 .954 17.834 4.9A1 1 0 0118.5 5.8V11c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C6.5 18.5 3 16 3 11V5.8a1 1 0 01.666-.9zM12 8.5v4a1 1 0 01-2 0v-4a1 1 0 012 0z" clipRule="evenodd"/></svg>
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <span className="font-mono text-stone-500 text-[11px] flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>{p.supplier.shippingDays}d ship</span>
                </span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block">Unit Price (Approx)</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">${p.priceUSD.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedPart(p)} className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 text-xs font-bold transition-colors">Pinout & Specs</button>
                <button onClick={() => onSelectMarketplace(p.partNumber)} className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-all shadow-xs">Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            <button onClick={() => setSelectedPart(null)} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800">
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-stone-950 uppercase tracking-wider">{selectedPart.category}</span>
              <h2 className="text-2xl font-black font-mono text-stone-900 dark:text-stone-100">{selectedPart.partNumber}</h2>
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">{selectedPart.name}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Datasheet Summary & Pinout Architecture</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-mono">{selectedPart.datasheetSummary}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">Technical Specifications</h4>
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden text-xs">
                {Object.entries(selectedPart.specifications).map(([key, val], idx) => (
                  <div key={idx} className={`flex justify-between p-2.5 ${idx % 2 === 0 ? "bg-stone-50 dark:bg-stone-800/40" : "bg-white dark:bg-stone-900"}`}>
                    <span className="font-semibold text-stone-600 dark:text-stone-400">{key}</span>
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">Known Cross-Reference Substitutes</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPart.substitutes.map((sub, sIdx) => (
                  <span key={sIdx} className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold">{sub}</span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-500">Package: <strong>{selectedPart.packageFootprint}</strong></span>
              <button onClick={() => setSelectedPart(null)} className="px-4 py-2 rounded-xl bg-stone-950 text-white dark:bg-amber-400 dark:text-stone-950 font-bold text-xs">Close Specs</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
