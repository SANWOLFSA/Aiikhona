import type { ReactElement } from 'react';

// Schematic symbols drawn inline (IEC/ANSI-style, simplified). viewBox 0 0 120 60.
const L = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} />;
const T = (x: number, y: number, s: string, size = 9) => <text x={x} y={y} fontSize={size} fill="currentColor" stroke="none" fontFamily="ui-sans-serif, system-ui" fontWeight={700}>{s}</text>;
const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 5;
  const p1 = `${x2 - h * Math.cos(a - 0.5)},${y2 - h * Math.sin(a - 0.5)}`;
  const p2 = `${x2 - h * Math.cos(a + 0.5)},${y2 - h * Math.sin(a + 0.5)}`;
  return <g>{L(x1, y1, x2, y2)}<polygon points={`${x2},${y2} ${p1} ${p2}`} fill="currentColor" /></g>;
};
const zig = 'M30 30 l5 -8 l8 16 l8 -16 l8 16 l8 -16 l8 16 l5 -8';
const diodeAt = (x: number) => <g><polygon points={`${x},20 ${x},40 ${x + 16},30`} fill="none" />{L(x + 16, 20, x + 16, 40)}</g>;

function bjt(pnp: boolean) {
  return <g>
    {L(10, 30, 46, 30)}{L(46, 16, 46, 44)}
    {L(46, 24, 68, 12)}{L(68, 12, 68, 4)}
    {pnp ? <Arrow x1={68} y1={48} x2={50} y2={37} /> : <Arrow x1={46} y1={36} x2={66} y2={47} />}
    {L(pnp ? 50 : 66, pnp ? 37 : 47, 68, 48)}{L(68, 48, 68, 56)}
    <circle cx={56} cy={30} r={22} fill="none" />
    {T(2, 27, 'B')}{T(74, 10, 'C')}{T(74, 56, 'E')}
  </g>;
}
function fet(p: boolean) {
  return <g>
    {L(10, 40, 40, 40)}{L(40, 18, 40, 42)}
    {L(46, 16, 46, 22)}{L(46, 27, 46, 33)}{L(46, 38, 46, 44)}
    {L(46, 19, 70, 19)}{L(70, 19, 70, 4)}
    {L(46, 41, 70, 41)}{L(70, 41, 70, 56)}
    {p ? <Arrow x1={50} y1={30} x2={66} y2={30} /> : <Arrow x1={66} y1={30} x2={50} y2={30} />}
    {L(66, 30, 70, 30)}{L(70, 30, 70, 41)}
    {/* body diode */}
    {L(70, 8, 88, 8)}{L(88, 8, 88, 22)}{L(88, 38, 88, 52)}{L(88, 52, 70, 52)}
    <polygon points={p ? '82,24 94,24 88,36' : '82,36 94,36 88,24'} fill="none" />{L(82, p ? 36 : 24, 94, p ? 36 : 24)}
    {T(2, 37, 'G')}{T(74, 10, 'D')}{T(74, 58, 'S')}
  </g>;
}

