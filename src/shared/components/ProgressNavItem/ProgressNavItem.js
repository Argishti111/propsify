import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { ReactComponent as IconEllipse } from "../../static/icons/icon-ellipse.svg";
import { ReactComponent as IconCircle } from "../../static/icons/icon-circle.svg";
import "./ProgressNavItem.css";

export function ProgressNavItem({
  name,
  checked,
  onClick,
  isFirst = false,
  isPrevious,
  isNext,
  isBeforeCurrent,
  isNextAndDisabled,
  isCurrent,
}) {
  const configureSize = useCallback((node) => {
    if (node) {
      const width = node.getBoundingClientRect().width;
      node.style.left = -(width / 2 - 4) + "px";
    }
  }, []);
  return (
    <>
      {!isFirst && (
        <span
          onClick={onClick}
          className={`progress-line ${
            isBeforeCurrent ? "before-current" : ""
          }  ${isNext ? "next" : ""} ${isCurrent ? "current" : ""}`}
          style={{
            borderBottom: `1px ${
              checked ? "dashed #AFAFAF" : "solid  #666666"
            }`,
          }}
        ></span>
      )}
      <Box
        data-name={name}
        className={`progress-nav-item ${checked ? "" : "checked"} ${
          isBeforeCurrent ? "before-current" : ""
        } ${isNext ? "next" : ""} ${isCurrent ? "current" : ""}`}
      >
        <Typography
          mb={1}
          position="absolute"
          style={{
            cursor: !checked || isNextAndDisabled ? "pointer" : "default",
            top: -28,
          }}
          onClick={onClick}
          variant="subtitle2"
          fontStyle="italic"
          fontWeight="500"
          whiteSpace="nowrap"
          ref={configureSize}
        >
          {name}
        </Typography>
        {checked ? (
          <IconCircle
            onClick={onClick}
            style={pointStyle(!checked || isNextAndDisabled)}
          />
        ) : (
          <IconEllipse
            fill={isPrevious ? "#666666" : "#192231"}
            onClick={onClick}
            style={pointStyle(!checked || isNextAndDisabled)}
          />
        )}
      </Box>
    </>
  );
}

const pointStyle = (pointed) => {
  return {
    height: 12,
    width: 12,
    marginTop: -1,
    alignSelf: "center",
    border: "2px solid white",
    borderRadius: "50%",
    cursor: pointed ? "pointer" : "default",
  };
};
