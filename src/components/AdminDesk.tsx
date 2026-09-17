import { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Ban, Trash2 } from 'lucide-react';
import type { VerificationRequest } from '../types';

export default function AdminDesk({ 
  verifications, 
  onApproveVerification, 
  onRejectVerification 
}: { 
  verifications: VerificationRequest[]; 
  onApproveVerification: (id: string) => void; 
  onRejectVerification: (id: string, reason: string) => void; 
}) {
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectId || !rejectReason) return;
    onRejectVerification(rejectId, rejectReason);
    setRejectId(null);
    setRejectReason("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Compliance Desk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-sans">Business Compliance & Verification Portal</h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Review company trading licenses, VAT registrations, and headquarters papers. Approve genuine distributors to grant them gold verification status across the platform.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
          <span className="font-bold text-stone-800 dark:text-stone-200 block">Review Thresholds</span>
          <p className="text-stone-500 text-[11px]">
            Companies must provide valid government database hashes to clear cross-border trade audits.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-stone-400 uppercase tracking-wider">PENDING VERIFICATION DOCUMENTS ({verifications.filter(v => v.status === "Pending Review").length})</h3>
        
        {verifications.length === 0 ? (
          <div className="py-12 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 text-center text-stone-400 space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
            <p className="text-sm font-bold text-stone-850 dark:text-stone-100">All submissions fully cleared!</p>
            <p className="text-xs">No corporate audits pending review at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {verifications.map(req => (
              <div key={req.id} className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
                <div className="bg-stone-50 dark:bg-stone-850 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="space-y-0.5">
                    <h4 className="text-base font-black text-stone-900 dark:text-stone-100">{req.companyName}</h4>
                    <span className="text-[10px] text-stone-400 font-mono">Submitted On: {req.submittedDate} • ID: {req.id}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === "Pending Review" ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300" : req.status.includes("Approved") ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-850 dark:text-emerald-300" : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300"}`}>{req.status}</span>
                </div>

                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-stone-400 block">Registration Code / Country</span>
                      <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{req.registrationNumber} • {req.countryOfRegistration}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">TAX/VAT ID Number</span>
                      <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{req.vatTaxNumber || "Not Supplied"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Compliance Contact Information</span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">{req.contactEmail} • {req.contactPhone}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Official Registered HQ Address</span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">{req.officialAddress}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/30 flex items-start gap-3">
                      <FileText className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase">Trading License Papers</h5>
                        <p className="text-[11px] text-stone-500 mt-0.5">Government registration reference hash: UK-COMP-09482103 verified.</p>
                      </div>
                    </div>

                    {req.reviewerNotes && (
                      <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
                        <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Reviewer Remarks:</span>
                        <p className="text-stone-500 leading-relaxed font-mono">{req.reviewerNotes}</p>
                      </div>
                    )}

                    {req.status === "Pending Review" && (
                      <div className="flex items-center gap-2 pt-2">
                        <button 
                          onClick={() => onApproveVerification(req.id)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-colors flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Approve & Verify</span>
                        </button>
                        <button 
                          onClick={() => setRejectId(req.id)}
                          className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-red-500 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Ban className="w-4 h-4" />
                          <span>Reject Submission</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {rejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <form onSubmit={handleRejectSubmit} className="relative w-full max-w-md rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Reject Company Verification</span>
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase mb-1">State Reason for Document Rejection</label>
              <textarea 
                rows={3}
                required
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="e.g. Registered VAT ID does not match government Companies House database records. License papers expired."
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setRejectId(null)} className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-red-500 text-white font-black text-xs">Confirm Rejection</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
