'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import WldInputForm from '@/components/WldInputForm';
import MessageDisplay from '@/components/MessageDisplay';
import Link from 'next/link';
import { useState } from 'react';

export default function AdoptPage() {
  const { adoptRacer, isLoading, isConnected, walletAddress } = useMiniappSDK();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isConnected || !walletAddress) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center mx-4">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-gray-300 mb-6">
              Please connect your wallet to adopt a racer.
            </p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
            >
              Go Home
            </Link>
          </div>
        </div>
        <MessageDisplay />
      </>
    );
  }

  const handleAdoptRacer = async (amount: number) => {
    try {
      await adoptRacer(amount);
      setIsSuccess(true);
    } catch {
      // Error handling is done in the context
    }
  };

  if (isSuccess) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center mx-4">
            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Racer Adopted Successfully!</h2>
            <p className="text-gray-300 mb-8">
              Your new wacky racer is ready to compete and earn rewards!
            </p>
            <div className="space-y-4">
              <Link 
                href="/"
                className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-200"
              >
                View My Racers
              </Link>
              <button
                onClick={() => setIsSuccess(false)}
                className="block w-full bg-white/10 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                Adopt Another Racer
              </button>
            </div>
          </div>
        </div>
        <MessageDisplay />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <Link 
              href="/"
              className="inline-block mb-4 text-gray-300 hover:text-white transition-colors duration-200"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">Adopt New Racer</h1>
            <p className="text-gray-300">
              Stake WLD tokens to generate your unique racing creature
            </p>
          </header>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Adoption Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Stake & Generate</h2>
                <WldInputForm 
                  onSubmit={handleAdoptRacer}
                  isLoading={isLoading}
                  minAmount={10}
                  maxAmount={1000}
                />
              </div>

              {/* Info Panel */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">How It Works</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Choose Your Stake</h4>
                        <p className="text-sm text-gray-300">Higher stakes mean better performance potential</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Generate Racer</h4>
                        <p className="text-sm text-gray-300">Get a unique racer with random traits</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Earn Rewards</h4>
                        <p className="text-sm text-gray-300">Participate in races and win WLD</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📊 Staking Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">10-25 WLD:</span>
                      <span className="text-white">Basic Performance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">25-50 WLD:</span>
                      <span className="text-yellow-400">Enhanced Stats +25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">50-100 WLD:</span>
                      <span className="text-orange-400">Premium Stats +50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">100+ WLD:</span>
                      <span className="text-purple-400">Elite Performance +100%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">⚡ Pro Tip</h3>
                  <p className="text-sm text-gray-300">
                    Higher stakes don&apos;t just boost performance - they also increase your potential race winnings and make your racer more attractive to other players!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessageDisplay />
    </>
  );
}