'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import LoadingSpinner from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function WalletConnectButton() {
  const { connectWallet, disconnectWallet, isConnected, isLoading, walletAddress } = useMiniappSDK();

  if (isConnected && walletAddress) {
    return (
      <div className="flex flex-col items-center gap-6">
        <Card className="glass-card border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                Connected
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
              <code className="text-lg font-mono bg-muted/50 px-4 py-2 rounded-lg border">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </code>
            </div>
          </CardContent>
        </Card>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          disabled={isLoading}
          className="glass-button"
        >
          {isLoading ? 'Disconnecting...' : 'Disconnect Wallet'}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isLoading}
      size="lg"
      className="w-full text-lg py-6 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold shadow-2xl relative overflow-hidden group border-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className="relative flex items-center justify-center gap-3">
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" color="black" />
            <span>Connecting Wallet...</span>
          </>
        ) : (
          <>
            <span className="text-2xl">🔗</span>
            <span>Connect Wallet</span>
          </>
        )}
      </div>
    </Button>
  );
}