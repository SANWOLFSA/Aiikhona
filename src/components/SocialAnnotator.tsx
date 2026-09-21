import React, { useState } from 'react';
import { 
  MessageSquarePlus, 
  AlertTriangle, 
  Activity, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  ThumbsUp, 
  Send, 
  X, 
  Search, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Plus, 
  Sparkles,
  ArrowRight,
  Share2
} from 'lucide-react';
import type { SocialAnnotation, AnnotationCategory, AnnotationReply, UserProfile } from '../types';

interface SocialAnnotatorProps {
  boardId: string;
  boardName: string;
  boardSide: 'top' | 'bottom';
  annotations: SocialAnnotation[];
  currentUser: UserProfile;
  isPinningActive: boolean;
  onTogglePinningMode: () => void;
  onAddAnnotation: (annotation: Omit<SocialAnnotation, 'id' | 'createdAt' | 'upvotes' | 'verifiedFixCount' | 'replies'>) => void;
  onAddReply: (annotationId: string, reply: Omit<AnnotationReply, 'id' | 'createdAt'>) => void;
  onToggleUpvote: (annotationId: string) => void;
  onToggleVerifyFix: (annotationId: string) => void;
  onSelectComponentRef?: (ref: string) => void;
  themePrimaryBg?: string;
  themePrimaryText?: string;
}

const CATEGORY_CONFIG: Record<AnnotationCategory, {
  label: string;
  color: string;
  border: string;
  bg: string;
  badgeBg: string;
  icon: React.ComponentType<{ className?: string }>;
  accentHex: string;
}> = {
  fault_warning: {
    label: 'Fault Warning',
    color: 'text-rose-500 dark:text-rose-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    badgeBg: 'bg-rose-500 text-white',
    icon: AlertTriangle,
    accentHex: '#f43f5e'
  },
  test_point: {
    label: 'Test Point / Diode Reading',
    color: 'text-emerald-500 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    badgeBg: 'bg-emerald-500 text-white',
    icon: Activity,
    accentHex: '#10b981'
  },
  repair_tip: {
    label: 'Repair Tip / Soldering',
    color: 'text-amber-500 dark:text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    badgeBg: 'bg-amber-500 text-stone-950',
    icon: Lightbulb,
    accentHex: '#f59e0b'
  },
  replacement: {
    label: 'Component Replacement',
    color: 'text-purple-500 dark:text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    badgeBg: 'bg-purple-500 text-white',
    icon: ArrowRight,
    accentHex: '#a855f7'
  },
  question: {
    label: 'Question & Discussion',
    color: 'text-blue-500 dark:text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    badgeBg: 'bg-blue-500 text-white',
    icon: HelpCircle,
    accentHex: '#3b82f6'
  }
};

