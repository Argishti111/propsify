import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./CustomButton.css";

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },

  button: {
    minWidth: 30,
    color: "#192231",
    boxShadow: "none",
    fontWeight: "500",
    fontFamily: "MinervaModern-Bold",
    borderRadius: 0,
    // backgroundColor: "#ecd9cc",
    "&:hover": {
      backgroundColor: "#f5ece5",
    },
    "&:disabled": {
      backgroundColor: "#f7f7f7",
      color: "#afafaf",
    },
    "& .MuiButton-sizeLarge": {
      fontSize: 20,
    },
  },
});

export function CustomButton({
  style,
  className = "",
  variant = "contained",
  children,
  color = "info",
  onClick,
  sx = {},
  ...rest
}) {
  const classes = useStyles();

  return (
    <Button
      sx={sx}
      onClick={onClick}
      variant={variant}
      style={style}
      color={color}
      className={`${className} ${classes.button}`}
      {...rest}
    >
      {children}
    </Button>
  );
}
