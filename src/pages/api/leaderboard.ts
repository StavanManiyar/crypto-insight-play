import { generateMockLeaderboard } from '@/lib/api';

export default function handler(req: any, res: any) {
  try {
    const leaderboard = generateMockLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate leaderboard' });
  }
}