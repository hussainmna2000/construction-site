import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, PROJECTS, StockItem, STOCK, Material, MATERIALS } from '@/src/data/mockData';

interface UsedMaterial {
  materialId: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface ProjectWithUsage extends Project {
  materialsUsed: UsedMaterial[];
}

interface ConstructionContextType {
  projects: ProjectWithUsage[];
  stock: StockItem[];
  addMaterialToProject: (projectId: string, materialId: string, quantity: number) => void;
  updateProject: (project: ProjectWithUsage) => void;
  addProject: (project: ProjectWithUsage) => void;
  deleteProject: (projectId: string) => void;
  markProjectCompleted: (projectId: string) => void;
  updateStock: (item: StockItem) => void;
  addStock: (item: StockItem) => void;
  deleteStock: (stockId: string) => void;
}

const ConstructionContext = createContext<ConstructionContextType | undefined>(undefined);

export function ConstructionProvider({ children }: { children: React.ReactNode }) {
  // Initialize with empty arrays or load from localStorage
  const [projects, setProjects] = useState<ProjectWithUsage[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);

  useEffect(() => {
    // Load data
    const savedProjects = localStorage.getItem('mna_projects');
    const savedStock = localStorage.getItem('mna_stock');

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Initialize with mock data and add materialsUsed array
      setProjects(PROJECTS.map(p => ({ ...p, materialsUsed: [] })));
    }

    if (savedStock) {
      setStock(JSON.parse(savedStock));
    } else {
      setStock(STOCK);
    }
  }, []);

  // Save changes to localStorage whenever state updates
  useEffect(() => {
    if (projects.length > 0) localStorage.setItem('mna_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (stock.length > 0) localStorage.setItem('mna_stock', JSON.stringify(stock));
  }, [stock]);

  const addMaterialToProject = (projectId: string, materialId: string, quantity: number) => {
    // 1. Update Project Usage
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const stockItem = stock.find(s => s.id === materialId);
        if (!stockItem) return p;

        const existingMaterialIndex = p.materialsUsed.findIndex(m => m.materialId === materialId);
        const newUsage = [...p.materialsUsed];

        if (existingMaterialIndex >= 0) {
          newUsage[existingMaterialIndex].quantity += quantity;
        } else {
          newUsage.push({
            materialId,
            name: stockItem.name,
            quantity,
            unit: 'units' // In a real app we'd get this from stock/material metadata
          });
        }
        return { ...p, materialsUsed: newUsage };
      }
      return p;
    }));

    // 2. Reduce from Stock
    setStock(prev => prev.map(s => {
      if (s.id === materialId) {
        return { ...s, used: s.used + quantity };
      }
      return s;
    }));
  };

  const updateProject = (updatedProject: ProjectWithUsage) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const addProject = (newProject: ProjectWithUsage) => {
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const markProjectCompleted = (projectId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'Completed', currentStage: 'Project Finished' } : p));
  };

  const updateStock = (updatedItem: StockItem) => {
    setStock(prev => prev.map(s => s.id === updatedItem.id ? updatedItem : s));
  };

  const addStock = (newItem: StockItem) => {
    setStock(prev => [...prev, newItem]);
  };

  const deleteStock = (stockId: string) => {
    setStock(prev => prev.filter(s => s.id !== stockId));
  };

  return (
    <ConstructionContext.Provider value={{ 
      projects, 
      stock, 
      addMaterialToProject, 
      updateProject, 
      addProject,
      deleteProject,
      markProjectCompleted,
      updateStock,
      addStock,
      deleteStock
    }}>
      {children}
    </ConstructionContext.Provider>
  );
}

export function useConstruction() {
  const context = useContext(ConstructionContext);
  if (context === undefined) {
    throw new Error('useConstruction must be used within a ConstructionProvider');
  }
  return context;
}
