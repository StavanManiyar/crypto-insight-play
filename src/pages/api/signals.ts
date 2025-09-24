import { generateMockCandles, generateMockSignals } from '@/lib/api';
import type { Interval } from '@/types';

export default function handler(req: any, res: any) {
  const { symbol = 'BTCUSDT', interval = '1h' } = req.query;
  
  try {
    const candles = generateMockCandles(symbol, interval as Interval, 100);
    const signals = generateMockSignals(symbol, interval as Interval, candles);
    res.status(200).json(signals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate signals' });
  }
}