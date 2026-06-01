import React, { useState } from 'react';
import { FiCoffee, FiX, FiMinus, FiPlus } from 'react-icons/fi';

const BuyMeAChai = () => {
  const [teaCount, setTeaCount] = useState(1);
  const teaPrice = 20; // ₹ per chai
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = teaCount * teaPrice;
  const upiId = 'manjunathan.ai02@oksbi';
  const name = 'Manjunathan';
  const getPaymentLink = () =>
    `https://getmechai.vercel.app/link.html?vpa=${upiId}&nm=${name}&amt=${totalAmount}`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#191818]/10 bg-[#191818]/[0.03] px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center gap-3">
        <FiCoffee className="h-5 w-5 text-primary-light dark:text-primary-dark shrink-0" />
        <div>
          <p className="text-sm font-medium text-[#191818] dark:text-white">Like the work? Buy me a chai.</p>
          <p className="text-xs text-[#191818]/45 dark:text-white/40 font-mono">supports the research + side projects</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* stepper */}
        <div className="flex items-center rounded-lg border border-[#191818]/10 dark:border-white/10 overflow-hidden">
          <button
            onClick={() => setTeaCount((c) => Math.max(1, c - 1))}
            className="px-2.5 py-1.5 text-[#191818]/60 hover:text-[#191818] hover:bg-[#191818]/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
            aria-label="One fewer chai"
          >
            <FiMinus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-mono text-[#191818] dark:text-white">{teaCount}</span>
          <button
            onClick={() => setTeaCount((c) => c + 1)}
            className="px-2.5 py-1.5 text-[#191818]/60 hover:text-[#191818] hover:bg-[#191818]/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
            aria-label="One more chai"
          >
            <FiPlus className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-light px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity dark:bg-primary-dark dark:text-[#15132E]"
        >
          Pay <span className="font-mono">₹{totalAmount}</span>
        </button>
      </div>

      {/* Payment confirm popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70" onClick={() => setShowPopup(false)}>
          <div className="relative w-full max-w-sm rounded-2xl border border-line-light dark:border-line-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close">
              <FiX className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light/10 dark:bg-primary-dark/15">
                <FiCoffee className="h-7 w-7 text-primary-light dark:text-primary-dark" />
              </div>
              <h4 className="text-lg font-semibold mb-1">Thank you 🙏</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                You're about to send <span className="font-mono accent-text">₹{totalAmount}</span> for {teaCount} chai{teaCount > 1 ? 's' : ''}. Opens your UPI app.
              </p>
              <a
                href={getPaymentLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPopup(false)}
                className="btn-primary w-full justify-center"
              >
                <FiCoffee className="h-4 w-4" /> Proceed to pay
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyMeAChai;
