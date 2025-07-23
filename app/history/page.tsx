'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import MessageDisplay from '@/components/MessageDisplay';
import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { ArrowLeft, Trophy, Target } from 'lucide-react';

export default function HistoryPage() {
  const { isConnected, raceHistory, walletAddress } = useMiniappSDK();

  if (!isConnected) {
    return (
      <div className="mobile-container">
        <div className="splash-screen">
          <div className="mobile-title">Race History</div>
          <p className="mobile-subtitle">Please connect your wallet to view race history.</p>
          <Link href="/" className="btn-figma-primary">
            Go Home
          </Link>
        </div>
        <MessageDisplay />
        <BottomNavigation />
      </div>
    );
  }

  // Figma Race History Design
  return (
    <div className="mobile-container">
      <div className="mobile-header">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Race History</h1>
        <div className="w-5 h-5" /> {/* Spacer */}
      </div>

      <div className="mobile-page">
        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <button className="px-6 py-3 bg-card border border-border rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all">
            All Races
          </button>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all">
            My Racers Only
          </button>
          <button className="px-6 py-3 bg-card border border-border rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all">
            Winners
          </button>
          <button className="px-6 py-3 bg-card border border-border rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all">
            Top 3
          </button>
        </div>

        {/* Race History List */}
        <div className="flex-1">
          {raceHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-8 border border-blue-500/30">
                <Trophy className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">No Races Yet</h2>
              <p className="text-muted-foreground mb-2 max-w-sm">
                Races occur automatically every minute when at least 2 racers are ready.
              </p>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Adopt some racers to start participating!
              </p>
              <Link href="/adopt" className="btn-figma-primary">
                <Target className="mr-2 h-5 w-5" />
                Adopt Racers
              </Link>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {raceHistory.map((race) => {
                const userParticipant = race.participants.find(p => p.ownerAddress === walletAddress);
                const isWinner = userParticipant?.position === 1;
                const placement = userParticipant?.position;
                
                return (
                  <div key={race.id} className="race-item">
                    <div className={`race-icon ${isWinner ? 'bg-yellow-500' : 'bg-primary'}`}>
                      {isWinner ? <Trophy className="w-5 h-5" /> : <span className="text-lg">🏁</span>}
                    </div>
                    <div className="race-details">
                      <div className="race-title">
                        {isWinner 
                          ? `Your ${userParticipant?.racerName} took 1st place!`
                          : placement 
                          ? `Your ${userParticipant?.racerName} participated.`
                          : 'Race completed'
                        }
                      </div>
                      <div className="race-date">
                        {new Date(race.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <MessageDisplay />
      <BottomNavigation />
    </div>
  );
}