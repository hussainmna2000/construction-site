import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Shield, 
  Bell, 
  Lock, 
  Plus,
  Mail,
  Phone,
  Globe,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SettingsPage() {
  const [companyData, setCompanyData] = useState({
    name: 'MNA SMART Solutions Pvt Ltd',
    description: 'Building quality homes since 2010',
    registrationNumber: 'REG-2024-8892',
    email: 'contact@mnasmart.com',
    phone: '+91 98765 43210',
    website: 'https://www.mnasmart.com'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!companyData.name.trim()) newErrors.name = 'Company name is required';
    if (!companyData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!companyData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(companyData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneDigits = companyData.phone.replace(/[^0-9]/g, '');
    if (!companyData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length < 5) {
      newErrors.phone = 'Phone number must be numeric';
    }
    
    if (!companyData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!companyData.website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (validate()) {
      setIsSaving(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
        setSuccess(true);
        // Save to localStorage as a mock
        localStorage.setItem('companyProfile', JSON.stringify(companyData));
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your company profile, user roles, and system preferences.</p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="company" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Building2 className="w-4 h-4 mr-2" /> Company Profile
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" /> User Management
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Lock className="w-4 h-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Update your construction company's public information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {success && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Company profile updated successfully.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input 
                      name="name"
                      value={companyData.name} 
                      onChange={handleInputChange}
                      className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Registration Number</label>
                    <Input 
                      name="registrationNumber"
                      value={companyData.registrationNumber} 
                      onChange={handleInputChange}
                      className={errors.registrationNumber ? 'border-destructive focus-visible:ring-destructive' : ''}
                    />
                    {errors.registrationNumber && <p className="text-xs text-destructive">{errors.registrationNumber}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        name="email"
                        className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={companyData.email} 
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        name="phone"
                        className={`pl-10 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={companyData.phone} 
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Company Description</label>
                    <Input 
                      name="description"
                      value={companyData.description} 
                      onChange={handleInputChange}
                      placeholder="e.g. Building quality homes since 2010"
                      className={errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}
                    />
                    {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        name="website"
                        className={`pl-10 ${errors.website ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={companyData.website} 
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 min-w-[140px]" 
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Staff & User Roles</CardTitle>
                <CardDescription>Manage access levels for your team members.</CardDescription>
              </div>
              <Button size="sm" className="bg-secondary text-primary hover:bg-secondary/90">
                <Plus className="w-4 h-4 mr-2" /> Add New Staff
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Doe', role: 'MD', email: 'john@mnasmart.com', status: 'Active' },
                  { name: 'Sarah Smith', role: 'Staff', email: 'sarah@mnasmart.com', status: 'Active' },
                  { name: 'Mike Johnson', role: 'Staff', email: 'mike@mnasmart.com', status: 'Inactive' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={user.role === 'MD' ? 'secondary' : 'outline'}>{user.role}</Badge>
                      <Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'} className={user.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                        {user.status}
                      </Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password and security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="bg-primary hover:bg-primary/90" onClick={() => alert('Password updated successfully!')}>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
