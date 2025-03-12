import React, { useState } from 'react';
import { FiCoffee, FiX } from 'react-icons/fi';

const BuyMeAChai = () => {
  const [teaCount, setTeaCount] = useState(1);
  const teaPrice = 20; // Price per tea in Rs
  const [showQR, setShowQR] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Calculate total amount
  const totalAmount = teaCount * teaPrice;
  
  // UPI Details
  const upiId = "007manjax@okicici";
  const name = "Manjunathan";
  
  // Generate custom payment link
  const getPaymentLink = () => {
    return `https://getmechai.vercel.app/link.html?vpa=${upiId}&nm=${name}&amt=${totalAmount}`;
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 rounded-xl p-6 my-8 relative overflow-hidden">
      {/* Tea cup decoration */}
      <div className="absolute -right-8 -top-8 text-amber-200/20 dark:text-amber-700/20">
        <FiCoffee className="w-32 h-32" />
      </div>
      
      <div className="relative">
        <h3 className="text-2xl font-bold mb-2 text-amber-800 dark:text-amber-400">Buy Me a Chai ☕</h3>
        
        <p className="text-amber-900 dark:text-amber-300 mb-6 max-w-2xl">
          If you've found my work helpful or valuable, consider buying me a chai! Your contribution goes directly towards supporting my research and development of innovative systems and technologies.
        </p>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md inline-block mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <label htmlFor="teaCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                How many chais?
              </label>
              
              <div className="flex items-center">
                <button 
                  onClick={() => setTeaCount(Math.max(1, teaCount - 1))}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-l-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  -
                </button>
                <input
                  id="teaCount"
                  type="number"
                  value={teaCount}
                  onChange={(e) => setTeaCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 py-1 px-2 text-center border-y border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800"
                  min="1"
                />
                <button 
                  onClick={() => setTeaCount(teaCount + 1)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total</p>
              <p className="text-xl font-bold text-amber-800 dark:text-amber-400">₹{totalAmount}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowPopup(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <FiCoffee className="h-5 w-5" />
              Pay for Chai
            </button>
            
            {/* <button
              onClick={() => setShowQR(!showQR)}
              className="px-4 py-2 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg transition-colors"
            >
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </button> */}
          </div>
        </div>
        
        {showQR && (
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md inline-block">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scan with any UPI app:</p>
            <div className="bg-white p-2 rounded-md w-48 h-48 flex items-center justify-center">
              {/* This would be a dynamically generated QR code based on the custom payment link */}
              <img 
                src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(getPaymentLink())}`} 
                alt="UPI QR Code"
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">UPI ID: {upiId}</p>
          </div>
        )}
        
        {/* Payment popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX className="h-6 w-6" />
              </button>
              
              <div className="text-center mb-6">
                <FiCoffee className="h-16 w-16 mx-auto text-amber-600 mb-4" />
                <h4 className="text-xl font-bold mb-2">Thank you for your support!</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your contribution of ₹{totalAmount} will help fund my research and development of innovative technologies.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-amber-800 dark:text-amber-300 text-sm mb-4">
                  You'll be redirected to complete your payment for {teaCount} chai{teaCount > 1 ? 's' : ''}.
                </div>
                
                <div className="flex justify-center">
                  <a
                    href={getPaymentLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg inline-flex items-center gap-2 transition-colors"
                    onClick={() => setShowPopup(false)}
                  >
                    <FiCoffee className="h-5 w-5" />
                    Proceed to Payment
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyMeAChai; 