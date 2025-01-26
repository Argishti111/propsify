import { OpenInNew } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { ModalActions } from "../../../../../../shared/components";
import { CreateAccountProgress } from "../CreateAccountProgress";

export function SetUpBilling({ page, email, onClose, goNext }) {
  return (
    <>
      <Box
        sx={{ overflowY: "scroll" }}
        display="flex"
        flexDirection="column"
        px={{ md: 5, sm: 1, xs: 1 }}
        py={5}
      >
        <CreateAccountProgress page={page} />
        <Typography maxWidth={414} />
        <Typography
          textAlign="center"
          variant="subtitle1"
          fontStyle="italic"
          mb={6}
          mt={4}
        >
          Set up billing
        </Typography>
        <a
          style={{ alignSelf: "center" }}
          href={`https://${email}`}
          target="_blank"
        >
          <Typography
            display="block"
            sx={{ maxWidth: 368 }}
            maxWidth={368}
            textAlign="center"
            variant="p"
            fontSize={17}
          >
            Check your email for a link from Google to add payment details to
            your new Google Ads account
            <OpenInNew
              sx={{
                position: "relative",
                top: 4,
                left: 5,
                "&:hover": {
                  color: "#D8CFB4",
                },
              }}
              fontSize="small"
              htmlColor="#beb082"
            />
          </Typography>
        </a>
      </Box>
      <ModalActions
        onFirstAction={onClose}
        secondAction="COMPLETE"
        onSecondAction={goNext}
      />
    </>
  );
}
