// src/routes/RoleBasedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../components/Auth';

const roleHierarchy = ['student', 'teacher', 'instructor', 'admin'];

const RoleBasedRoute = ({ minimumRole }) => {
  const { user, role } = useAuth();

  if (!user || !role) return <Navigate to="/signin" />;

  const userLevel = roleHierarchy.indexOf(role);
  const requiredLevel = roleHierarchy.indexOf(minimumRole);

  if (userLevel >= requiredLevel) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" />;
};

export default RoleBasedRoute;
