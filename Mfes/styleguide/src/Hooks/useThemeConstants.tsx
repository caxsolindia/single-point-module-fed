import { Theme } from "@mui/material/styles";

const useThemeConstants = ({ theme }: { theme: Theme }) => {
  const PRIMARY = theme?.palette?.primary;
  const PRIMARY_MAIN = PRIMARY?.main;
  const PRIMARY_DARK = PRIMARY?.dark;
  const PRIMARY_LIGHT = PRIMARY?.light;
  const PRIMARY_LIGHTEST = PRIMARY?.lightest;

  const SECONDARY = theme?.palette?.secondary;
  const SECONDARY_MAIN = SECONDARY?.main;
  const SECONDARY_LIGHT = SECONDARY?.light;
  const SECONDARY_LIGHTEST = SECONDARY?.lightest;

  const BACKGROUND = theme?.palette?.background;
  const BACKGROUND_DEFAULT = BACKGROUND?.default;
  const BACKGROUND_PAPER = BACKGROUND?.paper;

  const TEXT = theme?.palette?.text;
  const TEXT_PRIMARY = TEXT?.primary;
  const TEXT_SECONDARY = TEXT?.secondary;
  const TEXT_DISABLED = TEXT?.disabled;
  const TEXT_WHITE = TEXT?.white;
  const TEXT_GREEN = TEXT?.green;

  const SUCCESS = theme?.palette?.success;
  const SUCCESS_MAIN = SUCCESS?.main;
  const SUCCESS_LIGHT = SUCCESS?.light;

  const INFO = theme?.palette?.info;
  const INFO_MAIN = INFO?.main;
  const INFO_LIGHT = INFO?.light;

  const ERROR = theme?.palette?.error;
  const ERROR_MAIN = ERROR?.main;

  const GRAY = theme.palette.gray;
  const GRAY_MAIN = GRAY?.main;
  const GRAY_LIGHT = GRAY?.light;

  const DIVIDER = theme?.palette?.divider;

  // Return all constants
  return {
    PRIMARY,
    PRIMARY_MAIN,
    PRIMARY_DARK,
    PRIMARY_LIGHT,
    PRIMARY_LIGHTEST,
    SECONDARY,
    SECONDARY_MAIN,
    SECONDARY_LIGHT,
    SECONDARY_LIGHTEST,
    BACKGROUND,
    BACKGROUND_DEFAULT,
    BACKGROUND_PAPER,
    TEXT,
    TEXT_PRIMARY,
    TEXT_SECONDARY,
    TEXT_DISABLED,
    TEXT_WHITE,
    TEXT_GREEN,
    SUCCESS,
    SUCCESS_MAIN,
    SUCCESS_LIGHT,
    INFO,
    INFO_MAIN,
    INFO_LIGHT,
    ERROR,
    ERROR_MAIN,
    GRAY,
    GRAY_MAIN,
    GRAY_LIGHT,
    DIVIDER,
  };
};

export default useThemeConstants;
