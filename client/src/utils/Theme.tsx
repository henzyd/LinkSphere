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
    // tertiary: {}
    text: {
      primary: "#111",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // "&:hover": {
          //   border: "1px solid red",
          // },
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
  },
});

//15px
export default theme;
