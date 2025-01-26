import { PlayCircle } from "@mui/icons-material";
import { ListItemText, Typography, ListItem } from "@mui/material";
import React from "react";
import { TinyButton } from "../../../../../../shared/components";

export function Step({ data }) {
  return (
    <ListItem
      sx={{ marginTop: 1 }}
      className="steps-item-container"
      secondaryAction={
        <TinyButton
          className="icon-parent"
          color="warning"
          endIcon={
            <PlayCircle
              className="my-mui-icon"
              style={{ marginTop: -2 }}
              htmlColor="#BEB082"
            />
          }
        >
          Watch
        </TinyButton>
      }
    >
      <ListItemText
        className="step-item-text"
        primaryTypographyProps={{
          sx: { display: "flex", alignItems: "center" },
        }}
      >
        <Typography
          color="#BEB082"
          fontStyle="italic"
          variant="h5"
          display="inline"
        >
          {data.id}
        </Typography>
        <Typography
          marginLeft={3}
          fontStyle="italic"
          variant="body2"
          display="inline"
          marginRight={6}
        >
          {data.name}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
