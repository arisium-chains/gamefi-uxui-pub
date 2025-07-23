'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { miniappSDK } from '@/lib/MiniappSDK';
import { Racer, Transaction, RaceHistory, RaceParticipant } from '@/types/racer';

interface MiniappSDKContextType {
  // Wallet state
  walletAddress: string | null;
  isConnected: boolean;
  isLoading: boolean;
  
  // App state
  racers: Racer[];
  pendingRewards: number;
  transactions: Transaction[];
  message: string | null;
  raceHistory: RaceHistory[];
  nextRaceTime: number | null;
  
  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  adoptRacer: (amount: number) => Promise<void>;
  boostRacer: (racerId: string, amount: number) => Promise<void>;
  retireRacer: (racerId: string) => Promise<void>;
  claimRewards: () => Promise<void>;
  clearMessage: () => void;
}

const MiniappSDKContext = createContext<MiniappSDKContextType | undefined>(undefined);

export function MiniappSDKProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [racers, setRacers] = useState<Racer[]>([]);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [raceHistory, setRaceHistory] = useState<RaceHistory[]>([]);
  const [nextRaceTime, setNextRaceTime] = useState<number | null>(null);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      const address = await miniappSDK.connectWallet();
      setWalletAddress(address);
      setMessage('Wallet connected successfully!');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await miniappSDK.disconnectWallet();
      setWalletAddress(null);
      setRacers([]);
      setPendingRewards(0);
      setTransactions([]);
      setMessage('Wallet disconnected');
    } catch (error) {
      setMessage('Failed to disconnect wallet');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const adoptRacer = useCallback(async (amount: number) => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const txHash = await miniappSDK.sendTransaction({
        to: '0x1234...', // Mock smart contract address
        data: `adoptRacer(${amount})`,
        value: amount.toString(),
      });

      // Create new racer
      const newRacer: Racer = {
        id: `racer_${Date.now()}`,
        ownerAddress: walletAddress,
        stakedWLD: amount,
        name: generateRandomRacerName(),
        imageUrl: generateRandomRacerImage(),
        currentStatus: 'ready', // All new racers start ready
        stats: {
          luck: Math.floor(Math.random() * 100),
          speed: Math.floor(Math.random() * 100),
          stamina: Math.floor(Math.random() * 100),
        },
        createdAt: Date.now(),
      };

      setRacers(prev => [...prev, newRacer]);
      
      const transaction: Transaction = {
        id: txHash,
        type: 'adopt',
        amount,
        timestamp: Date.now(),
        status: 'confirmed',
        txHash,
      };
      
      setTransactions(prev => [transaction, ...prev]);
      setMessage(`Successfully adopted ${newRacer.name}!`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to adopt racer');
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  const boostRacer = useCallback(async (racerId: string, amount: number) => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const txHash = await miniappSDK.sendTransaction({
        to: '0x1234...',
        data: `boostRacer(${racerId}, ${amount})`,
        value: amount.toString(),
      });

      setRacers(prev => prev.map(racer => 
        racer.id === racerId 
          ? { 
              ...racer, 
              stakedWLD: racer.stakedWLD + amount,
              stats: {
                luck: Math.min(100, racer.stats.luck + 10),
                speed: Math.min(100, racer.stats.speed + 10),
                stamina: Math.min(100, racer.stats.stamina + 10),
              }
            }
          : racer
      ));

      const transaction: Transaction = {
        id: txHash,
        type: 'boost',
        amount,
        timestamp: Date.now(),
        status: 'confirmed',
        txHash,
      };
      
      setTransactions(prev => [transaction, ...prev]);
      setMessage(`Successfully boosted racer!`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to boost racer');
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  const retireRacer = useCallback(async (racerId: string) => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const racer = racers.find(r => r.id === racerId);
      if (!racer) throw new Error('Racer not found');
      
      const txHash = await miniappSDK.sendTransaction({
        to: '0x1234...',
        data: `retireRacer(${racerId})`,
      });

      setRacers(prev => prev.filter(r => r.id !== racerId));
      
      const transaction: Transaction = {
        id: txHash,
        type: 'retire',
        amount: racer.stakedWLD,
        timestamp: Date.now(),
        status: 'confirmed',
        txHash,
      };
      
      setTransactions(prev => [transaction, ...prev]);
      setMessage(`Successfully retired ${racer.name} and claimed ${racer.stakedWLD} WLD!`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to retire racer');
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, racers]);

  const claimRewards = useCallback(async () => {
    if (!walletAddress || pendingRewards === 0) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const txHash = await miniappSDK.sendTransaction({
        to: '0x1234...',
        data: 'claimRewards()',
      });

      const transaction: Transaction = {
        id: txHash,
        type: 'claim',
        amount: pendingRewards,
        timestamp: Date.now(),
        status: 'confirmed',
        txHash,
      };
      
      setTransactions(prev => [transaction, ...prev]);
      setMessage(`Successfully claimed ${pendingRewards} WLD!`);
      setPendingRewards(0);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to claim rewards');
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, pendingRewards]);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  // Race simulation logic
  const simulateRace = useCallback(() => {
    const eligibleRacers = racers.filter(r => r.currentStatus === 'ready');
    
    if (eligibleRacers.length < 2) {
      setMessage('Need at least 2 ready racers for a race!');
      return;
    }

    // Set all eligible racers to in-race status
    setRacers(prev => prev.map(racer => 
      eligibleRacers.find(r => r.id === racer.id) 
        ? { ...racer, currentStatus: 'in-race' as 'in-race' }
        : racer
    ));

    // Create race participants with performance calculations
    const participants: RaceParticipant[] = eligibleRacers.map(racer => {
      // Calculate performance based on stats and some randomness
      const statBonus = (racer.stats.luck + racer.stats.speed + racer.stats.stamina) / 3;
      const randomFactor = Math.random() * 50;
      const stakeBonus = Math.min(racer.stakedWLD / 10, 20); // Up to 20% bonus for high stakes
      const performance = Math.min(100, statBonus * 0.7 + randomFactor + stakeBonus);

      return {
        racerId: racer.id,
        racerName: racer.name,
        ownerAddress: racer.ownerAddress,
        position: 0, // Will be set after sorting
        reward: 0, // Will be calculated based on position
        performance: Math.floor(performance)
      };
    });

    // Sort by performance (highest first)
    participants.sort((a, b) => b.performance - a.performance);

    // Assign positions and calculate rewards
    const totalPrizePool = participants.length * 5; // 5 WLD per participant
    participants.forEach((participant, index) => {
      participant.position = index + 1;
      
      // Reward distribution: 1st: 50%, 2nd: 30%, 3rd: 20%
      if (participant.position === 1) {
        participant.reward = Math.floor(totalPrizePool * 0.5);
      } else if (participant.position === 2) {
        participant.reward = Math.floor(totalPrizePool * 0.3);
      } else if (participant.position === 3) {
        participant.reward = Math.floor(totalPrizePool * 0.2);
      }
    });

    // Create race history entry
    const newRace: RaceHistory = {
      id: `race_${Date.now()}`,
      timestamp: Date.now(),
      participants,
      status: 'completed',
      duration: 30 // 30 seconds race duration
    };

    setRaceHistory(prev => [newRace, ...prev]);

    // Update racers with race results
    setRacers(prev => prev.map(racer => {
      const participant = participants.find(p => p.racerId === racer.id);
      if (participant) {
        const newStatus: 'won' | 'lost' = participant.position === 1 ? 'won' : 'lost';
        return {
          ...racer,
          currentStatus: newStatus,
          lastRaceOutcome: {
            position: participant.position,
            rewards: participant.reward
          }
        };
      }
      return racer;
    }));

    // Update pending rewards for the connected wallet
    if (walletAddress) {
      const myWinnings = participants
        .filter(p => p.ownerAddress === walletAddress && p.reward > 0)
        .reduce((sum, p) => sum + p.reward, 0);
      
      if (myWinnings > 0) {
        setPendingRewards(prev => prev + myWinnings);
        setMessage(`🏁 Race completed! You won ${myWinnings} WLD!`);
      } else {
        const myRacers = participants.filter(p => p.ownerAddress === walletAddress);
        if (myRacers.length > 0) {
          const bestPosition = Math.min(...myRacers.map(r => r.position));
          setMessage(`🏁 Race completed! Your best position: #${bestPosition}`);
        }
      }
    }

    // Reset racer statuses after 5 seconds
    setTimeout(() => {
      setRacers(prev => prev.map(racer => {
        if (racer.currentStatus === 'won' || racer.currentStatus === 'lost') {
          return { ...racer, currentStatus: 'ready' };
        }
        return racer;
      }));
    }, 5000);

    // Schedule next race
    const nextTime = Date.now() + 1 * 60 * 1000; // 1 minute from now (reduced for testing)
    setNextRaceTime(nextTime);
  }, [racers, walletAddress]);

  // Set up race scheduling
  useEffect(() => {
    if (!nextRaceTime) {
      // Initialize next race time
      setNextRaceTime(Date.now() + 1 * 60 * 1000); // 1 minute for testing
      return;
    }

    const timeUntilRace = nextRaceTime - Date.now();
    
    if (timeUntilRace <= 0) {
      // Time for a race!
      simulateRace();
    } else {
      // Schedule the race
      const timer = setTimeout(() => {
        simulateRace();
      }, timeUntilRace);

      return () => clearTimeout(timer);
    }
  }, [nextRaceTime, simulateRace]);

  const value: MiniappSDKContextType = {
    walletAddress,
    isConnected: !!walletAddress,
    isLoading,
    racers,
    pendingRewards,
    transactions,
    message,
    raceHistory,
    nextRaceTime,
    connectWallet,
    disconnectWallet,
    adoptRacer,
    boostRacer,
    retireRacer,
    claimRewards,
    clearMessage,
  };

  return (
    <MiniappSDKContext.Provider value={value}>
      {children}
    </MiniappSDKContext.Provider>
  );
}

export function useMiniappSDK() {
  const context = useContext(MiniappSDKContext);
  if (context === undefined) {
    throw new Error('useMiniappSDK must be used within a MiniappSDKProvider');
  }
  return context;
}

// Helper functions for generating mock data
function generateRandomRacerName(): string {
  const adjectives = ['Speedy', 'Lightning', 'Turbo', 'Swift', 'Blazing', 'Rocket', 'Thunder', 'Flash'];
  const nouns = ['Dasher', 'Runner', 'Racer', 'Bolt', 'Zoom', 'Rush', 'Blitz', 'Streak'];
  
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

function generateRandomRacerImage(): string {
  const creatures = ['dragon', 'phoenix', 'unicorn', 'griffin', 'pegasus', 'tiger', 'cheetah', 'falcon'];
  const colors = ['red', 'blue', 'green', 'purple', 'gold', 'silver', 'orange', 'pink'];
  
  const creature = creatures[Math.floor(Math.random() * creatures.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${creature}-${color}`;
}