'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import MessageDisplay from '@/components/MessageDisplay';
import RaceEntry from '@/components/RaceEntry';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Award, Target } from 'lucide-react';

export default function HistoryPage() {
  const { isConnected, raceHistory, walletAddress } = useMiniappSDK();

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
              Please connect your wallet to view race history.
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
            <h1 className="text-4xl font-bold text-white mb-2">Race History</h1>
            <p className="text-gray-300">View your racers&apos; performance in past races</p>
          </header>

          <div className="max-w-4xl mx-auto">
            {raceHistory.length === 0 ? (
              <Card className="glass-card text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-blue-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-blue-500/30">
                    <Trophy className="h-12 w-12 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">No Races Yet</h2>
                  <p className="text-muted-foreground mb-2">
                    Races occur automatically every minute when at least 2 racers are ready.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    Adopt some racers to start participating!
                  </p>
                  <Button asChild size="lg" className="gradient-success">
                    <Link href="/adopt">
                      <Target className="mr-2 h-5 w-5" />
                      Adopt Racers
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Race Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30">
                    <CardContent className="p-6 text-center">
                      <Trophy className="h-8 w-8 mx-auto mb-3 text-blue-400" />
                      <p className="text-muted-foreground text-sm mb-2">Total Races</p>
                      <p className="text-3xl font-bold">{raceHistory.length}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/30">
                    <CardContent className="p-6 text-center">
                      <Award className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
                      <p className="text-muted-foreground text-sm mb-2">Your Wins</p>
                      <p className="text-3xl font-bold text-yellow-400">
                        {raceHistory.reduce((wins, race) => 
                          wins + race.participants.filter(p => p.ownerAddress === walletAddress && p.position === 1).length, 0
                        )}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30">
                    <CardContent className="p-6 text-center">
                      <span className="text-3xl block mb-3">💰</span>
                      <p className="text-muted-foreground text-sm mb-2">Total Rewards</p>
                      <p className="text-3xl font-bold text-green-400">
                        {raceHistory.reduce((total, race) => 
                          total + race.participants
                            .filter(p => p.ownerAddress === walletAddress)
                            .reduce((sum, p) => sum + p.reward, 0), 0
                        )} WLD
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                      <p className="text-muted-foreground text-sm mb-2">Win Rate</p>
                      <p className="text-3xl font-bold text-purple-400">
                        {raceHistory.length > 0 
                          ? Math.round((raceHistory.reduce((wins, race) => 
                              wins + race.participants.filter(p => p.ownerAddress === walletAddress && p.position === 1).length, 0
                            ) / raceHistory.reduce((total, race) => 
                              total + race.participants.filter(p => p.ownerAddress === walletAddress).length, 0
                            )) * 100) 
                          : 0}%
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Race History List */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold">Recent Races</h2>
                    <Badge variant="secondary" className="text-sm font-bold">{raceHistory.length}</Badge>
                  </div>
                  {raceHistory.map((race) => (
                    <RaceEntry 
                      key={race.id} 
                      race={race} 
                      userAddress={walletAddress}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MessageDisplay />
    </>
  );
}