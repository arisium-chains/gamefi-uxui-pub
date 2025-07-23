'use client';

import { Racer } from '@/types/racer';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface RacerCardProps {
  racer: Racer;
}

export default function RacerCard({ racer }: RacerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-race': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'won': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'lost': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return '🏁 Ready to Race';
      case 'in-race': return '🏃 Racing...';
      case 'won': return '🏆 Won!';
      case 'lost': return '😔 Lost';
      default: return status;
    }
  };

  return (
    <Link href={`/racer/${racer.id}`}>
      <Card className="card-interactive group relative overflow-hidden animate-fadeInUp transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Racer Image */}
        <CardHeader className="text-center pb-4">
          <div className="w-24 h-24 gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-2 border-white/30 shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Image 
              src={racer.imageUrl} 
              alt={racer.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.classList.remove('hidden');
              }}
            />
            <span className="text-3xl hidden">🏎️</span>
          </div>
          
          <h3 className="text-xl font-bold group-hover:text-gradient-primary transition-all duration-300">{racer.name}</h3>
          <Badge 
            className={`${getStatusColor(racer.currentStatus)} ${racer.currentStatus === 'in-race' ? 'animate-pulse' : ''}`}
          >
            {getStatusText(racer.currentStatus)}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <span className="text-yellow-400">💰</span>
                <span className="font-medium">Staked WLD</span>
              </span>
              <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 border-yellow-400/30">
                {racer.stakedWLD}
              </Badge>
            </div>
            
            {racer.lastRaceOutcome && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span>🏆</span>
                  <span className="font-medium">Last Race</span>
                </span>
                <div className="text-right">
                  <Badge variant="outline" className="mr-1">#{racer.lastRaceOutcome.position}</Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    +{racer.lastRaceOutcome.rewards} WLD
                  </Badge>
                </div>
              </div>
            )}
          </div>
          
          <Separator className="bg-white/10" />

          {/* Performance Stats */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-center mb-3">Performance Stats</h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-purple-300 flex items-center gap-2 font-medium">
                    <span>🍀</span> Luck
                  </span>
                  <Badge variant="outline" className="text-purple-300 border-purple-300/30">
                    {racer.stats.luck}%
                  </Badge>
                </div>
                <Progress 
                  value={racer.stats.luck} 
                  className="h-2 bg-gray-700/50"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-blue-300 flex items-center gap-2 font-medium">
                    <span>⚡</span> Speed
                  </span>
                  <Badge variant="outline" className="text-blue-300 border-blue-300/30">
                    {racer.stats.speed}%
                  </Badge>
                </div>
                <Progress 
                  value={racer.stats.speed} 
                  className="h-2 bg-gray-700/50"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-green-300 flex items-center gap-2 font-medium">
                    <span>💪</span> Stamina
                  </span>
                  <Badge variant="outline" className="text-green-300 border-green-300/30">
                    {racer.stats.stamina}%
                  </Badge>
                </div>
                <Progress 
                  value={racer.stats.stamina} 
                  className="h-2 bg-gray-700/50"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}