import { ReactComponent as Home } from "../../../../shared/static/icons/icon-home.svg";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { CustomButton } from "../../../../shared/components";
import "./Navbar.css";
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export const Navbar = connect(mapStateToProps)(({ user }) => {
  const navigate = useNavigate();
  const [goingBack, setGoingBack] = useState(false);

  return (
    <nav
      className={`flex-row-between profile-top-nav ${
        goingBack ? "profile-top-nav-back" : ""
      }`}
    >
      <Grid
        alignItems="center"
        sx={{
          "& > img": {
            height: { md: 24, sm: 13, xs: 13 },
          },
        }}
        display="flex"
      >
        <img
          alt=""
          height={24}
          src={require("../../../../shared/static/icons/logo-text.svg").default}
        />

        <Box
          ml={3}
          height={{ md: 40, sm: 0, xs: 0 }}
          className="divider-right"
        />
        <CustomButton
          onClick={() => {
            setGoingBack(true);
            setTimeout(() => navigate("/home"), 290);
          }}
          sx={backBtnSX}
        >
          <Home style={{ marginRight: "0.5rem" }} fontSize="small" />
          BACK TO DASHBOARD
        </CustomButton>
      </Grid>
      <Box display="flex" alignItems="center" height={40}>
        <CustomButton
          onClick={() => {
            setGoingBack(true);
            setTimeout(() => navigate("/home"), 290);
          }}
          sx={backBtnSXSM}
        >
          <Home fontSize="medium" />
        </CustomButton>
        {/* <NotificationsOutlined sx={{ marginRight: 3 }} color="info" /> */}
        {!!user.picture ? (
          <img
            alt=" "
            className="nav-user-image"
            style={{ height: 40, width: 40 }}
            src={user.picture + "&x=" + Date.now()}
          />
        ) : (
          <Typography
            height={40}
            width={40}
            className="no-user-image"
            variant="body2"
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {user.firstName[0]}
            {user.lastName[0]}
          </Typography>
        )}
      </Box>
    </nav>
  );
});

const backBtnSX = [
  {
    height: 32,
    marginLeft: 1.5,
    color: "#ecd9cc !important",
    background: "transparent",
    display: {
      md: "flex",
      sm: "none",
      xs: "none",
    },
  },
  {
    "&:hover": {
      background: "#ecd9cc30 !important",
    },
  },
];

const backBtnSXSM = [
  {
    background: "transparent",
    color: "#ecd9cc !important",
    height: 40,
    marginTop: 0.7,

    "&": { borderRadius: "50%", mr: 0.4 },
    display: {
      md: "none",
      sm: "block",
      xs: "block",
    },
    "&:hover": { background: "#ecd9cc33 !important" },
  },
];
