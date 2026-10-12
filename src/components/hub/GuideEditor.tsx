// Create / edit a step-by-step guide or teardown: /guides/new[?device=..&kind=teardown], /guides/edit/:id
// Drafts are private to the author; publishing makes the guide public. Images are https links
// (no Cloud Storage bucket on this project), so the upload button explains that instead of failing.
import { useEffect, useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Send, Image as ImageIcon, AlertTriangle, ArrowLeft } from 'lucide-react';
import { usePathname, navigate, RouteLink } from '../../hooks/usePathname';
import {
  createGuide, updateGuide, getGuide, deviceRefFromSearch, validateGuide, friendlyHubError, isHttpsUrl,
  DIFFICULTIES, GUIDE_KINDS, KIND_LABELS, LIMITS, IMAGE_UPLOAD_UNAVAILABLE,
  type GuideInput, type GuideStep, type DeviceRef, type GuideKind, type GuideDifficulty,
} from '../../lib/repairHub';
import { PageShell, card, input, btnPrimary, btnMint, btnGhost, btnDanger, ErrorNote, Notice, SignInPrompt, Loading, useHubUser } from './ui';
import DevicePicker from './DevicePicker';

const emptyStep = (): GuideStep => ({ title: '', text: '', imageUrls: [''], caution: '' });

