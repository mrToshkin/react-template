import { type FC } from 'react';
import Button from '@mui/material/Button';

import { selectLogout, useAuthStore } from '@entities/auth';

export const LogoutButton: FC = () => {
  const logout = useAuthStore(selectLogout);

  return (
    <Button variant="outlined" onClick={logout} size="small">
      Logout
    </Button>
  );
};
