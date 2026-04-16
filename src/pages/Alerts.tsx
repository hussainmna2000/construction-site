import React from 'react';
import { 
  AlertTriangle, 
  Bell, 
  Clock, 
  Package, 
  HardHat,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      title: 'Low Stock Alert',
      message: 'Cement stock is below minimum level (200 bags) at SITE-001. Current: 150 bags.',
      priority: 'High',
      date: '2024-03-15 10:30 AM',
      type: 'stock',
      icon: Package
    },
    {
      id: 2,
      title: 'Project Deadline Reminder',
      message: 'Foundation work for Skyline Apartments is scheduled to finish in 3 days.',
      priority: 'Medium',
      date: '2024-03-15 09:15 AM',
      type: 'project',
      icon: HardHat
    },
    {
      id: 3,
      title: 'Attendance Reminder',
      message: 'Daily attendance for SITE-042 has not been updated yet.',
      priority: 'Low',
      date: '2024-03-15 08:00 AM',
      type: 'attendance',
      icon: Clock
    },
    {
      id: 4,
      title: 'Material Reorder',
      message: 'Steel Rods reorder request has been approved by MD.',
      priority: 'Low',
      date: '2024-03-14 04:45 PM',
      type: 'info',
      icon: Info
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Reminder & Alerts</h1>
          <p className="text-muted-foreground">Stay updated with critical site notifications and inventory alerts.</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={cn(
            "border-l-4",
            alert.priority === 'High' ? "border-l-destructive" : 
            alert.priority === 'Medium' ? "border-l-secondary" : "border-l-blue-500"
          )}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    alert.priority === 'High' ? "bg-red-100 text-red-600" : 
                    alert.priority === 'Medium' ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-600"
                  )}>
                    <alert.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {alert.date}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={alert.priority === 'High' ? 'destructive' : alert.priority === 'Medium' ? 'secondary' : 'outline'}>
                  {alert.priority} Priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{alert.message}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Dismiss</Button>
                <Button size="sm" className={cn(
                  alert.priority === 'High' ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
                )}>
                  Take Action
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Receive alerts on your mobile device</p>
              </div>
            </div>
            <Badge variant="secondary">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email Alerts</p>
                <p className="text-xs text-muted-foreground">Daily summary and critical alerts via email</p>
              </div>
            </div>
            <Badge variant="outline">Disabled</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
