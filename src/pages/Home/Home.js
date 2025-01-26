import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import { TopNavbar } from "../../layouts/components";
import { CardContainer, CustomButton } from "../../shared/components";
import { Grid, List } from "@mui/material";
import { Box } from "@mui/system";
import { LeadGeneration, Learnings, MarketInsights, Step } from "./components";
import { useNavigate } from "react-router";

export function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
        className="home"
      >
        <TopNavbar title="Welcome to Propsify"></TopNavbar>
        <Box mx={{ md: 1, sm: 0, xs: 0 }} sx={containerStyle} overflow="auto">
          <Learnings />
          <LeadGeneration />
          <MarketInsights />
        </Box>
      </motion.div>
    </>
  );
}

const containerStyle = {
  height: "calc(100vh - 100px)",
  mr: -0.5,
  pr: 0.5,
};
