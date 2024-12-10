import { InputLabel, InputLabelProps } from "@mui/material";

interface SelectInputLabelProps extends InputLabelProps {
  value: string | undefined | number;
  label: string;
}
function SelectInputLabel({
  label,
  value,
  ...props
}: Readonly<SelectInputLabelProps>) {
  return (
    <InputLabel
      {...props}
      shrink={false}
      sx={{
        "&.Mui-focused": {
          display: "none",
        },
        '&[data-shrink="true"]': {
          display: "none",
        }, // Hides the label when there is a value selected
        ...(value !== undefined &&
          value !== "" && {
            display: "none",
            color: "red", // For testing purposes
          }),
        ...props.sx,
      }}
    >
      {label}
    </InputLabel>
  );
}

export default SelectInputLabel;
