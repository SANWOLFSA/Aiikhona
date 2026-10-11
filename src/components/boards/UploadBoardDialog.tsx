import React, { useState } from 'react';
import { Camera, FileUp, Loader2, Upload, X } from 'lucide-react';
import {
  BOARD_ID_RE,
  MAX_FILE_BYTES,
  MAX_PHOTO_BYTES,
  friendlyBoardError,
  normalizeBoardNumber,
  uploadBoardFile,
  uploadBoardPhoto,
  validateBoardFile,
  validatePhotoFile,
  type BoardSide,
  type CommunityFile,
} from '../../lib/boards';

const input = 'w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500';
const label = 'block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1';

export default function UploadBoardDialog({ initialNumber, uid, ownerName, defaultSide = 'top', onClose, onDone }: {
  initialNumber: string;
  uid: string;
  ownerName: string;
  defaultSide?: BoardSide;
  onClose: () => void;
  onDone: () => void;
}) {
  const [boardNumber, setBoardNumber] = useState(initialNumber);
  const [side, setSide] = useState<BoardSide>(defaultSide);
  const [photos, setPhotos] = useState<File[]>([]);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [fileKind, setFileKind] = useState<CommunityFile['fileKind']>('schematic');
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [device, setDevice] = useState('');
  const [caption, setCaption] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const n = normalizeBoardNumber(boardNumber);
  const idOk = BOARD_ID_RE.test(n);

  const pickPhotos = (list: FileList | null) => {
    const files = Array.from(list || []).slice(0, 6);
    const bad = files.map(validatePhotoFile).find(Boolean);
    setError(bad || null);
    setPhotos(bad ? [] : files);
  };
  const pickDoc = (list: FileList | null) => {
    const f = list?.[0] || null;
    const bad = f ? validateBoardFile(f) : null;
    setError(bad);
    setDocFile(bad ? null : f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idOk) return setError('Enter the board number exactly as printed (letters, numbers, dot, dash).');
    if (!photos.length && !docFile) return setError('Add at least one photo or a schematic / boardview file.');
    setBusy(true);
    setError(null);
    const meta = { displayNumber: boardNumber.trim(), title, device, brand, model, notes, manufacturer: brand };
    try {
      for (let i = 0; i < photos.length; i++) {
        await uploadBoardPhoto({
          n, uid, ownerName, file: photos[i], side, caption, meta,
          onProgress: (p) => setProgress(`Photo ${i + 1} of ${photos.length}: ${p}%`),
        });
      }
      if (docFile) {
        await uploadBoardFile({ n, uid, ownerName, file: docFile, fileKind, meta, onProgress: (p) => setProgress(`File: ${p}%`) });
      }
      onDone();
    } catch (err) {
      setError(friendlyBoardError(err));
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Upload a photo of this board">
      <form onSubmit={submit} className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2"><Camera className="w-5 h-5 text-indigo-500" /> Upload a real board photo</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your own photos only. Make sure the board number is readable.</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><X className="w-5 h-5" /></button>
        </div>

        <div>
          <label className={label} htmlFor="ub-number">Board number (as printed on the PCB)</label>
          <input id="ub-number" className={`${input} font-mono`} value={boardNumber} onChange={(e) => setBoardNumber(e.target.value)} maxLength={64} required />
          <p className="text-[11px] text-slate-500 mt-1">Saved as <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{n || '—'}</span></p>
        </div>

        <div>
          <span className={label}>Photos (JPG, PNG or WebP · up to {MAX_PHOTO_BYTES / 1048576} MB each · max 6)</span>
          <label className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 px-4 py-5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/50">
            <Upload className="w-4 h-4" />
            {photos.length ? `${photos.length} photo${photos.length > 1 ? 's' : ''} selected` : 'Choose or take photos'}
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(e) => pickPhotos(e.target.files)} />
          </label>
          <div className="flex gap-1 mt-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
            {(['top', 'bottom', 'other'] as BoardSide[]).map((s) => (
              <button type="button" key={s} onClick={() => setSide(s)} className={`px-3 py-1 rounded-lg text-xs font-bold capitalize ${side === s ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}>{s === 'other' ? 'Detail' : `${s} side`}</button>
            ))}
          </div>
          <input className={`${input} mt-2`} placeholder="Caption (optional), e.g. 'PMIC area after cleaning'" value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={300} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <label className={label} htmlFor="ub-title">Title</label>
            <input id="ub-title" className={input} placeholder="e.g. MacBook Air M1 logic board" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
          </div>
          <div>
            <label className={label} htmlFor="ub-brand">Brand</label>
            <input id="ub-brand" className={input} placeholder="Apple, Samsung…" value={brand} onChange={(e) => setBrand(e.target.value)} maxLength={60} />
          </div>
          <div>
            <label className={label} htmlFor="ub-model">Model</label>
            <input id="ub-model" className={input} placeholder="A2337, UE43…" value={model} onChange={(e) => setModel(e.target.value)} maxLength={80} />
          </div>
          <div className="col-span-2">
            <label className={label} htmlFor="ub-device">Device</label>
            <input id="ub-device" className={input} placeholder="e.g. MacBook Air 13in 2020" value={device} onChange={(e) => setDevice(e.target.value)} maxLength={120} />
          </div>
          <div className="col-span-2">
            <label className={label} htmlFor="ub-notes">Notes</label>
            <textarea id="ub-notes" className={`${input} min-h-[72px]`} placeholder="Revision, fault, what you measured…" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={2000} />
          </div>
        </div>

        <div>
          <span className={label}>Schematic / boardview file (optional · up to {MAX_FILE_BYTES / 1048576} MB)</span>
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="flex-1 flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 truncate">
              <FileUp className="w-4 h-4 shrink-0 text-emerald-500" />
              <span className="truncate">{docFile ? docFile.name : 'PDF, ZIP, .brd, .bdv, .cad…'}</span>
              <input type="file" className="sr-only" accept=".pdf,.zip,.brd,.bdv,.bv,.cad,.fz,.tvw,.asc,.bvr,.pcb,application/pdf,application/zip" onChange={(e) => pickDoc(e.target.files)} />
            </label>
            <select className={`${input} sm:w-36`} value={fileKind} onChange={(e) => setFileKind(e.target.value as CommunityFile['fileKind'])}>
              <option value="schematic">Schematic</option>
              <option value="boardview">Boardview</option>
              <option value="other">Other</option>
            </select>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Only share files you have the right to share.</p>
        </div>

        {error && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400" role="alert">{error}</p>}

        <div className="flex items-center justify-end gap-2 pt-1">
          {progress && <span className="text-xs text-slate-500 mr-auto">{progress}</span>}
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
          <button type="submit" disabled={busy} className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 disabled:opacity-60 flex items-center gap-2">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload
          </button>
        </div>
      </form>
    </div>
  );
}
