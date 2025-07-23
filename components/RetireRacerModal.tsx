'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import { Racer } from '@/types/racer';
import LoadingSpinner from './LoadingSpinner';

interface RetireRacerModalProps {
  isOpen: boolean;
  onClose: () => void;
  racer: Racer;
}

export default function RetireRacerModal({ isOpen, onClose, racer }: RetireRacerModalProps) {
  const { retireRacer, isLoading } = useMiniappSDK();

  const handleRetire = async () => {
    try {
      await retireRacer(racer.id);
      onClose();
    } catch {
      // Error handling is done in the context
    }
  };

  const canRetire = racer.currentStatus !== 'in-race';
  const estimatedRewards = racer.lastRaceOutcome ? racer.lastRaceOutcome.rewards : Math.floor(racer.stakedWLD * 0.1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">🏁 Retire {racer.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        {!canRetire ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🏃</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Racer Currently Racing</h3>
            <p className="text-gray-300 mb-6">
              {racer.name} is currently participating in a race and cannot be retired until the race is complete.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-200"
            >
              Got It
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Retirement</h3>
              <p className="text-gray-300">
                Are you sure you want to retire {racer.name}? This action cannot be undone.
              </p>
            </div>

            {/* Retirement Summary */}
            <div className="bg-white/10 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-white mb-3">Retirement Summary</h4>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Original Stake:</span>
                <span className="text-white font-medium">{racer.stakedWLD} WLD</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Accumulated Rewards:</span>
                <span className="text-green-400 font-medium">+{estimatedRewards} WLD</span>
              </div>
              
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total Return:</span>
                  <span className="text-yellow-400 font-bold text-lg">
                    {racer.stakedWLD + estimatedRewards} WLD
                  </span>
                </div>
              </div>
            </div>

            {/* Racer Stats Summary */}
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-bold text-white mb-3">{racer.name}&apos;s Legacy</h4>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Final Luck</p>
                  <p className="text-purple-400 font-bold">{racer.stats.luck}%</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Final Speed</p>
                  <p className="text-blue-400 font-bold">{racer.stats.speed}%</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Final Stamina</p>
                  <p className="text-green-400 font-bold">{racer.stats.stamina}%</p>
                </div>
              </div>
              
              {racer.lastRaceOutcome && (
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Last Race Position:</span>
                    <span className="text-white font-medium">#{racer.lastRaceOutcome.position}</span>
                  </div>
                </div>
              )}
              
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Days Active:</span>
                  <span className="text-white font-medium">
                    {Math.floor((Date.now() - racer.createdAt) / (1000 * 60 * 60 * 24)) || 1}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠️</span>
                <div>
                  <h4 className="font-bold text-red-400 mb-1">Important Notice</h4>
                  <p className="text-sm text-gray-300">
                    Once retired, {racer.name} will be permanently removed from your stable and cannot be recovered. 
                    All accumulated rewards will be claimed automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 bg-gray-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-500 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRetire}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-400 hover:to-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" color="white" text="Retiring..." />
                ) : (
                  '🏁 Confirm Retirement'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}