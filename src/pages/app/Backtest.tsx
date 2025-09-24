import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EquityCurveChart from "@/components/charts/EquityCurveChart";
import TradesTable from "@/components/trading/TradesTable";
import { generateMockBacktest } from "@/lib/api";
import { format, subDays } from "date-fns";
import { Play, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import type { BacktestRequest, BacktestResult, Interval } from "@/types";

const Backtest = () => {
  const [formData, setFormData] = useState<BacktestRequest>({
    symbol: "BTCUSDT",
    interval: "1h",
    horizonHours: 24,
    start: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd'),
    feePct: 0.1,
    slippagePct: 0.1,
  });

  const backtestMutation = useMutation({
    mutationFn: generateMockBacktest,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    backtestMutation.mutate(formData);
  };

  const updateFormData = (field: keyof BacktestRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const result = backtestMutation.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Backtest</h1>
        <p className="text-muted-foreground">Test trading strategies against historical market data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Backtest Form */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle>Backtest Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Select 
                  value={formData.symbol} 
                  onValueChange={(value) => updateFormData('symbol', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
                    <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
                    <SelectItem value="ADAUSDT">ADAUSDT</SelectItem>
                    <SelectItem value="SOLUSDT">SOLUSDT</SelectItem>
                    <SelectItem value="AVAXUSDT">AVAXUSDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval">Interval</Label>
                <Select 
                  value={formData.interval} 
                  onValueChange={(value) => updateFormData('interval', value as Interval)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="5m">5 Minutes</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="4h">4 Hours</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horizonHours">Signal Horizon (Hours)</Label>
                <Input
                  id="horizonHours"
                  type="number"
                  value={formData.horizonHours}
                  onChange={(e) => updateFormData('horizonHours', parseInt(e.target.value))}
                  min="1"
                  max="168"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Start Date</Label>
                  <Input
                    id="start"
                    type="date"
                    value={formData.start}
                    onChange={(e) => updateFormData('start', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Date</Label>
                  <Input
                    id="end"
                    type="date"
                    value={formData.end}
                    onChange={(e) => updateFormData('end', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="feePct">Fee (%)</Label>
                  <Input
                    id="feePct"
                    type="number"
                    step="0.01"
                    value={formData.feePct}
                    onChange={(e) => updateFormData('feePct', parseFloat(e.target.value))}
                    min="0"
                    max="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slippagePct">Slippage (%)</Label>
                  <Input
                    id="slippagePct"
                    type="number"
                    step="0.01"
                    value={formData.slippagePct}
                    onChange={(e) => updateFormData('slippagePct', parseFloat(e.target.value))}
                    min="0"
                    max="2"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={backtestMutation.isPending}
              >
                {backtestMutation.isPending ? (
                  "Running Backtest..."
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Backtest
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results KPIs */}
        {result && (
          <div className="lg:col-span-2 space-y-6">
            {/* KPIs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="trading-card">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{result.kpis.totalTrades}</div>
                  <div className="text-sm text-muted-foreground">Trades</div>
                </CardContent>
              </Card>

              <Card className="trading-card">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{(result.kpis.winRate * 100).toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </CardContent>
              </Card>

              <Card className="trading-card">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {result.kpis.cagr >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div className={`text-2xl font-bold ${result.kpis.cagr >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {(result.kpis.cagr * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">CAGR</div>
                </CardContent>
              </Card>

              <Card className="trading-card">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="text-2xl font-bold text-destructive">
                    {(result.kpis.maxDD * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Max DD</div>
                </CardContent>
              </Card>

              <Card className="trading-card">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{result.kpis.sharpe.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Sharpe</div>
                </CardContent>
              </Card>
            </div>

            {/* Strategy Summary */}
            <Card className="trading-card">
              <CardHeader>
                <CardTitle>Strategy Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={result.kpis.cagr >= 0 ? "default" : "destructive"}>
                    {result.kpis.cagr >= 0 ? "Profitable" : "Unprofitable"}
                  </Badge>
                  <Badge variant="outline">
                    {formData.symbol} • {formData.interval}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{result.summary}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Equity Curve */}
      {result && (
        <Card className="trading-card">
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <EquityCurveChart 
              data={result.equity}
              isLoading={false}
            />
          </CardContent>
        </Card>
      )}

      {/* Trades Table */}
      {result && result.trades.length > 0 && (
        <Card className="trading-card">
          <CardHeader>
            <CardTitle>Trade History</CardTitle>
          </CardHeader>
          <CardContent>
            <TradesTable trades={result.trades} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Backtest;