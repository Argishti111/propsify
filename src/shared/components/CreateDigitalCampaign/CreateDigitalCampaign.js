import React from "react";
import { withCreateDigitalCampaign } from "../../higherOrderComponents";

export const CreateDigitalCampaign = withCreateDigitalCampaign(
  ({ openCreateDigitalCampaign, WrappedComponent }) => {
    return (
      <WrappedComponent openCreateDigitalCampaign={openCreateDigitalCampaign} />
    );
  }
);
