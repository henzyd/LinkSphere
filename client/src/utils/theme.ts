import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0055FF",
    },
    secondary: {
      main: "#10D876",
    },
    info: {
      main: "#343a40",
    },
    text: {
      primary: "#111",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiFormControlLabel-root .MuiTypography-root": {
            fontSize: "0.4rem !important",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "grey !important",
            fontWeight: "500",
            fontSize: "1.2rem",
            lineHeight: "1.5rem",
          },
          "& .MuiInputBase-input": {
            fontSize: "1.2rem",
            fontWeight: "500",
            lineHeight: "1.5rem",
          },
          "& .MuiFormHelperText-root": {
            fontSize: "1rem",
            color: "#ef1111 !important",
          },
          "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend span": {
            paddingLeft: "10px",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#0000000d",
        },
      },
    },
    MuiPopper: {
      defaultProps: {
        placement: "bottom-end",
        style: {
          marginTop: "50rem",
        },
        transition: true,
      },
    },
  },
});

//15px
export default theme;
