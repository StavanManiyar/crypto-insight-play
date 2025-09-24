import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTimezonePref } from "@/store/tz";
import { Bot, Clock } from "lucide-react";

const AppHeader = () => {
  const { timezone, setTimezone } = useTimezonePref();

  return (
    <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">CryptoML</span>
            <Badge variant="outline" className="ml-2">
              Paper Trading
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ToggleGroup
            type="single"
            value={timezone}
            onValueChange={(value) => value && setTimezone(value as any)}
            size="sm"
          >
            <ToggleGroupItem value="IST" aria-label="IST timezone">
              <Clock className="w-4 h-4 mr-1" />
              IST
            </ToggleGroupItem>
            <ToggleGroupItem value="UTC" aria-label="UTC timezone">
              <Clock className="w-4 h-4 mr-1" />
              UTC
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;