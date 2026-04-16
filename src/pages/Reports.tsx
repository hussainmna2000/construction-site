import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter, Calendar } from 'lucide-react';

const materialData = [
  { name: 'Cement', used: 400, stock: 600 },
  { name: 'Steel', used: 300, stock: 700 },
  { name: 'Sand', used: 200, stock: 300 },
  { name: 'Bricks', used: 500, stock: 500 },
  { name: 'Paint', used: 100, stock: 400 },
];

const attendanceData = [
  { date: '01 Mar', present: 85, absent: 15 },
  { date: '02 Mar', present: 88, absent: 12 },
  { date: '03 Mar', present: 92, absent: 8 },
  { date: '04 Mar', present: 90, absent: 10 },
  { date: '05 Mar', present: 95, absent: 5 },
  { date: '06 Mar', present: 40, absent: 60 },
  { date: '07 Mar', present: 10, absent: 90 },
];

const expenseData = [
  { month: 'Jan', salary: 1.2, materials: 2.5, other: 0.5 },
  { month: 'Feb', salary: 1.3, materials: 1.8, other: 0.4 },
  { month: 'Mar', salary: 1.5, materials: 3.2, other: 0.6 },
  { month: 'Apr', salary: 1.4, materials: 2.1, other: 0.5 },
];

const COLORS = ['#1e3a8a', '#fbbf24', '#3b82f6', '#ef4444'];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Visual insights into project progress, expenses, and resources.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar className="w-4 h-4 mr-2" /> Last 30 Days</Button>
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button className="bg-secondary text-primary hover:bg-secondary/90">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Material Usage vs Stock</CardTitle>
            <CardDescription>Comparison of used materials against current warehouse stock.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={materialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="used" fill="#1e3a8a" name="Used Quantity" radius={[4, 4, 0, 0]} />
                <Bar dataKey="stock" fill="#fbbf24" name="Stock Quantity" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Labour Attendance Trends</CardTitle>
            <CardDescription>Daily attendance percentage across all active sites.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="present" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorPresent)" name="Present %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
            <CardDescription>Breakdown of salary and material expenses (in Millions ₹).</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="salary" stroke="#1e3a8a" strokeWidth={2} name="Salary" />
                <Line type="monotone" dataKey="materials" stroke="#fbbf24" strokeWidth={2} name="Materials" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Progress Distribution</CardTitle>
            <CardDescription>Overall progress status of all project portfolios.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Foundation', value: 30 },
                    { name: 'Structure', value: 45 },
                    { name: 'Finishing', value: 25 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
