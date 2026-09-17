import { useState, useEffect } from 'react';
import { Folder, Upload, FileText, Download, Trash2, Eye, ShieldAlert, CheckCircle2, RefreshCw, File } from 'lucide-react';
import { db, auth, storage, handleFirestoreError, OperationType } from '../lib/firebase';
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
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchFiles = async () => {
    const uid = currentUser?.id || auth.currentUser?.uid;
    if (!uid) {
      setIsLoading(false);
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
      console.error("Error fetching user files:", error);
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

    const uid = currentUser?.id || auth.currentUser?.uid || 'guest';
    setIsUploading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const fileId = `file_${Date.now()}`;
    const storagePath = `users/${uid}/files/${fileId}_${selectedFile.name}`;
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

      setSuccessMsg(`Successfully uploaded "${selectedFile.name}" to Cloud Storage!`);
      setSelectedFile(null);
      await fetchFiles();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `user_files/${fileId}`);
      setErrorMsg('Failed to upload file. Please check storage rules and connection.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (file: UserFileRecord) => {
    if (!confirm(`Are you sure you want to delete "${file.fileName}"?`)) return;

    try {
      // Delete from Firebase Storage
      const fileRef = ref(storage, file.storagePath);
      await deleteObject(fileRef).catch(err => console.warn("Storage deletion warning:", err));

      // Delete from Firestore
      await deleteDoc(doc(db, 'user_files', file.id));

      setFiles(prev => prev.filter(f => f.id !== file.id));
      setSuccessMsg(`Deleted "${file.fileName}" successfully.`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `user_files/${file.id}`);
      setErrorMsg('Failed to delete file.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-lg">
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100">Cloud File Storage</h1>
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

      {/* Upload Box */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">Upload New File</h3>
        </div>

        <form onSubmit={handleFileUpload} className="space-y-4">
          <div className="border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl p-8 text-center space-y-3 hover:border-amber-400 transition-colors bg-stone-50 dark:bg-stone-950/40">
            <input 
              type="file" 
              id="fileInput"
              onChange={e => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 text-amber-500 flex items-center justify-center">
                <File className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                {selectedFile ? selectedFile.name : 'Click to select a file or drag & drop here'}
              </span>
              <span className="text-[11px] text-stone-400">Supports PDFs, images, schematics, boardviews, archives (Max 25MB)</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-black px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading to Cloud Storage...' : 'Upload File'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Files List */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
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
                    className="inline-flex items-center gap-2 bg-amber-400 text-stone-950 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
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
