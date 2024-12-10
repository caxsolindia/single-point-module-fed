import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

interface LabelTypographyProps {
  text: string;
  sx?: SxProps<Theme>;
}

function LabelTypography({ text, sx }: Readonly<LabelTypographyProps>) {
  return (
    <Typography variant="body1" sx={{ fontWeight: 600, ...sx }}>
      {text}
    </Typography>
  );
}

export default LabelTypography;
