import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Position } from "@/types";

interface PositionsTableProps {
  positions: Position[];
}

const PositionsTable = ({ positions }: PositionsTableProps) => {
  if (positions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No open positions</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Avg Price</TableHead>
          <TableHead className="text-right">Market Price</TableHead>
          <TableHead className="text-right">P&L</TableHead>
          <TableHead className="text-right">P&L %</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) => (
          <TableRow key={position.symbol}>
            <TableCell className="font-medium">{position.symbol}</TableCell>
            <TableCell className="text-right">
              <Badge variant={position.qty > 0 ? "default" : "destructive"}>
                {position.qty > 0 ? 'LONG' : 'SHORT'} {Math.abs(position.qty)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">${position.avgPrice.toFixed(2)}</TableCell>
            <TableCell className="text-right">${(position.marketPrice || position.avgPrice).toFixed(2)}</TableCell>
            <TableCell className={`text-right ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
              {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
            </TableCell>
            <TableCell className={`text-right ${position.pnlPct >= 0 ? 'text-success' : 'text-destructive'}`}>
              {position.pnlPct >= 0 ? '+' : ''}{position.pnlPct.toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PositionsTable;