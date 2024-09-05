import useAuth from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
