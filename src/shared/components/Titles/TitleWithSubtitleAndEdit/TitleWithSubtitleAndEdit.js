import { Box, Typography } from "@mui/material";
import React from "react";
import { TitleWithEdit } from "../TitleWithEdit";

export function TitleWithSubtitleAndEdit({
  title,
  subtitle,
  type,
  onIconClick,
  onEdit,
  accept,
  editable,
  preventDefault = true,
  titleStyle = { color: "#AFAFAF", fontStyle: "normal" },
  Icon,
}) {
  return (
    <Box>
      <TitleWithEdit
        title={title}
        type={type}
        onIconClick={onIconClick}
        onEdit={onEdit}
        accept={accept}
        editable={editable}
        preventDefault={preventDefault}
        Icon={Icon}
        titleStyle={titleStyle}
      />
      <Typography variant="body1">{subtitle}</Typography>
    </Box>
  );
}
