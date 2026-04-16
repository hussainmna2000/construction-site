import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Package,
  ArrowRightLeft,
  Trash2,
  Edit
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useConstruction } from '@/src/context/ConstructionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MATERIALS } from '@/src/data/mockData';

export default function MaterialsPage() {
  const { stock } = useConstruction();
  const [materials, setMaterials] = useState(MATERIALS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    required: 0,
    unit: 'Bags',
    costPerUnit: 0
  });

  // Sync materials 'used' with stock usage for items that exist in both
  const displayMaterials = materials.map(m => {
    const stockMatch = stock.find(s => s.name === m.name);
    return stockMatch ? { ...m, used: stockMatch.used } : m;
  });

  const filteredMaterials = displayMaterials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMaterial = () => {
    const material = {
      ...newMaterial,
      id: (materials.length + 1).toString(),
      used: 0
    };
    setMaterials([...materials, material]);
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Materials List</h1>
          <p className="text-muted-foreground">Manage material requirements and usage per project.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger render={<Button className="bg-secondary text-primary hover:bg-secondary/90" />}>
            <Plus className="w-4 h-4 mr-2" /> Add Material
          </DialogTrigger>
          <DialogContent className="bg-white border-none shadow-2xl max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900">Add New Material</DialogTitle>
              <DialogDescription className="text-slate-500">Enter the details for the new material requirement.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Material Name</label>
                <Input 
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                  placeholder="e.g. Portland Cement" 
                  className="bg-slate-50 border-slate-200 h-11"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Required Quantity</label>
                  <Input 
                    type="number"
                    step="any"
                    value={newMaterial.required}
                    onChange={(e) => setNewMaterial({...newMaterial, required: parseFloat(e.target.value) || 0})}
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unit</label>
                  <Select 
                    value={newMaterial.unit} 
                    onValueChange={(value) => setNewMaterial({...newMaterial, unit: value})}
                  >
                    <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 shadow-xl rounded-xl z-[60]">
                      <SelectItem value="Bags">Bags</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="no of pcs">no of pcs</SelectItem>
                      <SelectItem value="litre">litre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cost Per Unit (₹)</label>
                <Input 
                  type="number"
                  step="any"
                  value={newMaterial.costPerUnit}
                  onChange={(e) => setNewMaterial({...newMaterial, costPerUnit: parseFloat(e.target.value) || 0})}
                  className="bg-slate-50 border-slate-200 h-11"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
              <Button onClick={handleAddMaterial} className="bg-primary text-slate-900 font-bold hover:bg-primary/90">Add Material</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹ {materials.reduce((acc, curr) => acc + (curr.used * curr.costPerUnit), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Pending Requirement</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {materials.filter(m => m.required > m.used).length} Items
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Usage Efficiency</CardTitle>
            <Badge variant="outline" className="text-green-600 border-green-600">88%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">88%</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search materials..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material Name</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Used</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Cost/Unit</TableHead>
              <TableHead className="text-right">Total Cost</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMaterials.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.required}</TableCell>
                <TableCell>{item.used}</TableCell>
                <TableCell>
                  <span className={item.required - item.used < 100 ? 'text-red-600 font-bold' : ''}>
                    {item.required - item.used}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.unit}</Badge>
                </TableCell>
                <TableCell className="text-right">₹ {item.costPerUnit}</TableCell>
                <TableCell className="text-right font-semibold">
                  ₹ {(item.used * item.costPerUnit).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full transition-colors" />}>
                      <MoreHorizontal className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white border-slate-200 shadow-2xl rounded-xl p-1.5 z-50">
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <Edit className="w-4 h-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <ArrowRightLeft className="w-4 h-4" /> Update Usage
                      </DropdownMenuItem>
                      <div className="h-px bg-slate-100 my-1.5 mx-1" />
                      <DropdownMenuItem 
                        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-destructive hover:bg-destructive/5 focus:bg-destructive/5 transition-colors text-sm font-bold"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
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
