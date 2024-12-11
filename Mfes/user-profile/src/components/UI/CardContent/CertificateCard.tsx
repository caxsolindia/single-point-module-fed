import React, { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { useGetAllCertificates } from "../Shared/GraphqlQueries/UserProfile.ts";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import {
  UserCertificate,
  useUserCertificateStore,
} from "../../../Store/CertificatesStore.ts";
import { EditIcon } from "../../../assets/Icon/Icon.tsx";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    soft: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    soft?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    soft: true;
  }
}

const useCertificateStyles = () => ({
  svgStyle: {
    width: 46,
    height: 46,
    marginBottom: 3,
    marginTop: 0,
    backGroundColor: "#C4C7CF",
  },
});

interface CertificationsComponentProps {
  isExpanded: boolean;
}

function CertificationsComponent({
  isExpanded,
}: Readonly<CertificationsComponentProps>) {
  const { userId } = useUserDataStore();
  const { theme } = useThemeContext();
  const { TEXT_PRIMARY, TEXT_SECONDARY } = useThemeConstant({
    theme,
  });
  const styles = useCertificateStyles();
  const iconsvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 326667 333333"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
        fill="#4285f4"
      />
      <path
        d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
        fill="#34a853"
      />
      <path
        d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
        fill="#fbbc04"
      />
      <path
        d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
        fill="#ea4335"
      />
    </svg>
  );
  const { setUserCertificate, userCertificate, setIdSelected } =
    useUserCertificateStore();
  const { loadcertificate, data } = useGetAllCertificates(userId);
  const { openDrawer } = useProfileCardStore();

  useEffect(() => {
    if (userId) {
      loadcertificate();
    }
  }, [userId]);
  const getCertificates = data?.getAllCertificates?.data;
  useEffect(() => {
    if (getCertificates) {
      const updatedValue = getCertificates.map((certificate) => {
        if (certificate) {
          return {
            certificateExpiryDate: certificate.certificateExpiryDate ?? null,
            certificateID: certificate.certificateID ?? null,
            certificateImageURL: certificate.certificateImageURL ?? null,
            certificateIssueDate: certificate.certificateIssueDate ?? null,
            certificateName: certificate.certificateName ?? null,
            certificateURL: certificate.certificateURL ?? null,
            organizationName: certificate.organizationName ?? null,
            skillId: certificate.skill ?? null,
            skill: null,
            file: null,
          };
        }
        return null;
      });
      setUserCertificate(updatedValue);
    }
  }, [getCertificates, setUserCertificate]);
  const certificateData = userCertificate?.map(
    (certificate: UserCertificate | null) => ({
      id: certificate?.certificateID,
      name: certificate?.certificateName,
      organization: certificate?.organizationName,
      issueDate: `${certificate?.certificateIssueDate}`,
      expiryDate: `${certificate?.certificateExpiryDate}`,
      icon: iconsvg,
    }),
  );

  const certificationsToRender = isExpanded
    ? (certificateData ?? []) // Provide an empty array if certificateData is undefined
    : (certificateData?.slice(0, 1) ?? []);

  const handleOpenCertificateDrawer = (
    id: string,
    certificateId: string | null | undefined,
  ) => {
    if (certificateId) {
      openDrawer(id);
      setIdSelected(certificateId);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      {certificationsToRender.map((cert) =>
        cert ? (
          <Box
            mb={4}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
            key={cert.id}
          >
            <Box sx={{ display: "flex", columnGap: 3 }}>
              <IconButton sx={styles.svgStyle}>{cert.icon}</IconButton>
              <Box>
                <Typography
                  variant="h6"
                  mb={1}
                  sx={{ color: TEXT_PRIMARY, fontWeight: "600" }}
                >
                  {cert.name}
                </Typography>
                <Box mb={2}>
                  <Typography
                    color={TEXT_SECONDARY}
                    sx={{ fontWeight: "400", lineHeight: "10px" }}
                    maxWidth={1190}
                  >
                    Issuing Organization :
                    <Typography
                      variant="soft"
                      color={TEXT_PRIMARY}
                      sx={{ fontWeight: "600", marginLeft: "5px" }}
                    >
                      {cert.organization}
                    </Typography>
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography
                    color={TEXT_PRIMARY}
                    sx={{ fontWeight: "600", lineHeight: "10px" }}
                    maxWidth={1190}
                  >
                    Issue Date :
                    <Typography
                      variant="soft"
                      color={TEXT_SECONDARY}
                      sx={{
                        fontWeight: "400",
                        lineHeight: "10px",
                        marginLeft: "5px",
                      }}
                    >
                      {cert.issueDate}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <IconButton
                onClick={() => handleOpenCertificateDrawer("08", cert.id)}
                // onClick={() => onEditClick(cert.id)}
                sx={{ padding: 0 }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
        ) : null,
      )}
    </Box>
  );
}

export default CertificationsComponent;
