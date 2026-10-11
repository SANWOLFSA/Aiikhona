import type { JackId, ModeId } from '../../data/meter/types';
import { DIAL_ORDER, JACKS, MODE_BY_ID } from '../../data/meter/modes';

export interface MeterFaceProps {
  mode: ModeId;
  red: JackId;
  black: JackId;
  digits: string;
  unit: string;
  beep?: boolean;
  flags?: string[];
  danger?: boolean;
  onMode: (m: ModeId) => void;
  onJack: (j: JackId) => void;
  /** Which probe the next jack click moves. */
  placing: 'red' | 'black';
  className?: string;
}

const CX = 150, CY = 262, R_KNOB = 52, R_LABEL = 92;
const JACK_X: Record<JackId, number> = { a10: 48, ma: 116, com: 184, vohm: 252 };
const JACK_Y = 418;

function angleFor(i: number) { return -90 + (360 / DIAL_ORDER.length) * i; }
const rad = (d: number) => (d * Math.PI) / 180;

export default function MeterFace({ mode, red, black, digits, unit, beep, flags = [], danger, onMode, onJack, placing, className = '' }: MeterFaceProps) {
  const idx = Math.max(0, DIAL_ORDER.indexOf(mode));
  const a = angleFor(idx);
  const want = MODE_BY_ID[mode];
  const correctRed: JackId = want.redJack;
  const redWrong = mode !== 'off' && red !== correctRed && !(want.connection === 'socket');
  const blackWrong = black !== 'com';
  const isOn = mode !== 'off';

  return (
    <svg viewBox="0 0 300 500" className={`w-full max-w-[340px] select-none ${className}`} role="group" aria-label="Interactive digital multimeter">
      <defs>
        <linearGradient id="mm-body" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#facc15" /><stop offset="1" stopColor="#eab308" /></linearGradient>
        <linearGradient id="mm-face" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1e293b" /><stop offset="1" stopColor="#0f172a" /></linearGradient>
        <linearGradient id="mm-lcd" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={danger ? '#fecaca' : '#d9f99d'} /><stop offset="1" stopColor={danger ? '#fca5a5' : '#bef264'} /></linearGradient>
        <radialGradient id="mm-knob" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#475569" /><stop offset="1" stopColor="#0f172a" /></radialGradient>
      </defs>
      {/* Holster + body */}
      <rect x="4" y="4" width="292" height="460" rx="34" fill="url(#mm-body)" />
      <rect x="18" y="18" width="264" height="432" rx="24" fill="url(#mm-face)" />
      {/* LCD */}
      <rect x="36" y="34" width="228" height="96" rx="10" fill="#0b1220" />
      <rect x="42" y="40" width="216" height="84" rx="6" fill="url(#mm-lcd)" opacity={isOn ? 1 : 0.35} />
      {isOn && (
        <g fill="#1a2e05" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <text x="244" y="102" textAnchor="end" fontSize={digits.length <= 6 ? 42 : digits.length <= 9 ? 30 : digits.length <= 14 ? 19 : 12} fontWeight={700} letterSpacing={digits.length <= 9 ? 2 : 0}>{digits.length > 30 ? digits.slice(0, 29) + '…' : digits}</text>
          <text x="248" y="118" textAnchor="end" fontSize="13" fontWeight={700}>{unit}</text>
          <text x="50" y="56" fontSize="10" fontWeight={700}>{[want.id === 'vac' ? 'AC' : ['vdc', 'mv', 'a', 'ma', 'ua'].includes(want.id) ? 'DC' : '', ...flags].filter(Boolean).join('  ')}</text>
          {beep && <text x="50" y="118" fontSize="13" fontWeight={700}>•))) BEEP</text>}
        </g>
      )}
      <text x="150" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight={700} letterSpacing="3">DIGITAL MULTIMETER · 6000 COUNTS</text>

      {/* Dial labels */}
      {DIAL_ORDER.map((m, i) => {
        const ang = rad(angleFor(i));
        const lx = CX + R_LABEL * Math.cos(ang), ly = CY + R_LABEL * Math.sin(ang);
        const tx = CX + (R_KNOB + 6) * Math.cos(ang), ty = CY + (R_KNOB + 6) * Math.sin(ang);
        const tx2 = CX + (R_KNOB + 14) * Math.cos(ang), ty2 = CY + (R_KNOB + 14) * Math.sin(ang);
        const active = m === mode;
        const isCur = m === 'a' || m === 'ma' || m === 'ua';
        return (
          <g key={m} onClick={() => onMode(m)} style={{ cursor: 'pointer' }} role="button" aria-label={`Dial to ${MODE_BY_ID[m].label}`} aria-pressed={active}>
            <line x1={tx} y1={ty} x2={tx2} y2={ty2} stroke={active ? '#34d399' : '#64748b'} strokeWidth={active ? 3 : 1.5} />
            <circle cx={lx} cy={ly} r="15" fill={active ? '#34d399' : 'transparent'} opacity={active ? 0.22 : 1} />
            <text x={lx} y={ly + 4} textAnchor="middle" fontSize={MODE_BY_ID[m].dial.length > 3 ? 10 : 12} fontWeight={800}
              fill={active ? '#6ee7b7' : isCur ? '#fbbf24' : m === 'off' ? '#f87171' : '#e2e8f0'}>{MODE_BY_ID[m].dial.trim()}</text>
          </g>
        );
      })}
      {/* Knob */}
      <circle cx={CX} cy={CY} r={R_KNOB} fill="url(#mm-knob)" stroke="#334155" strokeWidth="3" />
      <g transform={`rotate(${a + 90} ${CX} ${CY})`} style={{ transition: 'transform 250ms ease' }}>
        <rect x={CX - 11} y={CY - R_KNOB + 4} width="22" height={R_KNOB * 2 - 8} rx="11" fill="#1e293b" stroke="#475569" />
        <polygon points={`${CX},${CY - R_KNOB + 6} ${CX - 6},${CY - R_KNOB + 20} ${CX + 6},${CY - R_KNOB + 20}`} fill="#34d399" />
      </g>

      {/* Jacks */}
      {JACKS.map((j) => {
        const x = JACK_X[j.id];
        const hasRed = red === j.id, hasBlack = black === j.id;
        const correct = isOn && j.id === correctRed && want.connection !== 'socket';
        const wrong = (hasRed && redWrong) || (hasBlack && blackWrong);
        return (
          <g key={j.id} onClick={() => onJack(j.id)} style={{ cursor: 'pointer' }} role="button" aria-label={`Put ${placing} probe in ${j.label}`}>
            <text x={x} y={JACK_Y - 32} textAnchor="middle" fontSize="11" fontWeight={800} fill={j.id === 'com' ? '#e2e8f0' : j.id === 'vohm' ? '#fca5a5' : '#fcd34d'}>{j.label}</text>
            <text x={x} y={JACK_Y - 21} textAnchor="middle" fontSize="6.5" fill="#94a3b8">{j.sub}</text>
            {correct && !hasRed && <circle cx={x} cy={JACK_Y} r="22" fill="none" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4 3" />}
            {wrong && <circle cx={x} cy={JACK_Y} r="22" fill="none" stroke="#ef4444" strokeWidth="3"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" /></circle>}
            <circle cx={x} cy={JACK_Y} r="16" fill="#020617" stroke={j.id === 'com' ? '#475569' : j.colour} strokeWidth="3" />
            <circle cx={x} cy={JACK_Y} r="7" fill="#1e293b" />
            {(hasRed || hasBlack) && <circle cx={x} cy={JACK_Y} r="10" fill={hasRed ? '#dc2626' : '#111827'} stroke={hasRed ? '#fecaca' : '#9ca3af'} strokeWidth="2" />}
          </g>
        );
      })}
      {/* Probe leads */}
      <path d={`M${JACK_X[black]} ${JACK_Y + 10} C ${JACK_X[black]} 480, ${JACK_X[black] - 20} 490, ${JACK_X[black] - 30} 500`} stroke="#111827" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d={`M${JACK_X[red]} ${JACK_Y + 10} C ${JACK_X[red]} 480, ${JACK_X[red] + 20} 490, ${JACK_X[red] + 30} 500`} stroke="#dc2626" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
