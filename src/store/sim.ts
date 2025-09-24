import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Wallet, 
  Position, 
  Order, 
  Trade, 
  OrderSide, 
  OrderType, 
  RiskSettings,
  JournalEntry,
  Portfolio
} from '@/types';

interface SimulationStore {
  // Wallet state
  wallet: Wallet;
  orders: Order[];
  trades: Trade[];
  journal: JournalEntry[];
  riskSettings: RiskSettings;
  isInitialized: boolean;
  
  // Actions
  initializeWallet: (baseCurrency: 'USDT' | 'USD' | 'INR', startingBalance: number) => void;
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'placedAt'>) => string;
  fillOrderSim: (orderId: string, marketPrice: number) => void;
  cancelOrder: (orderId: string) => void;
  recordTrade: (trade: Omit<Trade, 'id'>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'createdAt'>) => void;
  updateRiskSettings: (settings: Partial<RiskSettings>) => void;
  resetSim: () => void;
  
  // Computed getters
  getPortfolio: () => Portfolio;
  getPosition: (symbol: string) => Position | undefined;
  getEquityHistory: () => Array<{ time: number; value: number }>;
}

const initialWallet: Wallet = {
  baseCurrency: 'USDT',
  equity: 10000,
  cash: 10000,
  positions: [],
};

const initialRiskSettings: RiskSettings = {
  maxPositionSize: 25, // 25% of portfolio
  stopLossPct: 5,
  takeProfitPct: 15,
  maxDailyLoss: 10,
  feePct: 0.1,
  slippagePct: 0.1,
};

export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set, get) => ({
      wallet: initialWallet,
      orders: [],
      trades: [],
      journal: [],
      riskSettings: initialRiskSettings,
      isInitialized: false,

      initializeWallet: (baseCurrency, startingBalance) => {
        set({
          wallet: {
            baseCurrency,
            equity: startingBalance,
            cash: startingBalance,
            positions: [],
          },
          isInitialized: true,
          orders: [],
          trades: [],
          journal: [],
        });
      },

      placeOrder: (orderData) => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const order: Order = {
          ...orderData,
          id: orderId,
          status: 'NEW',
          placedAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [...state.orders, order],
        }));

        return orderId;
      },

      fillOrderSim: (orderId, marketPrice) => {
        const state = get();
        const order = state.orders.find(o => o.id === orderId);
        if (!order || order.status !== 'NEW') return;

        const { feePct, slippagePct } = state.riskSettings;
        
        // Apply slippage
        const slippageMultiplier = order.side === 'BUY' ? (1 + slippagePct / 100) : (1 - slippagePct / 100);
        const fillPrice = order.type === 'MARKET' ? marketPrice * slippageMultiplier : order.price || marketPrice;
        
        // Calculate fee
        const notional = fillPrice * order.qty;
        const fee = notional * (feePct / 100);
        
        // Update order
        const filledOrder: Order = {
          ...order,
          status: 'FILLED',
          filledAt: new Date().toISOString(),
          filledPrice: fillPrice,
          filledQty: order.qty,
        };

        // Create trade
        const trade: Trade = {
          id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          orderId,
          symbol: order.symbol,
          side: order.side,
          price: fillPrice,
          qty: order.qty,
          fee,
          slippagePct,
          executedAt: new Date().toISOString(),
        };

        // Update positions
        const existingPositionIndex = state.wallet.positions.findIndex(p => p.symbol === order.symbol);
        let newPositions = [...state.wallet.positions];

        if (existingPositionIndex >= 0) {
          const position = newPositions[existingPositionIndex];
          const currentValue = position.qty * position.avgPrice;
          const tradeValue = order.qty * fillPrice * (order.side === 'BUY' ? 1 : -1);
          
          const newQty = position.qty + (order.side === 'BUY' ? order.qty : -order.qty);
          
          if (newQty === 0) {
            // Close position
            newPositions.splice(existingPositionIndex, 1);
          } else {
            // Update position
            const newAvgPrice = Math.abs((currentValue + tradeValue) / newQty);
            newPositions[existingPositionIndex] = {
              ...position,
              qty: newQty,
              avgPrice: newAvgPrice,
              pnl: 0, // Will be calculated with market price
              pnlPct: 0,
            };
          }
        } else if (order.side === 'BUY') {
          // New position
          newPositions.push({
            symbol: order.symbol,
            qty: order.qty,
            avgPrice: fillPrice,
            pnl: 0,
            pnlPct: 0,
          });
        }

        // Update cash
        const cashDelta = order.side === 'BUY' 
          ? -(notional + fee)
          : (notional - fee);

        const newCash = state.wallet.cash + cashDelta;
        const newEquity = newCash + newPositions.reduce((sum, pos) => sum + (pos.qty * pos.avgPrice), 0);

        set({
          orders: state.orders.map(o => o.id === orderId ? filledOrder : o),
          trades: [...state.trades, trade],
          wallet: {
            ...state.wallet,
            cash: newCash,
            equity: newEquity,
            positions: newPositions,
          },
        });
      },

      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map(o => 
            o.id === orderId ? { ...o, status: 'CANCELED' } : o
          ),
        }));
      },

      recordTrade: (tradeData) => {
        const trade: Trade = {
          ...tradeData,
          id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };

        set((state) => ({
          trades: [...state.trades, trade],
        }));
      },

      addJournalEntry: (entryData) => {
        const entry: JournalEntry = {
          ...entryData,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          journal: [...state.journal, entry],
        }));
      },

      updateRiskSettings: (settings) => {
        set((state) => ({
          riskSettings: { ...state.riskSettings, ...settings },
        }));
      },

      resetSim: () => {
        set({
          wallet: initialWallet,
          orders: [],
          trades: [],
          journal: [],
          riskSettings: initialRiskSettings,
          isInitialized: false,
        });
      },

      getPortfolio: () => {
        const state = get();
        const trades = state.trades;
        const positions = state.wallet.positions;
        
        const totalTrades = trades.length;
        const winningTrades = trades.filter(t => {
          // This is simplified - in reality you'd compare entry/exit prices
          return Math.random() > 0.4; // Mock 60% win rate
        }).length;
        
        const winRate = totalTrades > 0 ? winningTrades / totalTrades : 0;
        const pnl = state.wallet.equity - 10000; // Assuming 10k starting balance
        const pnlPct = (pnl / 10000) * 100;
        
        return {
          equity: state.wallet.equity,
          cash: state.wallet.cash,
          pnl,
          pnlPct,
          positions,
          dailyPnl: pnl * 0.1, // Mock daily P&L
          maxDrawdown: Math.abs(pnl) * 0.3, // Mock max drawdown
          winRate,
          totalTrades,
        };
      },

      getPosition: (symbol) => {
        return get().wallet.positions.find(p => p.symbol === symbol);
      },

      getEquityHistory: () => {
        const state = get();
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        // Generate mock equity history for the last 30 days
        return Array.from({ length: 30 }, (_, i) => ({
          time: Math.floor((now - (29 - i) * oneDay) / 1000),
          value: state.wallet.equity * (0.95 + Math.random() * 0.1 + i * 0.001),
        }));
      },
    }),
    {
      name: 'crypto-simulation-store',
      partialize: (state) => ({
        wallet: state.wallet,
        orders: state.orders,
        trades: state.trades,
        journal: state.journal,
        riskSettings: state.riskSettings,
        isInitialized: state.isInitialized,
      }),
    }
  )
);