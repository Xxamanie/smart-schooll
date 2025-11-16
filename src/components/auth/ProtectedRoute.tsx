import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { User } from '../../utils/validation';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: User['role'][];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

interface WithRoleProps {
  children: ReactNode;
  roles: User['role'][];
}

export function WithRole({ children, roles }: WithRoleProps) {
  const { user } = useAuthStore();

  if (!user || !roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

export function useAuthorization() {
  const { user } = useAuthStore();

  return {
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    isParent: user?.role === 'parent',
    hasRole: (role: User['role']) => user?.role === role,
    hasAnyRole: (roles: User['role'][]) => user ? roles.includes(user.role) : false,
  };
}