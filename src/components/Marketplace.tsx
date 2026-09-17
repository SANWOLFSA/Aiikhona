import { useState } from 'react';
import { ShoppingBag, Search, Plus, ShieldAlert, Award, ShieldCheck, X } from 'lucide-react';
import type { VerificationRequest } from '../types';

interface ListingItem {
  id: string;
  title: string;
  category: string;
  price: number;
  condition: string;
  seller: {
    name: string;
    rating: number;
    isVerifiedCompany: boolean;
  };
  image: string;
  description: string;
  inStock: boolean;
}

const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: "lst_1",
    title: "Rigol DS1054Z 50MHz Quad-Channel Oscilloscope (Unlocked to 100MHz)",
    category: "Test Equipment",
    price: 220.00,
    condition: "Refurbished",
    seller: {
      name: "Precision Labs USA",
      rating: 4.9,
      isVerifiedCompany: true
    },
    image: "https://images.unsplash.com/photo-1581092334247-448a60df600b?w=400&auto=format&fit=crop&q=80",
    description: "Mint condition. Quad channel DSO. Software options unlocked including memory depth, trigger record, and full 100MHz bandwidth upgrade.",
    inStock: true
  },
  {
    id: "lst_2",
    title: "Amtech NC-559-V2-TF No-Clean Solder Flux (Original 16g Syringe)",
    category: "Consumables",
    price: 18.50,
    condition: "New",
    seller: {
      name: "Apex Precision Logistics",
      rating: 5.0,
      isVerifiedCompany: true
    },
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80",
    description: "Highly active, halogen-free tacky flux for flip chip, BGA rework, and general micro-soldering. Ships under temp control.",
    inStock: true
  },
  {
    id: "lst_3",
    title: "Nintendo Switch V2 Board Only (Clean, Patched BQ24193/M92)",
    category: "Donor Boards & Parts",
    price: 45.00,
    condition: "Tested Working",
    seller: {
      name: "Tech Salvage Co",
      rating: 4.5,
      isVerifiedCompany: false
    },
    image: "https://images.unsplash.com/photo-1612287233267-336c58ffeb8e?w=400&auto=format&fit=crop&q=80",
    description: "Perfect replacement motherboard. Factory tested, not banned. Clean USB-C port, battery circuit runs cold.",
    inStock: true
  },
  {
    id: "lst_4",
    title: "Solder Wick Desoldering Braid Bundle (Goot Wick 3-pack)",
    category: "Consumables",
    price: 9.90,
    condition: "New",
    seller: {
      name: "Apex Precision Logistics",
      rating: 5.0,
      isVerifiedCompany: true
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=80",
    description: "High quality desoldering wick saturated with water-white rosin flux. 1.5mm / 2.5mm / 3.0mm width packs.",
    inStock: true
  }
];