const SYMBOLS: Record<string, ReactElement> = {
  resistor: <g>{L(4, 30, 30, 30)}<path d={zig} fill="none" />{L(90, 30, 116, 30)}</g>,
  pot: <g>{L(4, 30, 30, 30)}<path d={zig} fill="none" />{L(90, 30, 116, 30)}<Arrow x1={60} y1={56} x2={60} y2={24} />{T(64, 56, '2')}{T(6, 24, '1')}{T(108, 24, '3')}</g>,
  cap: <g>{L(4, 30, 54, 30)}{L(54, 14, 54, 46)}{L(66, 14, 66, 46)}{L(66, 30, 116, 30)}</g>,
  'cap-polar': <g>{L(4, 30, 54, 30)}{L(54, 14, 54, 46)}<path d="M70 14 Q62 30 70 46" fill="none" />{L(66, 30, 116, 30)}{T(40, 16, '+')}</g>,
  diode: <g>{L(4, 30, 52, 30)}{diodeAt(52)}{L(68, 30, 116, 30)}{T(30, 22, 'A')}{T(80, 22, 'K')}</g>,
  zener: <g>{L(4, 30, 52, 30)}<polygon points="52,20 52,40 68,30" fill="none" /><path d="M64 18 L68 20 L68 40 L72 42" fill="none" />{L(68, 30, 116, 30)}{T(30, 22, 'A')}{T(84, 22, 'K')}</g>,
  led: <g>{L(4, 34, 52, 34)}<polygon points="52,24 52,44 68,34" fill="none" />{L(68, 24, 68, 44)}{L(68, 34, 116, 34)}<Arrow x1={64} y1={20} x2={76} y2={8} /><Arrow x1={72} y1={22} x2={84} y2={10} />{T(30, 26, 'A')}{T(88, 30, 'K')}</g>,
  bridge: <g>
    <polygon points="60,4 88,30 60,56 32,30" fill="none" strokeDasharray="0" />
    <g transform="translate(40 13) rotate(-45)"><polygon points="0,-4 0,4 7,0" fill="currentColor" /></g>
    <g transform="translate(70 11) rotate(45)"><polygon points="0,-4 0,4 7,0" fill="currentColor" /></g>
    <g transform="translate(42 42) rotate(45)"><polygon points="0,-4 0,4 7,0" fill="currentColor" /></g>
    <g transform="translate(68 48) rotate(-45)"><polygon points="0,-4 0,4 7,0" fill="currentColor" /></g>
    {L(10, 30, 32, 30)}{L(88, 30, 110, 30)}{T(4, 24, '−')}{T(108, 24, '+')}{T(56, 2 + 8, '~')}{T(56, 58, '~')}
  </g>,
  npn: bjt(false), pnp: bjt(true), nmos: fet(false), pmos: fet(true),
  igbt: <g>
    {L(10, 40, 40, 40)}{L(40, 18, 40, 42)}{L(46, 16, 46, 44)}
    {L(46, 22, 70, 12)}{L(70, 12, 70, 4)}<Arrow x1={46} y1={38} x2={68} y2={48} />{L(68, 48, 70, 49)}{L(70, 49, 70, 56)}
    {L(70, 8, 90, 8)}{L(90, 8, 90, 24)}{L(90, 36, 90, 52)}{L(90, 52, 70, 52)}<polygon points="84,36 96,36 90,24" fill="none" />{L(84, 24, 96, 24)}
    {T(2, 37, 'G')}{T(74, 8, 'C')}{T(74, 60, 'E')}
  </g>,
  scr: <g>{L(4, 24, 52, 24)}<polygon points="52,14 52,34 68,24" fill="none" />{L(68, 14, 68, 34)}{L(68, 24, 116, 24)}{L(66, 32, 80, 48)}{L(80, 48, 96, 48)}{T(28, 16, 'A')}{T(84, 16, 'K')}{T(100, 52, 'G')}</g>,
  triac: <g>{L(4, 30, 50, 30)}{L(50, 12, 50, 48)}{L(70, 12, 70, 48)}<polygon points="50,14 50,30 68,22" fill="none" /><polygon points="70,30 70,46 52,38" fill="none" />{L(70, 30, 116, 30)}{L(70, 46, 84, 56)}{L(84, 56, 100, 56)}{T(6, 22, 'MT1')}{T(90, 22, 'MT2')}{T(102, 58, 'G')}</g>,
  regulator: <g><rect x={36} y={12} width={48} height={30} rx={3} fill="none" />{L(4, 24, 36, 24)}{L(84, 24, 116, 24)}{L(60, 42, 60, 58)}{T(40, 30, 'REG', 10)}{T(4, 18, 'IN')}{T(94, 18, 'OUT')}{T(64, 56, 'GND')}</g>,
  fuse: <g>{L(4, 30, 30, 30)}<rect x={30} y={22} width={60} height={16} rx={2} fill="none" />{L(30, 30, 90, 30)}{L(90, 30, 116, 30)}</g>,
  'thermal-fuse': <g>{L(4, 30, 30, 30)}<rect x={30} y={22} width={60} height={16} rx={2} fill="none" />{L(30, 30, 90, 30)}{L(90, 30, 116, 30)}{T(52, 16, 't°')}</g>,
  ntc: <g>{L(4, 30, 34, 30)}<rect x={34} y={22} width={52} height={16} fill="none" />{L(86, 30, 116, 30)}<path d="M28 50 L40 50 L84 10" fill="none" />{T(88, 54, '−t°')}</g>,
  ptc: <g>{L(4, 30, 34, 30)}<rect x={34} y={22} width={52} height={16} fill="none" />{L(86, 30, 116, 30)}<path d="M28 50 L40 50 L84 10" fill="none" />{T(88, 54, '+t°')}</g>,
  mov: <g>{L(4, 30, 34, 30)}<rect x={34} y={22} width={52} height={16} fill="none" />{L(86, 30, 116, 30)}<path d="M28 50 L40 50 L84 10" fill="none" />{T(90, 54, 'U')}</g>,
  inductor: <g>{L(4, 34, 28, 34)}<path d="M28 34 a8 8 0 0 1 16 0 a8 8 0 0 1 16 0 a8 8 0 0 1 16 0 a8 8 0 0 1 16 0" fill="none" />{L(92, 34, 116, 34)}</g>,
  transformer: <g>
    <path d="M40 6 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12" fill="none" transform="scale(-1 1) translate(-80 0)" />
    {L(56, 4, 56, 56)}{L(64, 4, 64, 56)}
    <path d="M80 6 a6 6 0 0 0 0 12 a6 6 0 0 0 0 12 a6 6 0 0 0 0 12 a6 6 0 0 0 0 12" fill="none" transform="scale(-1 1) translate(-160 0)" />
    {L(10, 6, 40, 6)}{L(10, 54, 40, 54)}{L(80, 6, 110, 6)}{L(80, 54, 110, 54)}{T(2, 34, 'PRI')}{T(96, 34, 'SEC')}
  </g>,
  relay: <g><rect x={8} y={18} width={30} height={24} fill="none" />{L(8, 18, 38, 42)}{L(23, 4, 23, 18)}{L(23, 42, 23, 56)}<line x1={38} y1={30} x2={62} y2={30} strokeDasharray="3 3" />{L(66, 44, 100, 26)}{L(66, 44, 66, 56)}{L(98, 14, 116, 14)}{L(98, 14, 98, 22)}{L(100, 46, 116, 46)}{T(70, 58, 'COM')}{T(102, 10, 'NO')}{T(102, 58, 'NC')}<circle cx={66} cy={44} r={2} fill="currentColor" /></g>,
  switch: <g>{L(4, 36, 36, 36)}<circle cx={38} cy={36} r={2.5} fill="currentColor" />{L(38, 36, 78, 18)}<circle cx={82} cy={36} r={2.5} fill="currentColor" />{L(84, 36, 116, 36)}</g>,
  motor: <g>{L(4, 30, 38, 30)}<circle cx={60} cy={30} r={22} fill="none" />{L(82, 30, 116, 30)}{T(52, 36, 'M', 18)}</g>,
  speaker: <g><rect x={36} y={20} width={14} height={20} fill="none" /><polygon points="50,20 70,6 70,54 50,40" fill="none" />{L(4, 24, 36, 24)}{L(4, 36, 36, 36)}<path d="M80 22 Q86 30 80 38" fill="none" /><path d="M88 16 Q98 30 88 44" fill="none" /></g>,
  crystal: <g>{L(4, 30, 42, 30)}{L(42, 16, 42, 44)}<rect x={50} y={14} width={20} height={32} fill="none" />{L(78, 16, 78, 44)}{L(78, 30, 116, 30)}</g>,
  opto: <g><rect x={20} y={4} width={80} height={52} rx={4} fill="none" strokeDasharray="4 3" /><polygon points="30,20 46,20 38,34" fill="none" />{L(30, 34, 46, 34)}{L(38, 8, 38, 20)}{L(38, 34, 38, 52)}<Arrow x1={50} y1={26} x2={64} y2={26} /><Arrow x1={50} y1={34} x2={64} y2={34} />{L(72, 18, 72, 42)}{L(72, 24, 88, 12)}<Arrow x1={72} y1={36} x2={86} y2={46} />{T(2, 16, '1')}{T(2, 54, '2')}{T(106, 14, '4')}{T(106, 54, '3')}</g>,
  battery: <g>{L(4, 30, 44, 30)}{L(44, 14, 44, 46)}{L(54, 22, 54, 38)}{L(64, 14, 64, 46)}{L(74, 22, 74, 38)}{L(74, 30, 116, 30)}{T(32, 14, '+')}{T(80, 14, '−')}</g>,
  hall: <g><rect x={34} y={10} width={52} height={40} rx={3} fill="none" />{T(52, 36, 'H', 16)}{L(4, 18, 34, 18)}{L(4, 42, 34, 42)}{L(86, 30, 116, 30)}{T(2, 14, 'VCC')}{T(2, 56, 'GND')}{T(94, 24, 'OUT')}</g>,
  heater: <g>{L(4, 30, 26, 30)}<rect x={26} y={20} width={68} height={20} fill="none" />{L(43, 20, 43, 40)}{L(60, 20, 60, 40)}{L(77, 20, 77, 40)}{L(94, 30, 116, 30)}</g>,
  magnetron: <g><circle cx={60} cy={30} r={24} fill="none" /><circle cx={60} cy={30} r={8} fill="none" />{L(48, 54, 48, 60)}{L(72, 54, 72, 60)}<path d="M52 30 L56 26 L60 34 L64 26 L68 30" fill="none" />{L(84, 30, 112, 30)}{T(88, 24, 'A')}{T(30, 58, 'F')}{T(78, 58, 'FA')}</g>,
  'hv-diode': <g>{L(4, 30, 20, 30)}{diodeAt(20)}{L(36, 30, 44, 30)}{diodeAt(44)}{L(60, 30, 68, 30)}{diodeAt(68)}{L(84, 30, 116, 30)}{T(92, 22, 'HV')}</g>,
  compressor: <g><circle cx={60} cy={30} r={22} fill="none" />{T(52, 36, 'M', 18)}{L(24, 12, 44, 18)}{L(24, 48, 44, 42)}{L(82, 30, 112, 30)}{T(10, 14, 'S')}{T(10, 54, 'R')}{T(104, 24, 'C')}</g>,
  ic: <g><rect x={34} y={6} width={52} height={48} rx={3} fill="none" /><circle cx={42} cy={14} r={2.5} fill="currentColor" />{[14, 26, 38, 50].map((y) => <g key={y}>{L(22, y - 2, 34, y - 2)}{L(86, y - 2, 98, y - 2)}</g>)}{T(48, 34, 'IC', 12)}{T(2, 15, 'VCC')}{T(100, 51, 'GND')}</g>,
};

export default function ComponentSymbol({ symbol, className = 'w-28 h-14' }: { symbol: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={`${symbol} schematic symbol`}>
      {SYMBOLS[symbol] || SYMBOLS.ic}
    </svg>
  );
}
