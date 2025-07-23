'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import MessageDisplay from '@/components/MessageDisplay';
import BoostRacerModal from '@/components/BoostRacerModal';
import RetireRacerModal from '@/components/RetireRacerModal';
import Link from 'next/link';
import Image from 'next/image';
import { use, useState } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RacerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { isConnected, racers } = useMiniappSDK();
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [showRetireModal, setShowRetireModal] = useState(false);

  if (!isConnected) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center mx-4">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-gray-300 mb-6">
              Please connect your wallet to view racer details.
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

  const racer = racers.find(r => r.id === id);

  if (!racer) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center mx-4">
            <div className="w-16 h-16 bg-gray-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">❓</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Racer Not Found</h2>
            <p className="text-gray-300 mb-6">
              The racer you&apos;re looking for doesn&apos;t exist or may have been retired.
            </p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
        <MessageDisplay />
      </>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'in-race': return 'bg-yellow-500';
      case 'won': return 'bg-blue-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <Link 
              href="/"
              className="inline-block mb-4 text-gray-300 hover:text-white transition-colors duration-200"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">{racer.name}</h1>
            <div className={`inline-block px-4 py-2 rounded-full text-white font-medium ${getStatusColor(racer.currentStatus)}`}>
              {racer.currentStatus.charAt(0).toUpperCase() + racer.currentStatus.slice(1)}
            </div>
          </header>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Racer Image & Basic Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Image 
                    src={racer.imageUrl} 
                    alt={racer.name}
                    width={112}
                    height={112}
                    className="w-28 h-28 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  <span className="text-6xl hidden">🏎️</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">{racer.name}</h2>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Staked WLD</p>
                    <p className="text-2xl font-bold text-yellow-400">{racer.stakedWLD}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Adopted</p>
                    <p className="text-white font-medium">
                      {new Date(racer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats & Performance */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Performance Stats</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Luck</span>
                        <span className="text-white font-bold">{racer.stats.luck}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${racer.stats.luck}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Speed</span>
                        <span className="text-white font-bold">{racer.stats.speed}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${racer.stats.speed}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Stamina</span>
                        <span className="text-white font-bold">{racer.stats.stamina}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${racer.stats.stamina}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {racer.lastRaceOutcome && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Last Race Result</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1">Position</p>
                        <p className="text-2xl font-bold text-white">#{racer.lastRaceOutcome.position}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1">Rewards</p>
                        <p className="text-2xl font-bold text-green-400">+{racer.lastRaceOutcome.rewards}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">🚀 Actions Available</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Enhance your racer&apos;s performance or retire them to claim your rewards.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setShowBoostModal(true)}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105"
                    >
                      ⚡ Boost Racer
                    </button>
                    <button 
                      onClick={() => setShowRetireModal(true)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-400 hover:to-red-500 transition-all duration-200 transform hover:scale-105"
                    >
                      🏁 Retire Racer
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-400 mb-1">Boost Benefits</p>
                        <p className="text-yellow-400 font-medium">+10% stats per 10 WLD</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 mb-1">Current Value</p>
                        <p className="text-green-400 font-medium">{racer.stakedWLD + (racer.lastRaceOutcome?.rewards || 0)} WLD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessageDisplay />
      
      {/* Modals */}
      <BoostRacerModal 
        isOpen={showBoostModal}
        onClose={() => setShowBoostModal(false)}
        racer={racer}
      />
      
      <RetireRacerModal 
        isOpen={showRetireModal}
        onClose={() => setShowRetireModal(false)}
        racer={racer}
      />
    </>
  );
}