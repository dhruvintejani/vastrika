// src/components/LogoutConfirmDialog.tsx  (admin panel version)
// Drop inside your admin App.tsx root, e.g. before </BrowserRouter>.
// Any component triggers logout confirm by calling:
//
//   const { setShowLogoutConfirm } = useAuthStore();
//   setShowLogoutConfirm(true);
//
// Replace all direct logout() calls (e.g. in sidebar/header) with
// setShowLogoutConfirm(true) instead.

import { useAuthStore } from '../../store/authstore';
import ConfirmDialog from './ConfirmDialog';

export default function LogoutConfirmDialog() {
  const { showLogoutConfirm, setShowLogoutConfirm, logout } = useAuthStore();

  return (
    <ConfirmDialog
      open={showLogoutConfirm}
      title="Log out?"
      message="Your admin session will be ended. You'll need to sign in again."
      confirmLabel="Log Out"
      cancelLabel="Stay"
      onConfirm={logout}
      onClose={() => setShowLogoutConfirm(false)}
    />
  );
}