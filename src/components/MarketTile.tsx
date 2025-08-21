import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MarketTileProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  shortPrice?: number;
  longPrice?: number;
  volume?: number;
  lastUpdate: number;
  onUpdate?: () => void;
}

export const MarketTile: React.FC<MarketTileProps> = ({
  symbol,
  price,
  change,
  changePercent,
  shortPrice,
  longPrice,
  volume,
  lastUpdate,
  onUpdate
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [previousPrice, setPreviousPrice] = useState(price);

  useEffect(() => {
    if (price !== previousPrice) {
      setIsUpdating(true);
      setPreviousPrice(price);
      onUpdate?.();
      
      const timeout = setTimeout(() => setIsUpdating(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [price, previousPrice, onUpdate]);

  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div
      className={cn(
        "market-tile group relative select-none",
        isUpdating && "updating",
        isPositive && "positive",
        isNegative && "negative"
      )}
    >
      {/* Glow effect overlay */}
      {isUpdating && (
        <div className="absolute inset-0 pointer-events-none animate-pulse-glow rounded-sm" />
      )}
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Symbol */}
        <div className="text-xs font-bold text-foreground mb-1 truncate">
          {symbol}
        </div>
        
        {/* Bid/Ask Prices */}
        {shortPrice !== undefined && longPrice !== undefined ? (
          <div className="text-xs font-mono leading-tight mb-1 space-y-0.5">
            <div className="flex justify-between">
              <span className="text-destructive">B:</span>
              <span className="text-destructive">
                {shortPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-success">A:</span>
              <span className="text-success">
                {longPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4
                })}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-sm font-mono font-bold leading-tight mb-1">
            {price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            })}
          </div>
        )}
        
        {/* Change */}
        <div className="flex items-center justify-between text-xs">
          <span
            className={cn(
              "font-mono font-medium",
              isPositive && "text-success",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}
          >
            {change >= 0 ? '+' : ''}{change.toFixed(2)}
          </span>
          <span
            className={cn(
              "font-mono text-xs",
              isPositive && "text-success",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}
          >
            {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        </div>
        
        {/* Volume (if provided) */}
        {volume && (
          <div className="text-xs text-muted-foreground mt-1 truncate">
            Vol: {volume.toLocaleString()}
          </div>
        )}
        
        {/* Update indicator */}
        <div className="absolute top-1 right-1">
          <div
            className={cn(
              "w-1 h-1 rounded-full transition-opacity duration-300",
              isUpdating ? "bg-primary opacity-100" : "bg-muted opacity-30"
            )}
          />
        </div>
      </div>
    </div>
  );
};