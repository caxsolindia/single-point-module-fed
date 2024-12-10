import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ThryvoNewLogo from "../../assets/ThryvoNewLogo.svg";
import viewHideEyeIcon from "../../assets/viewHideEyeIcon.svg";
import btmLogin from "../../assets/sssoLogin.svg";

function LoginPage() {
  const handleSSO = () => {
    window.location.href = "http://4.224.166.175/auth/azureLogin";
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        p: { xs: 2, md: 4 },
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            backgroundColor: "#FFFFFF",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 1,
            borderColor: "#E7E0E0",
          }}
        >
          <Box sx={{ mb: { xs: 1, sm: 2 } }}>
            <img src={ThryvoNewLogo} alt="Logo" height="50" />
          </Box>
          <Typography
            sx={{
              color: "#0D0B0E",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: { xs: 0.5, sm: 0.5 },
              fontSize: { xs: "20px", sm: "20px", lg: "20px" },
            }}
          >
            Welcome to Thryvo
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              marginBottom: { xs: 1, sm: 2 },
              fontSize: { xs: "14px", sm: "14px", lg: "14px" },
              color: "#0D0B0E",
              // fontFamily: "regular",
            }}
          >
            One Platform. Endless Possibilities.
          </Typography>

          <Box component="form" noValidate sx={{ width: "80%" }}>
            <Typography
              sx={{
                color: "#0D0B0E",
                mt: 3,
                mb: 1,
                fontWeight: "regular",
                marginBottom: "4px",
                fontSize: { xs: "14px", sm: "14px" },
              }}
            >
              Email ID
            </Typography>
            <TextField
              fullWidth
              margin="none"
              variant="outlined"
              disabled
              InputProps={{
                sx: {
                  padding: 0,
                  height: "40px",
                  borderRadius: 2,
                },
              }}
            />

            <Typography
              sx={{
                color: "#0D0B0E",
                mt: 3,
                mb: 1,
                fontWeight: "regular",
                marginBottom: "4px",
                fontSize: { xs: "14px", sm: "14px" },
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              margin="none"
              variant="outlined"
              disabled
              InputProps={{
                sx: {
                  padding: 0,
                  height: "40px",
                  borderRadius: 2,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        padding: 0,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <img
                        src={viewHideEyeIcon}
                        style={{
                          width: "14px",
                          height: "14px",
                          marginRight: "10px",
                        }}
                        alt="Toggle password visibility"
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "14px" },
                  fontWeight: "regular",
                  color: "#0D0B0E",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                py: 1,
                textTransform: "none",
                borderRadius: 2,
                color: "#FFFFFF",
                fontSize: { xs: "14px", sm: "14px", lg: "14px" },
              }}
            >
              Sign In
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={handleSSO}
              sx={{
                mt: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "capitalize",
                borderRadius: 2,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#C4C7CF",
              }}
            >
              <img
                src={btmLogin}
                style={{ width: "22px", height: "22px", marginRight: "14px" }}
                alt="Microsoft Logo"
              />
              Sign in with Microsoft
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
                mb: 1,
                position: "relative",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  width: "42%",
                  height: "1px",
                  bgcolor: "#C4C7CF",
                },
                "&::before": {
                  left: 0,
                },
                "&::after": {
                  right: 0,
                },
              }}
            >
              Or
            </Typography>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "14px", lg: "14px" },
                  fontWeight: "regular",
                }}
              >
                Don’t have an account?{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#0D0B0E",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
