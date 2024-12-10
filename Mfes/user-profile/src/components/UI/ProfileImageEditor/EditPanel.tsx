import { Box, Typography, Slider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface SliderControlProps {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly onChange: (event: Event, newValue: number | number[]) => void;
  readonly min: number;
  readonly max: number;
  readonly step?: number;
}

function SliderControl({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 0.1,
}: SliderControlProps) {
  return (
    <>
      <Typography
        id={id}
        gutterBottom
        sx={{
          textAlign: "start",
          fontSize: "0.67rem!important",
          marginBottom: "-0.3rem",
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <RemoveIcon
          sx={{
            color: "#C4C7CF",
            fontSize: "1.2rem",
          }}
        />
        <Slider
          value={value}
          onChange={onChange}
          aria-label={`${label.toLowerCase()}-slider`}
          min={min}
          max={max}
          step={step}
          sx={{
            width: "300px",
            height: "10px",
            color: "rgba(40, 192, 151, 0.984)",
            "& .MuiSlider-thumb": {
              width: "12px",
              height: "12px",
              color: "rgba(40, 192, 151, 0.984)",
            },
            "& .MuiSlider-rail": {
              height: "2.5px",
              color: "#C4C7CF",
              opacity: "0.7",
            },
            "& .MuiSlider-track": {
              height: "2.5px",
              color: "rgba(40, 192, 151, 0.984)",
            },
          }}
        />
        <AddIcon
          sx={{
            color: "#C4C7CF",
            fontSize: "1.2rem",
          }}
        />
      </Box>
    </>
  );
}

export default SliderControl;
