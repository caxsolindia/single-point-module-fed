import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProfileStore } from "../Store/ProfileStore.ts";
import {
  Errors,
  validateProfile,
} from "../components/UI/Validation/ProfileSummaryValidation.ts";
import { useProfileSummaryStore } from "../Store/ProfileSummaryStore.ts";
import {
  useGetSummary,
  useUpdateSummary,
} from "../components/UI/Shared/GraphqlQueries/UserProfile.ts";
import { useUserDataStore } from "../Store/UserDateStore.ts";

interface ProfileSummaryEditorProps {
  readonly profileSummary: string | undefined;
}

function ProfileSummaryEditor({ profileSummary }: ProfileSummaryEditorProps) {
  useProfileSummaryStore();
  const { setEditMode } = useProfileStore();
  const maxCharacters = 2500;
  const { profileSum, setProfileSum } = useProfileSummaryStore();
  const [updatedValue, setUpdatedValue] = useState(
    (profileSum ?? profileSummary) || "",
  );
  const { userId, username } = useUserDataStore();
  const [characterCount, setCharacterCount] = useState(
    profileSummary?.length || 0,
  );
  const [errors, setErrors] = useState<Errors>({});

  const handleCancelClick = () => {
    setEditMode("02", false);
  };

  const { loadSumm } = useGetSummary(userId);

  useEffect(() => {
    if (userId) loadSumm();
  }, [userId]);

  const { updateSummaryInDB } = useUpdateSummary();

  const handleUpdateSummary = async () => {
    try {
      const response = await updateSummaryInDB({
        variables: { username, description: updatedValue },
      });
      if (response) {
        await setProfileSum(updatedValue);
        if (userId) loadSumm();
      }
    } catch (error) {
      /* empty */
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdatedValue(value);
    setCharacterCount(value.length);
  };

  const handleSaveClick = async () => {
    const validationErrors = await validateProfile(updatedValue);
    if (Object.keys(validationErrors).length === 0) {
      await handleUpdateSummary();
      setEditMode("02", false);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      data-testid="profile-summary"
      sx={{
        borderRadius: "12px",
        "& fieldset": { borderRadius: "12px" },
      }}
    >
      <TextField
        sx={{
          width: "100%",
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
        fullWidth
        multiline
        value={updatedValue}
        data-testid="profile-summary-input"
        onChange={handleInputChange}
        inputProps={{
          maxLength: maxCharacters,
        }}
        variant="outlined"
        error={Boolean(errors.summary)}
        helperText={errors.summary}
      />
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginTop: "5px" }}
      >
        Maximum limit {characterCount}/{maxCharacters} characters
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 3,
          marginTop: 2,
        }}
      >
        <Button variant="outlined" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveClick}
          data-testid="save-button"
          disabled={
            updatedValue?.trim().length === 0 || Boolean(errors.summary)
          }
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileSummaryEditor;
