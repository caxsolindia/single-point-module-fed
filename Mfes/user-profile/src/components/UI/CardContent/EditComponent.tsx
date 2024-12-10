import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Chip,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { VideoIcon, LinkIcon } from "../../../assets/Icon/Icon.tsx";
import {
  validationSchema,
  REQUIRED_FIELD_ERROR,
  URL_INVALID_ERROR,
  CONTACT_NUMBER_INVALID_ERROR,
  LANGUAGE_REQUIRED_ERROR,
} from "../Validation/ValidationMessage.ts";
import {
  handleDeleteLanguage,
  handleLanguageChange,
  handlePhoneNumberChange,
  handleCountryCodeChange,
} from "../Functions/editFunctions.tsx";

export interface ProfileFormData {
  contactNumber?: string;
  countryCode: string;
  urlLink: string;
  language: string[]; // Change to string[] to match selectedLanguages
}

interface EditComponentProps {
  onCancel: () => void;
  onSave: (data: ProfileFormData) => void;
}
interface CountryCode {
  flag: string;
  dial_code: string;
  name: string; // Added country name
}

export function onSubmit(
  formData: ProfileFormData,
  onSave: (data: ProfileFormData) => void,
  reset: () => void,
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>,
  setSelectedCountryCode: React.Dispatch<React.SetStateAction<string>>,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  selectedLanguages: string[],
) {
  onSave({ ...formData, language: selectedLanguages });
  reset();
  setSelectedLanguages([]);
  setSelectedCountryCode("");
  setPhoneNumber("");
}

