import { useEffect, useRef } from 'react';
import type { Candle, Signal } from '@/types';

interface MarketChartProps {
  candles: Candle[];
  signals: Signal[];
  isLoading: boolean;
  symbol: string;
}

const MarketChart = ({ candles, signals, isLoading, symbol }: MarketChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TradingView Lightweight Charts would be initialized here
    // For now, showing a placeholder
  }, [candles, signals]);

  if (isLoading) {
    return <div className="h-96 bg-muted/50 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading chart...</p>
    </div>;
  }

  return (
    <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold mb-2">{symbol} Chart</p>
        <p className="text-muted-foreground">TradingView chart integration coming soon</p>
        <p className="text-sm text-muted-foreground mt-2">
          {candles.length} candles • {signals.length} signals
        </p>
      </div>
    </div>
  );
};

export default MarketChart;