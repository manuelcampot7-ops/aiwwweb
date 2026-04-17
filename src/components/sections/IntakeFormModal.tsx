"use client";

import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';

interface IntakeFormModalProps {
  plan: 'Starter' | 'Professional' | 'Enterprise';
  onClose: () => void;
}

const industries = [
  'Real Estate', 'Home Services', 'Healthcare', 'Legal', 'Restaurant / Food',
  'Fitness / Wellness', 'Auto / Dealership', 'Construction', 'Retail / E-Commerce',
  'Consulting', 'Education', 'Other',
];

export default function IntakeFormModal({ plan, onClose }: IntakeFormModalProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    companyName: '', industry: '', description: '', colors: '', extra: '',
  });

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const isPro = plan === 'Professional' || plan === 'Enterprise';
  const isEnterprise = plan === 'Enterprise';

  // Step definitions per plan
  const steps = [
    { title: 'About You', subtitle: "Let's start with the basics" },
    { title: 'Your Business', subtitle: 'Tell us about what you do' },
    { title: 'Your Vision', subtitle: 'What are you looking for?' },
    ...(isPro ? [{ title: 'AI Setup', subtitle: 'Help us configure your AI agents' }] : []),
  ];

  const totalSteps = steps.length;

  const canNext = () => {
    if (step === 0) return form.firstName && form.email && form.phone;
    if (step === 1) return form.industry;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan }),
      });
      if (!res.ok) throw new Error('Failed');
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    }
    setLoading(false);
  };

  const next = () => {
    if (step < totalSteps - 1) setStep(s => s + 1);
    else handleSubmit();
  };

  const back = () => { if (step > 0) setStep(s => s - 1); };

  const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[0.87rem] text-[#0a0a0a] placeholder-gray-400 font-sans focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 transition-all duration-200";
  const labelClass = "block text-[0.78rem] font-semibold text-gray-700 mb-1.5";

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] w-full max-w-[520px] max-h-[90vh] overflow-hidden"
        style={{ animation: 'page-enter 0.35s cubic-bezier(0.16, 1, 0.3, 1) both' }}>

        {/* Header */}
        <div className="px-7 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 bg-red-50 border border-red-200 rounded-full text-[0.65rem] font-bold font-mono text-red-600 tracking-wider">
                {plan.toUpperCase()}
              </span>
              <span className="text-[0.7rem] text-gray-400 font-mono">
                Step {step + 1} of {totalSteps}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={18} />
            </button>
          </div>
          <h3 className="font-['Space_Grotesk'] text-[1.3rem] font-bold text-[#0a0a0a]">{steps[step].title}</h3>
          <p className="text-gray-500 text-[0.84rem]">{steps[step].subtitle}</p>

          {/* Progress bar */}
          <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Success state */}
        {success ? (
          <div className="px-7 py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
              <Check size={28} className="text-red-600" strokeWidth={2.5} />
            </div>
            <h3 className="font-['Space_Grotesk'] text-[1.4rem] font-bold text-[#0a0a0a] mb-2">
              You're All Set!
            </h3>
            <p className="text-gray-600 text-[0.9rem] leading-relaxed max-w-[340px] mx-auto mb-2">
              We've received your information and will reach out to you within 24 hours.
            </p>
            <p className="text-red-600 text-[0.85rem] font-semibold mb-6">
              Your first consultation is completely FREE.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-[0.85rem] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(220,38,38,0.25)] transition-all duration-300"
            >
              Got it!
            </button>
          </div>
        ) : (
          <>
            {/* Form content */}
            <div className="px-7 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 220px)' }}>

              {/* Step 0: About You */}
              {step === 0 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input className={inputClass} placeholder="John" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input className={inputClass} placeholder="Smith" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" className={inputClass} placeholder="john@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" className={inputClass} placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
                  </div>
                </div>
              )}

              {/* Step 1: Your Business */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>Business Name</label>
                    <input className={inputClass} placeholder="My Business LLC" value={form.companyName} onChange={e => set('companyName', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Industry *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {industries.map(ind => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => set('industry', ind)}
                          className={`px-2.5 py-2 text-[0.72rem] font-medium rounded-lg border transition-all duration-150 ${
                            form.industry === ind
                              ? 'bg-red-50 border-red-300 text-red-700 shadow-sm'
                              : 'border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Your Vision */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>What are you looking for?</label>
                    <textarea
                      className={inputClass + ' min-h-[100px] resize-none'}
                      placeholder="Tell us about your ideal website — what pages you need, what you want visitors to do, any features you have in mind..."
                      value={form.description}
                      onChange={e => set('description', e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Colors / Style</label>
                    <input className={inputClass} placeholder="e.g. Blue and white, modern and clean" value={form.colors} onChange={e => set('colors', e.target.value)} />
                  </div>
                  {!isPro && (
                    <div>
                      <label className={labelClass}>Anything else we should know?</label>
                      <textarea
                        className={inputClass + ' min-h-[60px] resize-none'}
                        placeholder="Current website URL, competitors you admire, timeline..."
                        value={form.extra}
                        onChange={e => set('extra', e.target.value)}
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: AI Setup (Pro + Enterprise only) */}
              {step === 3 && isPro && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>How many calls/messages does your business get per week?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Less than 10', '10–30', '30–100', '100+'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => set('extra', (form.extra ? form.extra + ' | ' : '') + `Weekly volume: ${opt}`)}
                          className="px-3 py-2.5 text-[0.78rem] font-medium rounded-lg border border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600 transition-all duration-150"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>What do customers usually ask about?</label>
                    <textarea
                      className={inputClass + ' min-h-[80px] resize-none'}
                      placeholder="e.g. Pricing, availability, scheduling appointments, product details..."
                      value={form.extra}
                      onChange={e => set('extra', e.target.value)}
                      rows={3}
                    />
                  </div>
                  {isEnterprise && (
                    <div>
                      <label className={labelClass}>How many locations do you have?</label>
                      <input className={inputClass} placeholder="e.g. 3 locations in Florida" value={form.companyName} onChange={e => set('companyName', e.target.value)} />
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-[0.82rem] text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Footer with navigation */}
            <div className="px-7 py-4 border-t border-gray-100 flex items-center justify-between">
              {step > 0 ? (
                <button onClick={back} className="flex items-center gap-1.5 text-gray-500 text-[0.82rem] font-medium hover:text-gray-700 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={next}
                disabled={!canNext() || loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-[0.82rem] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(220,38,38,0.25)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                ) : step < totalSteps - 1 ? (
                  <>Next <ArrowRight size={14} /></>
                ) : (
                  <>Submit <Check size={14} /></>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
