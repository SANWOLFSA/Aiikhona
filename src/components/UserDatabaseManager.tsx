import { useState, useEffect, useMemo } from 'react';
import { Database, Upload, Calendar, User, Trash2, Plus, ShieldAlert, CheckCircle2, RefreshCw, Tv, Cpu, Wrench, AlertCircle, Check, Sparkles, CheckCircle } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { describeCloudError, currentUid } from '../lib/firestoreErrors';
import { collection, doc, getDocs, setDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';

interface MetadataRecord {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  accountEmail: string;
  metadataSizeKb?: number;
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
  
  // Metadata form state with interactive Validation UI
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('PDF Schematic');
  const [notes, setNotes] = useState('');
  const [fileNameTouched, setFileNameTouched] = useState(false);
  const [notesTouched, setNotesTouched] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Real-time validation computation
  const validationRules = useMemo(() => {
    const trimmed = fileName.trim();
    const hasMinLength = trimmed.length >= 4;
    const hasMaxLength = trimmed.length <= 80;
    const hasValidChars = !/[<>:"/\\|?*]/.test(trimmed);
    const hasValidExtension = /\.(pdf|brd|cad|bin|hex|json|schematic|dwg|txt)$/i.test(trimmed);
    const isFileNameValid = hasMinLength && hasMaxLength && hasValidChars && hasValidExtension;
    
    const notesLengthValid = notes.length <= 150;
    const isFormValid = isFileNameValid && notesLengthValid;

    let errorHint = '';
    if (trimmed.length === 0) {
      errorHint = 'Filename cannot be blank.';
    } else if (!hasMinLength) {
      errorHint = `Too short (${trimmed.length}/4 characters minimum).`;
    } else if (!hasValidChars) {
      errorHint = 'Contains prohibited characters (< > : " / \\ | ? *).';
    } else if (!hasValidExtension) {
      errorHint = 'Must include an engineering extension (e.g., .brd, .pdf, .bin, .hex, .json).';
    } else if (!hasMaxLength) {
      errorHint = 'Filename exceeds 80 characters maximum.';
    }

    return {
      trimmed,
      hasMinLength,
      hasMaxLength,
      hasValidChars,
      hasValidExtension,
      isFileNameValid,
      notesLengthValid,
      isFormValid,
      errorHint
    };
  }, [fileName, notes]);
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchRecords = async () => {
    const uid = currentUid();
    if (!uid) {
      setIsLoading(false);
      setRecords([]);
      setSavedDevices([]);
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
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
          metadataSizeKb: typeof data.metadataSizeKb === 'number' ? data.metadataSizeKb : undefined,
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
      setErrorMsg(describeCloudError(error, 'load your records'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [currentUser]);

  const handleUploadMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    setFileNameTouched(true);
    setNotesTouched(true);
    setAttemptedSubmit(true);

    if (!validationRules.isFormValid) {
      setErrorMsg('Please address the highlighted validation requirements before saving.');
      return;
    }

    const uid = currentUid();
    if (!uid) {
      setErrorMsg('Please sign in with an account to save records.');
      return;
    }
    const email = auth.currentUser?.email || currentUser?.email || '';
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
      notes: notes.trim()
    };

    try {
      await setDoc(doc(db, 'user_metadata_uploads', recordId), {
        ...newRecord,
        createdAt: serverTimestamp()
      });
      setSuccessMsg('Record saved.');
      setFileName('');
      setNotes('');
      setFileNameTouched(false);
      setNotesTouched(false);
      setAttemptedSubmit(false);
      await fetchRecords();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      setErrorMsg(describeCloudError(error, 'save this record', `user_metadata_uploads/${recordId}`));
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
      setSuccessMsg('Record deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setErrorMsg(describeCloudError(error, 'delete this record', `${collectionName}/${id}`));
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
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-stone-800/80">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">Log New Metadata & Upload Date</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  validationRules.isFormValid 
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : (fileNameTouched || attemptedSubmit)
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700'
                }`}>
                  {validationRules.isFormValid ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Form Ready to Submit</span>
                    </>
                  ) : (fileNameTouched || attemptedSubmit) ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Validation Requirements Pending</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Live Validation Active</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            <form onSubmit={handleUploadMetadata} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* File or Schematic Name with Validation UI */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1">
                      <span>File or Schematic Name</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {fileName.length}/80 chars
                    </span>
                  </div>

                  <div className="relative">
                    <input 
                      type="text" 
                      value={fileName}
                      onChange={e => {
                        setFileName(e.target.value);
                        if (!fileNameTouched) setFileNameTouched(true);
                      }}
                      onBlur={() => setFileNameTouched(true)}
                      placeholder="e.g., Sony_KDL48_Tcon_Boardview.brd"
                      className={`w-full px-4 py-3 pr-10 rounded-xl text-xs transition-all border ${
                        (fileNameTouched || attemptedSubmit)
                          ? validationRules.isFileNameValid
                            ? 'bg-emerald-50/20 dark:bg-emerald-950/20 border-emerald-500 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-400'
                            : 'bg-rose-50/20 dark:bg-rose-950/20 border-rose-500 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-rose-400'
                          : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      {(fileNameTouched || attemptedSubmit) && (
                        validationRules.isFileNameValid ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 animate-in fade-in zoom-in-75" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500 animate-in fade-in zoom-in-75" />
                        )
                      )}
                    </div>
                  </div>

                  {/* Inline feedback message */}
                  {(fileNameTouched || attemptedSubmit) && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-150">
                      {!validationRules.isFileNameValid ? (
                        <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{validationRules.errorHint}</span>
                        </p>
                      ) : (
                        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Valid filename with authorized engineering extension</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quick extension append pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-stone-400 font-medium mr-1">Quick Extension:</span>
                    {['.brd', '.pdf', '.bin', '.hex', '.json'].map(ext => (
                      <button
                        type="button"
                        key={ext}
                        onClick={() => {
                          const base = fileName.replace(/\.[^/.]+$/, "");
                          setFileName((base || 'device_schematic') + ext);
                          setFileNameTouched(true);
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                      >
                        +{ext}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Category Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                    <span>Data Category Type</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Auto-classified
                    </span>
                  </label>
                  <select 
                    value={fileType}
                    onChange={e => setFileType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="PDF Schematic">PDF Schematic (Circuit Maps)</option>
                    <option value="Boardview / CAD">Boardview / CAD (.brd / .cad)</option>
                    <option value="Diagnostic Telemetry">Firmware / diagnostic dump (.bin / .hex)</option>
                    <option value="Account Backup">Account Backup (JSON / config)</option>
                  </select>
                </div>

                {/* Notes & Account Info */}
                <div className="sm:col-span-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Notes & Technician Memo
                    </label>
                    <span className={`text-[10px] font-mono ${
                      notes.length > 140 
                        ? 'text-rose-500 font-bold' 
                        : notes.length > 100 
                          ? 'text-amber-500' 
                          : 'text-stone-400'
                    }`}>
                      {notes.length}/150 characters
                    </span>
                  </div>
                  <input 
                    type="text" 
                    value={notes}
                    maxLength={150}
                    onChange={e => {
                      setNotes(e.target.value);
                      if (!notesTouched) setNotesTouched(true);
                    }}
                    onBlur={() => setNotesTouched(true)}
                    placeholder="e.g., Uploaded by Master Technician for regional motherboard repair logging"
                    className="w-full px-4 py-3 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Real-time Validation Checklist Chips */}
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Real-Time Validation Criteria</span>
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {[
                      validationRules.hasMinLength,
                      validationRules.hasValidExtension,
                      validationRules.hasValidChars,
                      validationRules.notesLengthValid
                    ].filter(Boolean).length}/4 Passed
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className={`p-2 rounded-xl text-[11px] font-semibold flex items-center gap-2 border transition-all ${
                    validationRules.hasMinLength 
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                      : (fileNameTouched || attemptedSubmit)
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        : 'bg-stone-100 dark:bg-stone-900 text-stone-500 border-stone-200 dark:border-stone-800'
                  }`}>
                    {validationRules.hasMinLength ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-stone-400 shrink-0" />
                    )}
                    <span className="truncate">Min 4 chars</span>
                  </div>

                  <div className={`p-2 rounded-xl text-[11px] font-semibold flex items-center gap-2 border transition-all ${
                    validationRules.hasValidExtension 
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                      : (fileNameTouched || attemptedSubmit)
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        : 'bg-stone-100 dark:bg-stone-900 text-stone-500 border-stone-200 dark:border-stone-800'
                  }`}>
                    {validationRules.hasValidExtension ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-stone-400 shrink-0" />
                    )}
                    <span className="truncate">Valid Extension</span>
                  </div>

                  <div className={`p-2 rounded-xl text-[11px] font-semibold flex items-center gap-2 border transition-all ${
                    validationRules.hasValidChars 
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                      : (fileNameTouched || attemptedSubmit)
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        : 'bg-stone-100 dark:bg-stone-900 text-stone-500 border-stone-200 dark:border-stone-800'
                  }`}>
                    {validationRules.hasValidChars ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-stone-400 shrink-0" />
                    )}
                    <span className="truncate">Clean Filename</span>
                  </div>

                  <div className={`p-2 rounded-xl text-[11px] font-semibold flex items-center gap-2 border transition-all ${
                    validationRules.notesLengthValid 
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                  }`}>
                    {validationRules.notesLengthValid ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-stone-400 shrink-0" />
                    )}
                    <span className="truncate">&lt; 150 chars</span>
                  </div>
                </div>
              </div>

              {/* Submission CTA Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div>
                  {!validationRules.isFormValid && (fileNameTouched || attemptedSubmit) ? (
                    <p className="text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Complete the missing criteria to enable saving.</span>
                    </p>
                  ) : validationRules.isFormValid ? (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>All input fields validated and ready for cloud sync.</span>
                    </p>
                  ) : (
                    <p className="text-xs text-stone-400">
                      Enter an engineering file name to begin validation.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !validationRules.isFormValid}
                  className={`px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                    validationRules.isFormValid
                      ? 'bg-amber-400 hover:bg-amber-500 text-stone-950 active:scale-95'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed opacity-60'
                  }`}
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
