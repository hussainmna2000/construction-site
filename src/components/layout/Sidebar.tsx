import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  HardHat, 
  Users, 
  Package, 
  Wallet, 
  Warehouse, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Construction
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/src/context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['MD', 'Staff'] },
    { icon: HardHat, label: 'Projects', path: '/projects', roles: ['MD', 'Staff'] },
    { icon: Users, label: 'Labour Management', path: '/labour', roles: ['MD', 'Staff'] },
    { icon: Package, label: 'Materials Stock', path: '/materials', roles: ['MD', 'Staff'] },
    { icon: Wallet, label: 'Salary Hub', path: '/salary', roles: ['MD'] },
    { icon: Warehouse, label: 'Stock', path: '/stock', roles: ['MD', 'Staff'] },
    { icon: Bell, label: 'Alerts', path: '/alerts', roles: ['MD', 'Staff'] },
    { icon: BarChart3, label: 'Reports', path: '/reports', roles: ['MD'] },
    { icon: Settings, label: 'Settings', path: '/settings', roles: ['MD'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user?.role as string));

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card text-foreground transition-all duration-300 ease-in-out border-r border-border",
      collapsed ? "w-20" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between p-6 h-[72px] border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-background font-black">M</div>
            <span>MNA SMART</span>
          </div>
        )}
        {collapsed && <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-background font-black mx-auto">M</div>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:bg-muted/10 hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {filteredItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm",
                isActive 
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-muted-foreground hover:bg-muted/10 hover:text-foreground"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0", isActive ? "opacity-100" : "opacity-70")} />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-border">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full flex items-center gap-3 text-muted-foreground hover:bg-muted/10 hover:text-foreground justify-start px-4 py-3 h-auto",
            collapsed && "justify-center px-0"
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0 opacity-70" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