function EditComponent({ onCancel, onSave }: EditComponentProps) {
  const { theme } = useThemeContext();
  const { TEXT_PRIMARY, TEXT_SECONDARY, GRAY_MAIN, GRAY_LIGHT, PRIMARY_MAIN } =
    useThemeConstant({
      theme,
    });
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>(""); // Track input value separately
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorapi, setErrorapi] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    clearErrors,
  } = useForm<ProfileFormData>({
    defaultValues: {
      contactNumber: "",
      countryCode: "",
      language: [],
      urlLink: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(validationSchema) as any,
    context: { selectedLanguages },
  });
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountryCodes(data);
        setLoading(false);
      } catch (err) {
        setErrorapi("Failed to fetch country codes");
        setLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  return (
    <Box sx={{ padding: 2, margin: "auto" }}>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(
            data,
            onSave,
            reset,
            setSelectedLanguages,
            setSelectedCountryCode,
            setPhoneNumber,
            selectedLanguages,
          ),
        )}
      >
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          // item
          // xs={12}
          // sm={6}
          // md={6}
        >
          <Grid item>
            <Box
              sx={{
                position: "relative",
                width: "196px",
                height: "188px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid ",
                borderColor: GRAY_MAIN,
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: GRAY_LIGHT,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: TEXT_PRIMARY,
                  }}
                >
                  +
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                type="submit"
                sx={{
                  width: "196px",
                  height: "60px",
                  border: "1px solid ",
                  borderColor: GRAY_MAIN,
                  borderRadius: 1,
                  mb: 2,
                  mt: 2,
                  color: TEXT_PRIMARY,
                }}
              >
                <Box sx={{ px: 2, mt: 3, mb: 2.5 }}>
                  <VideoIcon color="#000000" />
                </Box>
                Video Resume
              </Button>
            </Box>
          </Grid>
          <Grid item xs>
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h6"
                  sx={{
                    mb: 0,
                    mr: 1,
                    ml: 7,
                    color: TEXT_PRIMARY,
                  }}
                >
                  Jennifer Mark
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: TEXT_SECONDARY,
                  }}
                >
                  (She/Her)
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ ml: 7, color: TEXT_SECONDARY, mt: 1 }}
              >
                Product Designer
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "21px",
                      mb: 1,
                      ml: 7,
                      mt: 3,
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Location
                  </Typography>
                  <TextField
                    fullWidth
                    label="USA, Boston"
                    variant="outlined"
                    disabled
                    sx={{
                      width: { xs: "50%", md: "50%", lg: "70%" },

                      maxHeight: "56px",
                      height: "100%",
                      ml: 7,
                      background: GRAY_LIGHT,
                      borderRadius: 1,
                      "& .MuiInputBase-root": {
                        color: TEXT_PRIMARY,
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "21px",
                      mb: 1,
                      ml: 7,
                      mt: 4,
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Reporting Manager
                  </Typography>
                  <TextField
                    fullWidth
                    label="Mark Johnson"
                    variant="outlined"
                    disabled
                    sx={{
                      width: { xs: "50%", md: "50%", lg: "70%" },
                      maxHeight: "56px",
                      height: "100%",
                      ml: 7,
                      background: GRAY_LIGHT,
                      borderRadius: 1,
                      "& .MuiInputBase-root": {
                        color: TEXT_PRIMARY,
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "21px",
                      mb: 1,
                      ml: 7,
                      mt: 4,
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Employee ID
                  </Typography>
                  <TextField
                    fullWidth
                    label="CAX30087"
                    variant="outlined"
                    disabled
                    sx={{
                      width: { xs: "50%", md: "50%", lg: "70%" },
                      maxHeight: "56px",
                      height: "100%",
                      ml: 7,
                      background: GRAY_LIGHT,
                      borderRadius: 1,
                      "& .MuiInputBase-root": {
                        color: TEXT_PRIMARY,
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "21px",
                      mb: 1,
                      ml: 7,
                      mt: 4,
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Work Email ID
                  </Typography>
                  <TextField
                    fullWidth
                    label="Jennifermark@gmail.com"
                    variant="outlined"
                    disabled
                    sx={{
                      mb: 2,

                      width: { xs: "50%", md: "50%", lg: "70%" },
                      maxHeight: "56px",
                      height: "100%",
                      ml: 7,
                      background: GRAY_LIGHT,
                      borderRadius: 1,
                      "& .MuiInputBase-root": {
                        color: TEXT_PRIMARY,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "21px",
                      mb: 1,
                      mt: 3,
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Languages
                  </Typography>

                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        sx={{ height: "56px" }}
                        value={inputValue}
                        onChange={(_event, newValue) =>
                          handleLanguageChange(
                            newValue,
                            selectedLanguages,
                            setSelectedLanguages,
                            setInputValue,
                            clearErrors,
                          )
                        }
                        onInputChange={(_event, newValue) =>
                          setInputValue(newValue)
                        }
                        options={[
                          "English",
                          "Hindi",
                          "German",
                          "Spanish",
                          "French",
                        ]}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="medium"
                            sx={{
                              width: { xs: "50%", md: "50%", lg: "70%" },
                              maxHeight: "56px",
                              height: "100%",
                              borderRadius: 1,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                    {selectedLanguages.map((language) => (
                      <Chip
                        key={language}
                        label={language}
                        data-testid="deletebutton"
                        onDelete={() =>
                          handleDeleteLanguage(language, setSelectedLanguages)
                        }
                        sx={{
                          margin: "4px",
                        }}
                      />
                    ))}
                  </Box>
                  {errors.language && (
                    <Typography variant="caption" color="error">
                      {LANGUAGE_REQUIRED_ERROR}
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "21px",
                      mb: 1,
                      mt: 2,
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Links
                  </Typography>
                  <Controller
                    name="urlLink"
                    control={control}
                    render={({ field }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          width: { xs: "50%", md: "50%", lg: "70%" },
                          maxHeight: "56px",
                          height: "100%",
                          border: "1px solid ",
                          borderColor: GRAY_MAIN,
                          borderRadius: 1,
                          mb: 1, // Adjust margin to separate from error text
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 56,
                            height: "100%",
                            background: GRAY_LIGHT,
                          }}
                        >
                          <LinkIcon color={PRIMARY_MAIN} />
                        </Box>
                        <TextField
                          fullWidth
                          variant="outlined"
                          error={!!errors.urlLink}
                          {...field}
                          sx={{
                            "& fieldset": { border: "none" },
                          }}
                          placeholder="Enter URL link"
                        />
                      </Box>
                    )}
                  />

                  {errors.urlLink && (
                    <Typography variant="caption" color="error" sx={{ mb: 2 }}>
                      {errors.urlLink.type === "required"
                        ? REQUIRED_FIELD_ERROR
                        : URL_INVALID_ERROR}
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "21px",
                      mb: 1,
                      mt: 4,
                    }}
                  >
                    Contact Number
                  </Typography>
                  <Controller
                    name="contactNumber"
                    control={control}
                    render={({ field }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          width: { xs: "50%", md: "50%", lg: "70%" },
                          height: 56,
                          border: "1px solid ",
                          borderColor: GRAY_MAIN,
                          borderRadius: 1,
                          mb: 1,
                        }}
                      >
                        <FormControl
                          sx={{
                            maxWidth: "115px",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Select
                            labelId="country-code-label"
                            value={selectedCountryCode}
                            onChange={(event) =>
                              handleCountryCodeChange(
                                {
                                  target: { value: event.target.value },
                                } as React.ChangeEvent<HTMLInputElement>,
                                setSelectedCountryCode,
                                setValue,
                              )
                            }
                            sx={{
                              height: "100%",
                              bgcolor: GRAY_LIGHT,
                              borderRadius: 1,
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                            data-testid="country-code-select"
                            renderValue={(selected) => {
                              const selectedCountry = countryCodes.find(
                                (country) => country.dial_code === selected,
                              );
                              return (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      marginRight: "8px",
                                      fontFamily:
                                        '"Noto Color Emoji", sans-serif',
                                      borderRadius: "50%",
                                    }}
                                  >
                                    {selectedCountry?.flag}
                                  </span>

                                  {selectedCountry?.dial_code}
                                </Box>
                              );
                            }}
                          >
                            {loading && <MenuItem>Loading...</MenuItem>}
                            {!loading && errorapi && (
                              <MenuItem>Error loading data</MenuItem>
                            )}
                            {!loading &&
                              !errorapi &&
                              countryCodes.map((country) => (
                                <MenuItem
                                  key={country.dial_code}
                                  value={country.dial_code}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <span
                                    style={{
                                      marginRight: "8px",
                                      fontFamily:
                                        '"Noto Color Emoji", sans-serif',
                                      borderRadius: "50%",
                                    }}
                                  >
                                    {country.flag}
                                  </span>
                                  {country.dial_code}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <TextField
                          fullWidth
                          variant="outlined"
                          {...field}
                          error={!!errors.contactNumber}
                          placeholder="Enter phone number"
                          value={phoneNumber}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) =>
                            handlePhoneNumberChange(
                              event,
                              setPhoneNumber,
                              setValue,
                              selectedCountryCode,
                            )
                          }
                          disabled={!selectedCountryCode || loading}
                          sx={{
                            "& fieldset": { border: "none" },
                          }}
                        />
                      </Box>
                    )}
                  />

                  {errors.contactNumber && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mb: 2 }}
                      data-testid="contact-number-error"
                    >
                      {errors.contactNumber.type === "required"
                        ? REQUIRED_FIELD_ERROR
                        : CONTACT_NUMBER_INVALID_ERROR}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            sx={{
              mr: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: PRIMARY_MAIN }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditComponent;
