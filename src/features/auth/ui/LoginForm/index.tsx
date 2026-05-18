import { type FC, type FormEvent, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

import { authApi, selectLogin, useAuthStore } from '@entities/auth';

import styles from './styles.module.scss';

export const LoginForm: FC = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(selectLogin);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      login(data.user, data.tokens);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ login: loginValue, password });
  };

  const errorMessage = isError
    ? ((error as AxiosError<{ message: string }>).response?.data?.message ??
      error.message)
    : null;

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <Typography variant="h5" component="h1">
        Sign In
      </Typography>
      <TextField
        label="Login"
        value={loginValue}
        onChange={e => setLoginValue(e.target.value)}
        required
        fullWidth
        autoComplete="username"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        fullWidth
        autoComplete="current-password"
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Button
        type="submit"
        variant="contained"
        disabled={isPending}
        fullWidth
        size="large"
      >
        {isPending ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
      </Button>
    </Box>
  );
};
