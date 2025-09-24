import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Signal } from "@/types";

interface SignalCardProps {
  signal: Signal;
  onTrade: (side: "BUY" | "SELL") => void;
}

const SignalCard = ({ signal, onTrade }: SignalCardProps) => {
  const getActionIcon = () => {
    switch (signal.action) {
      case 'BUY': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'SELL': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getActionColor = () => {
    switch (signal.action) {
      case 'BUY': return 'text-success';
      case 'SELL': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="trading-card">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getActionIcon()}
            <span className={`font-semibold ${getActionColor()}`}>
              {signal.action}
            </span>
          </div>
          <Badge variant="outline">
            {Math.round(signal.confidence * 100)}%
          </Badge>
        </div>
        
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Symbol:</span>
            <span className="font-medium">{signal.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Horizon:</span>
            <span>{signal.horizon}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {signal.reasons.slice(0, 2).map((reason, i) => (
            <div key={i}>• {reason}</div>
          ))}
        </div>

        {signal.action !== 'HOLD' && (
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => onTrade(signal.action as "BUY" | "SELL")}
          >
            Trade
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SignalCard;