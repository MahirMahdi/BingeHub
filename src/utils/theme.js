import createTheme from "@mui/material/styles/createTheme.js";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 375,
      sm: 600,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
});
