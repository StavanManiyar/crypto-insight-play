import { z } from 'zod';
import type { 
  Candle, 
  Signal, 
  BacktestRequest, 
  BacktestResult, 
  LeaderRow, 
  MarketData,
  Interval,
  SignalAction,
  Trade
} from '@/types';

// Mock data generators
export function generateMockCandles(symbol: string, interval: Interval, count: number = 1000): Candle[] {
  const now = Date.now();
  const intervalMs = getIntervalMs(interval);
  const candles: Candle[] = [];
  
  let price = getBasePrice(symbol);
  let volume = 1000000;
  
  for (let i = count - 1; i >= 0; i--) {
    const time = Math.floor((now - i * intervalMs) / 1000);
    
    // Generate realistic price movement
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * volatility;
    const open = price;
    const close = price * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    
    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume: volume * (0.5 + Math.random()),
    });
    
    price = close;
    volume = volume * (0.9 + Math.random() * 0.2);
  }
  
  return candles;
}

export function generateMockSignals(symbol: string, interval: Interval, candles: Candle[]): Signal[] {
  const signals: Signal[] = [];
  const signalFrequency = 0.05; // 5% chance per candle
  
  const reasons = [
    'RSI oversold (< 30)',
    'RSI overbought (> 70)', 
    'MA(20) golden cross MA(50)',
    'MA(20) death cross MA(50)',
    'Volume spike (+200%)',
    'Bullish divergence detected',
    'Bearish divergence detected',
    'Support level hold',
    'Resistance level break',
    'Hammer candlestick pattern',
    'Doji formation at key level',
    'Engulfing pattern confirmed',
  ];
  
  candles.forEach((candle, index) => {
    if (Math.random() < signalFrequency && index > 50) {
      const isUptrend = candles.slice(index - 10, index).every((c, i, arr) => 
        i === 0 || c.close >= arr[i - 1].close * 0.99
      );
      
      const action: SignalAction = isUptrend 
        ? (Math.random() > 0.3 ? 'BUY' : 'HOLD')
        : (Math.random() > 0.3 ? 'SELL' : 'HOLD');
      
      const confidence = 0.6 + Math.random() * 0.4;
      const selectedReasons = reasons
        .sort(() => 0.5 - Math.random())
        .slice(0, 2 + Math.floor(Math.random() * 3));
      
      signals.push({
        id: `signal_${candle.time}_${Math.random().toString(36).substr(2, 9)}`,
        symbol,
        interval,
        action,
        confidence,
        horizon: getHorizonFromInterval(interval),
        reasons: selectedReasons,
        at: new Date(candle.time * 1000).toISOString(),
      });
    }
  });
  
  return signals.slice(-20); // Return last 20 signals
}

export async function generateMockBacktest(request: BacktestRequest): Promise<BacktestResult> {
  // Simulate processing delay
  const delay = 500 + Math.random() * 1000;
  
  return new Promise(resolve => {
    setTimeout(() => {
      const trades = Math.floor(20 + Math.random() * 100);
      const winRate = 0.45 + Math.random() * 0.3;
      const cagr = -0.2 + Math.random() * 0.8;
      const maxDD = 0.05 + Math.random() * 0.25;
      const sharpe = -1 + Math.random() * 3;
      
      // Generate equity curve
      const start = new Date(request.start).getTime();
      const end = new Date(request.end).getTime();
      const duration = end - start;
      const points = Math.min(200, Math.floor(duration / (24 * 60 * 60 * 1000))); // Daily points
      
      const equity = Array.from({ length: points }, (_, i) => {
        const time = Math.floor((start + (i * duration) / points) / 1000);
        const progress = i / points;
        const noise = (Math.random() - 0.5) * 0.1;
        const trend = progress * cagr;
        const value = 10000 * (1 + trend + noise);
        
        return { time, value: Math.max(1000, value) };
      });
      
      const mockTrades: Trade[] = Array.from({ length: trades }, (_, i) => ({
        id: `bt_trade_${i}`,
        orderId: `bt_order_${i}`,
        symbol: request.symbol,
        side: (Math.random() > 0.5 ? 'BUY' : 'SELL') as 'BUY' | 'SELL',
        price: 30000 + Math.random() * 20000,
        qty: 0.01 + Math.random() * 0.1,
        fee: 5 + Math.random() * 20,
        slippagePct: request.slippagePct,
        executedAt: new Date(start + Math.random() * duration).toISOString(),
      }));
      
      resolve({
        kpis: {
          totalTrades: trades,
          winRate: Math.round(winRate * 100) / 100,
          cagr: Math.round(cagr * 100) / 100,
          maxDD: Math.round(maxDD * 100) / 100,
          sharpe: Math.round(sharpe * 100) / 100,
        },
        equity,
        trades: mockTrades,
        summary: `Backtest completed with ${trades} trades over ${Math.floor(duration / (24 * 60 * 60 * 1000))} days. ${
          cagr > 0 ? 'Profitable' : 'Unprofitable'
        } strategy with ${Math.round(winRate * 100)}% win rate.`,
      });
    }, delay);
  });
}

