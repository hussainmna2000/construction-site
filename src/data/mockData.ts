/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  siteNumber: string;
  location: string;
  startDate: string;
  status: 'Ongoing' | 'Completed';
  assignedStaff: string[];
  teamLeader: string;
  timeline: string;
  currentStage: string;
  laboursCount: number;
  materialUsage: string;
}

export interface Labour {
  id: string;
  name: string;
  assignedProject: string;
  role: string;
  attendance: 'Present' | 'Absent';
  dailyWage: number;
  totalSalary: number;
}

export interface Material {
  id: string;
  name: string;
  required: number;
  used: number;
  unit: string;
  costPerUnit: number;
}

export interface StockItem {
  id: string;
  name: string;
  total: number;
  used: number;
  minLevel: number;
}

export interface SalaryRecord {
  id: string;
  labourName: string;
  daysWorked: number;
  wageRate: number;
  totalSalary: number;
  status: 'Paid' | 'Pending';
  date: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Skyline Apartments',
    siteNumber: 'SITE-001',
    location: 'Downtown City',
    startDate: '2024-01-15',
    status: 'Ongoing',
    assignedStaff: ['John Doe', 'Sarah Smith'],
    teamLeader: 'Arjun Varma',
    timeline: '12 Months',
    currentStage: 'Foundation',
    laboursCount: 45,
    materialUsage: 'High',
  },
  {
    id: '2',
    name: 'Green Valley Villas',
    siteNumber: 'SITE-042',
    location: 'Suburban Area',
    startDate: '2023-11-10',
    status: 'Ongoing',
    assignedStaff: ['Sarah Smith'],
    teamLeader: 'Vikram Singh',
    timeline: '18 Months',
    currentStage: 'Roofing',
    laboursCount: 30,
    materialUsage: 'Medium',
  },
  {
    id: '3',
    name: 'Industrial Hub',
    siteNumber: 'SITE-105',
    location: 'Industrial Zone',
    startDate: '2023-06-01',
    status: 'Completed',
    assignedStaff: ['Mike Johnson'],
    teamLeader: 'Sanjay Dutt',
    timeline: '8 Months',
    currentStage: 'Finished',
    laboursCount: 0,
    materialUsage: 'Low',
  },
];

export const LABOURS: Labour[] = [
  { id: 'L001', name: 'Ahmed Khan', assignedProject: 'Skyline Apartments', role: 'Mason', attendance: 'Present', dailyWage: 800, totalSalary: 24000 },
  { id: 'L002', name: 'Rajesh Kumar', assignedProject: 'Skyline Apartments', role: 'Electrician', attendance: 'Present', dailyWage: 1000, totalSalary: 30000 },
  { id: 'L003', name: 'Suresh Singh', assignedProject: 'Green Valley Villas', role: 'Plumber', attendance: 'Absent', dailyWage: 900, totalSalary: 27000 },
];

export const MATERIALS: Material[] = [
  { id: 'M001', name: 'Cement', required: 500, used: 350, unit: 'bags', costPerUnit: 450 },
  { id: 'M002', name: 'Steel Rods', required: 2000, used: 1200, unit: 'kg', costPerUnit: 75 },
  { id: 'M003', name: 'Bricks', required: 10000, used: 8000, unit: 'pieces', costPerUnit: 12 },
];

export const STOCK: StockItem[] = [
  { id: 'S001', name: 'Cement', total: 1000, used: 350, minLevel: 200 },
  { id: 'S002', name: 'Steel Rods', total: 5000, used: 1200, minLevel: 1000 },
  { id: 'S003', name: 'Sand', total: 500, used: 450, minLevel: 100 },
];

export const SALARIES: SalaryRecord[] = [
  { id: 'SR001', labourName: 'Ahmed Khan', daysWorked: 25, wageRate: 800, totalSalary: 20000, status: 'Paid', date: '2024-03-01' },
  { id: 'SR002', labourName: 'Rajesh Kumar', daysWorked: 22, wageRate: 1000, totalSalary: 22000, status: 'Pending', date: '2024-03-05' },
];
