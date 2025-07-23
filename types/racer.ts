export interface Racer {
  id: string;
  ownerAddress: string;
  stakedWLD: number;
  name: string;
  imageUrl: string;
  currentStatus: 'ready' | 'in-race' | 'won' | 'lost' | 'retired';
  lastRaceOutcome?: {
    position: number;
    rewards: number;
  };
  stats: {
    luck: number;
    speed: number;
    stamina: number;
  };
  createdAt: number;
}

export interface Transaction {
  id: string;
  type: 'adopt' | 'boost' | 'retire' | 'claim';
  amount: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  txHash?: string;
}

export interface RaceHistory {
  id: string;
  timestamp: number;
  participants: RaceParticipant[];
  status: 'scheduled' | 'in-progress' | 'completed';
  duration: number; // in seconds
}

export interface RaceParticipant {
  racerId: string;
  racerName: string;
  ownerAddress: string;
  position: number;
  reward: number;
  performance: number; // 0-100 score
}