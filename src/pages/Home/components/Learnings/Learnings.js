import { Grid, List } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { CardContainer, CustomButton } from "../../../../shared/components";
import { Step } from "./components";

const steps = [
  { id: 1, name: "Learn how to find leads using PPC advertising" },
  { id: 2, name: "Learn how to find leads using print marketing" },
  { id: 3, name: "Create your first personalized market report" },
  // { id: 2, name: "Create your first personalized property report" },
  // { id: 3, name: "Learn how to find leads using email" },
];

export function Learnings() {
  const navigate = useNavigate();

  return (
    <CardContainer
      pr={{ md: 3, sm: 1, xs: 1 }}
      display="flex"
      mb={12}
      pb={3}
      sx={{
        flexDirection: {
          md: "row",
          sm: "column-reverse",
          xs: "column-reverse",
        },
      }}
      mx={0}
    >
      <Grid item lg={7} md={7} sm={12} xs={12}>
        <List sx={{ ml: { md: 3, sm: 1, xs: 1 }, marginTop: 1 }}>
          {steps.map((item) => (
            <Step key={item.id} data={item} />
          ))}
        </List>{" "}
      </Grid>

      <Grid
        sx={{
          mt: { md: 3, sm: 1, xs: 1 },
          paddingLeft: { md: 3, sm: 1, xs: 1 },
        }}
        item
        lg={5}
        md={5}
        sm={12}
        xs={12}
        flexDirection="column"
        display="flex"
        alignItems="center"
        position="relative"
      >
        <img
          alt=""
          className="home-image"
          src={require("../../../../shared/static/images/bg@2x.png")}
          style={{ width: "100%", height: 310, objectFit: "cover" }}
        />
        <CustomButton
          onClick={() => {
            navigate("/market-insights/properties");
          }}
          size="large"
          sx={{
            paddingX: 8,
            position: "absolute",
            bottom: 40,
            whiteSpace: "nowrap",
            maxWidth: "16.25rem",
          }}
        >
          RESEARCH PROPERTIES
        </CustomButton>
      </Grid>
    </CardContainer>
  );
}
