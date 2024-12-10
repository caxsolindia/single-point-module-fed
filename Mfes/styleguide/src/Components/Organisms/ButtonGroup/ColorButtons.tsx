import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import useThemeConstants from "../../../Hooks/useThemeConstants.tsx";
import convertToRGBA from "../../../Utility/convertToRGBA.tsx";

export default function ColorButtons({ theme }: { theme: Theme }) {
  const {
    PRIMARY_MAIN,
    PRIMARY_LIGHT,
    PRIMARY_LIGHTEST,
    SECONDARY_MAIN,
    SECONDARY_LIGHT,
    SECONDARY_LIGHTEST,
  } = useThemeConstants({
    theme,
  });
  const buttonData = [
    { label: "Primary", color: PRIMARY_MAIN },
    { label: "Primary Light", color: PRIMARY_LIGHT },
    { label: "Primary Lightest", color: PRIMARY_LIGHTEST },
    { label: "Secondary", color: SECONDARY_MAIN },
    { label: "Secondary Light", color: SECONDARY_LIGHT },
    { label: "Secondary Lightest", color: SECONDARY_LIGHTEST },
  ];

  return (
    <Grid spacing={2} container direction="column" gap={3}>
      <Grid container direction="row" gap={3}>
        {buttonData.map(
          ({ label, color }) =>
            label.startsWith("Primary") && (
              <Grid key={label}>
                <Button variant="contained" sx={{ background: color }}>
                  {label}
                </Button>
                <Typography align="center" variant="body1">
                  {color ? convertToRGBA(color) : ""}
                </Typography>
              </Grid>
            ),
        )}
      </Grid>
      <Grid container direction="row" gap={3}>
        {buttonData.map(
          ({ label, color }) =>
            label.startsWith("Secondary") && (
              <Grid key={label}>
                <Button variant="contained" sx={{ background: color }}>
                  {label}
                </Button>
                <Typography align="center" variant="body1">
                  {color ? convertToRGBA(color) : ""}
                </Typography>
              </Grid>
            ),
        )}
      </Grid>
      <Grid>
        <Button variant="contained" color="success">
          Success
        </Button>
      </Grid>
      <Grid>
        <Button variant="contained" color="error">
          Error
        </Button>
      </Grid>
      <Grid>
        <Button variant="contained" color="info">
          Info
        </Button>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          sx={{ background: theme.palette?.gray?.main }}
        >
          Gray
        </Button>
      </Grid>
    </Grid>
  );
}
