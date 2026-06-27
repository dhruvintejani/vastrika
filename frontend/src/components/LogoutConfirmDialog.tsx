// src/components/LogoutConfirmDialog.tsx
// Drop this component anywhere in the app tree (e.g. inside App.tsx, just
// before the closing </BrowserRouter> tag). It reads its open state from
// useAuthStore so any component in the tree can trigger it by calling:
//
//   const { setShowLogoutConfirm } = useAuthStore();
//   setShowLogoutConfirm(true);
//
// The actual logout action and token cleanup live in useAuthStore.logout().
// This component does NOT need to be imported anywhere other than App.tsx.

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useStore } from '../store/useStore';
import ConfirmDialog from './ConfirmDialog';

export default function LogoutConfirmDialog() {
  const { showLogoutConfirm, setShowLogoutConfirm, logout } = useAuthStore();
  const { clearServerState } = useStore();
    const navigate = useNavigate();
  

  const handleLogout = async () => {
    await logout();
    navigate('/');
    clearServerState(); // clear cart + wishlist from memory
  };

  return (
    <ConfirmDialog
      open={showLogoutConfirm}
      title="Log out?"
      message="You'll need to sign in again to access your cart, orders, and wishlist."
      confirmLabel="Log Out"
      cancelLabel="Stay"
      onConfirm={handleLogout}
      onClose={() => setShowLogoutConfirm(false)}
    />
  );
}