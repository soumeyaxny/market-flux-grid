import React, { useState, useEffect, useCallback } from 'react';
import { MarketTile } from './MarketTile';
import { PerformanceMetrics } from './PerformanceMetrics';
import { DataTimeline } from './DataTimeline';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  lastUpdate: number;
}

// Generate realistic crypto market data
const generateCryptoData = (): MarketData[] => {
  const cryptos = [
    'BTC/USD', 'ETH/USD', 'BNB/USD', 'XRP/USD', 'ADA/USD', 'SOL/USD', 'DOGE/USD', 'DOT/USD',
    'AVAX/USD', 'SHIB/USD', 'LTC/USD', 'LINK/USD', 'UNI/USD', 'ATOM/USD', 'XLM/USD', 'BCH/USD',
    'FIL/USD', 'ICP/USD', 'NEAR/USD', 'VET/USD', 'ALGO/USD', 'MANA/USD', 'SAND/USD', 'AXS/USD'
  ];
  
  const basePrices: { [key: string]: number } = {
    'BTC/USD': 45000, 'ETH/USD': 3200, 'BNB/USD': 320, 'XRP/USD': 0.65, 'ADA/USD': 0.48,
    'SOL/USD': 98, 'DOGE/USD': 0.08, 'DOT/USD': 7.2, 'AVAX/USD': 38, 'SHIB/USD': 0.000024,
    'LTC/USD': 72, 'LINK/USD': 15.5, 'UNI/USD': 6.8, 'ATOM/USD': 12.3, 'XLM/USD': 0.11,
    'BCH/USD': 245, 'FIL/USD': 5.8, 'ICP/USD': 13.2, 'NEAR/USD': 3.4, 'VET/USD': 0.025,
    'ALGO/USD': 0.18, 'MANA/USD': 0.42, 'SAND/USD': 0.38, 'AXS/USD': 7.8
  };

  const markets: MarketData[] = [];
  
  // Generate primary crypto markets
  cryptos.forEach(symbol => {
    const basePrice = basePrices[symbol] || Math.random() * 100;
    const change = (Math.random() - 0.5) * basePrice * 0.1;
    const changePercent = (change / basePrice) * 100;
    
    markets.push({
      symbol,
      price: basePrice + change,
      change,
      changePercent,
      volume: Math.floor(Math.random() * 1000000000),
      lastUpdate: Date.now()
    });
  });

  // Generate additional synthetic markets to reach 6000
  const pairs = ['USD', 'EUR', 'BTC', 'ETH', 'USDT'];
  const tokens = [];
  
  // Generate token names
  for (let i = 0; i < 2400; i++) {
    const prefixes = ['DOGE', 'SHIB', 'PEPE', 'FLOKI', 'SAFE', 'MOON', 'ROCKET', 'DIAMOND'];
    const suffixes = ['', '2', 'X', 'INU', 'COIN', 'TOKEN', 'SWAP'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const number = Math.random() < 0.3 ? Math.floor(Math.random() * 1000) : '';
    tokens.push(`${prefix}${number}${suffix}`);
  }

  tokens.forEach(token => {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const symbol = `${token}/${pair}`;
    const basePrice = Math.random() * (Math.random() < 0.7 ? 1 : 1000);
    const change = (Math.random() - 0.5) * basePrice * 0.15;
    const changePercent = (change / basePrice) * 100;
    
    markets.push({
      symbol,
      price: basePrice + change,
      change,
      changePercent,
      volume: Math.floor(Math.random() * 10000000),
      lastUpdate: Date.now()
    });
  });

  return markets.slice(0, 6000);
};

export const MarketWall: React.FC = () => {
  const [markets, setMarkets] = useState<MarketData[]>(() => generateCryptoData());
  const [updatesPerSecond, setUpdatesPerSecond] = useState(0);
  const [latency, setLatency] = useState({ p50: 12.5, p95: 45.2, p99: 89.1 });
  const [updateCount, setUpdateCount] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      const numUpdates = Math.floor(Math.random() * 50) + 10; // 10-60 updates per tick
      
      setMarkets(prevMarkets => {
        const newMarkets = [...prevMarkets];
        
        for (let i = 0; i < numUpdates; i++) {
          const randomIndex = Math.floor(Math.random() * newMarkets.length);
          const market = newMarkets[randomIndex];
          
          // Simulate price movement
          const volatility = Math.random() * 0.02; // 2% max change
          const direction = Math.random() < 0.5 ? -1 : 1;
          const priceChange = market.price * volatility * direction;
          
          const newPrice = Math.max(0.000001, market.price + priceChange);
          const change = newPrice - market.price;
          const changePercent = (change / market.price) * 100;
          
          newMarkets[randomIndex] = {
            ...market,
            price: newPrice,
            change,
            changePercent,
            lastUpdate: Date.now()
          };
        }
        
        return newMarkets;
      });
      
      setUpdateCount(prev => prev + numUpdates);
    }, 100); // Update every 100ms

    return () => clearInterval(updateInterval);
  }, []);

  // Calculate updates per second
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatesPerSecond(updateCount * 10); // Convert to per second (100ms intervals)
      setUpdateCount(0);
      
      // Simulate changing latency
      setLatency({
        p50: 8 + Math.random() * 10,
        p95: 35 + Math.random() * 20,
        p99: 75 + Math.random() * 30
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [updateCount]);

  const handleTileUpdate = useCallback(() => {
    // This is called when a tile updates (for additional effects if needed)
  }, []);

  // Generate 50 numbers that include 1337
  const numbersWith1337 = [
    1337, 13370, 13371, 13372, 13373, 13374, 13375, 13376, 13377, 13378,
    21337, 31337, 41337, 51337, 61337, 71337, 81337, 91337, 101337, 111337,
    121337, 131337, 141337, 151337, 161337, 171337, 181337, 191337, 201337, 211337,
    221337, 231337, 241337, 251337, 261337, 271337, 281337, 291337, 301337, 311337,
    1337001, 1337002, 1337003, 1337004, 1337005, 1337006, 1337007, 1337008, 1337009, 1337010
  ];
  
  const activeTiles = numbersWith1337[Math.floor(Math.random() * numbersWith1337.length)];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold text-foreground">
            The Rialo 1337
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time market data visualization
          </p>
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics
        updatesPerSecond={updatesPerSecond}
        latency={latency}
        totalTiles={6000}
        activeTiles={activeTiles}
      />

      {/* Market Grid */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 xl:grid-cols-24 2xl:grid-cols-30 gap-1">
          {markets.map((market, index) => (
            <MarketTile
              key={`${market.symbol}-${index}`}
              symbol={market.symbol}
              price={market.price}
              change={market.change}
              changePercent={market.changePercent}
              volume={market.volume}
              lastUpdate={market.lastUpdate}
              onUpdate={handleTileUpdate}
            />
          ))}
        </div>
      </div>

      {/* Data Timeline */}
      <DataTimeline />
    </div>
  );
};