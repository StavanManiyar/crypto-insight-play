import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioKPIs from "@/components/trading/PortfolioKPIs";
import EquityCurveChart from "@/components/charts/EquityCurveChart";
import PositionsTable from "@/components/trading/PositionsTable";
import OrdersTable from "@/components/trading/OrdersTable";
import TradesTable from "@/components/trading/TradesTable";
import { useSimulationStore } from "@/store/sim";
import { Download, RefreshCw } from "lucide-react";

const Portfolio = () => {
  const { wallet, orders, trades, getPortfolio, getEquityHistory } = useSimulationStore();
  const portfolio = getPortfolio();
  const equityHistory = getEquityHistory();

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => 
        JSON.stringify(row[header] || '')
      ).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Track your paper trading performance and analytics</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportToCSV(trades, 'trades.csv')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <PortfolioKPIs portfolio={portfolio} />

      {/* Equity Curve */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle>Equity Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <EquityCurveChart 
            data={equityHistory}
            isLoading={false}
          />
        </CardContent>
      </Card>

      {/* Portfolio Details */}
      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="trades">Trade History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="positions">
          <Card className="trading-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Positions</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(portfolio.positions, 'positions.csv')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <PositionsTable positions={portfolio.positions} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card className="trading-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order History</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(orders, 'orders.csv')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <OrdersTable orders={orders} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trades">
          <Card className="trading-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trade History</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(trades, 'trades.csv')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <TradesTable trades={trades} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;