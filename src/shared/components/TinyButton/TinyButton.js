import React from "react";
import { CustomButton } from "../CustomButton";

export function TinyButton({
  color = "secondary",
  style,
  onClick,
  children,
  sx,
  ...rest
}) {
  return (
    <CustomButton
      color={color}
      onClick={onClick}
      style={{
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 4,
        innerHeight: 15,
        ...style,
      }}
      sx={{
        fontSize: 13,
        minWidth: 40,
        height: 24,
        fontFamily: "MinervaModern-Bold",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </CustomButton>
  );
}
