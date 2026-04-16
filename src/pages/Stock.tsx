import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Warehouse,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  History
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
import { useConstruction } from '@/src/context/ConstructionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function StockPage() {
  const { stock, updateStock } = useConstruction();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [updateAmount, setUpdateAmount] = useState(0);

  const filteredStock = stock.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStock = (type: 'add' | 'issue') => {
    if (!selectedItem) return;
    const newItem = {
      ...selectedItem,
      used: type === 'issue' ? selectedItem.used + updateAmount : selectedItem.used,
      total: type === 'add' ? selectedItem.total + updateAmount : selectedItem.total
    };
    updateStock(newItem);
    setIsAddDialogOpen(false);
    setSelectedItem(null);
    setUpdateAmount(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
          <p className="text-muted-foreground">Monitor inventory levels and warehouse stock.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" /> Stock History
          </Button>
          <Button className="bg-secondary text-primary hover:bg-secondary/90">
            <Plus className="w-4 h-4 mr-2" /> Add New Item
          </Button>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">{selectedItem?.name} - Update Stock</DialogTitle>
            <DialogDescription className="text-slate-500">Enter the quantity to add or issue from stock.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity</label>
              <Input 
                type="number"
                step="any"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(parseFloat(e.target.value) || 0)}
                className="bg-slate-50 border-slate-200 h-11"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => handleUpdateStock('issue')} className="flex-1 border-slate-200 text-destructive hover:bg-destructive/5 h-11">Issue Stock</Button>
            <Button onClick={() => handleUpdateStock('add')} className="flex-1 bg-primary text-slate-900 font-bold hover:bg-primary/90 h-11">Add to Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stock.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stock.filter(s => s.total - s.used < s.minLevel).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Stock Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 12.5L</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warehouse Capacity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">65%</div>
            <Progress value={65} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search inventory..." 
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
              <TableHead>Total Stock</TableHead>
              <TableHead>Used Stock</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Min. Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStock.map((item) => {
              const remaining = item.total - item.used;
              const isLow = remaining < item.minLevel;
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>{item.used}</TableCell>
                  <TableCell className="font-semibold">{remaining}</TableCell>
                  <TableCell>{item.minLevel}</TableCell>
                  <TableCell>
                    {isLow ? (
                      <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">OK</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full transition-colors" />}>
                        <MoreHorizontal className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white border-slate-200 shadow-2xl rounded-xl p-1.5 z-50">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                          onClick={() => { setSelectedItem(item); setIsAddDialogOpen(true); }}
                        >
                          <ArrowUp className="w-4 h-4 text-slate-500" /> Update Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                          <History className="w-4 h-4 text-slate-500" /> Stock Audit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
