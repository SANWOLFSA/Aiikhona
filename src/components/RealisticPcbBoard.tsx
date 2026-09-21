import React from 'react';
import type { BoardPreset, BoardComponent } from './BlueprintViewer';

interface RealisticPcbBoardProps {
  board: BoardPreset;
  viewMode: 'boardview' | 'blueprint' | 'microscope' | 'thermal' | 'xray';
  boardSide: 'top' | 'bottom';
  selectedComponent: BoardComponent | null;
  hoveredComponent: BoardComponent | null;
  onSelectComponent: (comp: BoardComponent) => void;
  onHoverComponent: (comp: BoardComponent | null) => void;
  showCalloutLabels: boolean;
}

export const RealisticPcbBoard: React.FC<RealisticPcbBoardProps> = ({
  board,
  viewMode,
  boardSide,
  selectedComponent,
  hoveredComponent,
  onSelectComponent,
  onHoverComponent,
  showCalloutLabels
}) => {
  const isAutoMcu = board.id === 'auto-mcu-v12';
  const width = board.dimensions.width;
  const height = board.dimensions.height;

  // Mask & Substrate colors
  const isBlueprint = viewMode === 'blueprint';
  const isThermal = viewMode === 'thermal';
  const isXRay = viewMode === 'xray';

  const copperColor = isBlueprint ? '#38bdf8' : '#eab308';
  const traceGlow = isBlueprint ? '#60a5fa' : '#22c55e';
  const viaGold = isBlueprint ? '#38bdf8' : '#eab308';
  const viaHole = '#090d16';

  return (
    <div className="relative w-full h-full select-none">
      {/* SVG Layer: PCB Texture, Traces, Vias, Mounting Holes, and Package Pin Footprints */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          {/* FR4 Soldermask Micro-texture */}
          <pattern id="fr4_weave" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0 4 L 8 4 M 4 0 L 4 8" stroke="#000000" strokeWidth="0.5" opacity="0.12" />
          </pattern>

          {/* Blueprint Grid */}
          <pattern id="cad_grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.22" />
            <circle cx="10" cy="10" r="0.5" fill="#38bdf8" opacity="0.4" />
          </pattern>

          {/* Thermal Gradient */}
          <radialGradient id="thermal_mcu_hotspot" cx="50%" cy="46%" r="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="20%" stopColor="#ffff00" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ff3b00" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#9900cc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Aluminum Capacitor 3D Shading */}
          <radialGradient id="al_can_grad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>

          {/* Gold Pin Gradient */}
          <linearGradient id="gold_pin_grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Silver Lead Gradient */}
          <linearGradient id="silver_lead_grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Drop shadow filter for ICs and components */}
          <filter id="pcb_shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* FR4 Texture overlay */}
        {!isBlueprint && <rect width={width} height={height} fill="url(#fr4_weave)" />}
        {isBlueprint && <rect width={width} height={height} fill="url(#cad_grid)" />}

        {/* Outer PCB Copper Shield Perimeter Track */}
        <rect
          x="14"
          y="14"
          width={width - 28}
          height={height - 28}
          rx="22"
          fill="none"
          stroke={copperColor}
          strokeWidth={isBlueprint ? '1.5' : '2'}
          strokeDasharray={isBlueprint ? '4 2' : 'none'}
          opacity={isBlueprint ? 0.7 : 0.45}
        />

        {/* 4 Plated Corner Mounting Holes */}
        <g id="mounting_holes">
          {/* Top-Left */}
          <circle cx="36" cy="36" r="16" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="36" cy="36" r="12" fill={viaGold} />
          <circle cx="36" cy="36" r="8" fill={viaHole} />

          {/* Top-Right */}
          <circle cx={width - 36} cy="36" r="16" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <circle cx={width - 36} cy="36" r="12" fill={viaGold} />
          <circle cx={width - 36} cy="36" r="8" fill={viaHole} />

          {/* Bottom-Left */}
          <circle cx="36" cy={height - 40} r="16" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="36" cy={height - 40} r="12" fill={viaGold} />
          <circle cx="36" cy={height - 40} r="8" fill={viaHole} />

          {/* Bottom-Right */}
          <circle cx={width - 36} cy={height - 40} r="16" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <circle cx={width - 36} cy={height - 40} r="12" fill={viaGold} />
          <circle cx={width - 36} cy={height - 40} r="8" fill={viaHole} />
        </g>

        {/* AUTO-MCU v1.2 Specific Photorealistic Vector Traces & Tracks */}
        {isAutoMcu && (
          <g id="auto_mcu_traces" opacity={isBlueprint ? 0.9 : 0.75}>
            {/* Top bus traces from MCU (50%, 46% = x:280, y:312) to Top Capacitors C1-C4 */}
            <path d="M 255 260 L 255 210 L 195 210 L 195 190" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 270 260 L 270 200 L 225 200 L 225 190" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 285 260 L 285 190" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 300 260 L 300 200 L 345 200 L 345 190" fill="none" stroke={traceGlow} strokeWidth="1.8" />

            {/* Traces from MCU to Left Resistors R1-R4 & Electrolytic EC1 */}
            <path d="M 220 280 L 170 280 L 170 272 L 145 272" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 220 295 L 180 295 L 180 312 L 145 312" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 220 310 L 190 310 L 190 350 L 145 350" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 220 325 L 180 325 L 180 390 L 145 390" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 220 340 L 160 340 L 160 428 L 150 428" fill="none" stroke={traceGlow} strokeWidth="1.8" />

            {/* Traces from MCU to Right Resistors R5-R7, Diodes D1-D2, Transistors Q1-Q3 */}
            <path d="M 340 280 L 390 280 L 390 265 L 414 265" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 340 295 L 400 295 L 400 292 L 414 292" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 340 310 L 395 310 L 395 320 L 414 320" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 340 325 L 390 325 L 390 340 L 414 340" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 340 340 L 385 340 L 385 367 L 414 367" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 340 355 L 380 355 L 380 408 L 420 408" fill="none" stroke={traceGlow} strokeWidth="1.8" />

            {/* Bottom 8 Parallel Bus Traces from MCU to Automotive 16-Pin Harness Header J1 */}
            <path d="M 245 365 L 245 450 L 225 470 L 225 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 255 365 L 255 455 L 240 470 L 240 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 265 365 L 265 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 275 365 L 275 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 285 365 L 285 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 295 365 L 295 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 305 365 L 305 455 L 320 470 L 320 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 315 365 L 315 450 L 335 470 L 335 565" fill="none" stroke={traceGlow} strokeWidth="1.8" />

            {/* Traces to Left Vias & Lower SMD Driver */}
            <path d="M 150 428 L 135 443 L 135 490" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 135 510 L 135 530" fill="none" stroke={traceGlow} strokeWidth="1.8" />

            {/* Traces to Right Vias & Driver */}
            <path d="M 420 408 L 420 460 L 410 470 L 410 490" fill="none" stroke={traceGlow} strokeWidth="1.8" />
            <path d="M 430 460 L 430 490" fill="none" stroke={traceGlow} strokeWidth="1.8" />
          </g>
        )}

        {/* Solder Points / Test Vias on AUTO-MCU Board */}
        {isAutoMcu && (
          <g id="auto_mcu_vias">
            {/* Left 4 Vias in vertical row (x: 135, y: 455, 475, 495, 515) */}
            {[455, 475, 495, 515].map((vy, i) => (
              <g key={`lvia_${i}`}>
                <circle cx="135" cy={vy} r="5" fill={viaGold} stroke="#b45309" strokeWidth="0.8" />
                <circle cx="135" cy={vy} r="2.2" fill={viaHole} />
              </g>
            ))}

            {/* Right 4 Vias in 2x2 grid (x: 410, 430, y: 475, 495) */}
            {[
              { x: 410, y: 475 },
              { x: 430, y: 475 },
              { x: 410, y: 495 },
              { x: 430, y: 495 }
            ].map((pt, i) => (
              <g key={`rvia_${i}`}>
                <circle cx={pt.x} cy={pt.y} r="5" fill={viaGold} stroke="#b45309" strokeWidth="0.8" />
                <circle cx={pt.x} cy={pt.y} r="2.2" fill={viaHole} />
              </g>
            ))}
          </g>
        )}

        {/* Silkscreen Markings & Branding */}
        <g id="silkscreen_text" opacity={isBlueprint ? 0.9 : 0.85}>
          <text
            x="24"
            y="70"
            fill={isBlueprint ? '#7dd3fc' : '#ffffff'}
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1"
          >
            {board.boardNumber}
          </text>
          <text
            x="24"
            y="88"
            fill={isBlueprint ? '#38bdf8' : '#cbd5e1'}
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="0.5"
          >
            {boardSide === 'top' ? board.topImageText : board.bottomImageText}
          </text>
          <text
            x={width - 24}
            y={height - 20}
            textAnchor="end"
            fill={isBlueprint ? '#7dd3fc' : '#e2e8f0'}
            fontSize="10"
            fontFamily="monospace"
            opacity="0.8"
          >
            DIYELECTRONICS AUTOMOTIVE HARNESS VERIFIED
          </text>
        </g>

        {/* Thermal Hotspot in Thermal Mode */}
        {isThermal && <rect width={width} height={height} fill="url(#thermal_mcu_hotspot)" />}

        {/* Optional Diagram Callout Lines & Arrows */}
        {showCalloutLabels && isAutoMcu && (
          <g id="educational_callouts" opacity="0.95">
            {/* 1. Microcontroller (IC) -> Center */}
            <path d="M 120 130 L 220 130 L 255 270" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="255" cy="270" r="3" fill="#38bdf8" />

            {/* 2. Ceramic Capacitors -> Top */}
            <path d="M 420 130 L 360 130 L 310 180" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="310" cy="180" r="3" fill="#38bdf8" />

            {/* 3. Electrolytic Capacitors -> Left & Right */}
            <path d="M 60 270 L 110 270 L 135 272" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="135" cy="272" r="3" fill="#38bdf8" />

            {/* 4. SMD Resistors -> Left Bank */}
            <path d="M 60 360 L 110 360 L 145 360" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="145" cy="360" r="3" fill="#38bdf8" />

            {/* 5. Diodes -> Right Bank */}
            <path d="M 500 355 L 450 355 L 414 355" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="414" cy="355" r="3" fill="#38bdf8" />

            {/* 6. Transistors (TO-92, SMD) -> Lower Right */}
            <path d="M 500 420 L 450 420 L 420 408" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="420" cy="408" r="3" fill="#38bdf8" />

            {/* 7. PCB Traces */}
            <path d="M 120 430 L 180 430 L 225 470" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="225" cy="470" r="3" fill="#38bdf8" />

            {/* 8. Solder Points (Vias) */}
            <path d="M 60 495 L 110 495 L 135 495" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="135" cy="495" r="3" fill="#38bdf8" />

            {/* 9. Automotive Connector -> Bottom */}
            <path d="M 120 600 L 200 600 L 240 585" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="240" cy="585" r="3" fill="#38bdf8" />

            {/* 10. Mounting Holes -> Corner */}
            <path d="M 60 40 L 36 36" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="36" cy="36" r="3" fill="#38bdf8" />
          </g>
        )}
      </svg>

      {/* Photorealistic Component Blocks */}
      {board.components.map((comp) => {
        const isSelected = selectedComponent?.id === comp.id;
        const isHovered = hoveredComponent?.id === comp.id;

        // Custom realistic rendering based on component type and package
        if (comp.id === 'u1_mcu') {
          // Central AUTO-MCU v1.2 QFP-32 Package
          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp);
              }}
              onMouseEnter={() => onHoverComponent(comp)}
              onMouseLeave={() => onHoverComponent(null)}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`component-hotspot absolute z-20 cursor-pointer flex items-center justify-center p-1 transition-all duration-200 ${
                isSelected ? 'scale-105 ring-4 ring-cyan-400' : isHovered ? 'scale-102 ring-2 ring-amber-400' : ''
              }`}
            >
              {/* QFP 32 Gull-Wing Pins (8 on Top, 8 on Bottom, 8 on Left, 8 on Right) */}
              <div className="absolute -inset-2.5 flex flex-col justify-between pointer-events-none">
                {/* Top 8 pins */}
                <div className="flex justify-evenly px-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`tpin_${i}`} className="w-1.5 h-3 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-400 rounded-xs shadow-xs" />
                  ))}
                </div>
                {/* Bottom 8 pins */}
                <div className="flex justify-evenly px-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`bpin_${i}`} className="w-1.5 h-3 bg-gradient-to-t from-slate-200 via-slate-100 to-slate-400 rounded-xs shadow-xs" />
                  ))}
                </div>
              </div>

              <div className="absolute -inset-2.5 flex items-center justify-between pointer-events-none">
                {/* Left 8 pins */}
                <div className="flex flex-col justify-evenly py-4 h-full">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`lpin_${i}`} className="h-1.5 w-3 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-400 rounded-xs shadow-xs" />
                  ))}
                </div>
                {/* Right 8 pins */}
                <div className="flex flex-col justify-evenly py-4 h-full">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`rpin_${i}`} className="h-1.5 w-3 bg-gradient-to-l from-slate-200 via-slate-100 to-slate-400 rounded-xs shadow-xs" />
                  ))}
                </div>
              </div>

              {/* Main Epoxy IC Body */}
              <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-md border border-slate-700/80 shadow-2xl flex flex-col items-center justify-center p-2 overflow-hidden">
                {/* Pin 1 Orientation Dimple */}
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-slate-950 border border-slate-700 shadow-inner" />

                {/* Laser Marking */}
                <div className="text-center font-mono select-none pointer-events-none">
                  <div className="text-[12px] font-black tracking-widest text-slate-200 uppercase drop-shadow-sm">
                    AUTO-MCU
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider">
                    v1.2
                  </div>
                  <div className="text-[7px] text-slate-500 mt-1 font-semibold">
                    TQFP-32 ECU
                  </div>
                </div>

                {/* X-Ray Simulation */}
                {isXRay && (
                  <div className="absolute inset-0 bg-cyan-950/70 border border-cyan-400/80 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-cyan-300 border-dashed animate-spin" />
                  </div>
                )}
              </div>
            </div>
          );
        }

        if (comp.id.startsWith('ec')) {
          // Electrolytic Radial Aluminum Can Capacitor
          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp);
              }}
              onMouseEnter={() => onHoverComponent(comp)}
              onMouseLeave={() => onHoverComponent(null)}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`component-hotspot absolute z-20 cursor-pointer flex items-center justify-center transition-all duration-200 ${
                isSelected ? 'scale-110 ring-4 ring-cyan-400 rounded-full' : isHovered ? 'scale-105 ring-2 ring-amber-400 rounded-full' : ''
              }`}
            >
              {/* Cylindrical Aluminum Top with Stamped Cross Safety Vent */}
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-600 border-2 border-slate-400 shadow-2xl flex items-center justify-center">
                {/* Outer Bevel Ring */}
                <div className="w-12 h-12 rounded-full border border-slate-400/80 flex items-center justify-center">
                  {/* Stamped Cross Vent (+) */}
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <div className="w-full h-[1.5px] bg-slate-600/90 shadow-inner" />
                    <div className="absolute h-full w-[1.5px] bg-slate-600/90 shadow-inner" />
                  </div>
                </div>
                {/* Text Ref */}
                <div className="absolute -bottom-4 px-1 rounded bg-slate-900/90 text-[8px] font-mono font-bold text-amber-300 whitespace-nowrap shadow-xs">
                  {comp.ref.split(' ')[0]}
                </div>
              </div>
            </div>
          );
        }

        if (comp.id.startsWith('c_array')) {
          // Ceramic Capacitor Banks (MLCC Beige Chips)
          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp);
              }}
              onMouseEnter={() => onHoverComponent(comp)}
              onMouseLeave={() => onHoverComponent(null)}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`component-hotspot absolute z-20 cursor-pointer flex items-center justify-around p-1 rounded-md transition-all duration-200 ${
                isSelected ? 'bg-amber-400/20 ring-2 ring-cyan-400' : isHovered ? 'bg-amber-400/10 ring-1 ring-amber-400' : ''
              }`}
            >
              {/* Render 4 MLCC 0805 chips with silver end-caps and beige ceramic body */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-3.5 h-6 rounded-xs bg-[#c89666] border border-[#a27b5c] shadow-md flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-1 bg-gradient-to-b from-slate-100 to-slate-300" />
                    <div className="w-full h-1 bg-gradient-to-t from-slate-100 to-slate-300" />
                  </div>
                  <span className="text-[7px] font-mono text-slate-200 mt-0.5">C{i + 1}</span>
                </div>
              ))}
            </div>
          );
        }

        if (comp.id.startsWith('r_array')) {
          // SMD Resistors Bank (Black bodies with codes)
          const isLeft = comp.id === 'r_array_left';
          const codes = isLeft ? ['1001', '1001', '0002', '000'] : ['000', '000', '0002'];

          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp);
              }}
              onMouseEnter={() => onHoverComponent(comp)}
              onMouseLeave={() => onHoverComponent(null)}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`component-hotspot absolute z-20 cursor-pointer flex flex-col justify-around p-1 rounded-md transition-all duration-200 ${
                isSelected ? 'bg-amber-400/20 ring-2 ring-cyan-400' : isHovered ? 'bg-amber-400/10 ring-1 ring-amber-400' : ''
              }`}
            >
              {codes.map((code, idx) => (
                <div key={idx} className="flex items-center justify-between my-0.5">
                  <div className="w-12 h-3.5 bg-slate-950 rounded-xs border border-slate-800 shadow-md flex items-center justify-between px-0.5">
                    <div className="w-1.5 h-full bg-gradient-to-r from-slate-100 to-slate-300 rounded-l-xs" />
                    <span className="text-[7px] font-mono font-bold text-slate-200 tracking-tight">{code}</span>
                    <div className="w-1.5 h-full bg-gradient-to-l from-slate-100 to-slate-300 rounded-r-xs" />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (comp.id === 'diodes_right') {
          // Flyback Schottky Diodes with Cathode White Band
          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp);
              }}
              onMouseEnter={() => onHoverComponent(comp)}
              onMouseLeave={() => onHoverComponent(null)}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`component-hotspot absolute z-20 cursor-pointer flex flex-col justify-around p-1 rounded-md transition-all duration-200 ${
                isSelected ? 'bg-amber-400/20 ring-2 ring-cyan-400' : isHovered ? 'bg-amber-400/10 ring-1 ring-amber-400' : ''
              }`}
            >
              {['D1', 'D2'].map((dName) => (
                <div key={dName} className="flex items-center gap-1 my-0.5">
                  <div className="w-11 h-3 bg-slate-900 rounded-xs border border-slate-700 shadow-md flex items-center justify-between overflow-hidden">
                    <div className="w-2.5 h-full bg-slate-100 border-r border-slate-400 flex items-center justify-center">
                      <div className="w-0.5 h-full bg-slate-400" />
                    </div>
                    <span className="text-[7px] font-mono font-bold text-slate-300 pr-1">{dName}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (comp.id === 'q1_transistor') {
          // TO-92 Discrete Transistor (D-shaped black body with 3 curved solder leads)
          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp);
              }}
              onMouseEnter={() => onHoverComponent(comp)}
              onMouseLeave={() => onHoverComponent(null)}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`component-hotspot absolute z-20 cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected ? 'scale-110 ring-2 ring-cyan-400 rounded-lg' : isHovered ? 'scale-105 ring-1 ring-amber-400' : ''
              }`}
            >
              {/* TO-92 D-Package Body */}
              <div className="w-10 h-7 bg-gradient-to-b from-slate-950 via-slate-800 to-slate-950 rounded-t-full border border-slate-700 shadow-xl flex items-center justify-center">
                <span className="text-[7px] font-mono font-bold text-slate-200">TO-92</span>
              </div>
              {/* 3 Solder Leads */}
              <div className="flex gap-2 -mt-0.5">
                <div className="w-1 h-3 bg-slate-300 rounded-b-xs" />
                <div className="w-1 h-3 bg-slate-300 rounded-b-xs" />
                <div className="w-1 h-3 bg-slate-300 rounded-b-xs" />
              </div>
            </div>
          );
        }

        if (comp.id === 'j1_connector') {
          // 16-Pin Shrouded Automotive Harness Header Connector
          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp);
              }}
              onMouseEnter={() => onHoverComponent(comp)}
              onMouseLeave={() => onHoverComponent(null)}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`component-hotspot absolute z-20 cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected ? 'ring-4 ring-cyan-400 rounded-xl' : isHovered ? 'ring-2 ring-amber-400 rounded-xl' : ''
              }`}
            >
              {/* Outer Black Shroud with Center Key Notch */}
              <div className="relative w-56 h-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-lg border-2 border-slate-700 shadow-2xl p-1 flex flex-col justify-between">
                {/* Center Keying Notch */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-slate-950 border border-slate-700 rounded-t-xs" />

                {/* Inner Receptacle with 16 Gold Square Pins in 2 Rows of 8 */}
                <div className="w-full h-full bg-slate-950 rounded border border-slate-800 flex flex-col justify-around py-1 px-3">
                  {/* Row 1 (8 Pins) */}
                  <div className="flex justify-between items-center">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={`pin_r1_${i}`} className="w-2.5 h-2.5 rounded-xs bg-gradient-to-b from-amber-200 to-amber-500 shadow-inner flex items-center justify-center">
                        <div className="w-1 h-1 bg-amber-700 rounded-xs" />
                      </div>
                    ))}
                  </div>
                  {/* Row 2 (8 Pins) */}
                  <div className="flex justify-between items-center">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={`pin_r2_${i}`} className="w-2.5 h-2.5 rounded-xs bg-gradient-to-b from-amber-200 to-amber-500 shadow-inner flex items-center justify-center">
                        <div className="w-1 h-1 bg-amber-700 rounded-xs" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-[8px] font-mono font-bold text-amber-300 mt-1">
                J1 - 16 PIN AUTOMOTIVE ECU HARNESS
              </div>
            </div>
          );
        }

        // Generic fallback IC package for other boards
        return (
          <div
            key={comp.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent(comp);
            }}
            onMouseEnter={() => onHoverComponent(comp)}
            onMouseLeave={() => onHoverComponent(null)}
            style={{
              left: `${comp.x}%`,
              top: `${comp.y}%`,
              width: `${comp.width}%`,
              height: `${comp.height}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className={`component-hotspot absolute z-10 rounded-lg cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-1 ${
              isBlueprint
                ? isSelected
                  ? 'bg-blue-600/30 border-2 border-cyan-400 ring-2 ring-cyan-400/50'
                  : 'bg-blue-950/60 border border-cyan-500/50 hover:border-cyan-300'
                : isXRay
                  ? isSelected
                    ? 'bg-slate-300/40 border-2 border-white ring-2 ring-white/60'
                    : 'bg-slate-800/80 border border-slate-400 hover:border-white'
                  : isSelected
                    ? 'bg-slate-900 border-2 border-amber-400 shadow-lg ring-2 ring-amber-400/40'
                    : isHovered
                      ? 'bg-slate-800/95 border border-amber-300/80'
                      : 'bg-slate-900/90 border border-slate-700/80'
            }`}
          >
            <div className="w-full flex items-center justify-between px-1 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400/80" />
              <span className="text-[9px] font-mono font-bold text-amber-300/90 tracking-wider">
                {comp.ref}
              </span>
            </div>
            <div className="text-center my-auto pointer-events-none px-1">
              <p className={`text-[10px] font-bold leading-tight line-clamp-2 ${isBlueprint ? 'text-cyan-200' : 'text-slate-100'}`}>
                {comp.name}
              </p>
              <p className="text-[8px] font-mono text-slate-400 tracking-tight mt-0.5">
                {comp.package.split(' ')[0]}
              </p>
            </div>
          </div>
        );
      })}

      {/* Floating Diagram Labels / Badges when enabled */}
      {showCalloutLabels && isAutoMcu && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-[18%] left-[6%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            1. Microcontroller (IC)
          </div>
          <div className="absolute top-[18%] right-[6%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            2. Ceramic Capacitors
          </div>
          <div className="absolute top-[38%] left-[2%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            3. Electrolytic Cans
          </div>
          <div className="absolute top-[52%] left-[2%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            4. SMD Resistors
          </div>
          <div className="absolute top-[51%] right-[2%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            5. Diodes
          </div>
          <div className="absolute top-[61%] right-[2%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            6. Transistors (TO-92, SMD)
          </div>
          <div className="absolute top-[62%] left-[10%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            7. PCB Traces
          </div>
          <div className="absolute top-[71%] left-[2%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            8. Solder Points (vias)
          </div>
          <div className="absolute bottom-[2%] left-[6%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            9. Automotive Connector
          </div>
          <div className="absolute top-[4%] left-[2%] bg-blue-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow-lg border border-blue-400">
            10. Mounting Holes
          </div>
        </div>
      )}
    </div>
  );
};
