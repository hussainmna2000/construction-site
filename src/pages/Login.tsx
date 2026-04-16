import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction, Lock, User, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/src/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'MD' | 'Staff'>('MD');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login
    if (username && password) {
      login(username, role);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 md:bg-gradient-to-br md:from-blue-600 md:to-indigo-900 relative overflow-hidden p-4 md:p-0">
      {/* Decorative background elements - only visible on desktop */}
      <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-[120px]"></div>
      <div className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]"></div>
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden relative z-10 min-h-[600px]">
        {/* Left Side: Branding & Info (Hidden on mobile or shown as header) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-700 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-blue-700 font-black text-3xl shadow-lg transform -rotate-3 mb-6">
              M
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">MNA SMART</h1>
            <p className="text-blue-100 text-lg max-w-sm">
              The complete management solution for modern construction projects. Track labour, materials, and progress in real-time.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center">
                <Construction className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">Site Management</p>
                <p className="text-sm text-blue-100">Monitor multiple sites from one dashboard.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">Labour Tracking</p>
                <p className="text-sm text-blue-100">Real-time attendance and wage management.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs text-blue-200 font-medium uppercase tracking-widest">
            © 2026 MNA SMART Systems
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="md:hidden flex justify-center mb-8">
            <div className="bg-blue-700 w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform -rotate-3">
              M
            </div>
          </div>
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please enter your credentials to access the system.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Enter your username" 
                  className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-600 h-12 text-slate-900 rounded-lg" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-600 h-12 text-slate-900 rounded-lg" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Access Role
              </label>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger className="w-full bg-slate-50 border-slate-200 h-12 text-slate-900 rounded-lg px-3 flex items-center gap-3">
                  {role === 'MD' ? (
                    <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
                  ) : (
                    <User className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 shadow-xl rounded-xl">
                  <SelectItem value="MD" className="py-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <span>Managing Director (MD)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Staff" className="py-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>Staff Member</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold bg-blue-700 hover:bg-blue-800 text-white mt-4 shadow-lg rounded-lg transition-all active:scale-[0.98]">
              SIGN IN TO DASHBOARD
            </Button>
          </form>

          <div className="mt-10 text-center">
            <a href="#" className="text-blue-700 hover:underline font-bold text-xs uppercase tracking-wider">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