export default function SocialAnnotator({
  boardId,
  boardName,
  boardSide,
  annotations,
  currentUser,
  isPinningActive,
  onTogglePinningMode,
  onAddAnnotation,
  onAddReply,
  onToggleUpvote,
  onToggleVerifyFix,
  onSelectComponentRef,
  themePrimaryBg = 'bg-blue-600',
  themePrimaryText = 'text-blue-600'
}: SocialAnnotatorProps) {
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPinsOverlay, setShowPinsOverlay] = useState(true);
  const [replyInput, setReplyInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // New Pin Draft State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPinPos, setNewPinPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [draftTitle, setDraftTitle] = useState('');
  const [draftCategory, setDraftCategory] = useState<AnnotationCategory>('fault_warning');
  const [draftComponentRef, setDraftComponentRef] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftVoltageRail, setDraftVoltageRail] = useState('');
  const [draftDiodeReading, setDraftDiodeReading] = useState('');
  const [draftTags, setDraftTags] = useState('');

  // Filter annotations for current board and side
  const boardAnnotations = annotations.filter(
    ann => ann.boardId === boardId && (ann.boardSide === boardSide || !ann.boardSide)
  );

  const filteredAnnotations = boardAnnotations.filter(ann => {
    const matchesCategory = activeCategoryFilter === 'all' || ann.category === activeCategoryFilter;
    const matchesSearch = !searchQuery.trim() || 
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ann.componentRef && ann.componentRef.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ann.voltageRail && ann.voltageRail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ann.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const selectedAnnotation = annotations.find(ann => ann.id === selectedAnnotationId) || null;

  const handleOpenNewPinModal = (x: number, y: number) => {
    setNewPinPos({ x, y });
    setDraftTitle('');
    setDraftCategory('fault_warning');
    setDraftComponentRef('');
    setDraftContent('');
    setDraftVoltageRail('');
    setDraftDiodeReading('');
    setDraftTags('');
    setIsModalOpen(true);
  };

  const handleSubmitDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !draftContent.trim()) return;

    const parsedTags = draftTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onAddAnnotation({
      boardId,
      boardSide,
      x: Math.round(newPinPos.x * 10) / 10,
      y: Math.round(newPinPos.y * 10) / 10,
      componentRef: draftComponentRef.trim().toUpperCase() || undefined,
      title: draftTitle.trim(),
      content: draftContent.trim(),
      category: draftCategory,
      voltageRail: draftVoltageRail.trim() || undefined,
      diodeReading: draftDiodeReading.trim() || undefined,
      authorId: currentUser?.id || 'guest',
      authorName: currentUser?.name || 'Technician',
      authorRole: currentUser?.role || 'Bench Technician',
      authorAvatar: currentUser?.avatar,
      tags: parsedTags.length > 0 ? parsedTags : [draftCategory.replace('_', ' ')]
    });

    setIsModalOpen(false);
    if (isPinningActive) {
      onTogglePinningMode();
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnnotationId || !replyInput.trim()) return;

    onAddReply(selectedAnnotationId, {
      authorName: currentUser?.name || 'Technician',
      authorRole: currentUser?.role || 'Bench Tech',
      authorAvatar: currentUser?.avatar,
      content: replyInput.trim(),
      isVerifiedTech: currentUser?.repairsCompleted > 5
    });

    setReplyInput('');
  };

  const handleShareAnnotation = (ann: SocialAnnotation) => {
    navigator.clipboard?.writeText(
      `[DIY Electronics Social Pin] ${ann.title} on ${boardName} (${ann.componentRef || 'Test Point'}). Rail: ${ann.voltageRail || 'N/A'}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar for Social Annotator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Community Social Annotations</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {boardAnnotations.length} Pins on {boardSide.toUpperCase()}
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Crowdsourced test points, diode drops, and component fault pins on <span className="font-semibold text-slate-700 dark:text-slate-300">{boardName}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setShowPinsOverlay(!showPinsOverlay)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                showPinsOverlay 
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
              title="Toggle pin visibility on the schematic canvas"
            >
              {showPinsOverlay ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              <span>{showPinsOverlay ? 'Pins Visible' : 'Pins Hidden'}</span>
            </button>

            <button
              onClick={onTogglePinningMode}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                isPinningActive
                  ? 'bg-rose-500 hover:bg-rose-600 text-white ring-2 ring-rose-400/40 animate-pulse'
                  : `${themePrimaryBg} hover:opacity-90 text-white`
              }`}
            >
              {isPinningActive ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Click Anywhere on Board to Pin</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Drop Pin on Board</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Categories Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Categories ({boardAnnotations.length})
            </button>

            {Object.entries(CATEGORY_CONFIG).map(([key, conf]) => {
              const count = boardAnnotations.filter(a => a.category === key).length;
              const Icon = conf.icon;
              const isSelected = activeCategoryFilter === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategoryFilter(key)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer border ${
                    isSelected 
                      ? `${conf.bg} ${conf.border} ${conf.color} font-bold ring-1 ring-current`
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{conf.label}</span>
                  <span className="text-[10px] opacity-70 px-1 py-0.2 rounded bg-black/5 dark:bg-white/10">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search pins, rails, components..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Grid List of Annotations or Selected Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: List of Community Pins for this board */}
        <div className="lg:col-span-2 space-y-3">
          {filteredAnnotations.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                <MessageSquarePlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">No annotations match your filter</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Be the first technician to drop a pin on this board to share diode readings, fault warnings, or chip replacements!
                </p>
              </div>
              <button
                onClick={() => handleOpenNewPinModal(50, 50)}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${themePrimaryBg} text-white hover:opacity-90 inline-flex items-center gap-1.5 cursor-pointer`}
              >
                <Plus className="w-4 h-4" />
                <span>Create Annotation Now</span>
              </button>
            </div>
          ) : (
            filteredAnnotations.map(ann => {
              const conf = CATEGORY_CONFIG[ann.category] || CATEGORY_CONFIG.fault_warning;
              const Icon = conf.icon;
              const isSelected = selectedAnnotationId === ann.id;

              return (
                <div
                  key={ann.id}
                  onClick={() => setSelectedAnnotationId(ann.id)}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all cursor-pointer shadow-xs ${
                    isSelected 
                      ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-400' 
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${conf.bg} ${conf.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${conf.badgeBg}`}>
                            {conf.label}
                          </span>
                          {ann.componentRef && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectComponentRef) onSelectComponentRef(ann.componentRef!);
                              }}
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-400"
                            >
                              📍 {ann.componentRef}
                            </button>
                          )}
                          <span className="text-[11px] text-slate-400 font-medium">
                            Coords: ({ann.x}%, {ann.y}%)
                          </span>
                        </div>

                        <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                          {ann.title}
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                          {ann.content}
                        </p>
                      </div>
                    </div>

                    {/* Upvotes & Verified count */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {ann.verifiedFixCount > 0 && (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{ann.verifiedFixCount} Verified</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{ann.upvotes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Multimeter Voltage & Diode drop readings bar */}
                  {(ann.voltageRail || ann.diodeReading) && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-3 text-xs">
                      {ann.voltageRail && (
                        <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-mono text-[11px]">
                          <span className="font-sans font-bold text-slate-400 text-[10px]">Rail:</span>
                          <span className="bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/60">
                            {ann.voltageRail}
                          </span>
                        </div>
                      )}
                      {ann.diodeReading && (
                        <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">
                          <span className="font-sans font-bold text-slate-400 text-[10px]">Diode Drop:</span>
                          <span className="bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                            {ann.diodeReading}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Author footer and Replies indicator */}
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        {ann.authorAvatar ? (
                          <img src={ann.authorAvatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                            {ann.authorName[0]}
                          </div>
                        )}
                      </div>
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {ann.authorName} <span className="text-slate-400 text-[10px]">({ann.authorRole})</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                        {ann.replies.length} {ann.replies.length === 1 ? 'Reply' : 'Replies'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed Inspector & Threaded Discussion */}
        <div className="lg:col-span-1">
          {selectedAnnotation ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 sticky top-20">
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Annotation Details</h3>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedAnnotation.componentRef || 'Test Point Pin'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAnnotationId(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Category */}
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1.5 ${CATEGORY_CONFIG[selectedAnnotation.category]?.badgeBg}`}>
                  {CATEGORY_CONFIG[selectedAnnotation.category]?.label}
                </span>
                <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                  {selectedAnnotation.title}
                </h4>
              </div>

              {/* Full Content */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedAnnotation.content}
              </div>

              {/* Multimeter Diagnostics */}
              {(selectedAnnotation.voltageRail || selectedAnnotation.diodeReading) && (
                <div className="space-y-1.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
                  <div className="font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Multimeter Diagnostics Sheet</span>
                  </div>
                  {selectedAnnotation.voltageRail && (
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-slate-500">Power Rail:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedAnnotation.voltageRail}</span>
                    </div>
                  )}
                  {selectedAnnotation.diodeReading && (
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-slate-500">Diode Mode Drop:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedAnnotation.diodeReading}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Interactive Engagement: Upvote & Verify Fix */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onToggleUpvote(selectedAnnotation.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    selectedAnnotation.hasUserUpvoted
                      ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-400 text-blue-600 dark:text-blue-300 font-black'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvote ({selectedAnnotation.upvotes})</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleVerifyFix(selectedAnnotation.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    selectedAnnotation.hasUserVerified
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 text-emerald-600 dark:text-emerald-300 font-black'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fix Worked ({selectedAnnotation.verifiedFixCount})</span>
                </button>
              </div>

              {/* Share button */}
              <button
                type="button"
                onClick={() => handleShareAnnotation(selectedAnnotation)}
                className="w-full py-1.5 rounded-lg text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3 h-3" />
                <span>{isCopied ? 'Copied Pin to Clipboard!' : 'Share Diagnostic Pin'}</span>
              </button>

              {/* Threaded Discussion Section */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Community Discussion</span>
                  <span className="text-slate-400 text-[10px] font-normal">{selectedAnnotation.replies.length} comments</span>
                </h5>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                  {selectedAnnotation.replies.length === 0 ? (
                    <p className="text-center text-[11px] text-slate-400 py-3">
                      No comments yet. Have you encountered this issue? Leave a note below.
                    </p>
                  ) : (
                    selectedAnnotation.replies.map(rep => (
                      <div key={rep.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                            <span>{rep.authorName}</span>
                            {rep.isVerifiedTech && (
                              <span className="flex items-center text-emerald-500">
                                <ShieldCheck className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400">{new Date(rep.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          {rep.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="flex gap-1.5 pt-1">
                  <input
                    type="text"
                    value={replyInput}
                    onChange={e => setReplyInput(e.target.value)}
                    placeholder="Add technical feedback or note..."
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!replyInput.trim()}
                    className={`px-3 py-2 rounded-xl text-xs font-bold ${themePrimaryBg} text-white hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-2">
              <MessageSquarePlus className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Any Annotation Pin</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Click any pin on the circuit board or in the list to view diode readings, fault warnings, and join the repair discussion.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add New Annotation Pin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">Drop Community Annotation</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pin coordinate on {boardName} ({boardSide.toUpperCase()} side): ({newPinPos.x}%, {newPinPos.y}%)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitDraft} className="space-y-4 text-xs">
              {/* Category Selector */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Annotation Category</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {Object.entries(CATEGORY_CONFIG).map(([catKey, conf]) => {
                    const isSelected = draftCategory === catKey;
                    const Icon = conf.icon;
                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => setDraftCategory(catKey as AnnotationCategory)}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? `${conf.bg} ${conf.border} ${conf.color} font-bold ring-2 ring-current`
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-[11px] truncate">{conf.label.split('/')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Component Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Headline / Issue Summary *
                  </label>
                  <input
                    type="text"
                    required
                    value={draftTitle}
                    onChange={e => setDraftTitle(e.target.value)}
                    placeholder="e.g., Shorted VDD_MAIN line fix"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Component Ref
                  </label>
                  <input
                    type="text"
                    value={draftComponentRef}
                    onChange={e => setDraftComponentRef(e.target.value)}
                    placeholder="e.g. U_PMIC, C402"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Voltage & Diode Drop Readings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Voltage Rail (Optional)
                  </label>
                  <input
                    type="text"
                    value={draftVoltageRail}
                    onChange={e => setDraftVoltageRail(e.target.value)}
                    placeholder="e.g., PP_VDD_MAIN (3.85V)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Diode Reading / Resistance (Optional)
                  </label>
                  <input
                    type="text"
                    value={draftDiodeReading}
                    onChange={e => setDraftDiodeReading(e.target.value)}
                    placeholder="e.g., 0.450V Diode Drop / 1.2Ω"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Technical Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Detailed Notes & Instructions *
                </label>
                <textarea
                  required
                  rows={3}
                  value={draftContent}
                  onChange={e => setDraftContent(e.target.value)}
                  placeholder="Describe failure symptom, how to isolate the fault, recommended reflow temperature, or replacement part numbers..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Search Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={draftTags}
                  onChange={e => setDraftTags(e.target.value)}
                  placeholder="e.g., PMIC, Bootloop, Short, Audio IC"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Submission Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl font-black ${themePrimaryBg} text-white hover:opacity-90 transition-all cursor-pointer shadow-md`}
                >
                  Publish Community Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
