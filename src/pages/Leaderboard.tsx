import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  accuracy: number;
  predictions: number;
  timestamp: string;
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'CryptoKing', score: 1247, accuracy: 78.3, predictions: 1592, timestamp: '2024-01-15' },
  { rank: 2, username: 'MarketMaster', score: 892, accuracy: 71.2, predictions: 1253, timestamp: '2024-01-14' },
  { rank: 3, username: 'TradingBot', score: 745, accuracy: 69.8, predictions: 1067, timestamp: '2024-01-13' },
  { rank: 4, username: 'BullRider', score: 623, accuracy: 65.4, predictions: 953, timestamp: '2024-01-12' },
  { rank: 5, username: 'DiamondHands', score: 589, accuracy: 64.1, predictions: 919, timestamp: '2024-01-11' },
  { rank: 6, username: 'MoonShot', score: 434, accuracy: 58.7, predictions: 739, timestamp: '2024-01-10' },
  { rank: 7, username: 'StockWiz', score: 367, accuracy: 55.2, predictions: 665, timestamp: '2024-01-09' },
  { rank: 8, username: 'FutureSeeker', score: 298, accuracy: 52.8, predictions: 564, timestamp: '2024-01-08' },
  { rank: 9, username: 'PredictPro', score: 234, accuracy: 49.6, predictions: 472, timestamp: '2024-01-07' },
  { rank: 10, username: 'ChartChaser', score: 187, accuracy: 46.3, predictions: 404, timestamp: '2024-01-06' },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankBadgeVariant = (rank: number) => {
  switch (rank) {
    case 1:
      return 'default';
    case 2:
      return 'secondary';
    case 3:
      return 'outline';
    default:
      return 'outline';
  }
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold text-foreground">
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Top prediction masters of The Rialo 1337
          </p>
        </div>
        
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Game
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              Active prediction masters
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">
              Predictions made today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52.3%</div>
            <p className="text-xs text-muted-foreground">
              Global prediction rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  entry.rank <= 3 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-card hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(entry.rank)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-foreground">
                        {entry.username}
                      </span>
                      {entry.rank <= 3 && (
                        <Badge variant={getRankBadgeVariant(entry.rank)} className="text-xs">
                          {entry.rank === 1 ? 'Champion' : entry.rank === 2 ? 'Runner-up' : 'Third'}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {entry.predictions} predictions • {entry.accuracy}% accuracy
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-mono font-bold ${
                    entry.score >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {entry.score >= 0 ? '+' : ''}{entry.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-4">
              Start playing to see your stats here!
            </div>
            <Link to="/">
              <Button>
                Start Predicting
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;