import { Box, Stack, Skeleton } from "@mui/material";

// Skeleton for individual project items
function ProjectItemSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#fff",
        position: "relative",
        mb: 2,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ marginRight: "16px", padding: "1px" }}>
            <Skeleton
              variant="circular"
              width={52}
              height={52}
              sx={{ marginBottom: 1 }}
            />
          </Box>
          <Box sx={{ width: "100%", mt: "2px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width={100} height={30} />
            </Box>
            <Box mt={1}>
              <Skeleton variant="text" width={150} height={30} />
            </Box>
            <Box mt={1}>
              <Skeleton variant="text" width="80rem" height={30} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          flexWrap: "nowrap",
          marginTop: 3,
        }}
      >
        <Skeleton variant="text" width="8%" height={30} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "10px",
            mt: { xs: 2, sm: 0 },
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              variant="rectangular"
              width={100}
              height={40}
              sx={{ borderRadius: "16px", margin: "5px" }}
            />
          ))}
        </Box>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
        <Skeleton variant="text" width="50%" height={30} />
      </Stack>
    </Box>
  );
}

// Main component to render the skeletons
function ProjectListSkeleton({ count }: { count: number }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* List of Project Items */}
      {Array.from({ length: count }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ProjectItemSkeleton key={index} />
      ))}
    </Box>
  );
}

export default ProjectListSkeleton;
