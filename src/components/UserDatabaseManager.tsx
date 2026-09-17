import { useState, useEffect } from 'react';
import { Database, Upload, Calendar, User, Trash2, Plus, ShieldAlert, CheckCircle2, RefreshCw, Tv, Cpu, Wrench } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc, query, where, serverTimestamp, Timestamp } from 'firebase/firestore';

interface MetadataRecord {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  accountEmail: string;
  metadataSizeKb: number;
  notes: string;
}

interface SavedDevice {
  id: string;
  userId: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  sizeId: string;
  sizeName: string;
  screenSizeInches: string | null;
  addedAt: any;
  repairSummary: string;
}

export default function UserDatabaseManager({ currentUser }: { currentUser: any }) {
  const [activeTab, setActiveTab] = useState<'metadata' | 'devices'>('devices');
  const [records, setRecords] = useState<MetadataRecord[]>([]);
  const [savedDevices, setSavedDevices] = useState<SavedDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Metadata form state
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('PDF Schematic');
  const [notes, setNotes] = useState('');
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchRecords = async () => {
    if (!currentUser?.id && !auth.currentUser?.uid) {
      setIsLoading(false);
      return;
    }
    const uid = currentUser?.id || auth.currentUser?.uid;
    setIsLoading(true);
    try {
      // Fetch metadata uploads
      const metadataQuery = query(collection(db, 'user_metadata_uploads'), where('userId', '==', uid));
      const metadataSnapshot = await getDocs(metadataQuery);
      const metadataItems: MetadataRecord[] = [];
      metadataSnapshot.forEach(docSnap => {
        const data = docSnap.data();
        metadataItems.push({
          id: docSnap.id,
          userId: data.userId,
          fileName: data.fileName,
          fileType: data.fileType,
          uploadDate: data.uploadDate || new Date().toISOString(),
          accountEmail: data.accountEmail,
          metadataSizeKb: data.metadataSizeKb || 128,
          notes: data.notes || ''
        });
      });
      setRecords(metadataItems);

      // Fetch saved devices
      const devicesQuery = query(collection(db, 'user_saved_devices'), where('userId', '==', uid));
      const devicesSnapshot = await getDocs(devicesQuery);
      const deviceItems: SavedDevice[] = [];
      devicesSnapshot.forEach(docSnap => {
        const data = docSnap.data();
        deviceItems.push({
          id: docSnap.id,
          userId: data.userId,
          categoryId: data.categoryId,
          categoryName: data.categoryName,
          brandId: data.brandId,
          brandName: data.brandName,
          sizeId: data.sizeId,
          sizeName: data.sizeName,
          screenSizeInches: data.screenSizeInches,
          addedAt: data.addedAt,
          repairSummary: data.repairSummary || ''
        });
      });
      setSavedDevices(deviceItems);
      
    } catch (error) {
      console.error("Error fetching user database records:", error);
      setErrorMsg("Failed to fetch records. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [currentUser]);

  const handleUploadMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const uid = currentUser?.id || auth.currentUser?.uid || 'guest_user';
    const email = currentUser?.email || auth.currentUser?.email || 'technician@diy.org';
    setIsSubmitting(true);
    setErrorMsg('');

    const recordId = `meta_${Date.now()}`;
    const newRecord: MetadataRecord = {
      id: recordId,
      userId: uid,
      fileName: fileName.trim(),
      fileType,
      uploadDate: new Date().toLocaleString(),
      accountEmail: email,
      metadataSizeKb: Math.floor(Math.random() * 500) + 45,
      notes: notes.trim() || 'User uploaded schematic & diagnostic telemetry'
    };

    try {
      await setDoc(doc(db, 'user_metadata_uploads', recordId), {
        ...newRecord,
        createdAt: serverTimestamp()
      });
      setSuccessMsg('Metadata record successfully saved to Firestore database!');
      setFileName('');
      setNotes('');
      await fetchRecords();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `user_metadata_uploads/${recordId}`);
      setErrorMsg('Failed to save metadata to Firestore. Please check permissions.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRecord = async (collectionName: string, id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'user_metadata_uploads') {
        setRecords(prev => prev.filter(r => r.id !== id));
      } else {
        setSavedDevices(prev => prev.filter(d => d.id !== id));
      }
      setSuccessMsg('Record deleted from database.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
      setErrorMsg('Failed to delete record.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-lg">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100">User Data & Storage</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">Manage your saved devices and uploaded diagnostic metadata</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-stone-100 dark:bg-stone-900 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${activeTab === 'devices' ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
            >
              My Saved Devices
            </button>
            <button
              onClick={() => setActiveTab('metadata')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${activeTab === 'metadata' ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
            >
              Metadata Uploads
            </button>
          </div>
          <button 
            onClick={fetchRecords} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh DB</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-2xl text-xs font-bold border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl text-xs font-bold border border-red-500/20">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {activeTab === 'devices' ? (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Tv className="w-4 h-4 text-amber-500" />
              <span>Saved Devices ({savedDevices.length})</span>
            </h3>
            <span className="text-[11px] text-stone-400 font-medium">Firestore Collection: `user_saved_devices`</span>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-xs text-stone-400 flex flex-col items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
              <span>Fetching saved devices...</span>
            </div>
          ) : savedDevices.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-400 space-y-2">
              <Wrench className="w-8 h-8 mx-auto opacity-40" />
              <p>You have not saved any devices to your profile yet.</p>
              <p className="text-[11px] text-stone-500">Go to the Devices tab, find your device, and click "Save to My Devices".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedDevices.map(device => {
                const isTv = device.categoryName.toLowerCase().includes('tv') || device.categoryName.toLowerCase().includes('television');
                
                return (
                  <div key={device.id} className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400">
                          {device.brandName}
                        </span>
                        {isTv && device.screenSizeInches && (
                          <span className="text-xs font-black text-stone-900 dark:text-stone-100">{device.screenSizeInches}</span>
                        )}
                      </div>
                      <h4 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        {isTv ? <Tv className="w-4 h-4 text-stone-400" /> : <Cpu className="w-4 h-4 text-stone-400" />}
                        {device.sizeName}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                        {device.repairSummary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] text-stone-400">
                        {device.addedAt?.toDate ? new Date(device.addedAt.toDate()).toLocaleDateString() : 'Recently added'}
                      </span>
                      <button 
                        onClick={() => handleDeleteRecord('user_saved_devices', device.id)}
                        className="text-stone-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                        title="Remove device"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Upload Form Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">Log New Metadata & Upload Date</h3>
            </div>

            <form onSubmit={handleUploadMetadata} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">File or Schematic Name</label>
                <input 
                  type="text" 
                  value={fileName}
                  onChange={e => setFileName(e.target.value)}
                  placeholder="e.g., iPhone_14_Pro_Boardview.brd"
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Data Category Type</label>
                <select 
                  value={fileType}
                  onChange={e => setFileType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="PDF Schematic">PDF Schematic</option>
                  <option value="Boardview / CAD">Boardview / CAD</option>
                  <option value="Diagnostic Telemetry">Diagnostic Telemetry</option>
                  <option value="Account Backup">Account Backup</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Notes & Account Info</label>
                <input 
                  type="text" 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g., Uploaded by Master Technician for regional motherboard repair logging"
                  className="w-full px-4 py-3 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !fileName.trim()}
                  className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-black px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving to Firestore...' : 'Store Metadata & Upload Date'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Database Records Table */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Stored Database Records ({records.length})</span>
              </h3>
              <span className="text-[11px] text-stone-400 font-medium">Firestore Collection: `user_metadata_uploads`</span>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-xs text-stone-400 flex flex-col items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
                <span>Fetching user data from Firestore...</span>
              </div>
            ) : records.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-400 space-y-2">
                <Database className="w-8 h-8 mx-auto opacity-40" />
                <p>No metadata upload records found in database yet.</p>
                <p className="text-[11px] text-stone-500">Use the form above to log your first metadata upload date and account info.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">File / Schematic</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Upload Date & Time</th>
                      <th className="pb-3">Account Email</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 font-medium">
                    {records.map(rec => (
                      <tr key={rec.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                        <td className="py-3.5 pr-4">
                          <div className="font-bold text-stone-900 dark:text-stone-100">{rec.fileName}</div>
                          <div className="text-[10px] text-stone-400 font-normal">{rec.notes}</div>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className="px-2 py-1 rounded-lg bg-amber-400/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                            {rec.fileType}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-stone-600 dark:text-stone-300">
                          {rec.uploadDate}
                        </td>
                        <td className="py-3.5 pr-4 text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-stone-400" />
                          <span className="truncate max-w-[150px]">{rec.accountEmail}</span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button 
                            onClick={() => handleDeleteRecord('user_metadata_uploads', rec.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
