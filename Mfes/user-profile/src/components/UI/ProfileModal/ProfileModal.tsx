import { ReactNode } from "react";
import { Box, Modal, Typography, styled } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { IconProps } from "../../../Interface/index.ts";

interface ProfileModalProps {
  children: ReactNode;
  maxWidth?: string | undefined;
}

const HeaderContainer = styled("div")<{ background: string; color: string }>(
  ({ background, color }) => ({
    background,
    color,
    padding: "16px 25px",
    borderRadius: "8px 8px 0 0",
  }),
);

const BodyContainer = styled("div")<{ height?: string }>(({ height }) => ({
  padding: "40px",
  height: height || "none",
  background: "white",
}));

const FooterContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0px 40px 30px 42px",
  background: "white",
  borderRadius: "0 0 6px 6px",
}));

function ProfileModal({ children, maxWidth }: Readonly<ProfileModalProps>) {
  const { isModalOpen, closeModal } = useProfileCardStore();
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          maxWidth,
          width: "100%",
          border: `1px solid transparent`,
          borderRadius: "8px",
          outline: "none",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}

ProfileModal.Header = function ProfileModalHeader({
  title,
  icons,
  subtitle,
}: {
  title: string;
  icons: IconProps[];
  subtitle: string;
}) {
  const { theme } = useThemeContext();
  const { PRIMARY_MAIN, TEXT_WHITE } = useThemeConstant({ theme });
  return (
    <HeaderContainer background={PRIMARY_MAIN} color={TEXT_WHITE}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flexDirection: "column" }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="caption" display="block">
            {subtitle}
          </Typography>
        </Box>
        <Box display="flex" sx={{ marginTop: subtitle ? "10px" : "0px" }}>
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
    </HeaderContainer>
  );
};

ProfileModal.Body = function ProfileModalBody({
  children,
  height,
}: {
  children: ReactNode;
  height: string;
}) {
  return <BodyContainer height={height}>{children}</BodyContainer>;
};

ProfileModal.Footer = function ProfileModalFooter({
  children,
}: {
  children: ReactNode;
}) {
  return <FooterContainer>{children}</FooterContainer>;
};

export default ProfileModal;
