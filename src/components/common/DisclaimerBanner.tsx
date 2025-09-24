import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

const DisclaimerBanner = () => {
  return (
    <Alert className="rounded-none border-x-0 bg-warning/10 border-warning/50">
      <Shield className="h-4 w-4" />
      <AlertDescription className="text-center font-medium">
        <strong>Simulation Only — No Real Money</strong> • This is a paper trading platform for educational purposes only
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerBanner;