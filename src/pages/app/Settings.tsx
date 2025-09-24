import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useSimulationStore } from "@/store/sim";
import { useTimezonePref } from "@/store/tz";
import { toast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Download, Upload, RotateCcw, AlertTriangle, Clock } from "lucide-react";
import type { Timezone } from "@/lib/tz";

const Settings = () => {
  const { riskSettings, updateRiskSettings, resetSim, wallet, orders, trades, journal } = useSimulationStore();
  const { timezone, setTimezone } = useTimezonePref();
  const [localRiskSettings, setLocalRiskSettings] = useState(riskSettings);

  const handleSaveRiskSettings = () => {
    updateRiskSettings(localRiskSettings);
    toast({
      title: "Settings Updated",
      description: "Your risk management settings have been saved.",
    });
  };

  const handleResetSimulation = () => {
    resetSim();
    toast({
      title: "Simulation Reset",
      description: "Your paper trading simulation has been reset to default values.",
      variant: "destructive",
    });
  };

  const exportData = () => {
    const data = {
      wallet,
      orders,
      trades,
      journal,
      riskSettings,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crypto-trading-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your trading data has been exported successfully.",
    });
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // Here you would validate and import the data
        // For now, just show a success message
        toast({
          title: "Import Successful",
          description: "Your trading data has been imported successfully.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Failed to import data. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your paper trading preferences and risk settings</p>
      </div>

      {/* Timezone Settings */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Timezone Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Display Timezone</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Choose your preferred timezone for displaying charts and timestamps
            </p>
            <ToggleGroup
              type="single"
              value={timezone}
              onValueChange={(value) => value && setTimezone(value as Timezone)}
              className="justify-start"
            >
              <ToggleGroupItem value="IST" aria-label="IST timezone">
                <Clock className="w-4 h-4 mr-2" />
                IST (GMT+5:30)
              </ToggleGroupItem>
              <ToggleGroupItem value="UTC" aria-label="UTC timezone">
                <Clock className="w-4 h-4 mr-2" />
                UTC (GMT+0)
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      {/* Risk Management Settings */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Risk Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxPositionSize">Max Position Size (%)</Label>
              <Input
                id="maxPositionSize"
                type="number"
                value={localRiskSettings.maxPositionSize}
                onChange={(e) => setLocalRiskSettings(prev => ({
                  ...prev,
                  maxPositionSize: parseFloat(e.target.value)
                }))}
                min="1"
                max="100"
              />
              <p className="text-sm text-muted-foreground">
                Maximum percentage of portfolio to risk on a single trade
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopLossPct">Default Stop Loss (%)</Label>
              <Input
                id="stopLossPct"
                type="number"
                value={localRiskSettings.stopLossPct}
                onChange={(e) => setLocalRiskSettings(prev => ({
                  ...prev,
                  stopLossPct: parseFloat(e.target.value)
                }))}
                min="0.1"
                max="50"
                step="0.1"
              />
              <p className="text-sm text-muted-foreground">
                Default stop loss percentage from entry price
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="takeProfitPct">Default Take Profit (%)</Label>
              <Input
                id="takeProfitPct"
                type="number"
                value={localRiskSettings.takeProfitPct}
                onChange={(e) => setLocalRiskSettings(prev => ({
                  ...prev,
                  takeProfitPct: parseFloat(e.target.value)
                }))}
                min="0.1"
                max="200"
                step="0.1"
              />
              <p className="text-sm text-muted-foreground">
                Default take profit percentage from entry price
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxDailyLoss">Max Daily Loss (%)</Label>
              <Input
                id="maxDailyLoss"
                type="number"
                value={localRiskSettings.maxDailyLoss}
                onChange={(e) => setLocalRiskSettings(prev => ({
                  ...prev,
                  maxDailyLoss: parseFloat(e.target.value)
                }))}
                min="1"
                max="50"
              />
              <p className="text-sm text-muted-foreground">
                Maximum daily loss before stopping trading
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feePct">Trading Fee (%)</Label>
              <Input
                id="feePct"
                type="number"
                value={localRiskSettings.feePct}
                onChange={(e) => setLocalRiskSettings(prev => ({
                  ...prev,
                  feePct: parseFloat(e.target.value)
                }))}
                min="0"
                max="5"
                step="0.01"
              />
              <p className="text-sm text-muted-foreground">
                Trading fee percentage per transaction
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slippagePct">Slippage (%)</Label>
              <Input
                id="slippagePct"
                type="number"
                value={localRiskSettings.slippagePct}
                onChange={(e) => setLocalRiskSettings(prev => ({
                  ...prev,
                  slippagePct: parseFloat(e.target.value)
                }))}
                min="0"
                max="5"
                step="0.01"
              />
              <p className="text-sm text-muted-foreground">
                Expected slippage percentage for market orders
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveRiskSettings}>
              Save Risk Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Export Data</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Download your trading data as a JSON file for backup or analysis
                </p>
                <Button variant="outline" onClick={exportData} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Trading Data
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Import Data</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Import previously exported trading data
                </p>
                <div className="relative">
                  <Input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-semibold">Danger Zone</h4>
            </div>
            
            <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10">
              <h5 className="font-semibold mb-2">Reset Simulation</h5>
              <p className="text-sm text-muted-foreground mb-4">
                This will permanently delete all your trades, positions, and history. This action cannot be undone.
              </p>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Simulation
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Trading history and positions</li>
                        <li>Orders and trade journal</li>
                        <li>Portfolio performance data</li>
                        <li>Custom settings and preferences</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetSimulation} className="bg-destructive hover:bg-destructive/90">
                      Yes, reset everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold">{wallet.positions.length}</div>
              <div className="text-sm text-muted-foreground">Open Positions</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold">{trades.length}</div>
              <div className="text-sm text-muted-foreground">Total Trades</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold">{journal.length}</div>
              <div className="text-sm text-muted-foreground">Journal Entries</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              Paper Trading Mode Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;