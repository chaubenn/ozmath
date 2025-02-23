import React, { useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Heart, DollarSign } from 'lucide-react';
import { getStripe } from '../lib/stripe';

interface DonationModalProps {
  onClose: () => void;
  isThankYou?: boolean;
}

export default function DonationModal({ onClose, isThankYou }: DonationModalProps) {
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    setAmount(value);
    setError('');
  };

  const handleDonate = async () => {
    // Validate amount
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 1) {
      setError('Please enter a valid amount (minimum $1)');
      return;
    }
    
    try {
      const stripe = await getStripe();
      if (!stripe) throw new Error('Failed to load Stripe');

      const response = await fetch('/.netlify/functions/create-donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: numAmount,
          message: message.trim() 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create donation session');
      }

      const data = await response.json();
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      
      if (stripeError) throw stripeError;
    } catch (error) {
      console.error('Error processing donation:', error);
      setError('Failed to process donation. Please try again.');
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Cross2Icon className="h-6 w-6" />
            </button>

            <div className="p-6">
              {isThankYou ? (
                <div className="text-center">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Thank You for Your Support!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your donation helps keep OzMath running and allows us to continue improving the platform for all students.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Support OzMath
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your donation helps us maintain and improve OzMath for all students.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label 
                      htmlFor="amount" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Donation Amount (AUD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="amount"
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Add a message (optional)
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message of support..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                      maxLength={200}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={handleDonate}
                      disabled={!amount}
                      className={`w-full px-4 py-3 rounded-lg text-white font-medium transition-colors ${
                        amount
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {amount ? `Donate $${amount}` : 'Enter an amount'}
                    </button>
                    
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      All donations are greatly appreciated and will be reinvested into maintaining and improving OzMath.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
