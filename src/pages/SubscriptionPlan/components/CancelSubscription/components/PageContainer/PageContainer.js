import { Box } from "@mui/material";
import React, { useContext } from "react";
import { NavigationContext } from "../../CancelSubscription";
import { Navigation } from "../Navigation";
import { Progress } from "../Progress";

const height = {
  lg: "calc(100vh - 308px)",
  md: "calc(100vh - 302px)",
  sm: "calc(100vh - 288px)",
  xs: "calc(100vh - 272px)",
};

export function PageContainer({
  children,
  onNext,
  secondActionStyle,
  secondActionText,
  secondActionDisabled,
  secondActionVariant,
}) {
  const { goBack, goToPage, page, onClose, goNext } =
    useContext(NavigationContext);
  return (
    <>
      <Box
        overflow="auto !important"
        display="flex"
        flexDirection="column"
        height={height}
        px={{ md: 3, sm: 1.5, xs: 1.5 }}
        pb={6}
      >
        <Progress
          currentPage={page}
          onNavigate={goToPage}
          onNext={goNext}
          nextDisabled={secondActionDisabled}
        />
        {children}
      </Box>
      <Navigation
        onClose={onClose}
        secondActionDisabled={secondActionDisabled}
        secondActionStyle={secondActionStyle}
        secondActionVariant={secondActionVariant}
        secondActionText={secondActionText}
        showFirstAction={page !== 1}
        onFirstAction={() => goBack(1)}
        onSecondAction={onNext}
      />
    </>
  );
}
