import { Typography, Skeleton, Grid, Box, Avatar } from "@mui/material";
import { Theme } from "@mui/material/styles";
import AppbarCustom from "./Organisms/Appbar/AppbarCustom.tsx";
import OutlinedCard from "./Organisms/Cards/OutlinedCard.tsx";
import ComplexCard from "./Organisms/Cards/ComplexCard.tsx";
import SimpleCard from "./Organisms/Cards/SimpleCard.tsx";
import ColorButtons from "./Organisms/ButtonGroup/ColorButtons.tsx";
import FloatingActionButtons from "./Organisms/FloatingActionButton/ActionButtons.tsx";
import ProgressBar from "./ProgressBar/ProgressBar.tsx";
import CustomList from "./Organisms/List/CustomList.tsx";
import AccordionCustom from "./Organisms/Accordion/Accordion.tsx";
import InputCustom from "./Organisms/Input/InputCustom.tsx";
import Loader from "./Organisms/Loader/Loader.tsx";

// Main component
function MuiComponentsDemo({ theme }: Readonly<{ theme: Theme }>) {
  return (
    <div>
      {/* AppBar */}
      <Grid marginBottom={10}>
        <AppbarCustom />
      </Grid>

      {/* Card */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        marginBottom={10}
      >
        <Grid item md={3} lg={3}>
          <OutlinedCard />
        </Grid>
        <Grid item md={3} lg={4}>
          <ComplexCard />
        </Grid>
        <Grid item md={3} lg={3}>
          <SimpleCard />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Grid marginBottom={10}>
        <ColorButtons theme={theme} />
      </Grid>

      {/* Action Buttons */}
      <Grid marginBottom={10}>
        <FloatingActionButtons />
      </Grid>

      {/* ProgressBar */}
      <Grid marginBottom={10}>
        <ProgressBar value={50} showvalue="show" shade="primary" />
      </Grid>

      {/* List */}
      <Grid marginBottom={10}>
        <CustomList />
      </Grid>

      {/* Skeleton */}
      <Grid marginBottom={10}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="60%">
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
      </Grid>

      {/* Accordion */}
      <Grid mb={10}>
        <AccordionCustom />
      </Grid>

      {/* Input */}
      <Grid mb={10}>
        <InputCustom />
      </Grid>
      {/* Circlular loader */}
      <Grid mb={10}>
        <Loader />
      </Grid>
    </div>
  );
}

export default MuiComponentsDemo;
