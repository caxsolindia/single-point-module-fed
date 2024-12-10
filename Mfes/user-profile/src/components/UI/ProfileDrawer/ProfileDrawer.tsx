import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import { IconProps } from "../../../Interface/index.ts";

interface ProfileDrawerProps {
  children: ReactNode;
}

const HeaderContainer = styled("div")(() => ({}));

const BodyContainer = styled.div({
  padding: "30px 48px",
  overflowY: "auto",
  height: "calc(100vh - 175px)",
});

const FooterContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 48px",
  background: "white",
  borderRadius: "0 0 6px 6px",
}));

function ProfileDrawer({ children }: Readonly<ProfileDrawerProps>) {
  const { isDrawerOpen, closeDrawer } = useProfileCardStore();
  const { theme } = useThemeContext();
  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
      <Box
        sx={{
          width: "100vw",
          [theme.breakpoints.up("md")]: {
            width: "50vw",
          },
        }}
        // role="presentation"
      >
        {children}
      </Box>
    </Drawer>
  );
}

ProfileDrawer.Header = function ProfileDrawerHeader({
  title,
  icons,
}: {
  title: string;
  icons: IconProps[];
}) {
  const { theme } = useThemeContext();
  const { PRIMARY_MAIN } = useThemeConstant({ theme });
  return (
    <HeaderContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "30px 48px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: PRIMARY_MAIN }}>
          {title}
        </Typography>
        <Box display="flex">
          {icons.map((iconProps) => (
            <Box
              key={iconProps.id}
              onClick={iconProps.onClick}
              sx={{ cursor: "pointer" }}
            >
              {iconProps.icon}
            </Box>
          ))}
        </Box>
      </Box>
      <Divider sx={{ borderWidth: 1 }} />
    </HeaderContainer>
  );
};

ProfileDrawer.Body = function ProfileDrawerBody({
  children,
}: {
  children: ReactNode;
}) {
  return <BodyContainer>{children}</BodyContainer>;
};

ProfileDrawer.Footer = function ProfileDrawerFooter({
  children,
}: {
  children: ReactNode;
}) {
  return <FooterContainer>{children}</FooterContainer>;
};

export default ProfileDrawer;
