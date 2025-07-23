'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';

export default function Dashboard() {
  const { walletAddress, racers, pendingRewards, claimRewards, isLoading } = useMiniappSDK();

  if (!walletAddress) return null;

  return (
    <div className="mobile-container">
      <div className="mobile-header">
        <div className="text-lg font-semibold">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </div>
        <div className="text-sm text-muted-foreground">
          0.00 WLD
        </div>
      </div>
      
      <div className="mobile-page">
        {racers.length === 0 ? (
          // Empty state - matches Figma design
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="race-track-container mb-6">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl">🏁</div>
              </div>
            </div>
            
            <div className="mobile-title">No Wacky Racers yet! Let&apos;s get you started.</div>
            
            <Link href="/adopt" className="btn-figma-primary max-w-sm">
              Adopt Your First Racer!
            </Link>
          </div>
        ) : (
          // Dashboard with racers
          <div className="space-y-6">
            {/* Rewards Section */}
            {pendingRewards > 0 && (
              <div className="mobile-card">
                <h2 className="mobile-section-title">Rewards</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🎁</span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Available Rewards</div>
                    <div className="font-semibold">{pendingRewards} WLD</div>
                  </div>
                </div>
                <button
                  onClick={claimRewards}
                  disabled={isLoading}
                  className="btn-figma-primary"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" color="white" />
                      <span>Claiming Rewards...</span>
                    </div>
                  ) : (
                    'Claim Rewards'
                  )}
                </button>
              </div>
            )}

            {/* My Racers Section */}
            <div>
              <h2 className="mobile-section-title">My Racers</h2>
              <div className="space-y-3">
                {racers.map((racer) => (
                  <Link key={racer.id} href={`/racer/${racer.id}`}>
                    <div className="racer-card-mobile">
                      <div className="racer-avatar">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${racer.name}&backgroundColor=b6e3f4`}
                          alt={racer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="racer-info">
                        <div className="racer-name">{racer.name}</div>
                        <div className="racer-level">Level {Math.floor(racer.stakedWLD / 10)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Link href="/adopt" className="btn-figma-primary block text-center">
                Adopt New Racer
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}