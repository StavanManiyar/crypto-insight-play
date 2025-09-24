import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatUnixSec } from "@/lib/tz";
import { useTimezonePref } from "@/store/tz";
import type { Trade } from "@/types";

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable = ({ trades }: TradesTableProps) => {
  const { timezone } = useTimezonePref();

  if (trades.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No trades found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Side</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Notional</TableHead>
          <TableHead className="text-right">Fee</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.slice().reverse().map((trade) => (
          <TableRow key={trade.id}>
            <TableCell className="font-medium">{trade.symbol}</TableCell>
            <TableCell>
              <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'}>
                {trade.side}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{trade.qty}</TableCell>
            <TableCell className="text-right">${trade.price.toFixed(2)}</TableCell>
            <TableCell className="text-right">${(trade.price * trade.qty).toFixed(2)}</TableCell>
            <TableCell className="text-right">${trade.fee.toFixed(2)}</TableCell>
            <TableCell className="text-sm">
              {formatUnixSec(new Date(trade.executedAt).getTime() / 1000, timezone)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TradesTable;