'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { ArrowLeft, Wallet, Clock, Bell, Globe, Moon } from 'lucide-react';

export default function SettingsPage() {
  const { walletAddress, isConnected } = useMiniappSDK();

  if (!isConnected) {
    return (
      <div className="mobile-container">
        <div className="mobile-page">
          <div className="splash-screen">
            <div className="mobile-title">Settings</div>
            <p className="mobile-subtitle">Please connect your wallet to access settings.</p>
            <Link href="/" className="btn-figma-primary">
              Go Home
            </Link>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="mobile-header">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Settings</h1>
        <div className="w-5 h-5" /> {/* Spacer */}
      </div>

      <div className="mobile-page">
        {/* Account Section */}
        <div className="mb-6">
          <h2 className="mobile-section-title">Account</h2>
          
          <div className="settings-item">
            <div className="settings-icon">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Wallet Address</div>
              <div className="text-sm text-muted-foreground">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </div>
            </div>
          </div>

          <Link href="/transactions" className="settings-item">
            <div className="settings-icon">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Transaction History</div>
            </div>
          </Link>
        </div>

        {/* App Settings Section */}
        <div className="mb-6">
          <h2 className="mobile-section-title">App Settings</h2>
          
          <div className="settings-item">
            <div className="settings-icon">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Notifications</div>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-icon">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Language</div>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-icon">
              <Moon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Theme</div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-muted-foreground text-sm mt-8">
          <p>WLD Wacky Racers v1.0.0</p>
          <p className="mt-1">Built on Worldcoin</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}