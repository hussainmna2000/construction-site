import React, { useState } from 'react';
import { Bell, Search, User, Settings, LogOut, UserCircle, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load company data from localStorage
  const [companyProfile] = useState(() => {
    const saved = localStorage.getItem('companyProfile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return {
      name: 'MNA SMART Solutions Pvt Ltd',
      description: 'Building quality homes since 2010'
    };
  });

  return (
    <header className="h-[72px] border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center flex-1 max-w-md">
        <h2 className="text-xl font-bold text-slate-800">System Overview</h2>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-2 pr-1 hover:bg-slate-50 rounded-full transition-all group outline-none cursor-pointer border-none bg-transparent">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-primary transition-colors">{user?.name}</p>
                <div className="mt-1">
                  <span className="text-[9px] uppercase font-black tracking-widest bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                    {user?.role === 'MD' ? 'Managing Director' : 'Staff Member'}
                  </span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-slate-900 font-black text-2xl shadow-md border-2 border-slate-200 group-hover:scale-105 transition-transform">
                M
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-white border-slate-200 shadow-2xl rounded-xl p-2 z-50">
            {/* SECTION 2 — COMPANY INFO */}
            <div className="px-3 py-3 bg-slate-50/50 rounded-lg mb-2">
              <DropdownMenuLabel className="p-0">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none text-slate-900 uppercase tracking-tight">
                    {companyProfile?.name || 'MNA REAL ESTATE'}
                  </p>
                  <p className="text-xs leading-normal text-slate-500 font-medium">
                    {companyProfile?.description || 'Building quality homes since 2010'}
                  </p>
                </div>
              </DropdownMenuLabel>
            </div>

            <DropdownMenuSeparator className="bg-slate-100 my-1" />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                User Options
              </DropdownMenuLabel>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors"
                onClick={() => navigate('/manage-profile')}
              >
                <UserCircle className="h-4 w-4 text-slate-500" />
                <span className="font-medium text-slate-700">Manage Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4 text-slate-500" />
                <span className="font-medium text-slate-700">Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors"
                onClick={() => navigate('/switch-user')}
              >
                <ShieldCheck className="h-4 w-4 text-slate-500" />
                <span className="font-medium text-slate-700">Switch User</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-100 my-2" />
            
            <DropdownMenuItem 
              className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-destructive hover:bg-destructive/5 focus:bg-destructive/5 transition-colors"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span className="font-bold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white border-none shadow-2xl z-[100]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900">Account Settings</DialogTitle>
              <DialogDescription className="text-slate-500">
                Manage your profile and account preferences.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center text-slate-900 font-black text-3xl shadow-inner">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{user?.name}</h4>
                  <p className="text-sm text-slate-500">{user?.role === 'MD' ? 'Managing Director' : 'Staff Member'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <Input value={user?.name || ''} readOnly className="bg-slate-50 border-slate-200 font-medium" />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <Input value={user?.email || ''} readOnly className="bg-slate-50 border-slate-200 font-medium" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)} className="border-slate-200 text-slate-600">Close</Button>
              <Button className="bg-primary text-slate-900 font-bold hover:bg-primary/90" onClick={() => setIsSettingsOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
