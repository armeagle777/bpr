import {
  Box,
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuthData from "../../hooks/useAuthData";
import LoginBg from "../../assets/login_bg.jpg";
import Alert from "@mui/material/Alert";
import Copyright from "./Copyright";

const defaultTheme = createTheme();

function Login() {
  const {
    error,
    isError,
    onSubmit,
    password,
    isLoading,
    identifier,
    setPassword,
    checkErrors,
    setIdentifier,
  } = useAuthData();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Որոնման Համակարգ
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Էլ։ փոստ"
                name="email"
                autoComplete="email"
                autoFocus
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Գաղտնաբառ"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
              >
                Մուտք
              </LoadingButton>
              {isError && (
                <Alert severity="error">{error.response.data.message}</Alert>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
