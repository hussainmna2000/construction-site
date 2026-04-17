import React from 'react';
import { motion } from 'framer-motion';
import { 
  HardHat, 
  Users, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PROJECTS, 
  LABOURS, 
  STOCK 
} from '@/src/data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useConstruction } from '@/src/context/ConstructionContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { projects, stock } = useConstruction();
  
  const activeProjectsCount = projects.filter(p => p.status === 'Ongoing').length;
  const totalLabour = LABOURS.length; // Keeping this static from mockData or can be updated later
  const lowStockCount = stock.filter(s => s.total - s.used < s.minLevel).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            whileHover={{ scale: 1.02, x: 5 }}
            className="text-3xl font-bold tracking-tight animate-text-glow cursor-default"
          >
            Dashboard Overview
          </motion.h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your sites today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/reports')}>Download Report</Button>
          <Button 
            className="bg-secondary text-primary hover:bg-secondary/90"
            onClick={() => navigate('/projects')}
          >
            Add New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="bg-white border-border shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate('/projects')}
        >
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <motion.p 
                whileHover={{ letterSpacing: "0.05em", color: "var(--primary)" }}
                className="text-xs font-bold text-muted-foreground uppercase tracking-wider transition-all"
              >
                Active Projects
              </motion.p>
              <p className="text-3xl font-bold">{activeProjectsCount}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <HardHat className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className="bg-white border-border shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate('/labour')}
        >
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <motion.p 
                whileHover={{ letterSpacing: "0.05em", color: "var(--primary)" }}
                className="text-xs font-bold text-muted-foreground uppercase tracking-wider transition-all"
              >
                Laborers Active
              </motion.p>
              <p className="text-3xl font-bold">{totalLabour}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className="bg-white border-border shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate('/stock')}
        >
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Low Stock Alerts</p>
              <p className="text-3xl font-bold text-destructive">{lowStockCount}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className="bg-white border-border shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate('/salary')}
        >
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pending Salaries</p>
              <p className="text-3xl font-bold">₹ 24,500</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card border-border shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Ongoing Project Sites</CardTitle>
            </div>
            <Button 
              className="bg-primary text-background hover:bg-primary/90 font-bold px-6"
              onClick={() => navigate('/projects')}
            >
              + Add New Site
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider px-6">Site Name</TableHead>
                  <TableHead className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Location</TableHead>
                  <TableHead className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Labor Count</TableHead>
                  <TableHead className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider px-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.filter(p => p.status === 'Ongoing').slice(0, 5).map((project, i) => (
                  <TableRow key={i} className="border-border hover:bg-muted/5">
                    <TableCell className="px-6 font-medium">{project.name}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.laboursCount} Workers</TableCell>
                    <TableCell className="px-6">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-500/20 text-green-500">
                        {project.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Inventory Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {stock.slice(0, 3).map((item, i) => {
              const remaining = item.total - item.used;
              const percent = (remaining / item.total) * 100;
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[12px] font-medium">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">{remaining} / {item.total}</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all", percent < 20 ? "bg-destructive" : "bg-primary")} 
                      style={{ width: `${percent}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider">System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stock.filter(s => s.total - s.used < s.minLevel).map((s, i) => (
              <div key={i} className="bg-background p-4 rounded-lg border-l-4 border-l-primary">
                <p className="text-sm"><strong>Reorder Alert:</strong> {s.name} Stock below critical level.</p>
              </div>
            ))}
            {lowStockCount === 0 && (
              <div className="bg-background p-4 rounded-lg border-l-4 border-l-green-500">
                <p className="text-sm text-muted-foreground italic">No critical alerts currently.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
