import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSimulationStore } from "@/store/sim";
import { toast } from "@/hooks/use-toast";

interface QuickTradeTicketProps {
  open: boolean;
  onClose: () => void;
  symbol: string;
  side?: "BUY" | "SELL";
  currentPrice: number;
}

const QuickTradeTicket = ({ open, onClose, symbol, side, currentPrice }: QuickTradeTicketProps) => {
  const [orderSide, setOrderSide] = useState<"BUY" | "SELL">(side || "BUY");
  const [quantity, setQuantity] = useState(0.01);
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [price, setPrice] = useState(currentPrice);
  
  const { placeOrder, fillOrderSim } = useSimulationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderId = placeOrder({
      symbol,
      side: orderSide,
      type: orderType,
      qty: quantity,
      price: orderType === "LIMIT" ? price : undefined,
    });

    // For market orders, fill immediately
    if (orderType === "MARKET") {
      fillOrderSim(orderId, currentPrice);
    }

    toast({
      title: "Order Placed",
      description: `${orderSide} ${quantity} ${symbol} at ${orderType === "MARKET" ? "market price" : `$${price}`}`,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Trade - {symbol}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Side</Label>
              <Select value={orderSide} onValueChange={(value: any) => setOrderSide(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={orderType} onValueChange={(value: any) => setOrderType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MARKET">Market</SelectItem>
                  <SelectItem value="LIMIT">Limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              step="0.001"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="0.001"
            />
          </div>

          {orderType === "LIMIT" && (
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          )}

          <div className="bg-muted/30 p-3 rounded-lg text-sm">
            <div className="flex justify-between">
              <span>Current Price:</span>
              <span className="font-medium">${currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Notional:</span>
              <span className="font-medium">${(quantity * (orderType === "LIMIT" ? price : currentPrice)).toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Place {orderSide} Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickTradeTicket;