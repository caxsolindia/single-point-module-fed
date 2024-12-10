import { Box, Typography, styled } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

export default function ProgressBar(
  props: LinearProgressProps & {
    value: number;
    showvalue: "show" | "hide";
    shade: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  },
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <BorderLinearProgress
          data-testid="progress-value"
          variant="determinate"
          color={props.shade}
          {...props}
        />
      </Box>
      {props.showvalue === "show" && (
        <Box sx={{ ml: 1, minWidth: 30 }}>
          <Typography
            variant="body2"
            color="text"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      )}
    </Box>
  );
}
