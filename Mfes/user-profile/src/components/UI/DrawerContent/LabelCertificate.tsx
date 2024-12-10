import React, { JSX } from "react";
import PropTypes from "prop-types";
import { Typography, TypographyProps } from "@mui/material";

// Extend MUI Typography with custom variant
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

// Define error messages, placeholders, and labels as constants
export const ERROR_MESSAGES = {
  required: "This field is required",
  invalidEmail: "Please enter a valid email address",
  minLength: "The minimum length is",
  maxLength: "The maximum length is",
};

export const PLACEHOLDERS = {
  CertificateTitle: "Enter Certificate Title",
  Organization: "Enter Issuing Organization",
  Skill: "Press Enter to add skill",
  CredentialURL: "Enter credential URL",
};

export const LABELS = {
  CertificateTitle: "Certificate Title*",
  Organization: "Issuing Organization*",
  Skill: "Skill Gained in Certificate",
  CredentialURL: "Credential URL*",
  StartDate: "Start Date*",
  EndDate: "End Date*",
  StartMonth: "Start Month*",
  EndMonth: "End Month*",
  uploadImage: "Upload Certificate Attachment",
};

// Define the props for LabelTypography component
interface LabelTypographyProps extends TypographyProps {
  text: keyof typeof LABELS;
  variant?: "soft";
}

// Refactored to be a function declaration
function LabelTypography({
  text,
  variant = "soft",
  ...props
}: LabelTypographyProps): JSX.Element {
  return (
    <Typography variant={variant} {...props} style={{ fontWeight: "bold" }}>
      {LABELS[text]}
    </Typography>
  );
}

LabelTypography.propTypes = {
  text: PropTypes.oneOf(Object.keys(LABELS) as (keyof typeof LABELS)[])
    .isRequired,
  variant: PropTypes.oneOf(["soft"]),
};

export default LabelTypography;
