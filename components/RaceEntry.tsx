'use client';

import { RaceHistory } from '@/types/racer';

interface RaceEntryProps {
  race: RaceHistory;
  userAddress: string | null;
}

export default function RaceEntry({ race, userAddress }: RaceEntryProps) {
  const getPositionEmoji = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏁';
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-orange-400';
      default: return 'text-white';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const myRacers = race.participants.filter(p => p.ownerAddress === userAddress);
  const hasWon = myRacers.some(r => r.position === 1);
  const hasPodiumFinish = myRacers.some(r => r.position <= 3);
  const totalWinnings = myRacers.reduce((sum, r) => sum + r.reward, 0);

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 ${hasWon ? 'border-2 border-yellow-400' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Race #{race.id.split('_')[1].slice(-6)}
          </h3>
          <p className="text-sm text-gray-300">{formatTimestamp(race.timestamp)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">{race.participants.length} Racers</p>
          <p className="text-xs text-gray-500">Duration: {race.duration}s</p>
        </div>
      </div>

      {/* Race Results */}
      <div className="space-y-2 mb-4">
        {race.participants.slice(0, 5).map((participant) => {
          const isMyRacer = participant.ownerAddress === userAddress;
          
          return (
            <div 
              key={participant.racerId}
              className={`flex items-center justify-between p-2 rounded-lg ${
                isMyRacer ? 'bg-white/10 border border-white/20' : 'bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getPositionEmoji(participant.position)}</span>
                <div>
                  <p className={`font-medium ${isMyRacer ? 'text-yellow-400' : 'text-white'}`}>
                    {participant.racerName}
                    {isMyRacer && <span className="text-xs ml-2">(yours)</span>}
                  </p>
                  <p className="text-xs text-gray-400">
                    Performance: {participant.performance}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getPositionColor(participant.position)}`}>
                  #{participant.position}
                </p>
                {participant.reward > 0 && (
                  <p className="text-sm text-green-400">+{participant.reward} WLD</p>
                )}
              </div>
            </div>
          );
        })}
        
        {race.participants.length > 5 && (
          <p className="text-center text-sm text-gray-400 pt-2">
            And {race.participants.length - 5} more racers...
          </p>
        )}
      </div>

      {/* User Summary */}
      {userAddress && myRacers.length > 0 && (
        <div className={`border-t border-white/20 pt-4 ${hasWon ? 'bg-yellow-400/10 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl' : ''}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-300">
                Your Racers: {myRacers.length}
              </p>
              {hasPodiumFinish && (
                <p className="text-xs text-yellow-400 mt-1">
                  🏆 Podium Finish!
                </p>
              )}
            </div>
            <div className="text-right">
              {totalWinnings > 0 ? (
                <>
                  <p className="text-green-400 font-bold">+{totalWinnings} WLD</p>
                  <p className="text-xs text-gray-400">Total Winnings</p>
                </>
              ) : (
                <p className="text-sm text-gray-400">No rewards</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}