export default function Marketplace({ 
  parts, // Wait, we can keep the parts list prop for backward-compatibility in App.tsx
  initialSearchQuery = '', 
  onRequestVerification, 
  onSelectPartDetail 
}: { 
  parts?: any[]; 
  initialSearchQuery?: string; 
  onRequestVerification: (req: VerificationRequest) => void; 
  onSelectPartDetail: (pn: string) => void; 
}) {
  const [search, setSearch] = useState(initialSearchQuery);
  const [category, setCategory] = useState("All");
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isVerifModalOpen, setIsVerifModalOpen] = useState(false);

  // New Listing State
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Test Equipment");
  const [newPrice, setNewPrice] = useState("");
  const [newCond, setNewCond] = useState("New");
  const [newDesc, setNewDesc] = useState("");

  // New Verification State
  const [companyName, setCompanyName] = useState("");
  const [regNum, setRegNum] = useState("");
  const [country, setCountry] = useState("United States");
  const [taxNum, setTaxNum] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const categories = ["All", "Test Equipment", "Consumables", "Donor Boards & Parts", "Soldering Stations"];

  const filteredListings = listings.filter(item => {
    if (category !== "All" && item.category !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const newItem: ListingItem = {
      id: `lst_${Date.now()}`,
      title: newTitle,
      category: newCat,
      price: parseFloat(newPrice),
      condition: newCond,
      seller: {
        name: "My Repair Shop (You)",
        rating: 5.0,
        isVerifiedCompany: false
      },
      image: "https://images.unsplash.com/photo-1581092334247-448a60df600b?w=400&auto=format&fit=crop&q=80",
      description: newDesc,
      inStock: true
    };
    setListings([newItem, ...listings]);
    setNewTitle("");
    setNewPrice("");
    setNewDesc("");
    setIsListModalOpen(false);
  };

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !regNum) return;
    
    const request: VerificationRequest = {
      id: `verif_${Date.now()}`,
      companyName,
      registrationNumber: regNum,
      countryOfRegistration: country,
      tradingLicenseDocument: "Uploaded successfully. Encrypted reference hash.",
      vatTaxNumber: taxNum,
      contactEmail: email,
      contactPhone: phone,
      officialAddress: address,
      status: "Pending Review",
      submittedDate: new Date().toISOString().split('T')[0],
      reviewerNotes: ""
    };
    
    onRequestVerification(request);
    setIsVerifModalOpen(false);
    
    // Clear state
    setCompanyName("");
    setRegNum("");
    setEmail("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
            <span>Peer-to-Peer & Corporate Trade</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Verified Equipment & Consumables Marketplace</h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Source high-grade test equipment, original Amtech flux, pre-owned microscopes, and component bundles. Avoid low-quality clones by buying from verified companies.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsVerifModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-amber-400 text-amber-800 dark:text-amber-400 hover:bg-amber-400/10 text-xs font-black transition-all flex items-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Apply Business Verification</span>
          </button>
          <button 
            onClick={() => setIsListModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Post Gear Listing</span>
          </button>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-2xl flex items-start gap-3">
        <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-300 space-y-1">
          <span className="font-bold block">Compliance Notice: EU & USA Cross-Border Trading Laws</span>
          <p className="leading-relaxed">
            All volume semiconductor and test equipment sales over $500 require traders to provide valid VAT/TAX IDs or corporate registrations. Submit your credentials using the "Apply Business Verification" button above to bypass trade limits and unlock the verified badge.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search oscilloscope, heat gun, premium solder paste..." 
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredListings.map(item => (
          <div key={item.id} className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row h-full">
            <div className="sm:w-2/5 relative h-48 sm:h-auto">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-stone-950/80 text-white text-[10px] font-bold uppercase tracking-wider">{item.condition}</div>
            </div>
            
            <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{item.category}</span>
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 text-base">${item.price.toFixed(2)}</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-stone-100 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-stone-400 block">Seller info</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{item.seller.name}</span>
                    {item.seller.isVerifiedCompany && (
                      <span className="text-amber-500" title="Compliance Verified Seller">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.9L10 .954 17.834 4.9A1 1 0 0118.5 5.8V11c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C6.5 18.5 3 16 3 11V5.8a1 1 0 01.666-.9zM12 8.5v4a1 1 0 01-2 0v-4a1 1 0 012 0z" clipRule="evenodd"/></svg>
                      </span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => alert(`Purchase initiated with ${item.seller.name} for ${item.title}. In-app checkout secure escrow.`)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 font-black text-xs transition-colors"
                >
                  Buy Gear
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Listing Modal */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <form onSubmit={handleAddListing} className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-4 shadow-2xl">
            <button type="button" onClick={() => setIsListModalOpen(false)} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100">Post New Equipment Listing</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Equipment Title</label>
                <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Rigol Oscilloscope, Weller Station..." className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-amber-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Category</label>
                  <select value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-amber-400">
                    <option>Test Equipment</option>
                    <option>Consumables</option>
                    <option>Donor Boards & Parts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Price (USD)</label>
                  <input required type="number" step="0.01" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="e.g. 150.00" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-amber-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Condition</label>
                <select value={newCond} onChange={e => setNewCond(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs">
                  <option>New</option>
                  <option>Like New</option>
                  <option>Refurbished</option>
                  <option>Tested Working</option>
                  <option>For Parts Only (Untested)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Item Description</label>
                <textarea rows={3} value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="List specifications, flaws, usage hours..." className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
              <button type="button" onClick={() => setIsListModalOpen(false)} className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black">Publish Listing</button>
            </div>
          </form>
        </div>
      )}

      {/* Verification Modal */}
      {isVerifModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <form onSubmit={handleSubmitVerification} className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-4 overflow-y-auto shadow-2xl">
            <button type="button" onClick={() => setIsVerifModalOpen(false)} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full">
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-1">
              <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-amber-500 animate-pulse" />
                <span>Submit Corporate Compliance Documentation</span>
              </h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                Unlock cross-border wholesale trade capabilities, bulk chip ordering privileges, and get a Gold Verified trading badge. Your documents will be securely reviewed by our team within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Company Registered Name</label>
                  <input required type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. Apex Precision Logistics LLC" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Company Registration Number</label>
                  <input required type="text" value={regNum} onChange={e => setRegNum(e.target.value)} placeholder="e.g. US-DE-9284103" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Tax / VAT ID (Optional)</label>
                  <input type="text" value={taxNum} onChange={e => setTaxNum(e.target.value)} placeholder="e.g. EU92810432" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Country of Registration</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>Shenzhen, China</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Official Support Email</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="compliance@yourcompany.com" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Corporate Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 019-2834" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Official Headquarters Address</label>
                <input required type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Suite 400, Silicon Way, San Jose, CA" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 text-[11px] text-stone-500 leading-relaxed">
                By submitting this form, you authorize DIYELECTRONICS to cross-check business directories and trade license registrars. False papers will result in a permanent shop ban.
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
              <button type="button" onClick={() => setIsVerifModalOpen(false)} className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black">Submit Credentials</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
