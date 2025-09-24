import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatUnixSec } from '@/lib/tz';
import { useTimezonePref } from '@/store/tz';

interface EquityCurveChartProps {
  data: Array<{ time: number; value: number }>;
  isLoading: boolean;
}

const EquityCurveChart = ({ data, isLoading }: EquityCurveChartProps) => {
  const { timezone } = useTimezonePref();

  if (isLoading) {
    return <div className="h-64 bg-muted/50 rounded-lg animate-pulse" />;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
          <XAxis 
            dataKey="time" 
            tickFormatter={(time) => formatUnixSec(time, timezone).split(',')[0]}
            stroke="hsl(var(--chart-text))"
          />
          <YAxis stroke="hsl(var(--chart-text))" />
          <Tooltip 
            labelFormatter={(time) => formatUnixSec(time as number, timezone)}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Equity']}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityCurveChart;