import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import "./NavUser.css";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export const NavUser = connect(mapStateToProps)(({ user, onClick }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        setTimeout(() => navigate("/profile/details"), 500);
      }}
      className="nav-user borders-top-bottom"
    >
      <div className="nav-user-main-container">
        <Grid
          className="nav-user-container"
          container
          flexWrap="nowrap"
          alignItems="center"
        >
          {!!user.picture ? (
            <img
              alt=" "
              className="nav-user-image"
              src={user.picture + "&x=" + Date.now()}
            />
          ) : (
            <Typography
              height="2.5rem"
              width="2.5rem"
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
          <Typography fontWeight="normal" variant="p" className="nav-user-name">
            {user.firstName} {user.lastName}
          </Typography>
        </Grid>
        <KeyboardArrowRight
          sx={{ mr: "10px" }}
          className="nav-collapse-arrow"
          fontSize="small"
          htmlColor="#ECD9CC"
        />
      </div>
    </div>
  );
});
