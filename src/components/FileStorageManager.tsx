import { useState, useEffect } from 'react';
import { Folder, Upload, FileText, Download, Trash2, Eye, ShieldAlert, CheckCircle2, RefreshCw, File, AlertCircle, Check } from 'lucide-react';
import { db, storage } from '../lib/firebase';
import { describeCloudError, currentUid } from '../lib/firestoreErrors';
import { collection, doc, getDocs, setDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface UserFileRecord {
  id: string;
  userId: string;
  fileName: string;
  fileSizeKb: number;
  fileType: string;
  downloadUrl: string;
  storagePath: string;
  uploadedAt: string;
}

export default function FileStorageManager({ currentUser }: { currentUser: any }) {
  const [files, setFiles] = useState<UserFileRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileValidationStatus, setFileValidationStatus] = useState<{ isValid: boolean; message: string; sizeMb: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateFile = (file: File | null) => {
    if (!file) {
      setFileValidationStatus(null);
      return false;
    }

    const sizeMb = +(file.size / (1024 * 1024)).toFixed(2);
    const maxMb = 25;
    const allowedExtensions = ['.pdf', '.brd', '.cad', '.bin', '.hex', '.json', '.schematic', '.dwg', '.png', '.jpg', '.jpeg', '.zip', '.tar', '.gz'];
    const fileNameLower = file.name.toLowerCase();
    const hasAllowedExt = allowedExtensions.some(ext => fileNameLower.endsWith(ext));

    if (sizeMb > maxMb) {
      setFileValidationStatus({
        isValid: false,
        message: `File exceeds limit of ${maxMb}MB (selected: ${sizeMb}MB). Please select a compressed file.`,
        sizeMb
      });
      return false;
    }

    if (!hasAllowedExt) {
      setFileValidationStatus({
        isValid: false,
        message: `Unrecognized extension. Allowed types include .pdf, .brd, .cad, .bin, .hex, .png, .zip`,
        sizeMb
      });
      return false;
    }

    setFileValidationStatus({
      isValid: true,
      message: `Verified: ${sizeMb} MB • Ready for cloud upload`,
      sizeMb
    });
    return true;
  };

  const handleSelectFile = (file: File | null) => {
    setSelectedFile(file);
    validateFile(file);
  };

  const fetchFiles = async () => {
    const uid = currentUid();
    if (!uid) {
      setIsLoading(false);
      setFiles([]);
      return;
    }
    setIsLoading(true);
    try {
      const q = query(collection(db, 'user_files'), where('userId', '==', uid));
      const snapshot = await getDocs(q);
      const records: UserFileRecord[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        records.push({
          id: docSnap.id,
          userId: data.userId,
          fileName: data.fileName,
          fileSizeKb: data.fileSizeKb || 0,
          fileType: data.fileType || 'Document',
          downloadUrl: data.downloadUrl,
          storagePath: data.storagePath,
          uploadedAt: data.uploadedAt || new Date().toLocaleString()
        });
      });
      setFiles(records);
    } catch (error) {
      setErrorMsg(describeCloudError(error, 'load your files'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentUser]);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const uid = currentUid();
    if (!uid) {
      setErrorMsg('Please sign in with an account to upload files.');
      return;
    }
    setIsUploading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const fileId = `file_${Date.now()}`;
    const safeName = selectedFile.name.replace(/[^\w.\-]+/g, '_').slice(0, 120);
    const storagePath = `users/${uid}/files/${fileId}_${safeName}`;
    const fileRef = ref(storage, storagePath);

    try {
      // Upload file to Firebase Storage
      const snapshot = await uploadBytes(fileRef, selectedFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      const record: UserFileRecord = {
        id: fileId,
        userId: uid,
        fileName: selectedFile.name,
        fileSizeKb: Math.round(selectedFile.size / 1024),
        fileType: selectedFile.type || 'application/octet-stream',
        downloadUrl,
        storagePath,
        uploadedAt: new Date().toLocaleString()
      };

      // Save metadata in Firestore
      await setDoc(doc(db, 'user_files', fileId), {
        ...record,
        createdAt: serverTimestamp()
      });

      setSuccessMsg(`Uploaded "${selectedFile.name}".`);
      setSelectedFile(null);
      await fetchFiles();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      setErrorMsg(describeCloudError(error, 'upload this file', storagePath));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (file: UserFileRecord) => {
    if (!confirm(`Are you sure you want to delete "${file.fileName}"?`)) return;

    try {
      // Delete from Firebase Storage
      const fileRef = ref(storage, file.storagePath);
      await deleteObject(fileRef).catch(err => {
        // A missing object is fine (already gone); anything else should stop us deleting the record.
        if ((err as { code?: string })?.code !== 'storage/object-not-found') throw err;
      });

      // Delete from Firestore
      await deleteDoc(doc(db, 'user_files', file.id));

      setFiles(prev => prev.filter(f => f.id !== file.id));
      setSuccessMsg(`Deleted "${file.fileName}" successfully.`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setErrorMsg(describeCloudError(error, 'delete this file', `user_files/${file.id}`));
    }
  };

  return (
    <div className="ds-page space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cobalt-600 text-white flex items-center justify-center font-bold shadow-lg">
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Cloud File Storage</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">Securely upload, view, download, and delete your personal repair schematics, boardviews, and documents</p>
          </div>
        </div>
        <button 
          onClick={fetchFiles}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Files</span>
        </button>
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

      {/* Upload Box with Validation UI */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Upload New Engineering Asset</h3>
          </div>
          <span className="text-[11px] font-bold text-stone-400">
            Storage Engine: Firebase Cloud Storage (25MB Max)
          </span>
        </div>

        <form onSubmit={handleFileUpload} className="space-y-4">
          <div 
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0] || null;
              handleSelectFile(file);
            }}
            className={`border-2 border-dashed rounded-2xl p-7 text-center space-y-3 transition-all ${
              isDragging
                ? 'border-amber-400 bg-amber-400/5 ring-4 ring-amber-400/10'
                : fileValidationStatus
                  ? fileValidationStatus.isValid
                    ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-stone-300 dark:border-stone-700 hover:border-cobalt-400 bg-stone-50 dark:bg-stone-950/40'
            }`}
          >
            <input 
              type="file" 
              id="fileInput"
              onChange={e => handleSelectFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                fileValidationStatus
                  ? fileValidationStatus.isValid
                    ? 'bg-emerald-500/15 text-emerald-500'
                    : 'bg-rose-500/15 text-rose-500'
                  : 'bg-amber-400/10 text-amber-500'
              }`}>
                {fileValidationStatus ? (
                  fileValidationStatus.isValid ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <AlertCircle className="w-6 h-6" />
                  )
                ) : (
                  <File className="w-6 h-6" />
                )}
              </div>

              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  {selectedFile ? selectedFile.name : 'Click to select a file or drag & drop here'}
                </span>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  PDF, Boardview (.brd/.cad), Firmware (.bin/.hex), Schematics, Archives
                </p>
              </div>
            </label>
          </div>

          {/* Validation Feedback Banner */}
          {fileValidationStatus && (
            <div className={`p-3 rounded-2xl text-xs font-medium border flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-150 ${
              fileValidationStatus.isValid
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <div className="flex items-center gap-2">
                {fileValidationStatus.isValid ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{fileValidationStatus.message}</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelectFile(null)}
                className="text-[11px] font-bold underline hover:opacity-80 cursor-pointer ml-2"
              >
                Clear
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-xs text-stone-500 dark:text-stone-400">
              {fileValidationStatus?.isValid ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> File passed integrity & size check
                </span>
              ) : selectedFile ? (
                <span className="text-rose-500 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Please choose a valid file format under 25MB
                </span>
              ) : (
                <span>No file chosen yet</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isUploading || !selectedFile || !fileValidationStatus?.isValid}
              className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                fileValidationStatus?.isValid
                  ? 'bg-cobalt-600 hover:bg-cobalt-500 text-white active:scale-95'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed opacity-60'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading to Cloud Storage...' : 'Upload File'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Files List */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Folder className="w-4 h-4 text-amber-500" />
          <span>Your Stored Files ({files.length})</span>
        </h3>

        {isLoading ? (
          <div className="py-12 text-center text-xs text-stone-400 flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
            <span>Loading your files from storage...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="py-12 text-center text-xs text-stone-400 space-y-2">
            <Folder className="w-8 h-8 mx-auto opacity-40" />
            <p>No files uploaded yet.</p>
            <p className="text-[11px] text-stone-500">Upload your first document or schematic using the form above.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
            {files.map(file => (
              <div key={file.id} className="py-4 flex items-center justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/40 px-3 rounded-xl transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{file.fileName}</h4>
                    <p className="text-[10px] text-stone-400">
                      {(file.fileSizeKb / 1024).toFixed(2)} MB • Uploaded {file.uploadedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewUrl(file.downloadUrl)}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-400 hover:text-stone-950 transition-colors"
                    title="Preview File"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <a
                    href={file.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-400 hover:text-stone-950 transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteFile(file)}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">File Preview</h3>
              <button 
                onClick={() => setPreviewUrl(null)}
                className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200"
              >
                Close
              </button>
            </div>
            <div className="flex-1 p-6 overflow-auto flex items-center justify-center bg-stone-50 dark:bg-stone-950">
              {previewUrl.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                <img src={previewUrl} alt="Preview" className="max-h-[60vh] object-contain rounded-xl shadow-md" />
              ) : (
                <div className="text-center space-y-4">
                  <FileText className="w-16 h-16 mx-auto text-amber-500" />
                  <p className="text-xs text-stone-600 dark:text-stone-300">Direct preview is available for images. Click below to open or download this file.</p>
                  <a 
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cobalt-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Open in New Tab</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
