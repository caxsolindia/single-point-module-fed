import React from "react";
import { ProfileFormData } from "../CardContent/EditComponent.tsx";

export const handleDeleteLanguage = (
  languageToDelete: string,
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  setSelectedLanguages((prevLanguages) =>
    prevLanguages.filter((lang) => lang !== languageToDelete),
  );
};

export const handleLanguageChange = (
  value: string | null,
  selectedLanguages: string[],
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  clearErrors: (fieldName: keyof ProfileFormData) => void,
) => {
  if (value && !selectedLanguages.includes(value)) {
    setSelectedLanguages((prevLanguages) => [...prevLanguages, value]);
  }
  setInputValue(""); // Clear the input field regardless of the value
  if (value) {
    clearErrors("language");
  }
};

export const handlePhoneNumberChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  setValue: (name: "contactNumber", value: string) => void,
  selectedCountryCode: string,
) => {
  const newPhoneNumber = event.target.value;
  setPhoneNumber(newPhoneNumber);
  if (selectedCountryCode) {
    setValue("contactNumber", newPhoneNumber);
  }
};

export const handleCountryCodeChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedCountryCode: React.Dispatch<React.SetStateAction<string>>,
  setValue: (name: "countryCode", value: string) => void,
) => {
  const newCountryCode = event.target.value;
  setSelectedCountryCode(newCountryCode);
  setValue("countryCode", newCountryCode);
};
export const formatCertificateDate = (
  dateString: string | null | undefined,
): { month: string; year: string } => {
  if (!dateString) return { month: "", year: "" };

  const [month, year] = dateString.split("-");
  return { month, year };
};
