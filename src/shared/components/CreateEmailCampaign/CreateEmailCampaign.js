import React from "react";
import { withCreateEmailCampaign } from "../../higherOrderComponents";

export const CreateEmailCampaign = withCreateEmailCampaign(
  ({ openCreateEmailCampaign, WrappedComponent }) => {
    return (
      <WrappedComponent openCreateEmailCampaign={openCreateEmailCampaign} />
    );
  }
);
