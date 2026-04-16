import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  Download
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { SALARIES } from '@/src/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SalaryPage() {
  const [salaries, setSalaries] = useState(SALARIES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSalaries = salaries.filter(s => 
    s.labourName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsPaid = (id: string) => {
    setSalaries(salaries.map(s => 
      s.id === id ? { ...s, status: 'Paid', date: new Date().toISOString().split('T')[0] } : s
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Salary Management</h1>
          <p className="text-muted-foreground">Manage payroll and salary disbursements for all workers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button className="bg-secondary text-primary hover:bg-secondary/90">
            <FileText className="w-4 h-4 mr-2" /> Generate Salary
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹ {salaries.reduce((acc, curr) => acc + curr.totalSalary, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹ {salaries.filter(s => s.status === 'Paid').reduce((acc, curr) => acc + curr.totalSalary, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₹ {salaries.filter(s => s.status === 'Pending').reduce((acc, curr) => acc + curr.totalSalary, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by labour name..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Labour Name</TableHead>
              <TableHead>Days Worked</TableHead>
              <TableHead>Wage Rate</TableHead>
              <TableHead>Total Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSalaries.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.labourName}</TableCell>
                <TableCell>{record.daysWorked} days</TableCell>
                <TableCell>₹ {record.wageRate}</TableCell>
                <TableCell className="font-semibold">₹ {record.totalSalary.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {record.status === 'Paid' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Pay Slip</DropdownMenuItem>
                      {record.status === 'Pending' && (
                        <DropdownMenuItem 
                          className="text-primary font-medium"
                          onClick={() => markAsPaid(record.id)}
                        >
                          <DollarSign className="w-4 h-4 mr-2" /> Mark as Paid
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card className="bg-primary text-white">
        <CardHeader>
          <CardTitle>Salary Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-white/70 text-sm">Total Workforce</p>
              <p className="text-2xl font-bold">128</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/70 text-sm">Avg. Daily Wage</p>
              <p className="text-2xl font-bold">₹ 850</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/70 text-sm">Monthly Payout</p>
              <p className="text-2xl font-bold">₹ 3.2M</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/70 text-sm">Payment Cycle</p>
              <p className="text-2xl font-bold">Monthly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
