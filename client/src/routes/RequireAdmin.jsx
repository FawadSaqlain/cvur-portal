import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequireAdmin() {
  const token = useSelector((s) => s.auth.adminToken);
  const location = useLocation();

  if (!token) {
    // Always send unauthenticated admin access to the plain admin login page
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
