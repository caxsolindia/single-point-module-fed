import { Box, Typography, Grid, Button } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useEffect } from "react";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import {
  IdIcon,
  LanguageIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  VideoIcon,
} from "../../../assets/Icon/Icon.tsx";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import useProfileStore from "../../../Store/userProfileStore.ts";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import { GetViewComponent } from "../Shared/GraphqlQueries/UserProfile.ts";

function ViewComponent() {
  const { userId } = useUserDataStore();
  const { profile, setProfileData } = useProfileStore();
  const { getProfileOverview, data } = GetViewComponent(userId);

  useEffect(() => {
    if (userId) {
      getProfileOverview();
    }
  }, [getProfileOverview]);

  const profileData = data?.getProfileOverview;
  const setInitSummary = () => {
    setProfileData(profileData);
  };
  useEffect(() => {
    if (data) {
      setInitSummary();
    }
  }, [data]);

  const { theme } = useThemeContext();
  const { TEXT_PRIMARY, TEXT_SECONDARY, GRAY_MAIN, GRAY_LIGHT, PRIMARY_MAIN } =
    useThemeConstant({
      theme,
    });
  const { openModal } = useProfileCardStore();
  const handleVideoClick = () => {
    openModal("02");
  };
  return (
    <>
      <Box
        sx={{
          padding: 2,
          margin: "auto",
        }}
      >
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item>
            <Box
              data-testid="hover-box"
              sx={{
                position: "relative",
                maxWidth: "196px",
                width: "100%",
                minHeight: "188px",
                maxHeight: "188px",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid ",
                borderColor: GRAY_MAIN,
                borderRadius: "16px",
                overflow: "hidden",

                "&:hover .add-icon": {
                  display: "flex",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />

              <Box
                data-testid="add-icon"
                className="add-icon"
                sx={{
                  position: "absolute",
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">+</Typography>
              </Box>
            </Box>

            <Box>
              <Button
                sx={{
                  minWidth: "196px",
                  maxWidth: "196px",
                  width: "100%",
                  minHeight: "60px",
                  maxHeight: "60px",
                  height: "100%",
                  border: "1px solid",
                  borderColor: GRAY_MAIN,
                  borderRadius: 1,
                  mb: 2,
                  mt: 4.5,
                  color: TEXT_PRIMARY,
                }}
                onClick={handleVideoClick}
              >
                <Box sx={{ px: 2, mt: 3, mb: 2.5 }}>
                  <VideoIcon color={PRIMARY_MAIN} />
                </Box>
                Video Resume
              </Button>
            </Box>
          </Grid>
          <Grid item xs>
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h6"
                  sx={{
                    mb: 0,
                    mr: 1,
                    ml: 5,
                    color: TEXT_PRIMARY,
                  }}
                >
                  {profile?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: TEXT_SECONDARY,
                  }}
                >
                  (She/Her)
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ ml: 5, color: TEXT_SECONDARY, mt: 0.5, mb: 1 }}
              >
                Product Designer
              </Typography>
              <Box mt={2}>
                <Grid container>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center" sx={{ ml: 5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: GRAY_LIGHT,
                          width: "37px",
                          height: "36px",
                          borderRadius: "4px",
                        }}
                      >
                        <LocationIcon color={PRIMARY_MAIN} />
                      </Box>
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        {profile?.address}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ ml: 5, mt: 3 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: GRAY_LIGHT,
                          width: "37px",
                          height: "36px",
                          borderRadius: "4px",
                        }}
                      >
                        <UserIcon color={PRIMARY_MAIN} />
                      </Box>
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        Reporting Manager : {profile?.managerName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: GRAY_LIGHT,
                          width: "37px",
                          height: "36px",
                          borderRadius: "4px",
                        }}
                      >
                        <LanguageIcon color={PRIMARY_MAIN} />
                      </Box>
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        {profile?.languages}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" sx={{ mt: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: GRAY_LIGHT,
                          width: "37px",
                          height: "36px",
                          borderRadius: "4px",
                        }}
                      >
                        <IdIcon color={PRIMARY_MAIN} />
                      </Box>
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        {profile?.username}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container>
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Ensure the icon and content are spaced appropriately
                        maxWidth: { xs: "100%", md: "295px" }, // Responsive width
                        width: "100%",
                        maxHeight: "60px",
                        minHeight: "60px",
                        height: "100%",
                        border: "1px solid",
                        borderColor: GRAY_MAIN,
                        borderRadius: 1,
                        ml: { xs: 2, md: 5 }, // Responsive margin-left
                        mt: { xs: 2, md: 6 }, // Responsive margin-top
                        px: 2,
                        mr: { xs: 2, md: 4.5 }, // Responsive margin-right
                      }}
                    >
                      {/* Box for the icon */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 2,
                        }}
                      >
                        <MailIcon color={PRIMARY_MAIN} />
                      </Box>

                      {/* Box for the content */}
                      <Box
                        sx={{
                          flexGrow: 1, // This will allow the content to take up remaining space
                          fontSize: { xs: "14px", md: "16px" }, // Responsive font size
                          textAlign: { xs: "center", md: "left" }, // Center text on small screens
                        }}
                      >
                        {profile?.username}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "222px",
                        width: "100%",
                        maxHeight: "60px",
                        minHeight: "60px",
                        height: "100%",
                        color: TEXT_PRIMARY,
                        border: "1px solid ",
                        borderColor: GRAY_MAIN,
                        borderRadius: 1,
                        ml: 4.5,
                        mt: 6,
                        px: 2,
                        mr: 4.5,
                      }}
                    >
                      {/* <Box sx={{ mr: 2, mt: 2, mb: 1.5 }}> */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pr: 2,
                        }}
                      >
                        <PhoneIcon color={PRIMARY_MAIN} />
                      </Box>
                      {profile?.phone}
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: "60px",
                        maxWidth: "60px",
                        width: "100%",
                        maxHeight: "60px",
                        minHeight: "60px",
                        height: "100%",
                        border: "1px solid ",
                        borderColor: GRAY_MAIN,
                        borderRadius: 1,
                        mt: 6,
                        ml: 4.5,
                      }}
                    >
                      <LinkedInIcon color={PRIMARY_MAIN} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* ) : (
        <p>Failed to load - {message}</p>
      )} */}
    </>
  );
}

export default ViewComponent;
