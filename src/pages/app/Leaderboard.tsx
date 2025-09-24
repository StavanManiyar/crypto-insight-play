import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api";
import { Trophy, TrendingUp, TrendingDown, Medal, Award, Target } from "lucide-react";

const Leaderboard = () => {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => apiClient.getLeaderboard(),
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{rank}</div>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">Top performing paper traders</p>
        </div>
        
        <Card className="trading-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const topPerformers = leaderboard?.slice(0, 3) || [];
  const otherTraders = leaderboard?.slice(3) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">Top performing paper traders in our community</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-4">
        {topPerformers.map((trader) => (
          <Card key={trader.rank} className={`trading-card ${trader.rank === 1 ? 'ring-2 ring-primary/50' : ''}`}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                {getRankIcon(trader.rank)}
              </div>
              
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarFallback className="text-lg font-bold">
                  {trader.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="font-semibold text-lg mb-2">{trader.username}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className={`text-2xl font-bold ${trader.returnPct >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {trader.returnPct >= 0 ? '+' : ''}{trader.returnPct.toFixed(1)}%
                  </div>
                  {trader.returnPct >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-success" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {trader.trades} trades • {trader.maxDD.toFixed(1)}% max DD
                </div>
                
                {trader.sharpe && (
                  <Badge variant="outline" className="text-xs">
                    Sharpe: {trader.sharpe.toFixed(2)}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            All Traders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="returns" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="returns">By Returns</TabsTrigger>
              <TabsTrigger value="sharpe">By Sharpe Ratio</TabsTrigger>
              <TabsTrigger value="trades">By Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="returns" className="space-y-4">
              <div className="space-y-2">
                {leaderboard?.map((trader) => (
                  <div key={trader.rank} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Badge variant={getRankBadgeVariant(trader.rank)} className="flex items-center gap-1">
                        {getRankIcon(trader.rank)}
                        #{trader.rank}
                      </Badge>
                      
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-sm font-bold">
                          {trader.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{trader.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {trader.trades} trades
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-bold ${trader.returnPct >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {trader.returnPct >= 0 ? '+' : ''}{trader.returnPct.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {trader.maxDD.toFixed(1)}% DD
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sharpe" className="space-y-4">
              <div className="space-y-2">
                {leaderboard
                  ?.filter(t => t.sharpe !== undefined)
                  ?.sort((a, b) => (b.sharpe || 0) - (a.sharpe || 0))
                  ?.map((trader, index) => (
                    <div key={trader.username} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge variant="outline" className="flex items-center gap-1">
                          #{index + 1}
                        </Badge>
                        
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="text-sm font-bold">
                            {trader.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{trader.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {trader.returnPct >= 0 ? '+' : ''}{trader.returnPct.toFixed(1)}% return
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold">
                          {trader.sharpe?.toFixed(2) || 'N/A'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Sharpe Ratio
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trades" className="space-y-4">
              <div className="space-y-2">
                {leaderboard
                  ?.sort((a, b) => b.trades - a.trades)
                  ?.map((trader, index) => (
                    <div key={trader.username} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge variant="outline" className="flex items-center gap-1">
                          #{index + 1}
                        </Badge>
                        
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="text-sm font-bold">
                            {trader.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{trader.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {trader.returnPct >= 0 ? '+' : ''}{trader.returnPct.toFixed(1)}% return
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold">
                          {trader.trades}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Trades
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;