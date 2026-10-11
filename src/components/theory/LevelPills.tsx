import { levelLabel } from '../../data/theory/meta';
import type { TheoryLevel } from '../../data/theory/types';

const LEVEL_PILL: Record<TheoryLevel, string> = {
  school: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/30',
  college: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/30',
  university: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-400/10 dark:text-violet-300 dark:border-violet-400/30',
};

export function LevelPills({ levels }: { levels: TheoryLevel[] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {levels.map(l => (
        <span key={l} className={`px-1.5 py-0.5 rounded-md border text-[10px] font-bold ${LEVEL_PILL[l]}`}>{levelLabel(l)}</span>
      ))}
    </span>
  );
}

