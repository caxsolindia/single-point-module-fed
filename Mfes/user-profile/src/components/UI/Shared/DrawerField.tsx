import { Box, FormControl, Select, MenuItem, Typography } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

export interface DateSelectorProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  yearName: Path<T>;
  monthName: Path<T>;
  years: number[];
  months: string[];
}

function DateSelector<T extends FieldValues>({
  control,
  errors,
  yearName,
  monthName,
  years,
  months,
}: DateSelectorProps<T>) {
  const getErrorMessage = (name: Path<T>) => {
    const error = errors[name]?.message;
    return typeof error === "string" ? error : "";
  };

  return (
    <Box sx={{ display: "flex", gap: 7, mt: 2 }}>
      <FormControl fullWidth>
        <Controller
          name={yearName}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              error={!!errors[yearName]}
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
          )}
        />
        {errors[yearName] && (
          <Typography color="error" variant="caption">
            {getErrorMessage(yearName)}
          </Typography>
        )}
      </FormControl>
      <FormControl fullWidth>
        <Controller
          name={monthName}
          control={control}
          render={({ field }) => (
            <Select {...field} error={!!errors[monthName]}>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors[monthName] && (
          <Typography color="error" variant="caption">
            {getErrorMessage(monthName)}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
}

export default DateSelector;
