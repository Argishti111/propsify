import { MoreVert } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { DropdownItem, MoreOptions } from "../../../../../../components";
import { TemplateItemWrapper } from "../../wrappers";
import { ContentCopy, Edit } from "@mui/icons-material";
import { ReactComponent as Trash } from "../../../../../../static/icons/icon-trash-can.svg";
import "./TemplateItem.css";

export function TemplateItem({
  editable,
  value,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onClone,
}) {
  const isSelected = selected?.id === value.id;
  return (
    <TemplateItemWrapper
      onSelect={onSelect}
      isSelected={isSelected}
      value={value}
    >
      <Typography
        pt={2}
        variant="p"
        px={1.5}
        py={3}
        mx={1}
        mt={1}
        className="template-item"
        height={208}
        sx={{
          background: isSelected ? "#ECD9CC4D" : "#AFAFAF1A",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            height: 172,
          }}
          dangerouslySetInnerHTML={{ __html: value.content }}
        ></p>
      </Typography>
      <Box mt={1} display="flex" justifyContent="space-between">
        <Typography
          variant="p"
          fontFamily="MinervaModern-Regular"
          fontWeight="400"
          mt={0.2}
          ml={1}
          pl={1}
          pr={0.5}
          height={32}
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            // whiteSpace: "nowrap",
          }}
        >
          {value.name}
        </Typography>
        {editable && (
          <MoreOptions
            onContainerClick={() => onSelect(value)}
            MoreIcon={MoreVert}
          >
            <DropdownItem
              Icon={Edit}
              text="Edit"
              onClick={(e) => onEdit(value, e)}
            />
            <DropdownItem
              Icon={ContentCopy}
              text="Clone"
              onClick={(e) => onClone(value, e)}
            />
            <DropdownItem
              Icon={Trash}
              text="Delete"
              onClick={(e) => onDelete(value, e)}
            />
          </MoreOptions>
        )}
      </Box>
    </TemplateItemWrapper>
  );
}
