import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from 'ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '@schema/LoginSchema';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { loginApiCall } from '@APIService/index';
import { AxiosError } from 'axios';

type IForm = z.infer<typeof LoginSchema>;

const LoginComponent = () => {
  const form = useForm<IForm>({
    resolver: zodResolver(LoginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginApiCall,

    onError(error: AxiosError, variables, context) {
      form.setError('email', {
        message: 'Invalid email or password combination',
      });
      form.setError('password', {
        message: 'Invalid email or password combination',
      });
    },

    onSuccess(data, variables, context) {
      console.log(data);
    },
  });

  return (
    <Container component="main" maxWidth="md">
      <Grid
        container
        component="main"
        sx={{
          height: '50%',
          border: 1,
          borderRadius: 2,
          marginTop: 20,
          overflow: 'hidden',
        }}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component="div">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={form.handleSubmit((val) => mutation.mutate(val))}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                size="small"
                {...form.register('email')}
                error={!!form.formState.errors.email?.message?.length}
                helperText={form.formState.errors.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                {...form.register('password')}
                error={!!form.formState.errors.password?.message?.length}
                helperText={form.formState.errors.password?.message}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value="true"
                    color="primary"
                    {...form.register('remember')}
                  />
                }
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit {mutation.isLoading && 'Loading'}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginComponent;
