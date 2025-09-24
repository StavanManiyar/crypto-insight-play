import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketChart from "@/components/charts/MarketChart";
import SignalCard from "@/components/trading/SignalCard";
import QuickTradeTicket from "@/components/trading/QuickTradeTicket";
import SymbolSearch from "@/components/common/SymbolSearch";
import { apiClient } from "@/lib/api";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";
import type { Interval } from "@/types";

const Markets = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [selectedInterval, setSelectedInterval] = useState<Interval>("1h");
  const [showTradeTicket, setShowTradeTicket] = useState(false);
  const [tradeTicketData, setTradeTicketData] = useState<{
    symbol: string;
    side: "BUY" | "SELL";
  } | null>(null);

  const { data: candles, isLoading: candlesLoading } = useQuery({
    queryKey: ["candles", selectedSymbol, selectedInterval],
    queryFn: () => apiClient.getCandles(selectedSymbol, selectedInterval),
  });

  const { data: signals, isLoading: signalsLoading } = useQuery({
    queryKey: ["signals", selectedSymbol, selectedInterval],
    queryFn: () => apiClient.getSignals(selectedSymbol, selectedInterval),
  });

  const currentPrice = candles?.[candles.length - 1]?.close || 0;
  const priceChange = candles && candles.length > 1 
    ? ((candles[candles.length - 1].close - candles[candles.length - 2].close) / candles[candles.length - 2].close) * 100
    : 0;

  const handleTradeFromSignal = (symbol: string, side: "BUY" | "SELL") => {
    setTradeTicketData({ symbol, side });
    setShowTradeTicket(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Markets</h1>
          <p className="text-muted-foreground">Real-time market data with AI-powered trading signals</p>
        </div>
        
        <div className="flex items-center gap-4">
          <SymbolSearch 
            value={selectedSymbol}
            onChange={setSelectedSymbol}
          />
          <Button 
            onClick={() => setShowTradeTicket(true)}
            className="whitespace-nowrap"
          >
            Quick Trade
          </Button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-2xl font-bold">
                  ${currentPrice.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </p>
              </div>
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Change</p>
                <div className="flex items-center gap-2">
                  <p className={`text-2xl font-bold ${priceChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </p>
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-success" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Signals</p>
                <p className="text-2xl font-bold">{signals?.length || 0}</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                ML Powered
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Chart */}
        <div className="xl:col-span-3">
          <Card className="trading-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {selectedSymbol}
                  <Badge variant="outline">{selectedInterval}</Badge>
                </CardTitle>
                
                <Tabs value={selectedInterval} onValueChange={(v) => setSelectedInterval(v as Interval)}>
                  <TabsList>
                    <TabsTrigger value="1m">1m</TabsTrigger>
                    <TabsTrigger value="5m">5m</TabsTrigger>
                    <TabsTrigger value="1h">1h</TabsTrigger>
                    <TabsTrigger value="4h">4h</TabsTrigger>
                    <TabsTrigger value="1d">1d</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <MarketChart 
                candles={candles || []}
                signals={signals || []}
                isLoading={candlesLoading}
                symbol={selectedSymbol}
              />
            </CardContent>
          </Card>
        </div>

        {/* Signals Panel */}
        <div className="space-y-4">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle>AI Signals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {signalsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-muted/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : signals && signals.length > 0 ? (
                signals.slice(0, 5).map((signal) => (
                  <SignalCard 
                    key={signal.id} 
                    signal={signal}
                    onTrade={(side) => handleTradeFromSignal(signal.symbol, side)}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No signals available</p>
                  <p className="text-sm">Check back soon for new opportunities</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trade Ticket Modal */}
      <QuickTradeTicket
        open={showTradeTicket}
        onClose={() => {
          setShowTradeTicket(false);
          setTradeTicketData(null);
        }}
        symbol={tradeTicketData?.symbol || selectedSymbol}
        side={tradeTicketData?.side}
        currentPrice={currentPrice}
      />
    </div>
  );
};

export default Markets;