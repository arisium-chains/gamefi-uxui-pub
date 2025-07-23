'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import Dashboard from '@/components/Dashboard';
import WalletConnectButton from '@/components/WalletConnectButton';
import MessageDisplay from '@/components/MessageDisplay';

export default function Home() {
  const { isConnected } = useMiniappSDK();

  if (isConnected) {
    return (
      <>
        <Dashboard />
        <MessageDisplay />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen gradient-mesh relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        
        <div className="relative container mx-auto px-4 py-8">
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-6xl font-bold text-gradient-primary mb-4 tracking-tight">
              WLD Wacky Racers
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The ultimate GameFi racing experience on Worldcoin
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="card-primary max-w-lg w-full text-center animate-slideInRight" style={{animationDelay: '0.3s'}}>
              <div className="mb-8">
                <div className="w-32 h-32 gradient-accent rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl floating">
                  <span className="text-5xl">🏎️</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Welcome to the Race!</h2>
                <p className="text-gray-300 mb-2 text-lg leading-relaxed">
                  Stake WLD tokens to adopt unique racing creatures
                </p>
                <p className="text-gray-400 text-sm">
                  Participate in automated races and earn rewards
                </p>
              </div>
              
              <div className="space-y-4">
                <WalletConnectButton />
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Races every minute • Auto rewards • Real-time competition</span>
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
