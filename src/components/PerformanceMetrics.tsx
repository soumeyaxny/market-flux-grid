import React from 'react';
import { cn } from '@/lib/utils';

interface PerformanceMetricsProps {
  updatesPerSecond: number;
  latency: {
    p50: number;
    p95: number;
    p99: number;
  };
  totalTiles: number;
  activeTiles: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  updatesPerSecond,
  latency,
  totalTiles,
  activeTiles
}) => {
  
  const getLatencyColor = (ms: number) => {
    if (ms < 10) return 'text-metric-excellent';
    if (ms < 50) return 'text-metric-good';
    if (ms < 100) return 'text-metric-warning';
    return 'text-metric-critical';
  };

  const getUpdatesColor = (ups: number) => {
    if (ups > 1000) return 'text-metric-excellent';
    if (ups > 500) return 'text-metric-good';
    if (ups > 100) return 'text-metric-warning';
    return 'text-metric-critical';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Updates per second */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Updates/Sec
          </div>
          <div className={cn("text-2xl font-mono font-bold", getUpdatesColor(updatesPerSecond))}>
            {updatesPerSecond.toLocaleString()}
          </div>
        </div>

        {/* P50 Latency */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            P50 Latency
          </div>
          <div className={cn("text-2xl font-mono font-bold", getLatencyColor(latency.p50))}>
            {latency.p50.toFixed(1)}
            <span className="text-sm text-muted-foreground ml-1">ms</span>
          </div>
        </div>

        {/* P95 Latency */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            P95 Latency
          </div>
          <div className={cn("text-2xl font-mono font-bold", getLatencyColor(latency.p95))}>
            {latency.p95.toFixed(1)}
            <span className="text-sm text-muted-foreground ml-1">ms</span>
          </div>
        </div>

        {/* P99 Latency */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            P99 Latency
          </div>
          <div className={cn("text-2xl font-mono font-bold", getLatencyColor(latency.p99))}>
            {latency.p99.toFixed(1)}
            <span className="text-sm text-muted-foreground ml-1">ms</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Active Tiles
          </div>
          <div className="text-lg font-mono font-bold text-primary">
            {activeTiles.toLocaleString()} 
            <span className="text-sm text-muted-foreground">/ {totalTiles.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Coverage
          </div>
          <div className="text-lg font-mono font-bold text-accent">
            {((activeTiles / totalTiles) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};