/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConstructionProvider } from './context/ConstructionContext';
import { AppLayout } from './components/layout/AppLayout';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/Projects';
import LabourPage from './pages/Labour';
import MaterialsPage from './pages/Materials';
import SalaryPage from './pages/Salary';
import StockPage from './pages/Stock';
import AlertsPage from './pages/Alerts';
import ReportsPage from './pages/Reports';
import SettingsPage from './pages/Settings';

const RoleProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role as string)) return <Navigate to="/" replace />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <ConstructionProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="labour" element={<LabourPage />} />
              <Route path="materials" element={<MaterialsPage />} />
              <Route path="salary" element={
                <RoleProtectedRoute allowedRoles={['MD']}>
                  <SalaryPage />
                </RoleProtectedRoute>
              } />
              <Route path="stock" element={<StockPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="reports" element={
                <RoleProtectedRoute allowedRoles={['MD']}>
                  <ReportsPage />
                </RoleProtectedRoute>
              } />
              <Route path="settings" element={
                <RoleProtectedRoute allowedRoles={['MD']}>
                  <SettingsPage />
                </RoleProtectedRoute>
              } />
              <Route path="manage-profile" element={
                <RoleProtectedRoute allowedRoles={['MD', 'Staff']}>
                  <SettingsPage />
                </RoleProtectedRoute>
              } />
              <Route path="switch-user" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ConstructionProvider>
    </AuthProvider>
  );
}