export function generateMockLeaderboard(): LeaderRow[] {
  const names = [
    'CryptoMaster', 'TradeWizard', 'BullRunner', 'BearHunter', 'DiamondHands',
    'PaperTrader', 'ChartGuru', 'RiskTaker', 'SafeTrader', 'MoonShot',
    'Hodler2023', 'SwingKing', 'DayTraderX', 'TrendFollower', 'ValueHunter',
    'TechAnalyst', 'NewsTrader', 'VolatilityKing', 'ArbitrageBot', 'SmartMoney'
  ];
  
  return names.map((name, index) => ({
    username: name,
    returnPct: Math.round((Math.random() * 200 - 50) * 100) / 100, // -50% to +150%
    maxDD: Math.round((Math.random() * 40 + 5) * 100) / 100, // 5% to 45%
    trades: Math.floor(Math.random() * 500 + 50),
    sharpe: Math.round((Math.random() * 4 - 1) * 100) / 100, // -1 to +3
    rank: index + 1,
  })).sort((a, b) => b.returnPct - a.returnPct);
}

export function getMarketData(symbol: string): MarketData {
  const price = getBasePrice(symbol);
  const change24h = (Math.random() - 0.5) * price * 0.1;
  const changePct24h = (change24h / price) * 100;
  
  return {
    symbol,
    price,
    change24h,
    changePct24h,
    volume24h: 1000000000 + Math.random() * 5000000000,
    high24h: price * (1 + Math.random() * 0.05),
    low24h: price * (1 - Math.random() * 0.05),
  };
}

// Helper functions
function getIntervalMs(interval: Interval): number {
  const map: Record<Interval, number> = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000,
  };
  return map[interval];
}

function getBasePrice(symbol: string): number {
  const prices: Record<string, number> = {
    'BTCUSDT': 45000,
    'ETHUSDT': 2800,
    'ADAUSDT': 0.45,
    'SOLUSDT': 95,
    'DOTUSDT': 7.2,
    'AVAXUSDT': 38,
    'MATICUSDT': 0.85,
    'LINKUSDT': 15.4,
  };
  return prices[symbol] || 100;
}

function getHorizonFromInterval(interval: Interval): string {
  const map: Record<Interval, string> = {
    '1m': '15m',
    '5m': '1h',
    '15m': '4h',
    '1h': '4h',
    '4h': '1d',
    '1d': '1w',
  };
  return map[interval];
}

// API client for mock data
class ApiClient {
  async getCandles(symbol: string, interval: Interval): Promise<Candle[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
    return generateMockCandles(symbol, interval);
  }
  
  async getSignals(symbol: string, interval: Interval): Promise<Signal[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
    const candles = generateMockCandles(symbol, interval, 100);
    return generateMockSignals(symbol, interval, candles);
  }
  
  async runBacktest(request: BacktestRequest): Promise<BacktestResult> {
    return generateMockBacktest(request);
  }
  
  async getLeaderboard(): Promise<LeaderRow[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
    return generateMockLeaderboard();
  }
}

export const apiClient = new ApiClient();