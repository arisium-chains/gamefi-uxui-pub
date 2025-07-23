'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import Dashboard from '@/components/Dashboard';
import WalletConnectButton from '@/components/WalletConnectButton';
import MessageDisplay from '@/components/MessageDisplay';
import BottomNavigation from '@/components/BottomNavigation';

export default function Home() {
  const { isConnected } = useMiniappSDK();

  if (isConnected) {
    return (
      <>
        <Dashboard />
        <MessageDisplay />
        <BottomNavigation />
      </>
    );
  }

  // Figma Splash Screen Design
  return (
    <div className="mobile-container">
      <div className="splash-screen">
        <div className="mb-8 text-center">
          <div className="splash-logo">WLD Wacky Racers</div>
          <div className="splash-tagline">Stake WLD, Race Wacky, Earn Rewards!</div>
        </div>
        
        <div className="w-full max-w-sm">
          <WalletConnectButton />
          
          <div className="mt-6 text-center">
            <button className="text-muted-foreground text-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <MessageDisplay />
    </div>
  );
}
