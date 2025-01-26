import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#BEB082",
    },
    secondary: {
      main: "#FFFFFF",
    },
    info: {
      main: "#ECD9CC",
    },
    warning: {
      main: "#FEFAF6",
    },
    success: {
      main: "#dbd4bb",
    },
  },
  shadows: Array(25).fill("none"),
  typography: {
    button: {
      fontFamily: "MinervaModern-Regular",
      "&:hover": {
        backgroundColor: "#fff",
        color: "#3c52b2",
      },
    },
    fontFamily: "Lora",
    p: {
      fontSize: "0.938rem",
      fontFamily: "Lora",
    },
    body1: {
      fontSize: "1.063rem",
      color: "#192231",
      fontFamily: "Lora",
    },
    body2: {
      color: "#192231",
      fontSize: "0.938rem",
      fontFamily: "Lora",
      fontWeight: "500",
    },
    h1: {
      color: "#192231",
      fontWeight: "400",
    },
    h2: {
      color: "#192231",
      fontWeight: "400",
    },
    h3: {
      color: "#192231",
      fontWeight: "400",
    },
    h4: {
      color: "#192231",
      fontWeight: "400",
    },
    h5: {
      color: "#192231",
      fontWeight: "400",
    },
    h6: {
      color: "#192231",
      fontWeight: "400",
    },
    subtitle1: {
      fontWeight: "500",
      color: "#192231",
      fontSize: "1.063rem",
    },
    subtitle2: {
      fontWeight: "500",
      color: "#192231",
      fontSize: "0.938rem",
    },
  },
});