function ListEditor({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [draft, setDraft] = useState('');
  const add = () => { const v = draft.trim(); if (v && items.length < LIMITS.listItems) { onChange([...items, v.slice(0, LIMITS.itemLen)]); setDraft(''); } };
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
            {t}<button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-0.5 rounded hover:text-rose-600" aria-label={`Remove ${t}`}>×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} placeholder={placeholder} className={input} maxLength={LIMITS.itemLen} />
        <button type="button" onClick={add} className={btnGhost}><Plus className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}

export default function GuideEditor({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { pathname, search } = usePathname();
  const editId = pathname.startsWith('/guides/edit/') ? decodeURIComponent(pathname.split('/')[3] || '') : '';
  const { uid, owner } = useHubUser();

  const [loading, setLoading] = useState(!!editId);
  const [loadErr, setLoadErr] = useState('');
  const [device, setDevice] = useState<DeviceRef | null>(() => deviceRefFromSearch(search));
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [kind, setKind] = useState<GuideKind>(() => (GUIDE_KINDS as readonly string[]).includes(search.get('kind') || '') ? (search.get('kind') as GuideKind) : 'repair');
  const [difficulty, setDifficulty] = useState<GuideDifficulty>('Moderate');
  const [minutes, setMinutes] = useState(30);
  const [tools, setTools] = useState<string[]>([]);
  const [parts, setParts] = useState<string[]>([]);
  const [coverUrl, setCoverUrl] = useState('');
  const [steps, setSteps] = useState<GuideStep[]>([emptyStep()]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!editId) return;
    let alive = true;
    getGuide(editId).then((g) => {
      if (!alive) return;
      if (!g) { setLoadErr('This guide does not exist or you cannot edit it.'); return; }
      if (uid && g.ownerUid !== uid) { setLoadErr('Only the author can edit this guide.'); return; }
      setDevice({ key: g.deviceKey, label: g.deviceLabel, path: g.devicePath });
      setTitle(g.title); setSummary(g.summary); setKind(g.kind); setDifficulty(g.difficulty); setMinutes(g.minutes);
      setTools(g.tools || []); setParts(g.parts || []); setCoverUrl(g.coverUrl || '');
      setSteps(g.steps?.length ? g.steps.map((s) => ({ ...s, imageUrls: s.imageUrls?.length ? s.imageUrls : [''] })) : [emptyStep()]);
      setStatus(g.status === 'published' ? 'published' : 'draft');
    }).catch((e) => alive && setLoadErr(friendlyHubError(e, 'open this guide'))).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [editId, uid]);

  useEffect(() => { document.title = `${editId ? 'Edit' : 'New'} guide · DIY Electronics`; }, [editId]);

  if (!owner) return <PageShell><SignInPrompt action="write repair guides and teardowns" onOpenAuth={onOpenAuth} /></PageShell>;
  if (loading) return <PageShell><Loading label="Opening guide…" /></PageShell>;
  if (loadErr) return <PageShell><ErrorNote message={loadErr} /></PageShell>;

  const setStep = (i: number, patch: Partial<GuideStep>) => setSteps((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const move = (i: number, d: -1 | 1) => setSteps((s) => { const n = [...s]; const j = i + d; if (j < 0 || j >= n.length) return s; [n[i], n[j]] = [n[j], n[i]]; return n; });

  const save = async (publish: boolean) => {
    if (!device) { setErr('Choose the device this guide is for.'); return; }
    const g: GuideInput = { title, summary, kind, device, difficulty, minutes, tools, parts, steps, coverUrl };
    const v = validateGuide(g, publish);
    if (v) { setErr(v); return; }
    setBusy(true); setErr('');
    try {
      if (editId) {
        await updateGuide(editId, g, publish);
        navigate(`/guides/view/${editId}`);
      } else {
        const id = await createGuide(g, owner, publish);
        navigate(`/guides/view/${id}`);
      }
    } catch (e) {
      setErr(friendlyHubError(e, publish ? 'publish the guide' : 'save the draft'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <RouteLink to="/guides" className="text-xs font-bold text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Guides</RouteLink>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{editId ? 'Edit guide' : kind === 'teardown' ? 'Create a teardown' : 'Create a repair guide'}</h1>
          <p className="text-xs text-slate-500">{status === 'published' ? 'Published guide: changes go live when you publish again.' : 'Drafts are only visible to you until you publish.'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => save(false)} disabled={busy} className={btnGhost}><Save className="w-3.5 h-3.5" /> Save draft</button>
          <button onClick={() => save(true)} disabled={busy} className={btnMint}><Send className="w-3.5 h-3.5" /> Publish</button>
        </div>
      </div>
      {err && <ErrorNote message={err} />}
      {note && <Notice>{note}</Notice>}

      <div className={`${card} p-5 space-y-4`}>
        <DevicePicker value={device} onChange={setDevice} />
        <div className="grid md:grid-cols-2 gap-3">
          <label className="space-y-1 md:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={LIMITS.title} placeholder={kind === 'teardown' ? 'e.g. Hisense 55A6 teardown' : 'e.g. Samsung UA55 backlight LED strip replacement'} className={input} />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Guide type</span>
            <select value={kind} onChange={(e) => setKind(e.target.value as GuideKind)} className={input}>
              {GUIDE_KINDS.map((k) => <option key={k} value={k}>{KIND_LABELS[k]}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Difficulty</span>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as GuideDifficulty)} className={input}>
                {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Time (minutes)</span>
              <input type="number" min={1} max={10000} value={minutes} onChange={(e) => setMinutes(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))} className={input} />
            </label>
          </div>
          <label className="space-y-1 md:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Introduction</span>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} maxLength={LIMITS.summary} placeholder="What this guide fixes, symptoms, and anything to know before starting (safety, discharging capacitors, battery level…)" className={`${input} min-h-[90px]`} />
          </label>
          <label className="space-y-1 md:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cover image link (optional)</span>
            <div className="flex gap-2">
              <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://…" className={input} maxLength={1000} />
              <label className={`${btnGhost} cursor-pointer shrink-0`}><ImageIcon className="w-3.5 h-3.5" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { e.target.value = ''; setNote(IMAGE_UPLOAD_UNAVAILABLE); }} />
              </label>
            </div>
            {coverUrl && isHttpsUrl(coverUrl) && <img src={coverUrl} alt="Cover preview" className="mt-2 h-28 rounded-lg object-cover" />}
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <ListEditor label="Tools" items={tools} onChange={setTools} placeholder="e.g. Phillips #00, spudger, multimeter" />
          <ListEditor label="Parts (fix kit)" items={parts} onChange={setParts} placeholder="e.g. 3227 mAh battery, adhesive strips" />
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className={`${card} p-5 space-y-3`}>
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Step {i + 1}</div>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={btnGhost} aria-label="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === steps.length - 1} className={btnGhost} aria-label="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => setSteps((x) => (x.length > 1 ? x.filter((_, j) => j !== i) : [emptyStep()]))} className={btnDanger} aria-label="Delete step"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <input value={s.title} onChange={(e) => setStep(i, { title: e.target.value })} maxLength={LIMITS.stepTitle} placeholder="Step title (e.g. Remove the back cover)" className={input} />
            <textarea value={s.text} onChange={(e) => setStep(i, { text: e.target.value })} maxLength={LIMITS.stepText} placeholder="Instructions. One action per line works best." className={`${input} min-h-[90px]`} />
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-2.5 shrink-0" />
              <input value={s.caution} onChange={(e) => setStep(i, { caution: e.target.value })} maxLength={500} placeholder="Caution / warning for this step (optional)" className={input} />
            </div>
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Step images (https links, up to {LIMITS.stepImages})</div>
              {s.imageUrls.map((u, k) => (
                <div key={k} className="flex gap-2 items-center">
                  <input value={u} onChange={(e) => setStep(i, { imageUrls: s.imageUrls.map((x, j) => (j === k ? e.target.value : x)) })} placeholder="https://…" className={input} maxLength={1000} />
                  {u && isHttpsUrl(u) && <img src={u} alt="" className="w-10 h-10 rounded object-cover bg-slate-100 shrink-0" />}
                  <button type="button" onClick={() => setStep(i, { imageUrls: s.imageUrls.length > 1 ? s.imageUrls.filter((_, j) => j !== k) : [''] })} className={btnGhost} aria-label="Remove image">×</button>
                </div>
              ))}
              <div className="flex gap-2">
                {s.imageUrls.length < LIMITS.stepImages && <button type="button" onClick={() => setStep(i, { imageUrls: [...s.imageUrls, ''] })} className={btnGhost}><Plus className="w-3.5 h-3.5" /> Image link</button>}
                <label className={`${btnGhost} cursor-pointer`}><ImageIcon className="w-3.5 h-3.5" /> Upload photo
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { e.target.value = ''; setNote(IMAGE_UPLOAD_UNAVAILABLE); }} />
                </label>
              </div>
            </div>
          </div>
        ))}
        {steps.length < LIMITS.steps && (
          <button type="button" onClick={() => setSteps((s) => [...s, emptyStep()])} className={`${btnPrimary} w-full py-3`}><Plus className="w-4 h-4" /> Add step {steps.length + 1}</button>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => save(false)} disabled={busy} className={btnGhost}><Save className="w-3.5 h-3.5" /> Save draft</button>
        <button onClick={() => save(true)} disabled={busy} className={btnMint}><Send className="w-3.5 h-3.5" /> {busy ? 'Saving…' : 'Publish guide'}</button>
      </div>
    </PageShell>
  );
}
