import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSimulationStore } from "@/store/sim";
import AppHeader from "@/components/shell/AppHeader";
import AppSidebar from "@/components/shell/AppSidebar";
import DisclaimerBanner from "@/components/common/DisclaimerBanner";
import OnboardingModal from "@/components/common/OnboardingModal";
import { SidebarProvider } from "@/components/ui/sidebar";

const AppLayout = () => {
  const { isInitialized } = useSimulationStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setShowOnboarding(true);
    }
  }, [isInitialized]);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <DisclaimerBanner />
          
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
        
        <OnboardingModal 
          open={showOnboarding} 
          onClose={() => setShowOnboarding(false)} 
        />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;