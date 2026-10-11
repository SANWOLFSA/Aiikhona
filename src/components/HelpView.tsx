import { HelpCircle, BookOpen, MessageSquare, Mail, ChevronRight } from 'lucide-react';
import { SUPPORT_EMAIL } from '../lib/brand';

export default function HelpView({ onNavigate }: { onNavigate?: (tab: string) => void } = {}) {
  const faqs = [
    {
      q: 'How do I use the AI Diagnostic tool?',
      a: 'Open AI Diagnostic, pick your device type, describe the symptom (and any meter readings) and run the diagnosis. You get likely causes, test points and steps. It is AI-generated, so confirm readings before replacing parts.'
    },
    {
      q: 'Are the spare parts suppliers verified?',
      a: 'Sellers can apply for a Verified badge, which our team reviews by hand. A badge is not a guarantee, so check the listing, ask the seller questions and use a payment method with buyer protection.'
    },
    {
      q: 'Can I download guides for offline workbench use?',
      a: 'Save a guide with the bookmark button to keep it in your saved list on this device. Full offline access is not available yet, so keep a connection while you work.'
    },
    {
      q: 'How do I earn reputation points and badges?',
      a: 'You earn points by logging completed repairs and passing electrical theory courses. Points are saved to your profile on this device for now.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-lg">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-stone-900 dark:text-stone-100">Help & Support Center</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">Frequently asked questions, documentation, and technical support</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button type="button" onClick={() => onNavigate?.('guides')} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-3 text-left hover:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors block w-full">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Repair Guides</h3>
          <p className="text-xs text-stone-500">Step-by-step repair, soldering and multimeter guides.</p>
        </button>
        <button type="button" onClick={() => onNavigate?.('forum')} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-3 text-left hover:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors block w-full">
          <MessageSquare className="w-6 h-6 text-amber-500" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Community Forum</h3>
          <p className="text-xs text-stone-500">Ask other repairers about a fault you're stuck on.</p>
        </button>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-3 text-left hover:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors block w-full">
          <Mail className="w-6 h-6 text-amber-500" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Contact Support</h3>
          <p className="text-xs text-stone-500 break-all">Email us at {SUPPORT_EMAIL}</p>
        </a>
      </div>

      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 shadow-sm space-y-6">
        <h3 className="text-base font-black text-stone-900 dark:text-stone-100">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/50 border border-stone-100 dark:border-stone-800 space-y-1">
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                {faq.q}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 pl-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
