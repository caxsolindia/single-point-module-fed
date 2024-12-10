import { ReactNode } from "react";
import { Box, Button, Card, Divider, Typography, styled } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { IconProps } from "../../../Interface/index.ts";

interface ProfileCardProps {
  children: ReactNode;
  expanded: boolean;
  onViewMore: () => void;
}
interface StyledCardProps {
  cardborder: string | undefined;
  expanded: boolean;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "expanded" && prop !== "cardborder",
})<StyledCardProps>(({ cardborder, expanded }) => ({
  border: `1px solid ${cardborder}`,
  borderRadius: "16px",
  marginBottom: "40px",
  overflow: "hidden",
  transition: "all 1s ease-in-out",
  padding: expanded ? "16px 0 0" : "0px 0",
  maxHeight: "auto",
  ariaExpanded: expanded ? "true" : "false",
}));

const HeaderContainer = styled("div")(() => ({}));

const BodyContainer = styled("div")(() => ({
  padding: "32px",
}));

const FooterContainer = styled("div")(() => ({
  width: "100%",
}));

function ProfileCard({ children, expanded }: Readonly<ProfileCardProps>) {
  const { theme } = useThemeContext();
  const { GRAY_MAIN } = useThemeConstant({ theme });

  return (
    <StyledCard
      cardborder={GRAY_MAIN}
      expanded={expanded}
      sx={{ ml: 5, mr: 8 }}
    >
      {children}
    </StyledCard>
  );
}

ProfileCard.Header = function ProfileCardHeader({
  title,
  icons,
}: {
  title: string;
  icons: IconProps[];
}) {
  return (
    <HeaderContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Box display="flex" columnGap={2}>
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

ProfileCard.Body = function ProfileCardBody({
  children,
}: {
  children: ReactNode;
}) {
  return <BodyContainer>{children}</BodyContainer>;
};

ProfileCard.Footer = function ProfileCardFooter({
  children,
  expanded,
  onViewMore,
  disabled,
}: {
  children: ReactNode;
  expanded: boolean;
  onViewMore: () => void;
  disabled: boolean;
}) {
  return (
    <FooterContainer>
      {children}
      <Button
        onClick={onViewMore}
        sx={{ width: "100%", borderRadius: "0 0 16 16", padding: "15px 0" }}
        disabled={disabled}
      >
        {expanded ? "View Less" : "View More"}
      </Button>
    </FooterContainer>
  );
};

export default ProfileCard;
