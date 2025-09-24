import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSimulationStore } from "@/store/sim";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [baseCurrency, setBaseCurrency] = useState<'USDT' | 'USD' | 'INR'>('USDT');
  const [startingBalance, setStartingBalance] = useState(10000);
  const { initializeWallet } = useSimulationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initializeWallet(baseCurrency, startingBalance);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to CryptoML Paper Trading!</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Base Currency</Label>
            <Select value={baseCurrency} onValueChange={(value: any) => setBaseCurrency(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDT">USDT (Tether)</SelectItem>
                <SelectItem value="USD">USD (US Dollar)</SelectItem>
                <SelectItem value="INR">INR (Indian Rupee)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance">Starting Balance</Label>
            <Input
              id="balance"
              type="number"
              value={startingBalance}
              onChange={(e) => setStartingBalance(Number(e.target.value))}
              min="1000"
              max="1000000"
            />
          </div>

          <Button type="submit" className="w-full">
            Start Paper Trading
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;