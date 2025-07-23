'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import MessageDisplay from '@/components/MessageDisplay';
import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AdoptPage() {
  const { adoptRacer, isLoading, isConnected, walletAddress } = useMiniappSDK();
  const [isSuccess, setIsSuccess] = useState(false);
  const [wldAmount, setWldAmount] = useState<number>(5);

  if (!isConnected || !walletAddress) {
    return (
      <div className="mobile-container">
        <div className="splash-screen">
          <div className="mobile-title">Adopt a Wacky Racer</div>
          <p className="mobile-subtitle">Please connect your wallet to adopt a racer.</p>
          <Link href="/" className="btn-figma-primary">
            Go Home
          </Link>
        </div>
        <MessageDisplay />
        <BottomNavigation />
      </div>
    );
  }

  const handleAdoptRacer = async () => {
    try {
      await adoptRacer(wldAmount);
      setIsSuccess(true);
    } catch {
      // Error handling is done in the context
    }
  };

  if (isSuccess) {
    return (
      <div className="mobile-container">
        <div className="splash-screen">
          <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🎉</span>
          </div>
          <div className="mobile-title">Racer Adopted Successfully!</div>
          <p className="mobile-subtitle">
            Your new wacky racer is ready to compete and earn rewards!
          </p>
          <div className="w-full max-w-sm space-y-3">
            <Link href="/" className="btn-figma-primary">
              View My Racers
            </Link>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full py-3 px-6 text-muted-foreground bg-card border border-border rounded-2xl"
            >
              Adopt Another Racer
            </button>
          </div>
        </div>
        <MessageDisplay />
        <BottomNavigation />
      </div>
    );
  }

  // Figma Adoption Screen Design
  return (
    <div className="mobile-container">
      <div className="mobile-header">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Adopt a Wacky Racer</h1>
        <div className="w-5 h-5" /> {/* Spacer */}
      </div>

      <div className="mobile-page">
        {/* 3D Egg Incubator - Figma Style */}
        <div className="egg-incubator mb-8">
          <div className="text-8xl animate-pulse">🥚</div>
        </div>

        {/* WLD Input Card */}
        <div className="mobile-card">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <input
                type="number"
                value={wldAmount}
                onChange={(e) => setWldAmount(Number(e.target.value))}
                className="mobile-input text-center text-3xl font-bold border-2 border-primary/20 focus:border-primary"
                min="1"
                max="100"
                placeholder="5.00"
              />
            </div>
            <div className="text-xl font-bold text-muted-foreground">WLD</div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              Min: 1 WLD, Max: 100 WLD.
            </p>
            <button 
              className="px-6 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => setWldAmount(100)}
            >
              MAX
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-8 px-4">
          <p className="text-muted-foreground leading-relaxed">
            Staking WLD creates a unique racer and enters it into races!
          </p>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <button
            onClick={handleAdoptRacer}
            disabled={isLoading || wldAmount < 1}
            className="btn-figma-primary"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating Racer...</span>
              </div>
            ) : (
              'Generate My Racer!'
            )}
          </button>
        </div>
      </div>

      <MessageDisplay />
      <BottomNavigation />
    </div>
  );
}