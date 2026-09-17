import { HelpCircle, BookOpen, MessageSquare, Mail, ExternalLink, ChevronRight } from 'lucide-react';

export default function HelpView() {
  const faqs = [
    {
      q: 'How do I use the AI Diagnostic tool?',
      a: 'Navigate to Devices, click on AI Diagnostic, and enter your device symptoms, error codes, or multimeter readings to get instant diagnostic probabilities and recommended fix steps.'
    },
    {
      q: 'Are the spare parts suppliers verified?',
      a: 'Yes! Suppliers in our Marketplace undergo verification of business registration numbers, tax IDs, and official trading credentials before receiving the Verified badge.'
    },
    {
      q: 'Can I download guides for offline workbench use?',
      a: 'Yes, bookmark any guide using the save button, and enable Offline Bench Mode in the header or settings to access them without an active internet connection.'
    },
    {
      q: 'How do I earn reputation points and badges?',
      a: 'You earn points and certifications by completing electrical theory courses, contributing repair guides, and successfully resolving community forum questions.'
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
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-3">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Documentation</h3>
          <p className="text-xs text-stone-500">Read step-by-step soldering and multimeter manuals.</p>
        </div>
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-3">
          <MessageSquare className="w-6 h-6 text-amber-500" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Community Forum</h3>
          <p className="text-xs text-stone-500">Ask expert technicians questions in our active forum.</p>
        </div>
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-3">
          <Mail className="w-6 h-6 text-amber-500" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Contact Support</h3>
          <p className="text-xs text-stone-500">Email our engineering desk at support@diyelectronics.hub.</p>
        </div>
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
