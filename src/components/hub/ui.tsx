// Small shared UI pieces for the repair hub pages (guides, Answers, device & component pages).
import React from 'react';
import { ExternalLink, Loader2, LogIn, AlertTriangle } from 'lucide-react';
import { useAuthUser } from '../../lib/admin';
import { ownerFrom, type Owner, type Source } from '../../lib/repairHub';
import { RouteLink } from '../../hooks/usePathname';

export const card = 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs';
export const input = 'w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';
export const btnPrimary = 'inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
export const btnMint = 'inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
export const btnGhost = 'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-50 transition-colors';
export const btnDanger = 'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 disabled:opacity-50 transition-colors';

export const DIFF_STYLE: Record<string, string> = {
  Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  Moderate: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  Advanced: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  Expert: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
};

/** Signed-in Firebase user plus the owner record used on new content. */
export function useHubUser(): { uid: string | null; owner: Owner | null } {
  const user = useAuthUser();
  return { uid: user?.uid || null, owner: user ? ownerFrom(user) : null };
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">{children}</div>;
}

export function Hero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl space-y-4">
      <div className="space-y-2 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 text-[11px] font-black uppercase tracking-wider">{eyebrow}</span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-indigo-100/80">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function SectionTitle({ icon, title, right }: { icon?: React.ReactNode; title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">{icon}{title}</h2>
      {right}
    </div>
  );
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className={`${card} p-8 text-center text-sm text-slate-500 flex items-center justify-center gap-2`}>
      <Loader2 className="w-4 h-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 px-4 py-3 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-start gap-2">
      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> <span>{message}</span>
    </div>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 px-4 py-3 text-xs text-amber-800 dark:text-amber-200">{children}</div>;
}

export function SignInPrompt({ action, onOpenAuth }: { action: string; onOpenAuth?: () => void }) {
  return (
    <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-3 text-xs text-indigo-800 dark:text-indigo-200 flex items-center justify-between gap-3">
      <span>Sign in with your account to {action}.</span>
      {onOpenAuth && <button onClick={onOpenAuth} className={btnPrimary}><LogIn className="w-3.5 h-3.5" /> Sign in</button>}
    </div>
  );
}

export function Sources({ sources, disclaimer }: { sources: Source[]; disclaimer?: string }) {
  if (!sources.length) return disclaimer ? <p className="text-[11px] text-slate-500">{disclaimer}</p> : null;
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Sources</div>
      <ol className="space-y-1 list-decimal list-inside text-xs">
        {sources.map((s) => (
          <li key={s.url} className="truncate">
            <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 dark:text-indigo-400 hover:underline">{s.title}</a>
          </li>
        ))}
      </ol>
      {disclaimer && <p className="text-[11px] text-slate-500">{disclaimer}</p>}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
      {items.map((t, i) => <li key={i} className="flex gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />{t}</li>)}
    </ul>
  );
}

export function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 transition-colors">
      {children} <ExternalLink className="w-3 h-3" />
    </a>
  );
}

export function Chip({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${className || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>{children}</span>;
}

export function TabLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <RouteLink to={to} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
      {children}
    </RouteLink>
  );
}
