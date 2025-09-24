// Core trading types for the crypto ML platform
export type Interval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

export interface Candle {
  time: number; // Unix timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type SignalAction = 'BUY' | 'SELL' | 'HOLD';

export interface Signal {
  id: string;
  symbol: string;
  interval: Interval;
  action: SignalAction;
  confidence: number; // 0-1
  horizon: string; // e.g., "4h", "1d"
  reasons: string[];
  at: string; // ISO string
}

export interface Wallet {
  baseCurrency: 'USDT' | 'USD' | 'INR';
  equity: number;
  cash: number;
  positions: Position[];
}

export interface Position {
  symbol: string;
  qty: number;
  avgPrice: number;
  pnl: number;
  pnlPct: number;
  marketPrice?: number;
}

export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderStatus = 'NEW' | 'FILLED' | 'CANCELED' | 'REJECTED';

export interface Order {
  id: string;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price?: number; // For limit orders
  qty: number;
  status: OrderStatus;
  placedAt: string; // ISO string
  filledAt?: string; // ISO string
  filledPrice?: number;
  filledQty?: number;
}

export interface Trade {
  id: string;
  orderId: string;
  symbol: string;
  side: OrderSide;
  price: number;
  qty: number;
  fee: number;
  slippagePct: number;
  executedAt: string; // ISO string
  note?: string; // From journal
}

export interface BacktestRequest {
  symbol: string;
  interval: Interval;
  horizonHours: number;
  start: string; // ISO string
  end: string; // ISO string
  feePct: number;
  slippagePct: number;
}

export interface BacktestResult {
  kpis: {
    totalTrades: number;
    winRate: number;
    cagr: number;
    maxDD: number;
    sharpe: number;
  };
  equity: Array<{ time: number; value: number }>;
  trades: Trade[];
  summary: string;
}

export interface LeaderRow {
  username: string;
  returnPct: number;
  maxDD: number;
  trades: number;
  sharpe?: number;
  rank: number;
}

export interface ApiError {
  message: string;
  code?: string;
}

// UI Types
export interface TimezonePref {
  timezone: 'IST' | 'UTC';
}

export interface JournalEntry {
  tradeId: string;
  why: string;
  plan: string;
  lesson: string;
  createdAt: string;
}

// Market data types
export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  changePct24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
}

// Risk management
export interface RiskSettings {
  maxPositionSize: number; // Percentage of portfolio
  stopLossPct: number;
  takeProfitPct: number;
  maxDailyLoss: number;
  feePct: number;
  slippagePct: number;
}

export interface Portfolio {
  equity: number;
  cash: number;
  pnl: number;
  pnlPct: number;
  positions: Position[];
  dailyPnl: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
}