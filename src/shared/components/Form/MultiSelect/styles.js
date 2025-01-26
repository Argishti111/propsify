export const styles = (theme) => ({
  underline: {
    borderBottom: theme.palette.common.white,
    "&:after": {
      borderBottom: `2px solid #BEB0824D`,
    },
    "&:before": {
      borderBottom: `1px solid #BEB0824D`,
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid #BEB0824D !important",
    },
  },
  root: {
    "&$inputFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  select: {
    "&:before": {
      borderColor: "#BEB0824D",
    },
    "&:after": {
      borderColor: "#BEB0824D",
    },
  },
  icon: {
    fill: "#BEB082",
  },
  inputFocused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#BEB08299 !important",
  },
});

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    disableAutoFocusItem: true,
    disableAutoFocus: true,
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 250,
      boxShadow: "0px 6px 8px #00000066",
      position: "absolute",
      marginBottom: 0,
    },
  },
  MenuListProps: {
    style: {
      paddingBottom: 0,
    },
  },
};
