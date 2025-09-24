import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSimulationStore } from "@/store/sim";
import { formatUnixSec } from "@/lib/tz";
import { useTimezonePref } from "@/store/tz";
import type { Order } from "@/types";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const { cancelOrder } = useSimulationStore();
  const { timezone } = useTimezonePref();

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No orders found</p>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'FILLED': return 'default';
      case 'NEW': return 'secondary';
      case 'CANCELED': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Side</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.symbol}</TableCell>
            <TableCell>
              <Badge variant={order.side === 'BUY' ? 'default' : 'destructive'}>
                {order.side}
              </Badge>
            </TableCell>
            <TableCell>{order.type}</TableCell>
            <TableCell className="text-right">{order.qty}</TableCell>
            <TableCell className="text-right">
              {order.type === 'MARKET' ? 'Market' : `$${order.price?.toFixed(2) || 'N/A'}`}
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">
              {formatUnixSec(new Date(order.placedAt).getTime() / 1000, timezone)}
            </TableCell>
            <TableCell>
              {order.status === 'NEW' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;