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
  History,
  Trash2,
  Eye,
  Calendar,
  Building2,
  Info
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
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
import { StockItem } from '@/src/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function StockPage() {
  const { stock, updateStock, addStock, deleteStock } = useConstruction();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [stockToUpdate, setStockToUpdate] = useState<StockItem | null>(null);
  
  const [newItem, setNewItem] = useState<Partial<StockItem>>({
    name: '',
    supplierName: '',
    total: 0,
    used: 0,
    minLevel: 0,
    arrivalDate: new Date().toISOString().split('T')[0],
    details: ''
  });

  const filteredStock = stock.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.supplierName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (stockToUpdate) {
      updateStock(stockToUpdate);
      setIsUpdateDialogOpen(false);
      setStockToUpdate(null);
    }
  };

  const handleAddNewStock = (e: React.FormEvent) => {
    e.preventDefault();
    const stockItem: StockItem = {
      ...newItem as StockItem,
      id: `S${Date.now()}`
    };
    addStock(stockItem);
    setIsAddDialogOpen(false);
    setNewItem({
      name: '',
      supplierName: '',
      total: 0,
      used: 0,
      minLevel: 0,
      arrivalDate: new Date().toISOString().split('T')[0],
      details: ''
    });
  };

  const handleDeleteConfirm = () => {
    if (selectedItem) {
      deleteStock(selectedItem.id);
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
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
          <Button 
            className="bg-secondary text-primary hover:bg-secondary/90 shadow-sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Item
          </Button>
        </div>
      </div>

      {/* MODAL: ADD NEW STOCK ITEM */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Add New Material
            </DialogTitle>
            <DialogDescription className="text-slate-500">Register new inventory item in the warehouse.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddNewStock}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Material Name</label>
                  <Input 
                    required
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="h-10 border-slate-200"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Supplier Name</label>
                  <Input 
                    required
                    value={newItem.supplierName}
                    onChange={(e) => setNewItem({...newItem, supplierName: e.target.value})}
                    className="h-10 border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Total Stock</label>
                  <Input 
                    type="number"
                    required
                    value={newItem.total}
                    onChange={(e) => setNewItem({...newItem, total: parseFloat(e.target.value) || 0})}
                    className="h-10 border-slate-200"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Used Stock</label>
                  <Input 
                    type="number"
                    required
                    value={newItem.used}
                    onChange={(e) => setNewItem({...newItem, used: parseFloat(e.target.value) || 0})}
                    className="h-10 border-slate-200"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Min Level</label>
                  <Input 
                    type="number"
                    required
                    value={newItem.minLevel}
                    onChange={(e) => setNewItem({...newItem, minLevel: parseFloat(e.target.value) || 0})}
                    className="h-10 border-slate-200"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Arrival Date</label>
                <Input 
                  type="date"
                  required
                  value={newItem.arrivalDate}
                  onChange={(e) => setNewItem({...newItem, arrivalDate: e.target.value})}
                  className="h-10 border-slate-200"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Details / Notes</label>
                <textarea 
                  rows={3}
                  value={newItem.details}
                  onChange={(e) => setNewItem({...newItem, details: e.target.value})}
                  className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary lg"
                  placeholder="e.g. Batch number, Truck details..."
                />
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="text-slate-500">Cancel</Button>
              <Button type="submit" className="bg-primary text-slate-900 font-bold hover:bg-primary/90">Add to Inventory</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: UPDATE STOCK */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-primary" /> Update Stock: {stockToUpdate?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-500">Update inventory levels and delivery details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateStock}>
            {stockToUpdate && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supplier Name</label>
                    <Input 
                      value={stockToUpdate.supplierName}
                      onChange={(e) => setStockToUpdate({...stockToUpdate, supplierName: e.target.value})}
                      className="bg-slate-50 border-slate-200 h-10"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Arrival Date</label>
                    <Input 
                      type="date"
                      value={stockToUpdate.arrivalDate}
                      onChange={(e) => setStockToUpdate({...stockToUpdate, arrivalDate: e.target.value})}
                      className="bg-slate-50 border-slate-200 h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Stock</label>
                    <Input 
                      type="number"
                      value={stockToUpdate.total}
                      onChange={(e) => setStockToUpdate({...stockToUpdate, total: parseFloat(e.target.value) || 0})}
                      className="bg-slate-50 border-slate-200 h-10"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Used Stock</label>
                    <Input 
                      type="number"
                      value={stockToUpdate.used}
                      onChange={(e) => setStockToUpdate({...stockToUpdate, used: parseFloat(e.target.value) || 0})}
                      className="bg-slate-50 border-slate-200 h-10"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Min Level</label>
                    <Input 
                      type="number"
                      value={stockToUpdate.minLevel}
                      onChange={(e) => setStockToUpdate({...stockToUpdate, minLevel: parseFloat(e.target.value) || 0})}
                      className="bg-slate-50 border-slate-200 h-10"
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Details / Remarks</label>
                  <textarea 
                    rows={3}
                    value={stockToUpdate.details}
                    onChange={(e) => setStockToUpdate({...stockToUpdate, details: e.target.value})}
                    className="w-full rounded-md border border-slate-200 bg-slate-50 p-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsUpdateDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
              <Button type="submit" className="bg-primary text-slate-900 font-bold hover:bg-primary/90">Save Updates</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: STOCK AUDIT */}
      <Dialog open={isAuditDialogOpen} onOpenChange={setIsAuditDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" /> Stock Audit Details
            </DialogTitle>
            <DialogDescription className="text-slate-500">Comprehensive view of material inventory records.</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-slate-900 font-black text-xl shadow-sm">
                  {selectedItem.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{selectedItem.name}</h4>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" /> {selectedItem.supplierName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Sourced</p>
                  <p className="font-bold text-slate-700 text-base">{selectedItem.total} units</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Consumed</p>
                  <p className="font-bold text-slate-700 text-base">{selectedItem.used} units</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Balance</p>
                  <p className="font-bold text-primary text-base">{selectedItem.total - selectedItem.used} units</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Arrival Date</p>
                  <p className="font-bold text-slate-700 text-base flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {selectedItem.arrivalDate}
                  </p>
                </div>
              </div>

              <div className="space-y-2 p-3 bg-slate-100/50 rounded-lg">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Notes & Remarks
                </p>
                <p className="text-sm text-slate-600 italic whitespace-pre-wrap leading-relaxed">
                  {selectedItem.details || 'No additional notes provided for this batch.'}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsAuditDialogOpen(false)} className="w-full bg-slate-900 text-white font-bold hover:bg-slate-800">Close Audit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: DELETE CONFIRMATION */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" /> Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-slate-600 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-800">{selectedItem?.name}</span>? This action cannot be undone and will remove all stock records for this item.
            </p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1 text-slate-500">Cancel</Button>
            <Button onClick={handleDeleteConfirm} className="flex-1 bg-destructive text-white font-bold hover:bg-destructive/90 transition-all hover:scale-[1.02]">Delete Stock</Button>
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
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-bold text-slate-600">Material Name</TableHead>
              <TableHead className="font-bold text-slate-600">Supplier Name</TableHead>
              <TableHead className="font-bold text-slate-600">Total Stock</TableHead>
              <TableHead className="font-bold text-slate-600">Used Stock</TableHead>
              <TableHead className="font-bold text-slate-600">Remaining</TableHead>
              <TableHead className="font-bold text-slate-600">Min. Level</TableHead>
              <TableHead className="font-bold text-slate-600">Status</TableHead>
              <TableHead className="font-bold text-slate-600">Details</TableHead>
              <TableHead className="text-right font-bold text-slate-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStock.map((item) => {
              const remaining = item.total - item.used;
              const isLow = remaining <= item.minLevel;
              return (
                <TableRow key={item.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="font-bold text-slate-900">{item.name}</TableCell>
                  <TableCell className="text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.supplierName || '---'}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-700">{item.total}</TableCell>
                  <TableCell className="text-slate-700">{item.used}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-black text-base px-2 py-0.5 rounded-lg",
                      isLow ? "text-destructive bg-destructive/5" : "text-primary bg-primary/5"
                    )}>
                      {remaining}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 font-medium">{item.minLevel}</TableCell>
                  <TableCell>
                    {isLow ? (
                      <Badge variant="destructive" className="flex items-center gap-1 w-fit shadow-sm animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 shadow-sm border-green-200">OK</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="flex flex-col gap-0.5 text-xs">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.arrivalDate || '---'}
                      </span>
                      <p className="text-slate-600 truncate italic">
                        {item.details || 'No remarks'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-slate-200 rounded-full transition-all group-hover:scale-110">
                          <MoreHorizontal className="h-4 w-4 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 bg-white border-slate-200 shadow-2xl rounded-xl p-1.5 z-50">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                          onClick={() => { setStockToUpdate({...item}); setIsUpdateDialogOpen(true); }}
                        >
                          <ArrowUp className="w-4 h-4 text-slate-500" /> Update Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                          onClick={() => { setSelectedItem(item); setIsAuditDialogOpen(true); }}
                        >
                          <History className="w-4 h-4 text-slate-500" /> Stock Audit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-100 my-1" />
                        <DropdownMenuItem 
                          className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors text-sm font-bold"
                          onClick={() => { setSelectedItem(item); setIsDeleteDialogOpen(true); }}
                        >
                          <Trash2 className="w-4 h-4" /> Delete Stock
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
