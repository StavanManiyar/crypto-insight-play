import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3 } from "lucide-react";
import type { Portfolio } from "@/types";

interface PortfolioKPIsProps {
  portfolio: Portfolio;
}

const PortfolioKPIs = ({ portfolio }: PortfolioKPIsProps) => {
  const kpis = [
    {
      title: "Total Equity",
      value: `$${portfolio.equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-foreground"
    },
    {
      title: "P&L",
      value: `${portfolio.pnl >= 0 ? '+' : ''}$${portfolio.pnl.toFixed(2)}`,
      subtitle: `${portfolio.pnlPct >= 0 ? '+' : ''}${portfolio.pnlPct.toFixed(2)}%`,
      icon: portfolio.pnl >= 0 ? TrendingUp : TrendingDown,
      color: portfolio.pnl >= 0 ? "text-success" : "text-destructive"
    },
    {
      title: "Win Rate",
      value: `${(portfolio.winRate * 100).toFixed(0)}%`,
      subtitle: `${portfolio.totalTrades} trades`,
      icon: Target,
      color: portfolio.winRate >= 0.5 ? "text-success" : "text-warning"
    },
    {
      title: "Max Drawdown",
      value: `${portfolio.maxDrawdown.toFixed(2)}%`,
      icon: TrendingDown,
      color: "text-destructive"
    },
    {
      title: "Cash Available",
      value: `$${portfolio.cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="trading-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className={`text-2xl font-bold ${kpi.color}`}>
                {kpi.value}
              </div>
              {kpi.subtitle && (
                <div className="text-sm text-muted-foreground mt-1">
                  {kpi.subtitle}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PortfolioKPIs;