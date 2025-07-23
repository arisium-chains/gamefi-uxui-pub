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
        <div className="filter-tabs-container">
          <button className="filter-tab">
            All Races
          </button>
          <button className="filter-tab active">
            My Racers Only
          </button>
          <button className="filter-tab">
            Winners
          </button>
          <button className="filter-tab">
            Top 3
          </button>
        </div>

        {/* Race History List */}
        <div className="flex-1">
          {raceHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[55vh] text-center px-4">
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-8 border border-blue-500/30">
                <Trophy className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-6">No Races Yet</h2>
              <div className="space-y-3 mb-8 max-w-sm">
                <p className="text-muted-foreground leading-relaxed">
                  Races occur automatically every minute when at least 2 racers are ready.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Adopt some racers to start participating!
                </p>
              </div>
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