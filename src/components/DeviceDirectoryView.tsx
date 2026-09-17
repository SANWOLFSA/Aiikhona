import { useState } from 'react';
import { Search, ChevronRight, ArrowLeft, Wrench, CheckCircle2, ShieldAlert, Cpu, Download, Bookmark, BookmarkCheck, Tv, Database, PlusCircle } from 'lucide-react';
import { DEVICE_CATALOG, DeviceCategory, DeviceBrand, DeviceSize } from '../data/deviceCatalog';
import { db, auth } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function DeviceDirectoryView({
  savedGuideIds,
  onToggleSaveGuide,
  onSourcePart
}: {
  savedGuideIds: string[];
  onToggleSaveGuide: (guide: any) => void;
  onSourcePart: (partNumber: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<DeviceBrand | null>(null);
  const [selectedSize, setSelectedSize] = useState<DeviceSize | null>(null);
  const [screenSizeInches, setScreenSizeInches] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToDatabase, setAddedToDatabase] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sort categories alphabetically A to Z
  const sortedCategories = [...DEVICE_CATALOG].sort((a, b) => a.name.localeCompare(b.name));

  // Filter categories or brands if searching globally
  const matchingCategories = sortedCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.brands.some(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectCategory = (cat: DeviceCategory) => {
    setSelectedCategory(cat);
    setSelectedBrand(null);
    setSelectedSize(null);
    setScreenSizeInches('');
    setAddedToDatabase(false);
  };

  const handleSelectBrand = (brand: DeviceBrand) => {
    setSelectedBrand(brand);
    setSelectedSize(null);
    setScreenSizeInches('');
    setAddedToDatabase(false);
  };

  const handleSelectSize = (size: DeviceSize) => {
    setSelectedSize(size);
    setAddedToDatabase(false);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedSize(null);
    setScreenSizeInches('');
    setAddedToDatabase(false);
    setSearchTerm('');
  };

  const handleAddToDatabase = async () => {
    if (!selectedCategory || !selectedBrand || !selectedSize) return;
    
    const uid = auth.currentUser?.uid || 'guest_user';
    const deviceId = `${uid}_${Date.now()}`;
    
    setIsSaving(true);
    
    try {
      await setDoc(doc(db, 'user_saved_devices', deviceId), {
        userId: uid,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        brandId: selectedBrand.id,
        brandName: selectedBrand.name,
        sizeId: selectedSize.id,
        sizeName: selectedSize.name,
        screenSizeInches: screenSizeInches || null,
        addedAt: serverTimestamp(),
        repairSummary: selectedSize.repairSummary
      });
      
      setAddedToDatabase(true);
      setTimeout(() => {
        setAddedToDatabase(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving device to database:", error);
      alert("Failed to save to database. Please check your permissions.");
    } finally {
      setIsSaving(false);
    }
  };

  const isTvCategory = selectedCategory?.name.toLowerCase().includes('television') || selectedCategory?.name.toLowerCase().includes('tv') || selectedCategory?.id === 'tv';


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Universal Device Diagnostics & Solutions Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              A to Z Device Repair Catalog
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
              Select your device category, global brand, and size variant to instantly access professional repair solutions, multimeter test points, and required parts.
            </p>
          </div>

          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search category, brand (e.g. Samsung, TV)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button 
            onClick={handleReset}
            className={`px-3 py-1.5 rounded-xl transition-all ${!selectedCategory ? 'bg-amber-400 text-stone-950 font-black' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
          >
            All Devices (A-Z)
          </button>
          
          {selectedCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <button 
                onClick={() => { setSelectedBrand(null); setSelectedSize(null); }}
                className={`px-3 py-1.5 rounded-xl transition-all ${selectedCategory && !selectedBrand ? 'bg-amber-400 text-stone-950 font-black' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
              >
                {selectedCategory.name}
              </button>
            </>
          )}

          {selectedBrand && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <button 
                onClick={() => setSelectedSize(null)}
                className={`px-3 py-1.5 rounded-xl transition-all ${selectedBrand && !selectedSize ? 'bg-amber-400 text-stone-950 font-black' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
              >
                {selectedBrand.name}
              </button>
            </>
          )}

          {selectedSize && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="px-3 py-1.5 rounded-xl bg-stone-900 text-amber-400 font-bold dark:bg-stone-800">
                {selectedSize.name} (Solutions)
              </span>
            </>
          )}
        </div>
      </div>

      {/* STEP 1: CATEGORIES LIST (A to Z) */}
      {!selectedCategory && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-stone-900 dark:text-stone-100">
              1. Select Device Category (A to Z)
            </h2>
            <span className="text-xs text-stone-500 font-mono">{matchingCategories.length} Categories Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingCategories.map(cat => (
              <div 
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className="group bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-400 cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span>{cat.brands.length} Global Brands</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Select Brands <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: BRANDS SELECTION */}
      {selectedCategory && !selectedBrand && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to All Categories
              </button>
              <h2 className="text-lg font-black text-stone-900 dark:text-stone-100">
                2. Select {selectedCategory.name} Brand
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-mono">{selectedCategory.brands.length} Brands Available</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedCategory.brands.map(brand => (
              <div 
                key={brand.id}
                onClick={() => handleSelectBrand(brand)}
                className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-lg hover:border-amber-400 dark:hover:border-amber-400 cursor-pointer transition-all duration-300 flex flex-col items-center text-center justify-between gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-black text-base flex items-center justify-center group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors shadow-inner">
                  {brand.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {brand.sizes.length} Size / Variant Options
                  </p>
                </div>
                <div className="w-full pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  <span>Select Size</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: SIZE / VARIANT SELECTION */}
      {selectedCategory && selectedBrand && !selectedSize && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <button 
                onClick={() => setSelectedBrand(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Brands ({selectedCategory.name})
              </button>
              <h2 className="text-lg flex items-center gap-2 font-black text-stone-900 dark:text-stone-100">
                {isTvCategory && <Tv className="w-6 h-6 text-amber-500" />}
                3. Select {selectedBrand.name} Size or Model Variant
              </h2>
            </div>
            {isTvCategory && (
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-stone-500">Screen Size:</label>
                <select 
                  value={screenSizeInches} 
                  onChange={(e) => setScreenSizeInches(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 font-bold"
                >
                  <option value="">Any Size</option>
                  <option value="24&quot;">24"</option>
                  <option value="32&quot;">32"</option>
                  <option value="40&quot;">40"</option>
                  <option value="43&quot;">43"</option>
                  <option value="50&quot;">50"</option>
                  <option value="55&quot;">55"</option>
                  <option value="65&quot;">65"</option>
                  <option value="75&quot;">75"</option>
                  <option value="85&quot;">85"+</option>
                </select>
              </div>
            )}
            {!isTvCategory && <span className="text-xs text-stone-500 font-mono">{selectedBrand.sizes.length} Options Available</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedBrand.sizes.map(size => (
              <div 
                key={size.id}
                onClick={() => handleSelectSize(size)}
                className="group bg-white dark:bg-stone-950 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-400 cursor-pointer transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      {selectedBrand.name}
                    </span>
                    <span className="text-xs font-mono text-stone-400">{size.id}</span>
                  </div>
                  <h3 className="text-base font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                    {size.name}
                  </h3>
                  
                  <div className="space-y-1.5 pt-2">
                    <p className="text-xs font-bold text-stone-700 dark:text-stone-300">Common Symptoms:</p>
                    <ul className="text-xs text-stone-500 dark:text-stone-400 space-y-1">
                      {size.commonIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-400">View Solutions Page</span>
                  <button className="px-4 py-2 rounded-xl bg-amber-400 group-hover:bg-amber-300 text-stone-950 text-xs font-black flex items-center gap-1.5 shadow-sm transition-transform active:scale-95">
                    <span>Open Solutions</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: SOLUTIONS PAGE SPECIFIC TO CHOSEN PATH DEVICE */}
      {selectedCategory && selectedBrand && selectedSize && (
        <div className="space-y-8 animate-fadeIn">
          {/* Solutions Header Banner */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              {isTvCategory ? <Tv className="w-48 h-48 text-amber-400" /> : <Wrench className="w-48 h-48 text-amber-400" />}
            </div>

            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedSize(null)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-bold hover:bg-stone-700 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sizes
                  </button>
                  <span className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider">
                    {selectedCategory.name} / {selectedBrand.name} / {selectedSize.name}
                  </span>
                </div>
                
                <button 
                  onClick={handleAddToDatabase}
                  disabled={addedToDatabase || isSaving}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${addedToDatabase ? 'bg-green-500 text-white' : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-sm hover:shadow-md'}`}
                >
                  {isSaving ? (
                    <><Database className="w-4 h-4 animate-pulse" /> Saving...</>
                  ) : addedToDatabase ? (
                    <><CheckCircle2 className="w-4 h-4" /> Saved to Your Devices</>
                  ) : (
                    <><Database className="w-4 h-4" /> Save to My Devices</>
                  )}
                </button>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                {isTvCategory && screenSizeInches && <span className="text-amber-400">{screenSizeInches}</span>}
                {selectedBrand.name} {selectedSize.name}
              </h1>

              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedSize.repairSummary}
              </p>
            </div>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Diagnostics & Steps */}
            <div className="lg:col-span-8 space-y-8">
              {/* Common Issues & Failures */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-stone-900 dark:text-stone-100">Common Failure Symptoms</h2>
                    <p className="text-xs text-stone-500">Verified faults for {selectedBrand.name} {selectedSize.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedSize.commonIssues.map((issue, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200 leading-snug">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Diagnostic & Repair */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-stone-900 dark:text-stone-100">Step-by-Step Repair Protocol</h2>
                    <p className="text-xs text-stone-500">Multimeter test points & workstation procedure</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedSize.diagnosticSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60">
                      <div className="w-8 h-8 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                        0{idx + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider">Step {idx + 1} Procedure</h4>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Required Tools & Parts */}
            <div className="lg:col-span-4 space-y-6">
              {/* Required Tools */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-500" /> Required Workbench Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSize.requiredTools.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required / Replacement Parts */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-500" /> Common Replacement Parts
                </h3>
                <div className="space-y-3">
                  {selectedSize.commonParts.map((part, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{part}</span>
                      <button 
                        onClick={() => onSourcePart(part)}
                        className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-[11px] font-black transition-transform active:scale-95 shadow-sm"
                      >
                        Source Part
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-stone-900 text-white rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-black">Save & Export Repair Sheet</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Save this specific repair path to your offline library or export the diagnostic PDF for your customer workbench.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => onToggleSaveGuide({ id: `${selectedCategory.id}_${selectedBrand.id}_${selectedSize.id}`, title: `${selectedBrand.name} ${selectedSize.name} Repair Sheet`, deviceCategory: selectedCategory.name, deviceModel: selectedSize.name, issueType: selectedSize.commonIssues[0], difficulty: 'Intermediate', estimatedTimeMinutes: 45, author: { name: 'SANWOLF Expert' }, thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', eWasteSavedKg: 5.2, toolsRequired: selectedSize.requiredTools, partsRequired: [], steps: [] })}
                    className="flex-1 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                  >
                    <BookmarkCheck className="w-4 h-4" /> Save to Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
