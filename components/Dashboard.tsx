'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import RacerCard from './RacerCard';
import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Timer, Users } from 'lucide-react';

export default function Dashboard() {
  const { walletAddress, racers, pendingRewards, claimRewards, isLoading, nextRaceTime } = useMiniappSDK();
  const [timeUntilRace, setTimeUntilRace] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      if (!nextRaceTime) {
        setTimeUntilRace('Calculating...');
        return;
      }

      const now = Date.now();
      const diff = nextRaceTime - now;

      if (diff <= 0) {
        setTimeUntilRace('Starting soon...');
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeUntilRace(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [nextRaceTime]);

  if (!walletAddress) return null;

  return (
    <div className="min-h-screen gradient-mesh relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}} />
      
      <div className="relative container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-5xl font-bold text-gradient-primary mb-3 tracking-tight">Racing Command Center</h1>
          <p className="text-xl text-white/80">Manage your elite racing stable</p>
        </header>

        <div className="max-w-6xl mx-auto">
          {/* Race Timer */}
          <Card className="gradient-primary rounded-3xl mb-12 shadow-2xl border border-white/20 relative overflow-hidden animate-slideInRight">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
            <CardContent className="p-8 relative">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-5xl floating">🏁</div>
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Timer className="h-6 w-6 text-white/90" />
                    <h3 className="text-2xl font-bold text-white/90">Next Race Countdown</h3>
                  </div>
                  <Card className="bg-black/30 border-white/20">
                    <CardContent className="p-4">
                      <p className="text-5xl font-bold text-white tracking-wider font-mono">{timeUntilRace}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-5xl floating" style={{animationDelay: '1s'}}>🏎️</div>
              </div>
              {racers.filter(r => r.currentStatus === 'ready').length < 2 ? (
                <Alert className="bg-orange-500/20 border-orange-400/30">
                  <AlertDescription className="text-orange-200 flex items-center justify-center gap-3 text-lg font-medium">
                    ⚠️ Need at least 2 ready racers to start racing
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-green-500/20 border-green-400/30">
                  <AlertDescription className="text-green-200 flex items-center justify-center gap-3 text-lg font-medium">
                    ✅ {racers.filter(r => r.currentStatus === 'ready').length} racers ready for epic battles!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Button asChild size="lg" className="gradient-success text-white font-bold py-8 px-8 rounded-2xl shadow-xl text-xl h-auto border-0 relative overflow-hidden group">
              <Link href="/adopt">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-3">
                  <span className="text-3xl">🏎️</span>
                  <span>Adopt New Racer</span>
                </div>
              </Link>
            </Button>
            
            {pendingRewards > 0 && (
              <Button
                onClick={claimRewards}
                disabled={isLoading}
                size="lg"
                className="gradient-accent text-black font-bold py-8 px-8 rounded-2xl shadow-xl text-xl h-auto border-0 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" color="black" />
                      <span>Claiming Rewards...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl">💰</span>
                      <span>Claim {pendingRewards} WLD</span>
                    </>
                  )}
                </div>
              </Button>
            )}
          </div>

          {/* My Racers */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">My Racers</h2>
              <span className="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">{racers.length}</span>
              {racers.length > 0 && (
                <span className="text-gray-400 text-sm">
                  • {racers.filter(r => r.currentStatus === 'ready').length} ready • {racers.filter(r => r.currentStatus === 'in-race').length} racing
                </span>
              )}
            </div>
            
            {racers.length === 0 ? (
              <Card className="glass-card text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl">🏁</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">No Racers Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Adopt your first wacky racer to start earning rewards!
                  </p>
                  <Button asChild size="lg" className="gradient-success">
                    <Link href="/adopt">
                      <Users className="mr-2 h-5 w-5" />
                      Adopt First Racer
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {racers.map((racer) => (
                  <RacerCard key={racer.id} racer={racer} />
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/history" 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-200"
            >
              <h3 className="font-bold text-white mb-1">📊 Race History</h3>
              <p className="text-sm text-gray-300">View past races</p>
            </Link>
            
            <Link 
              href="/transactions" 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-200"
            >
              <h3 className="font-bold text-white mb-1">💳 Transactions</h3>
              <p className="text-sm text-gray-300">View history</p>
            </Link>
            
            <button
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-200"
              onClick={() => window.location.reload()}
            >
              <h3 className="font-bold text-white mb-1">🔄 Refresh</h3>
              <p className="text-sm text-gray-300">Update data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}