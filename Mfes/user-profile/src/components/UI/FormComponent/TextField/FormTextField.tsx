import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

// Use forwardRef to pass the ref to the underlying TextField component
const FormTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        {...props}
        ref={ref} // Forward the ref here
        fullWidth
        margin="normal"
        FormHelperTextProps={{
          sx: {
            marginLeft: "0",
          },
          ...props.FormHelperTextProps,
        }}
      />
    );
  },
);

// Set a display name for easier debugging
FormTextField.displayName = "FormTextField";

export default FormTextField;
