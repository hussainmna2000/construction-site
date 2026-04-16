import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus,
  Users,
  CheckCircle2,
  XCircle,
  DollarSign
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { LABOURS } from '@/src/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LabourPage() {
  const [labours, setLabours] = useState(LABOURS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const [newLabour, setNewLabour] = useState({
    name: '',
    role: 'Mason',
    assignedProject: 'Sterling Heights Ph-II',
    dailyWage: 850
  });

  const filteredLabour = labours.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAttendance = (id: string) => {
    setLabours(prev => prev.map(l => 
      l.id === id 
        ? { ...l, attendance: l.attendance === 'Present' ? 'Absent' : 'Present' } 
        : l
    ));
  };

  const handleAddLabour = () => {
    const labour = {
      ...newLabour,
      id: `LBR-${(labours.length + 1).toString().padStart(3, '0')}`,
      attendance: 'Absent' as const
    };
    setLabours(prev => [...prev, labour]);
    setIsAddDialogOpen(false);
  };

  const markAllPresent = () => {
    setLabours(prev => prev.map(l => ({ ...l, attendance: 'Present' })));
  };

  const markAllAbsent = () => {
    setLabours(prev => prev.map(l => ({ ...l, attendance: 'Absent' })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Labour Management</h1>
          <p className="text-muted-foreground">Track attendance, assignments, and daily wages.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <UserPlus className="w-4 h-4 mr-2" /> Add Labour
            </DialogTrigger>
            <DialogContent className="bg-white border-none shadow-2xl max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900">Register New Labour</DialogTitle>
                <DialogDescription className="text-slate-500">Add a new worker to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <Input 
                    value={newLabour.name}
                    onChange={(e) => setNewLabour({...newLabour, name: e.target.value})}
                    placeholder="e.g. Rajesh Kumar" 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                    <Input 
                      value={newLabour.role}
                      onChange={(e) => setNewLabour({...newLabour, role: e.target.value})}
                      placeholder="e.g. Mason" 
                      className="bg-slate-50 border-slate-200 h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Wage (₹)</label>
                    <Input 
                      type="number"
                      value={newLabour.dailyWage}
                      onChange={(e) => setNewLabour({...newLabour, dailyWage: parseInt(e.target.value)})}
                      className="bg-slate-50 border-slate-200 h-11"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
                <Button onClick={handleAddLabour} className="bg-primary text-slate-900 font-bold hover:bg-primary/90">Register Worker</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAttendanceDialogOpen} onOpenChange={setIsAttendanceDialogOpen}>
            <DialogTrigger render={<Button className="bg-secondary text-primary hover:bg-secondary/90" />}>
              Update Attendance
            </DialogTrigger>
            <DialogContent className="bg-white border-none shadow-2xl max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900">Bulk Attendance Update</DialogTitle>
                <DialogDescription className="text-slate-500">Quickly update attendance for all workers today.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-8">
                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={() => { markAllPresent(); setIsAttendanceDialogOpen(false); }} 
                    className="bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-bold shadow-lg shadow-green-100"
                  >
                    <CheckCircle2 className="w-6 h-6 mr-3" /> Mark All Present
                  </Button>
                  <Button 
                    onClick={() => { markAllAbsent(); setIsAttendanceDialogOpen(false); }} 
                    variant="destructive"
                    className="h-14 text-lg font-bold shadow-lg shadow-red-100"
                  >
                    <XCircle className="w-6 h-6 mr-3" /> Mark All Absent
                  </Button>
                </div>
                <div className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
                  This will update the status for all registered workers.<br/>
                  You can still toggle individual status in the table.
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAttendanceDialogOpen(false)} className="w-full border-slate-200 text-slate-600 h-11">
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white border-border shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Labours</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{labours.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-border shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {labours.filter(l => l.attendance === 'Present').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-border shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Daily Wage Total</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹ {labours.reduce((acc, curr) => acc + curr.dailyWage, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or role..." 
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
              <TableHead>ID</TableHead>
              <TableHead>Assigned Project</TableHead>
              <TableHead>Work Role</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Daily Wage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLabour.map((labour) => (
              <TableRow key={labour.id}>
                <TableCell className="font-medium">{labour.name}</TableCell>
                <TableCell>{labour.id}</TableCell>
                <TableCell>{labour.assignedProject}</TableCell>
                <TableCell>
                  <Badge variant="outline">{labour.role}</Badge>
                </TableCell>
                <TableCell>
                  <button 
                    onClick={() => toggleAttendance(labour.id)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {labour.attendance === 'Present' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={labour.attendance === 'Present' ? 'text-green-600' : 'text-red-600'}>
                      {labour.attendance}
                    </span>
                  </button>
                </TableCell>
                <TableCell className="text-right">₹ {labour.dailyWage}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full transition-colors" />}>
                      <MoreHorizontal className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white border-slate-200 shadow-2xl rounded-xl p-1.5 z-50">
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        Edit Details
                      </DropdownMenuItem>
                      <div className="h-px bg-slate-100 my-1.5 mx-1" />
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-primary font-bold hover:bg-primary/5 focus:bg-primary/5 transition-colors text-sm">
                        <DollarSign className="w-4 h-4" /> Pay Salary
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
