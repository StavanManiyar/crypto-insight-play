import { NavLink } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, BookOpen, Trophy, Settings, TrendingUp, Briefcase } from "lucide-react";

const menuItems = [
  { title: "Markets", url: "/app/markets", icon: TrendingUp },
  { title: "Portfolio", url: "/app/portfolio", icon: Briefcase },
  { title: "Backtest", url: "/app/backtest", icon: BarChart3 },
  { title: "Learn", url: "/app/learn", icon: BookOpen },
  { title: "Leaderboard", url: "/app/leaderboard", icon: Trophy },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Trading Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({ isActive }) => 
                      isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
                    }>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;