import { KeyboardArrowDown, Search } from "@mui/icons-material";
import {
  Input,
  InputLabel,
  ListSubheader,
  OutlinedInput,
  Select,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import { styles, MenuProps } from "./styles";
import "./MultiSelect.css";

export const MultiSelect = withStyles(styles)(
  ({
    id,
    labelId,
    children,
    label,
    value,
    setSelected,
    renderValue,
    classes,
    threshold = Infinity,
    open,
    setOpen,
    search,
    setSearch,
    ...rest
  }) => {
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      const result = value.filter((v) => !!v);
      if (threshold >= result.length) {
        setSelected(result);
      }
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };
    return (
      <>
        <InputLabel
          focused={true}
          shrink
          className="multi-select-input-label"
          color="primary"
          id={id}
        >
          {label}
        </InputLabel>
        <Select
          labelId={labelId}
          className={classes.select}
          inputProps={{
            classes: {
              icon: classes.icon,
            },
          }}
          id={id}
          multiple
          IconComponent={KeyboardArrowDown}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
          style={{ height: 46 }}
          input={
            <OutlinedInput
              classes={{
                root: classes.root,
                focused: classes.inputFocused,
                notchedOutline: classes.notchedOutline,
              }}
              color="primary"
              label={label}
            />
          }
          renderValue={renderValue}
          onKeyDown={(e) => e.stopPropagation()}
          MenuProps={MenuProps}
          sx={{
            color: "#beb082",
          }}
          {...rest}
        >
          <ListSubheader
            style={{ position: "sticky", padding: 0, width: "100%" }}
          >
            <Input
              placeholder="Search"
              fullWidth
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                e.stopPropagation();
              }}
              onKeyPress={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              classes={{ underline: classes.underline }}
              color="primary"
              sx={{
                color: "#BEB082",
                padding: 1,
              }}
              endAdornment={<Search htmlColor="#BEB082" />}
            />
          </ListSubheader>
          {children}
        </Select>
      </>
    );
  }
);
