import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from 'ui';

const Login = () =>
  <div style={{ display: 'display' }}>
    <Container
      component="main"
      maxWidth="md"
      style={{
        maxWidth: '720px',
        borderRadius: '8px',
        borderColor: '#fff',
      }}
    >
      <Grid
        container
        component="main"
        sx={{
          height: '50%',
          borderRadius: 2,
          marginTop: 20,
          boxShadow: '0 0 10px rgb(0 0 0 / 10%)',
        }}
      >
        <CssBaseline />
        <Grid
          item
          sx={{
            borderRadius: '8px 20px 20px 8px',
            width: '50%',
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid component="main" item xs={12} sm={8} md={5}>
          <Box
            sx={{
              widows: '50%',
              my: 8,
              mx: 4,
              // i know this is not fair, just doing it temporarily
              mr: '-23px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button color="red">Login</Button>
              {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> */}
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
  </div>;

export default Login;
