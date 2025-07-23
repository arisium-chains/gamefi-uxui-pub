'use client';

import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface WldInputFormProps {
  onSubmit: (amount: number) => void;
  isLoading: boolean;
  minAmount?: number;
  maxAmount?: number;
}

export default function WldInputForm({ 
  onSubmit, 
  isLoading, 
  minAmount = 10, 
  maxAmount = 1000 
}: WldInputFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateAmount = (value: string): string => {
    const numValue = parseFloat(value);
    
    if (!value || isNaN(numValue)) {
      return 'Please enter a valid amount';
    }
    
    if (numValue < minAmount) {
      return `Minimum amount is ${minAmount} WLD`;
    }
    
    if (numValue > maxAmount) {
      return `Maximum amount is ${maxAmount} WLD`;
    }
    
    return '';
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const validationError = validateAmount(value);
    setError(validationError);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateAmount(amount);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onSubmit(parseFloat(amount));
  };

  const presetAmounts = [10, 25, 50, 100];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="wld-amount" className="block text-sm font-medium text-gray-300 mb-2">
          WLD Amount to Stake
        </label>
        <div className="relative">
          <Input
            type="number"
            id="wld-amount"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder={`Enter amount (${minAmount}-${maxAmount} WLD)`}
            className="pr-16 text-lg py-6 glass-card border-yellow-400/20 focus:border-yellow-400/50"
            disabled={isLoading}
            step="0.1"
            min={minAmount}
            max={maxAmount}
          />
          <Badge 
            variant="secondary" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
          >
            WLD
          </Badge>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <p className="mt-2 text-xs text-gray-400">
          Higher stakes increase your racer&apos;s performance and potential rewards
        </p>
      </div>

      {/* Preset Amount Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Quick Select:
        </label>
        <div className="grid grid-cols-4 gap-2">
          {presetAmounts.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAmountChange(preset.toString())}
              disabled={isLoading}
              className="glass-button hover:bg-yellow-400/10 hover:border-yellow-400/30"
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>

      {/* Racer Preview */}
      {amount && !error && (
        <Card className="glass-card border-green-500/20">
          <CardHeader>
            <CardTitle className="text-lg text-gradient-primary flex items-center gap-2">
              🏎️ Your New Racer Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-muted-foreground mb-2">Base Stats</div>
                <Badge variant="outline" className="glass-button">Random</Badge>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground mb-2">Stake Bonus</div>
                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                  +{Math.floor(parseFloat(amount) / 10)}%
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground mb-2">Win Potential</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {Math.floor(parseFloat(amount) * 0.1)}-{Math.floor(parseFloat(amount) * 0.3)} WLD
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        type="submit"
        disabled={isLoading || !!error || !amount}
        size="lg"
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold py-6 shadow-2xl border-0"
      >
        {isLoading ? (
          <LoadingSpinner size="md" color="black" text="Adopting Racer..." />
        ) : (
          <>
            <span className="text-xl mr-2">🏎️</span>
            Adopt Racer for {amount || '0'} WLD
          </>
        )}
      </Button>
      
      <p className="text-xs text-gray-400 text-center">
        This will create a transaction to stake your WLD tokens
      </p>
    </form>
  );
}