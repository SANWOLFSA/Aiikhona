// Universal device page: /device/:slug[?q=original query]
// Any device on Earth resolves: saved pages load from Firestore (discoveredDevices); unknown ones are
// researched once by the server (Gemini + Google Search, cited) and saved so the page becomes permanent.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Globe2, Gauge, ListChecks, AlertTriangle, Wrench, Package, Search, Cpu, Layers, Share2, Check, Info, Clock } from 'lucide-react';
import { usePathname, navigate, RouteLink } from '../../hooks/usePathname';
import { CATALOG } from '../../data/catalog';
import {
  getDiscoveredDevice, researchDevice, saveDiscoveredDevice, deviceInfoFromDoc, deviceSlug, universalDeviceKey, friendlyHubError,
  normalizePartNumber, type DeviceInfo, type DiscoveredDevice,
} from '../../lib/repairHub';
import { PageShell, card, Loading, ErrorNote, Notice, Sources, BulletList, Chip, btnGhost, btnPrimary, SignInPrompt, useHubUser } from './ui';
import DeviceCommunityPanel from './DeviceCommunityPanel';
import RequestDevice from './RequestDevice';
import CommunityVideosSection from '../catalog/CommunityVideos';

function scoreColor(s: number) {
  return s >= 7 ? 'bg-emerald-500' : s >= 4 ? 'bg-amber-500' : 'bg-rose-500';
}

