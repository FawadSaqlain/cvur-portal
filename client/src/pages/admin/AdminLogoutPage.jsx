import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice.js';

export default function AdminLogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    // After clearing admin session, go to admin login
    navigate('/admin/login', { replace: true });
  }, [dispatch, navigate]);

  return null;
}
