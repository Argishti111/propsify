import { Box, Typography } from "@mui/material";
import React, { useRef, useCallback } from "react";
import { EditIcon } from "../../../static/icons";

export function TitleWithEdit({
  title,
  type = "file",
  onIconClick = () => {},
  onEdit = () => {},
  accept,
  editable = true,
  preventDefault = false,
  Icon = EditIcon,
  titleStyle,
  iconStyle,
  ...rest
}) {
  const fileRef = useRef(null);
  const handleEdit = useCallback((e) => {
    onEdit(e.target.files);
    e.target.value = Date.now();
  }, []);
  return (
    <Box display="flex" justifyContent="space-between" {...rest}>
      <Typography
        color="#192231cc"
        variant="p"
        fontStyle="italic"
        fontWeight="500"
        style={titleStyle}
      >
        {title}
      </Typography>
      <input
        accept={accept}
        onChange={handleEdit}
        style={{ display: "none" }}
        type={type}
        ref={fileRef}
      />
      <Icon
        style={{
          visibility: editable ? "visible" : "hidden",
          cursor: "pointer",
          ...iconStyle,
        }}
        onClick={() => {
          onIconClick();
          if (preventDefault) return;
          fileRef.current.click();
        }}
      />
    </Box>
  );
}
