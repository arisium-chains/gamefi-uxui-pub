'use client';

import { useState } from 'react';
import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import { Racer } from '@/types/racer';
import LoadingSpinner from './LoadingSpinner';

interface BoostRacerModalProps {
  isOpen: boolean;
  onClose: () => void;
  racer: Racer;
}

export default function BoostRacerModal({ isOpen, onClose, racer }: BoostRacerModalProps) {
  const { boostRacer, isLoading } = useMiniappSDK();
  const [boostAmount, setBoostAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const minBoost = 5;
  const maxBoost = 500;

  const validateAmount = (value: string): string => {
    const numValue = parseFloat(value);
    
    if (!value || isNaN(numValue)) {
      return 'Please enter a valid amount';
    }
    
    if (numValue < minBoost) {
      return `Minimum boost is ${minBoost} WLD`;
    }
    
    if (numValue > maxBoost) {
      return `Maximum boost is ${maxBoost} WLD`;
    }
    
    return '';
  };

  const handleAmountChange = (value: string) => {
    setBoostAmount(value);
    const validationError = validateAmount(value);
    setError(validationError);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateAmount(boostAmount);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      await boostRacer(racer.id, parseFloat(boostAmount));
      onClose();
      setBoostAmount('');
      setError('');
    } catch {
      // Error handling is done in the context
    }
  };

  const calculateNewStats = (currentStat: number, boost: number): number => {
    const boostPercent = Math.floor(boost / 10);
    return Math.min(100, currentStat + boostPercent);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">⚡ Boost {racer.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="boost-amount" className="block text-sm font-medium text-gray-300 mb-2">
              Additional WLD to Stake
            </label>
            <div className="relative">
              <input
                type="number"
                id="boost-amount"
                value={boostAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder={`Enter amount (${minBoost}-${maxBoost} WLD)`}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                disabled={isLoading}
                step="0.1"
                min={minBoost}
                max={maxBoost}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                WLD
              </div>
            </div>
            
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          {/* Current Stats */}
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-bold text-white mb-3">Current Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-gray-400 mb-1">Luck</p>
                <p className="text-purple-400 font-bold">{racer.stats.luck}%</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Speed</p>
                <p className="text-blue-400 font-bold">{racer.stats.speed}%</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Stamina</p>
                <p className="text-green-400 font-bold">{racer.stats.stamina}%</p>
              </div>
            </div>
          </div>

          {/* Boost Preview */}
          {boostAmount && !error && (
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
              <h3 className="font-bold text-yellow-400 mb-3">After Boost Preview</h3>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Luck</p>
                  <p className="text-purple-400 font-bold">
                    {calculateNewStats(racer.stats.luck, parseFloat(boostAmount))}%
                    <span className="text-green-400 text-xs ml-1">
                      (+{calculateNewStats(racer.stats.luck, parseFloat(boostAmount)) - racer.stats.luck})
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Speed</p>
                  <p className="text-blue-400 font-bold">
                    {calculateNewStats(racer.stats.speed, parseFloat(boostAmount))}%
                    <span className="text-green-400 text-xs ml-1">
                      (+{calculateNewStats(racer.stats.speed, parseFloat(boostAmount)) - racer.stats.speed})
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Stamina</p>
                  <p className="text-green-400 font-bold">
                    {calculateNewStats(racer.stats.stamina, parseFloat(boostAmount))}%
                    <span className="text-green-400 text-xs ml-1">
                      (+{calculateNewStats(racer.stats.stamina, parseFloat(boostAmount)) - racer.stats.stamina})
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-yellow-400/30">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">New Total Stake:</span>
                  <span className="text-yellow-400 font-bold">
                    {racer.stakedWLD + (boostAmount ? parseFloat(boostAmount) : 0)} WLD
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Boost Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Quick Boost:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 25, 50].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountChange(amount.toString())}
                  disabled={isLoading}
                  className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-500 transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !!error || !boostAmount}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="black" text="Boosting..." />
              ) : (
                `⚡ Boost for ${boostAmount || '0'} WLD`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}