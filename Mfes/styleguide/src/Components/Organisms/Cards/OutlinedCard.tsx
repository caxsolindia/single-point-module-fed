import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Chip, Divider, Stack } from "@mui/material";

const card = (
  <Box>
    <Box sx={{ p: { lg: 2, md: 1 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom variant="h5" component="div">
          Toothbrush
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          $4.50
        </Typography>
      </Stack>
      <Typography color="text.secondary" variant="body2">
        Pinstriped cornflower blue cotton blouse takes you on a walk to the park
        or just down the hall.
      </Typography>
    </Box>
    <Divider />
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom variant="body2">
        Select type
      </Typography>
      <Stack direction="row" spacing={1}>
        <Chip color="primary" label="Soft" size="small" />
        <Chip label="Medium" size="small" />
        <Chip label="Hard" size="small" />
      </Stack>
    </Box>
  </Box>
);

export default function OutlinedCard() {
  return (
    <Box>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
