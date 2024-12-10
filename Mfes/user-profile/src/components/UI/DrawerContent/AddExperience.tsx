import React, { forwardRef } from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  COMAPANY_NAME,
  COUNTRY,
  CURRENTLY_ACTIVE,
  DESIGNATION,
  EMPLOYEEMENT_TYPE,
  END_DATE,
  JOB_SUMMARY,
  LOCATION_TYPE,
  MONTH,
  SELECT_COUNTRY,
  SELECT_STATE,
  SKILL_NAME,
  START_DATE,
  STATE,
  YEAR,
} from "../../../constant/formConstant/labelConstant.ts";

import { addExperienceValidationSchema } from "../Validation/ExperienceValidation.ts";

import {
  NM_COMPANY,
  NM_COUNTRY,
  NM_DESIGNATION,
  NM_EMONTH,
  NM_ETYPE,
  NM_EXP_SUMMARY,
  NM_EYEAR,
  NM_LOCATION,
  NM_SKILLS,
  NM_SMONTH,
  NM_STATE,
  NM_SYEAR,
} from "../../../constant/formConstant/nameConstant.ts";
import LabelTypography from "../FormComponent/Label/Label.tsx";
import FormTextField from "../FormComponent/TextField/FormTextField.tsx";
import SelectInputLabel from "../FormComponent/InputLabel/SelectInputLabel.tsx";
import { useCertificationForm } from "../Shared/DrawerMethods.tsx";

const AddExperience = forwardRef(() => {
  const {
    skills,
    skillInput,
    setSkillInput,
    errorSkill,
    handleSkillAdd,
    handleSkillDelete,
    onSubmit,
    months,
    years,
  } = useCertificationForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(addExperienceValidationSchema),
    defaultValues: {
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      CURRENTLY_ACTIVE: false,
      country: "",
      state: "",
    },
  });

  const startYear = watch("startYear");
  const startMonth = watch("startMonth");
  const endYear = watch("endYear");
  const endMonth = watch("endMonth");

  React.useEffect(() => {
    trigger(["startYear", "startMonth", "endYear", "endMonth"]);
  }, [startYear, startMonth, endYear, endMonth, trigger]);

  const states = ["Gujarat", "Maharashtra", "Rajasthan", "Karnataka"];
  const countries = ["India", "USA", "Canada", "Australia"];
  const currentlyActive = watch("CURRENTLY_ACTIVE");

  const locationType = [
    { value: "on-site", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
    { value: "remote", label: "Remote" },
  ];

  const EmoployeementType = [
    { value: "full-Time", label: "Full-Time" },
    { value: "part-Time", label: "Part-Time" },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", gap: 7 }}>
        <Box sx={{ width: { lg: "50%", sm: "100%" } }}>
          <LabelTypography text={COMAPANY_NAME} />
          <Controller
            name={NM_COMPANY}
            control={control}
            render={({ field }) => (
              <FormTextField
                {...field}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                data-tesid="company-name"
              />
            )}
          />
        </Box>
        <Box sx={{ width: { lg: "50%", sm: "100%" } }}>
          <LabelTypography text={DESIGNATION} />
          <Controller
            name={NM_DESIGNATION}
            control={control}
            render={({ field }) => (
              <FormTextField
                {...field}
                error={!!errors.designation}
                helperText={errors.designation?.message}
                data-tesid="designation-name"
              />
            )}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 7, mt: 2 }}>
        <Box sx={{ width: "100%" }}>
          <LabelTypography text={START_DATE} />
          <Box
            sx={{
              display: "flex",
              gap: 7,
              mt: 2,
              width: "100%",
            }}
          >
            <Controller
              name={NM_SYEAR}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <SelectInputLabel label={YEAR} value={field.value} />
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 350,
                          zIndex: 1300,
                        },
                      },
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                    }}
                    data-testid="start-year-select"
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography color="error" variant="caption">
                    {errors.startYear?.message}
                  </Typography>
                </FormControl>
              )}
              data-testid="start-month-select"
            />
            <Controller
              name={NM_SMONTH}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <SelectInputLabel label={MONTH} value={field.value} />
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    error={!!errors.startMonth}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography color="error" variant="caption">
                    {errors.startMonth?.message}
                  </Typography>
                </FormControl>
              )}
              data-testid="end-year-select"
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 7, mt: 2 }}>
        <Controller
          name="CURRENTLY_ACTIVE"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label={CURRENTLY_ACTIVE}
            />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 7, mt: 3 }}>
        <Box sx={{ width: "100%" }}>
          <LabelTypography text={END_DATE} />
          <Box sx={{ display: "flex", gap: 7, mt: 2 }}>
            <Controller
              name={NM_EYEAR}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <SelectInputLabel label={YEAR} value={field.value} />
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    disabled={!!currentlyActive}
                    error={!!errors.endYear}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 350,
                          zIndex: 1300,
                        },
                      },
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                    }}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography color="error" variant="caption">
                    {errors.endYear?.message}
                  </Typography>
                </FormControl>
              )}
            />
            <Controller
              name={NM_EMONTH}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <SelectInputLabel label={MONTH} value={field.value} />
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    disabled={!!currentlyActive}
                    error={!!errors.endMonth}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography color="error" variant="caption">
                    {errors.endMonth?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 7, mt: 3 }}>
        <Box sx={{ width: { lg: "50%", sm: "100%" } }}>
          <LabelTypography text={COUNTRY} />
          <Controller
            name={NM_COUNTRY}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <SelectInputLabel label={SELECT_COUNTRY} value={undefined} />
                <Select {...field} error={!!errors.country}>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                <Typography color="error" variant="caption">
                  {errors.country?.message}
                </Typography>
              </FormControl>
            )}
          />
        </Box>
        <Box sx={{ width: { lg: "50%", sm: "100%" } }}>
          <Typography sx={{ fontWeight: 600 }}>{STATE}</Typography>
          <Controller
            name={NM_STATE}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <SelectInputLabel label={SELECT_STATE} value={undefined} />
                <Select {...field} error={!!errors.state}>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                <Typography color="error" variant="caption">
                  {errors.state?.message}
                </Typography>
              </FormControl>
            )}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ fontWeight: 600 }}>{LOCATION_TYPE}</Typography>
        <RadioGroup
          row
          aria-labelledby={NM_LOCATION}
          defaultValue="on-site"
          name={NM_LOCATION}
          sx={{ mt: 1 }}
        >
          {locationType.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ fontWeight: 600 }}>{EMPLOYEEMENT_TYPE}</Typography>
        <RadioGroup
          row
          aria-labelledby="employeeType"
          defaultValue="full-Time"
          name={NM_ETYPE}
          sx={{ mt: 1 }}
        >
          {EmoployeementType.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box sx={{ display: "flex", gap: 7, mt: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <LabelTypography text={SKILL_NAME} />
          <Controller
            name={NM_SKILLS}
            control={control}
            render={({ field }) => (
              <FormTextField
                {...field}
                value={skillInput}
                placeholder=""
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillAdd}
                error={Boolean(errorSkill)}
                helperText={errorSkill || errors.skills?.message}
              />
            )}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={handleSkillDelete(skill)}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <LabelTypography text={JOB_SUMMARY} />
        <Controller
          name={NM_EXP_SUMMARY}
          control={control}
          render={({ field }) => (
            <FormTextField
              {...field}
              multiline
              rows={4}
              error={!!errors.experienceSummary}
              helperText={errors.experienceSummary?.message}
            />
          )}
        />
      </Box>
    </form>
  );
});

export default AddExperience;
