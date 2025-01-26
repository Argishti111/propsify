import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import {
  CardContainer,
  CustomButton,
} from "../../../../../../shared/components";
import "./LeadGenerationItem.css";

export function LeadGenerationItem({
  title,
  onClick,
  value = 0,
  actionText = "CREATE NEW CAMPAIGN",
  properties,
  ...rest
}) {
  return (
    <CardContainer
      {...rest}
      item
      className="lead-gen-item"
      p={2}
      my={2}
      mr={{ md: 3, sm: 0, xs: 0 }}
    >
      <Grid
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="center"
        mt={1.25}
        mr={{ md: 2, sm: 0, xs: 0 }}
      >
        <Grid className="divider-right border-gradient" pr={3} item>
          <Typography
            textAlign="center"
            fontFamily="MinervaModern-Regular"
            variant="h3"
          >
            {value}
          </Typography>
          <Typography
            textAlign="center"
            variant="subtitle1"
            fontStyle="italic"
            lineHeight={1.2}
            marginBottom={2}
            width={100}
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          ml={3}
          item
        >
          {properties.map((p) => (
            <Box pb={1} key={p.name}>
              <Typography
                fontSize={20}
                fontFamily="MinervaModern-Regular"
                variant="p"
              >
                {p.value}
              </Typography>
              <Typography fontWeight="400" color="#192231CC" variant="body2">
                {p.name}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
      <span>
        <CustomButton onClick={onClick} sx={{ mt: -1 }} fullWidth>
          {actionText}
        </CustomButton>
      </span>
    </CardContainer>
  );
}
