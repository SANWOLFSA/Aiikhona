// "Missing a device?" — request it (admins see the queue) or add a basic page yourself (pending review).
import { useState } from 'react';
import { PlusCircle, Send, CheckCircle2 } from 'lucide-react';
import { requestDevice, addUserDevice, friendlyHubError, isHttpsUrl } from '../../lib/repairHub';
import { card, input, btnPrimary, btnGhost, ErrorNote, SignInPrompt, useHubUser } from './ui';
import { RouteLink } from '../../hooks/usePathname';

export default function RequestDevice({ initialName = '', onOpenAuth, compact = false }: { initialName?: string; onOpenAuth?: () => void; compact?: boolean }) {
  const { owner } = useHubUser();
  const [mode, setMode] = useState<'request' | 'add'>('request');
  const [open, setOpen] = useState(!compact);
  const [name, setName] = useState(initialName);
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [notes, setNotes] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [done, setDone] = useState<null | { kind: 'request' } | { kind: 'add'; slug: string }>(null);

  if (!open) {
    return <button onClick={() => setOpen(true)} className={btnGhost}><PlusCircle className="w-3.5 h-3.5" /> Request or add a missing device</button>;
  }

  const submit = async () => {
    if (!owner) return;
    setBusy(true); setErr('');
    try {
      if (mode === 'request') {
        await requestDevice(name, deviceType, notes, owner);
        setDone({ kind: 'request' });
      } else {
        if (sourceUrl && !isHttpsUrl(sourceUrl)) throw new Error('The reference link must start with https://');
        const slug = await addUserDevice({ name, brand, model, deviceType, summary: notes, sourceUrl }, owner);
        setDone({ kind: 'add', slug });
      }
    } catch (e) {
      setErr(friendlyHubError(e, mode === 'request' ? 'send the request' : 'add the device'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`${card} p-5 space-y-3`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Missing a device?</h3>
        <div className="flex gap-1">
          <button onClick={() => { setMode('request'); setDone(null); }} className={mode === 'request' ? btnPrimary : btnGhost}>Request it</button>
          <button onClick={() => { setMode('add'); setDone(null); }} className={mode === 'add' ? btnPrimary : btnGhost}>Add it myself</button>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        {mode === 'request'
          ? 'Send a request to the DIY Electronics team. Open requests are listed publicly so others can see what is coming.'
          : 'Create a basic device page. It is reviewed by an admin before it becomes public; once live, anyone can add guides, answers and videos to it.'}
      </p>
      {done ? (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-4 py-3 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {done.kind === 'request' ? 'Thanks! Your request was sent.' : <span>Submitted for review. <RouteLink to={`/device/${done.slug}`} className="font-bold underline">Open your draft page</RouteLink></span>}
        </div>
      ) : !owner ? (
        <SignInPrompt action={mode === 'request' ? 'request a device' : 'add a device'} onOpenAuth={onOpenAuth} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Device name (e.g. Omron M3 blood pressure monitor)" className={`${input} sm:col-span-2`} maxLength={120} />
          <input value={deviceType} onChange={(e) => setDeviceType(e.target.value)} placeholder="Type (e.g. Blood pressure monitor)" className={input} maxLength={60} />
          {mode === 'add' && <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className={input} maxLength={60} />}
          {mode === 'add' && <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model / model number" className={input} maxLength={100} />}
          {mode === 'add' && <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="Reference link (manufacturer page), https://…" className={input} maxLength={1000} />}
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={mode === 'request' ? 'Anything that helps (model number, region, what fails)' : 'Short description'} className={`${input} sm:col-span-2 min-h-[70px]`} maxLength={mode === 'request' ? 1000 : 600} />
          {err && <div className="sm:col-span-2"><ErrorNote message={err} /></div>}
          <div className="sm:col-span-2 flex justify-end">
            <button onClick={submit} disabled={busy || name.trim().length < 2} className={btnPrimary}><Send className="w-3.5 h-3.5" /> {busy ? 'Sending…' : mode === 'request' ? 'Send request' : 'Submit for review'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
