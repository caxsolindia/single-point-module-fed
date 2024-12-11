import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { showToast } from "../../common/toastUtils.ts";

function SsoLogin() {
  const userData = useParams();
  let updatedObject;
  try {
    updatedObject = userData && JSON.parse(userData.id || "");
  } catch (error) {
    updatedObject = null;
  }
  function SsoShellAppLink() {
    window.location.href = "https://localhost:8080/profile";
  }
  useEffect(() => {
    if (updatedObject && updatedObject?.accessToken) {
      sessionStorage.setItem("accessToken", updatedObject?.accessToken);
      const data = {
        id: updatedObject?.id,
        username: updatedObject?.username,
        role: updatedObject?.role,
        profilephoto: updatedObject?.profilephoto,
      };
      sessionStorage.setItem("userData", JSON.stringify(data));
      SsoShellAppLink();
    } else {
      showToast({
        type: "error",
        message: "Incorrect password please try again!",
        id: "error-toast",
      });
    }
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
      <Typography>Redirecting...</Typography>
    </Box>
  );
}

export default SsoLogin;
