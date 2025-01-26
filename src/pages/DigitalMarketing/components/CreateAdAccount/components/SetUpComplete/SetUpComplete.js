import { OpenInNew } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  ErrorBox,
  Info,
  ModalActions,
} from "../../../../../../shared/components";
import { CreateAccountProgress } from "../CreateAccountProgress";
import CheckIcon from "../../../../../../shared/static/icons/icon-progress-checked-black.svg";
import { connectNewGoogleAccount } from "../../../../../../services";
import "./SetUpComplete.css";

export function SetUpComplete({ page, onClose, onConnect, token }) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = useCallback(() => {
    setConnecting(true);
    setError("");
    connectNewGoogleAccount(token.id)
      .then((data) => {
        if (data.success) {
          onClose();
          onConnect();
        } else {
          setError(data.errorMessage);
        }
      })
      .catch(() => {
        setError(
          "Failed to connect account, please check your internet connection and try again"
        );

        setTimeout(() => {
          setError("");
        }, 3000);
      })
      .finally(() => setConnecting(false));
  }, [token]);

  return (
    <>
      <Box
        sx={{ overflowY: "scroll" }}
        display="flex"
        flexDirection="column"
        px={{ md: 5, sm: 1, xs: 1 }}
        py={5}
        alignItems="center"
      >
        <CreateAccountProgress page={page} />
        <Typography maxWidth={414} />
        <img
          style={{ marginTop: 16, height: 40, width: 40, alignSelf: "center" }}
          alt=""
          src={CheckIcon}
        />
        <Typography
          textAlign="center"
          variant="subtitle1"
          fontStyle="italic"
          mb={3}
          mt={1}
        >
          Set up billing
        </Typography>
        <Typography
          alignSelf="center"
          display="flex-block"
          sx={{ maxWidth: 368 }}
          maxWidth={368}
          textAlign="center"
          variant="p"
          fontSize={17}
        >
          You're now ready to start creating Google Ad campaigns.
          {/* <Info
            containerClassName="ppc-billing-tooltip"
            style={{ display: "inline", top: 4, left: 5 }}
            value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
          /> */}
        </Typography>
        <ErrorBox
          sx={{ maxWidth: 368 }}
          title="Failed to connect"
          message={error}
          mt={2}
        />
      </Box>
      <ModalActions
        firstActionDisabled={connecting}
        secondActionDisabled={connecting}
        onFirstAction={onClose}
        secondAction="CONNECT"
        onSecondAction={handleConnect}
      />
    </>
  );
}
