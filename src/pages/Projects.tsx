import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  MapPin, 
  Calendar, 
  Users, 
  Layers,
  Edit2,
  Trash2,
  ExternalLink,
  Clock,
  Package,
  ArrowRightLeft,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useConstruction, ProjectWithUsage } from '@/src/context/ConstructionContext';

export default function ProjectsPage() {
  const { projects, stock, addMaterialToProject, addProject, updateProject, deleteProject, markProjectCompleted } = useConstruction();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectWithUsage | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  
  const [assignment, setAssignment] = useState({
    materialId: '',
    quantity: 0
  });

  const [newProject, setNewProject] = useState<Partial<ProjectWithUsage>>({
    name: '',
    location: '',
    siteNumber: '',
    status: 'Ongoing',
    currentStage: 'Excavation',
    startDate: new Date().toISOString().split('T')[0],
    laboursCount: 0,
    timeline: '6 Months',
    assignedStaff: [],
    teamLeader: '',
    materialsUsed: []
  });

  const [editingProject, setEditingProject] = useState<ProjectWithUsage | null>(null);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.siteNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    if (!newProject.name || !newProject.siteNumber) {
      return;
    }
    const project: ProjectWithUsage = {
      ...newProject as ProjectWithUsage,
      id: `PRJ-${Date.now()}`,
      materialsUsed: []
    };
    addProject(project);
    setIsAddDialogOpen(false);
    setNewProject({
      name: '',
      location: '',
      siteNumber: '',
      status: 'Ongoing',
      currentStage: 'Excavation',
      startDate: new Date().toISOString().split('T')[0],
      laboursCount: 0,
      timeline: '6 Months',
      assignedStaff: [],
      teamLeader: '',
      materialsUsed: []
    });
  };

  const handleEditProject = () => {
    if (editingProject) {
      updateProject(editingProject);
      
      // If the currently selected project (viewing details) was edited, update it too
      if (selectedProject?.id === editingProject.id) {
        setSelectedProject(editingProject);
      }
      
      setIsEditDialogOpen(false);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
      if (selectedProject?.id === projectToDelete) {
        setSelectedProject(null);
      }
    }
  };

  const handleAssignMaterial = () => {
    if (selectedProject && assignment.materialId && assignment.quantity > 0) {
      addMaterialToProject(selectedProject.id, assignment.materialId, assignment.quantity);
      setIsAssignDialogOpen(false);
      setAssignment({ materialId: '', quantity: 0 });
      // Update selected project in view
      const updated = projects.find(p => p.id === selectedProject.id);
      if (updated) setSelectedProject(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 
            whileHover={{ scale: 1.02, x: 5 }}
            className="text-3xl font-bold tracking-tight animate-text-glow cursor-default"
          >
            Projects Management
          </motion.h1>
          <p className="text-muted-foreground">Manage and track all ongoing construction sites.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger render={<Button className="bg-secondary text-primary hover:bg-secondary/90" />}>
            <Plus className="w-4 h-4 mr-2" /> Add New Project
          </DialogTrigger>
          <DialogContent className="bg-white border-none shadow-2xl max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900">Add New Project Site</DialogTitle>
              <DialogDescription className="text-slate-500">Enter the details for the new construction project.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Name</label>
                  <Input 
                    value={newProject.name} 
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    placeholder="e.g. Sterling Heights" 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                  <Input 
                    value={newProject.location} 
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    placeholder="e.g. Oakwood District" 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Status</label>
                  <Input 
                    value={newProject.currentStage} 
                    onChange={(e) => setNewProject({...newProject, currentStage: e.target.value})}
                    placeholder="e.g. Excavation, Foundation..." 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">No. of Labours Assigned</label>
                  <Input 
                    type="number"
                    value={newProject.laboursCount} 
                    onChange={(e) => setNewProject({...newProject, laboursCount: parseInt(e.target.value) || 0})}
                    placeholder="0"
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Staff Assigned</label>
                  <Input 
                    value={newProject.assignedStaff?.join(', ')} 
                    onChange={(e) => setNewProject({...newProject, assignedStaff: e.target.value.split(',').map(s => s.trim())})}
                    placeholder="Enter staff name..." 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Team Leader</label>
                  <Input 
                    value={newProject.teamLeader} 
                    onChange={(e) => setNewProject({...newProject, teamLeader: e.target.value})}
                    placeholder="Enter group leader name..." 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Site Number</label>
                  <Input 
                    value={newProject.siteNumber} 
                    onChange={(e) => setNewProject({...newProject, siteNumber: e.target.value})}
                    placeholder="SITE-00X" 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</label>
                  <Input 
                    type="date"
                    value={newProject.startDate} 
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
              <Button onClick={handleAddProject} className="bg-primary text-slate-900 font-bold hover:bg-primary/90">Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-muted relative">
              <img 
                src={`https://picsum.photos/seed/${project.id}/400/200`} 
                alt={project.name}
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <Badge className="absolute top-3 right-3" variant={project.status === 'Ongoing' ? 'secondary' : 'outline'}>
                {project.status}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <motion.div whileHover={{ x: 3 }}>
                    <CardTitle className="text-xl animate-word-hover">{project.name}</CardTitle>
                  </motion.div>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </CardDescription>
                </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 rounded-full transition-colors flex mt-1" />}>
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200 shadow-xl rounded-xl p-1.5 z-[200]">
                      <DropdownMenuItem 
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProject(project);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4 text-slate-500" /> Edit Project
                      </DropdownMenuItem>
                      
                      {project.status === 'Ongoing' && (
                        <DropdownMenuItem 
                          className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg hover:bg-green-50 focus:bg-green-50 transition-colors text-sm font-medium text-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            markProjectCompleted(project.id);
                          }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" /> Mark as Completed
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem 
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                          setIsDetailsDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 text-slate-500" /> View Details
                      </DropdownMenuItem>

                      <div className="h-px bg-slate-100 my-1" />

                      <DropdownMenuItem 
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors text-sm font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectToDelete(project.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" /> Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1"><Layers className="w-3 h-3" /> Team Leader</p>
                  <motion.p whileHover={{ x: 2 }} className="font-medium text-primary/90">{project.teamLeader || 'Not Assigned'}</motion.p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> Labours</p>
                  <motion.p whileHover={{ x: 2 }} className="font-medium">{project.laboursCount} Workers</motion.p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Project Status</p>
                  <motion.p whileHover={{ x: 2 }} className="font-medium truncate max-w-[120px]">{project.currentStage}</motion.p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1"><Package className="w-3 h-3" /> Materials</p>
                  <motion.p whileHover={{ x: 2 }} className="font-medium truncate max-w-[120px]">
                    {project.materialsUsed && project.materialsUsed.length > 0 
                      ? project.materialsUsed.map(m => m.name).join(', ') 
                      : 'None'}
                  </motion.p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setSelectedProject(project);
                  setIsDetailsDialogOpen(true);
                }}
              >
                View Details <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailsDialogOpen} onOpenChange={(open) => {
        setIsDetailsDialogOpen(open);
        if (!open) setSelectedProject(null);
      }}>
        <DialogContent className="max-w-2xl bg-white border-none shadow-2xl overflow-y-auto max-h-[90vh] z-[110]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">{selectedProject?.name}</DialogTitle>
            <DialogDescription className="text-slate-500">Detailed project overview and current status.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Site Number</p>
                <p className="text-lg font-bold text-slate-900">{selectedProject?.siteNumber}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project Status</p>
                <p className="text-lg font-bold text-slate-900">{selectedProject?.currentStage}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Team Leader</p>
                <p className="text-lg font-bold text-slate-900">{selectedProject?.teamLeader || 'Not Assigned'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-100/50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">No. of Labours Assigned</p>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-black text-slate-900">{selectedProject?.laboursCount}</span>
                  <span className="text-slate-500 font-medium">Workers on site</span>
                </div>
              </div>
              <div className="p-4 bg-slate-100/50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Overall Status</p>
                <Badge variant={selectedProject?.status === 'Ongoing' ? 'secondary' : 'outline'} className="text-sm px-3 py-1">
                  {selectedProject?.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" /> Materials Used
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs font-bold border-primary text-primary hover:bg-primary/5"
                  onClick={() => setIsAssignDialogOpen(true)}
                >
                  <Plus className="w-3 h-3 mr-1" /> Assign Material
                </Button>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                {selectedProject?.materialsUsed && selectedProject.materialsUsed.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {selectedProject.materialsUsed.map((m, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-700">{m.name}</span>
                        <Badge variant="secondary" className="bg-white text-slate-900 border-slate-200">
                          {m.quantity} {m.unit}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    No materials assigned yet.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Staff Assigned
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.assignedStaff.map(staff => (
                  <Badge key={staff} variant="outline" className="bg-white border-slate-200 text-slate-600 px-3 py-1">
                    {staff}
                  </Badge>
                ))}
                {(!selectedProject?.assignedStaff || selectedProject.assignedStaff.length === 0) && (
                  <span className="text-sm text-slate-400">No staff assigned yet.</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-900">Site Images</p>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <img 
                      src={`https://picsum.photos/seed/site-${selectedProject?.id}-${i}/200/120`} 
                      alt="Site"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              className="border-slate-200 text-slate-600"
              onClick={() => {
                if (selectedProject) {
                  setEditingProject(selectedProject);
                  setIsEditDialogOpen(true);
                }
              }}
            >
              Edit Project
            </Button>
            <DialogClose render={<Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={() => setIsDetailsDialogOpen(false)} />}>
              Close Details
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Edit Project Details</DialogTitle>
            <DialogDescription className="text-slate-500">Update the information for this site.</DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-6 py-6 max-h-[70vh] overflow-y-auto px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Name</label>
                  <Input 
                    value={editingProject.name} 
                    onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                  <Input 
                    value={editingProject.location} 
                    onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Status</label>
                  <Input 
                    value={editingProject.currentStage} 
                    onChange={(e) => setEditingProject({...editingProject, currentStage: e.target.value})}
                    placeholder="e.g. Excavation, Foundation..." 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">No. of Labours Assigned</label>
                  <Input 
                    type="number"
                    value={editingProject.laboursCount} 
                    onChange={(e) => setEditingProject({...editingProject, laboursCount: parseInt(e.target.value) || 0})}
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Staff Assigned</label>
                  <Input 
                    value={editingProject.assignedStaff?.join(', ')} 
                    onChange={(e) => setEditingProject({...editingProject, assignedStaff: e.target.value.split(',').map(s => s.trim())})}
                    placeholder="Enter staff name..." 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Team Leader</label>
                  <Input 
                    value={editingProject.teamLeader} 
                    onChange={(e) => setEditingProject({...editingProject, teamLeader: e.target.value})}
                    placeholder="Enter group leader name..." 
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Site Number</label>
                  <Input 
                    value={editingProject.siteNumber} 
                    onChange={(e) => setEditingProject({...editingProject, siteNumber: e.target.value})}
                    className="bg-slate-50 border-slate-200 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Status</label>
                  <Select 
                    value={editingProject.status} 
                    onValueChange={(val: 'Ongoing' | 'Completed') => setEditingProject({...editingProject, status: val})}
                  >
                    <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 shadow-xl rounded-xl z-[200]">
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
            <Button onClick={handleEditProject} className="bg-slate-900 text-white font-bold hover:bg-slate-800">Save Updates</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[400px] z-[110]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Assign Material</DialogTitle>
            <DialogDescription className="text-slate-500">Reduce quantity from stock and assign to project.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Material</label>
              <Select value={assignment.materialId} onValueChange={(val) => setAssignment({...assignment, materialId: val})}>
                <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                  <SelectValue placeholder="Choose from stock..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 shadow-xl rounded-xl z-[120]">
                  {stock.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} ({item.total - item.used} left)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity to Issue</label>
              <Input 
                type="number" 
                value={assignment.quantity}
                onChange={(e) => setAssignment({...assignment, quantity: parseFloat(e.target.value) || 0})}
                placeholder="0"
                className="bg-slate-50 border-slate-200 h-11"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
            <Button onClick={handleAssignMaterial} className="bg-primary text-slate-900 font-bold hover:bg-primary/90">Confirm Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white border-none shadow-2xl max-w-[400px] z-[110]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">Delete Project</DialogTitle>
            <DialogDescription className="text-slate-500">
              Are you sure you want to delete this project? This action cannot be undone and will remove all associated material usage data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="border-slate-200 text-slate-600 font-bold">Cancel</Button>
            <Button onClick={handleDeleteProject} className="bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
