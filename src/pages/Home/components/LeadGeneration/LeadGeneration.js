import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import store, { setDefaultKeywords, setDefaultPlace } from "../../../../redux";
import {
  addAdAcount,
  connectGoogleAccount,
  getLeadGenerationCounts,
  getMyAdAccount,
  HOST,
} from "../../../../services";
import {
  CreateDigitalCampaign,
  CreateEmailCampaign,
  CreatePrintCampaign,
} from "../../../../shared/components";
import { getCityOrZipCodeName } from "../../../../shared/helpers";
import { useGoogleAccountConnect } from "../../../../shared/hooks";
import {
  ChooseAdAccount,
  CreateAdAccount,
} from "../../../DigitalMarketing/components";
import { LeadGenerationItem } from "./components";

export function LeadGeneration() {
  const [data, setData] = useState(null);

  const {
    fetchAdAccount,
    createAdAcountOpen,
    setCreateAdAccountOpen,
    token,
    setToken,
    chooseAddAccountOpen,
    setChooseAddAccountOpen,
    setNewAccountOpen,
    adAccount,
  } = useGoogleAccountConnect();

  const dispatch = useDispatch();
  useEffect(() => {
    fetchAdAccount();
    getLeadGenerationCounts().then((data) => {
      setData(data);
    });
  }, []);

  return (
    !!data && (
      <>
        {!adAccount && (
          <>
            <CreateAdAccount
              token={token}
              open={createAdAcountOpen}
              onConnect={fetchAdAccount}
              onClose={() => {
                setNewAccountOpen(false);
                setCreateAdAccountOpen(false);
              }}
            />
            <ChooseAdAccount
              token={token}
              chooseAddAccountOpen={chooseAddAccountOpen}
              onClose={() => {
                setNewAccountOpen(false);
                setChooseAddAccountOpen(false);
              }}
              setToken={setToken}
              onCreateNew={() => setCreateAdAccountOpen(true)}
              onConnect={fetchAdAccount}
            />
          </>
        )}
        <Typography marginLeft={1} fontWeight="400" variant="h5">
          Lead Generation
        </Typography>
        <Grid
          minHeight={240}
          mt={3}
          display="flex"
          flexWrap="wrap"
          gap={{ md: 0, sm: 2, xs: 2 }}
        >
          <CreateDigitalCampaign
            WrappedComponent={({ openCreateDigitalCampaign }) => {
              return (
                <LeadGenerationItem
                  actionText={
                    adAccount ? "CREATE NEW CAMPAIGN" : "CONNECT ACCOUNT"
                  }
                  onClick={() => {
                    if (adAccount !== false) {
                      if (adAccount) {
                        openCreateDigitalCampaign(true);
                        dispatch(setDefaultKeywords());
                      } else {
                        connectGoogleAccount();
                      }
                    }
                  }}
                  title="Digital campaigns"
                  value={data.digitalCampaignsCount}
                  properties={[
                    {
                      name: "Total impressions",
                      value: data.digitalImpressions,
                    },
                    { name: "Total clicks", value: data.digitalClicks },
                  ]}
                />
              );
            }}
          />
          <CreateEmailCampaign
            WrappedComponent={({ openCreateEmailCampaign }) => {
              return (
                <LeadGenerationItem
                  onClick={() => openCreateEmailCampaign(true)}
                  title="Email campaigns"
                  value={data.emailCampaignsCount}
                  properties={[
                    {
                      name: "Total recipients",
                      value: data.emailRecipients,
                    },
                    { name: "Total clicks", value: data.emailClicks },
                  ]}
                />
              );
            }}
          />
          {/* <LeadGenerationItem /> */}
          <CreatePrintCampaign
            WrappedComponent={({ setCreatePrintCampaignOpen }) => {
              return (
                <LeadGenerationItem
                  onClick={() => setCreatePrintCampaignOpen(true)}
                  title="Print campaigns"
                  value={data.printCampaignsCount}
                  properties={[
                    { name: "Total recipients", value: data.printRecipients },
                  ]}
                />
              );
            }}
          />
        </Grid>
      </>
    )
  );
}