export default function DevicePage({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { pathname, search } = usePathname();
  const slug = decodeURIComponent(pathname.split('/')[2] || '').toLowerCase();
  const q = (search.get('q') || slug.replace(/-/g, ' ')).trim();
  const { owner } = useHubUser();

  const [saved, setSaved] = useState<DiscoveredDevice | null | undefined>(undefined);
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const researched = useRef('');

  useEffect(() => {
    let alive = true;
    setLoading(true); setError(''); setInfo(null); setSaved(undefined); setSaveState('idle');
    (async () => {
      const d = slug ? await getDiscoveredDevice(slug) : null;
      if (!alive) return;
      setSaved(d);
      if (d) {
        setInfo(deviceInfoFromDoc(d));
        setLoading(false);
        document.title = `${d.name} repair · DIY Electronics`;
        return;
      }
      if (!q || researched.current === q) { setLoading(false); return; }
      researched.current = q;
      try {
        const r = await researchDevice(q);
        if (!alive) return;
        setInfo(r);
        document.title = `${r.found ? r.name : q} · DIY Electronics`;
      } catch (e) {
        if (alive) setError(friendlyHubError(e, 'research this device'));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slug, q]);

  // Auto-save a researched page for signed-in users so it becomes permanent and shareable.
  useEffect(() => {
    if (!info?.found || saved || !owner || saveState !== 'idle') return;
    setSaveState('saving');
    saveDiscoveredDevice(info, owner)
      .then((s) => {
        setSaveState('saved');
        if (s !== slug) navigate(`/device/${s}`, { replace: true });
      })
      .catch(() => setSaveState('error'));
  }, [info, saved, owner, saveState, slug]);

  const catalogType = useMemo(() => {
    const t = (info?.deviceType || '').toLowerCase();
    if (!t) return undefined;
    const words = t.split(/[^a-z]+/).filter((w) => w.length > 3);
    return CATALOG.find((c) => c.name.toLowerCase().includes(t)) || CATALOG.find((c) => words.some((w) => c.name.toLowerCase().includes(w)));
  }, [info?.deviceType]);

  if (!slug) return <PageShell><RouteLink to="/search" className={btnPrimary}><Search className="w-3.5 h-3.5" /> Search for a device</RouteLink></PageShell>;
  if (loading) return <PageShell><Loading label={`Researching “${q}” across the web…`} /></PageShell>;

  const finalSlug = info?.found ? (saved?.slug || deviceSlug(info.name)) : slug;
  const device = { key: universalDeviceKey(finalSlug), label: info?.found ? info.name : q, path: `/device/${finalSlug}` };

  if (error || !info || !info.found) {
    return (
      <PageShell>
        <div className={`${card} p-6 space-y-3`}>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-600"><Info className="w-4 h-4" /> Not identified yet</div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">“{q}”</h1>
          {error && <ErrorNote message={error} />}
          {info?.aiError && <ErrorNote message={info.aiError} />}
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {info && !info.aiError ? 'Our web research could not clearly identify this exact product from reliable sources, so we are not showing guessed facts. ' : ''}
            Check the spelling or the model number on the rating label, try a part-number lookup, or request the device so the team can add it.
          </p>
          <div className="flex flex-wrap gap-2">
            <RouteLink to={`/search?q=${encodeURIComponent(q)}`} className={btnGhost}><Search className="w-3.5 h-3.5" /> Search everything</RouteLink>
            <RouteLink to={`/components/${encodeURIComponent(normalizePartNumber(q))}`} className={btnGhost}><Cpu className="w-3.5 h-3.5" /> Look up as a part number</RouteLink>
            <RouteLink to="/devices" className={btnGhost}><Layers className="w-3.5 h-3.5" /> Browse all devices</RouteLink>
          </div>
        </div>
        <RequestDevice initialName={q} onOpenAuth={onOpenAuth} />
        {info?.image && (
          <p className="text-[11px] text-slate-500">A Wikipedia page that may match: <a className="text-indigo-600 hover:underline" href={info.image.pageUrl} target="_blank" rel="noopener noreferrer">{info.image.title}</a></p>
        )}
      </PageShell>
    );
  }

  const pending = saved && saved.status === 'pending';

  return (
    <PageShell>
      {pending && <Notice>This page was added by a community member and is waiting for admin review. Only you and admins can see it until it is approved.</Notice>}
      <div className={`${card} p-5 sm:p-6 grid md:grid-cols-[220px,1fr] gap-6`}>
        <div className="space-y-2">
          {info.image ? (
            <figure className="space-y-1">
              <img src={info.image.url} alt={info.name} className="w-full aspect-square object-contain rounded-xl bg-slate-50 dark:bg-slate-800" />
              <figcaption className="text-[10px] text-slate-500">Image: <a href={info.image.pageUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Wikipedia · {info.image.title}</a></figcaption>
            </figure>
          ) : (
            <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center"><Globe2 className="w-16 h-16 text-white/80" /></div>
          )}
        </div>
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap gap-1.5">
            <Chip className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{saved?.origin === 'user' ? 'Community-added device' : 'Universal device page'}</Chip>
            {info.deviceType && <Chip>{info.deviceType}</Chip>}
            {info.releaseYear && <Chip><Clock className="w-3 h-3" />{info.releaseYear}</Chip>}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 leading-tight">{info.name} repair</h1>
          {info.summary && <p className="text-sm text-slate-600 dark:text-slate-300">{info.summary}</p>}
          {info.modelNumbers.length > 0 && <div className="flex flex-wrap gap-1">{info.modelNumbers.map((m) => <Chip key={m}>{m}</Chip>)}</div>}
          <div className="flex flex-wrap items-center gap-2">
            {info.repairability.score !== null ? (
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2">
                <div className={`w-10 h-10 rounded-lg ${scoreColor(info.repairability.score)} text-white font-bold flex items-center justify-center`}>{info.repairability.score}</div>
                <div className="text-[11px] leading-tight"><div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1"><Gauge className="w-3 h-3" /> Repairability /10</div><div className="text-slate-500">Published by {info.repairability.source}</div></div>
              </div>
            ) : (
              <Chip><Gauge className="w-3 h-3" /> No published repairability score found</Chip>
            )}
            <button onClick={() => { navigator.clipboard?.writeText(window.location.origin + device.path).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => undefined); }} className={btnGhost}>
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />} {copied ? 'Copied' : 'Share page'}
            </button>
            {catalogType && <RouteLink to={`/devices/${catalogType.slug}`} className={btnGhost}><Layers className="w-3.5 h-3.5" /> Fault-finding for {catalogType.name}</RouteLink>}
            <RouteLink to={`/diagnostic`} className={btnPrimary}>AI diagnosis</RouteLink>
          </div>
          {!saved && (
            saveState === 'saving' ? <p className="text-[11px] text-slate-500">Saving this page permanently…</p>
              : saveState === 'saved' ? <p className="text-[11px] text-emerald-600 font-bold">Saved: this device now has a permanent page.</p>
              : saveState === 'error' ? <p className="text-[11px] text-rose-600">Could not save this page right now; it is still shown from live research.</p>
              : !owner ? <SignInPrompt action="save this researched page permanently so others can add guides to it" onOpenAuth={onOpenAuth} /> : null
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {info.specs.length > 0 && (
          <section className={`${card} p-5 space-y-3`}>
            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100"><ListChecks className="w-4 h-4 text-indigo-500" /> Specifications</h2>
            <dl className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {info.specs.map((s, i) => <div key={i} className="py-1.5 grid grid-cols-3 gap-2"><dt className="text-slate-500 text-xs font-bold">{s.label}</dt><dd className="col-span-2 text-slate-800 dark:text-slate-200">{s.value}</dd></div>)}
            </dl>
          </section>
        )}
        {info.commonFaults.length > 0 && (
          <section className={`${card} p-5 space-y-3`}>
            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100"><AlertTriangle className="w-4 h-4 text-amber-500" /> Common faults reported</h2>
            <BulletList items={info.commonFaults} />
          </section>
        )}
        {info.identification.length > 0 && (
          <section className={`${card} p-5 space-y-3`}>
            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100"><Info className="w-4 h-4 text-indigo-500" /> Identification</h2>
            <BulletList items={info.identification} />
          </section>
        )}
        {(info.teardownNotes.length > 0 || info.repairability.notes.length > 0) && (
          <section className={`${card} p-5 space-y-3`}>
            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100"><Wrench className="w-4 h-4 text-emerald-500" /> Teardown & repairability notes</h2>
            <BulletList items={[...info.teardownNotes, ...info.repairability.notes]} />
          </section>
        )}
        {info.keyParts.length > 0 && (
          <section className={`${card} p-5 space-y-3`}>
            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100"><Package className="w-4 h-4 text-emerald-500" /> Replaceable parts</h2>
            <div className="flex flex-wrap gap-1.5">{info.keyParts.map((p) => <Chip key={p}>{p}</Chip>)}</div>
          </section>
        )}
        <section className={`${card} p-5`}><Sources sources={info.sources} disclaimer={info.disclaimer || 'Summarised by AI from the cited web sources. Check your unit\'s rating label and the manufacturer documentation before repairing.'} /></section>
      </div>

      {!pending && <DeviceCommunityPanel device={device} keyParts={info.keyParts} />}
      {!pending && (
        <CommunityVideosSection
          target={{ deviceType: 'universal', brand: deviceSlug(info.brand || 'any'), model: finalSlug, deviceLabel: info.name, pagePath: device.path }}
          solutions={[]}
          onOpenAuth={onOpenAuth}
        />
      )}
    </PageShell>
  );
}
