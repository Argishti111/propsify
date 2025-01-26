import { ForwardToInbox, PrintOutlined, Radar } from "@mui/icons-material";
import { Box, Typography, Grid } from "@mui/material";
import React, { useCallback } from "react";
import { CampaignCardButton } from "./components";
import { connect } from "react-redux";
import {
  setBuyersKeywords,
  setDefaultPlace,
  setFindSellersOrBuyers,
  setSellersKeywords,
} from "../../../redux";
import { Modal } from "../Modal";
import {
  withCreateDigitalCampaign,
  withCreateEmailCampaign,
  withCreatePrintCampaign,
} from "../../higherOrderComponents";
import { getCityOrZipCodeName } from "../../helpers";
import {
  ChooseAdAccount,
  CreateAdAccount,
} from "../../../pages/DigitalMarketing/components";
import { connectGoogleAccount } from "../../../services";
import { useGoogleAccountConnect } from "../../hooks";
import { EmailAddressManager } from "../EmailAddressManager";

const mapStateToProps = (state) => {
  return { findSellersOrBuyers: state.marketInsights.findSellersOrBuyers };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFindSellersOrBuyers: (data) => dispatch(setFindSellersOrBuyers(data)),
    setBuyersKeywords: () => dispatch(setBuyersKeywords()),
    setSellersKeywords: () => dispatch(setSellersKeywords()),
    setDefaultPlace: (name) => dispatch(setDefaultPlace(name)),
  };
};
export const FindSellersOrBuyersOptions = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withCreateEmailCampaign(
    withCreateDigitalCampaign(
      withCreatePrintCampaign(
        ({
          openCreateDigitalCampaign,
          openCreateEmailCampaign,
          findSellersOrBuyers,
          setFindSellersOrBuyers,
          setCreatePrintCampaignOpen,
          setSellersKeywords,
          setBuyersKeywords,
          setDefaultPlace,
        }) => {
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

          const onCreateDigitalCampaign = () => {
            if (adAccount !== false) {
              if (adAccount) {
                setFindSellersOrBuyers({ open: false });
                openCreateDigitalCampaign(true);
                setDefaultPlace(getCityOrZipCodeName(findSellersOrBuyers));
                if (findSellersOrBuyers.sellers) {
                  setSellersKeywords();
                } else {
                  setBuyersKeywords();
                }
              } else {
                connectGoogleAccount();
              }
            }
          };

          const onCreatePrintCampaign = () => {
            setFindSellersOrBuyers({ open: false });
            setCreatePrintCampaignOpen(true);
          };
          const onCreateEmailCampaign = () => {
            setFindSellersOrBuyers({ open: false });
            openCreateEmailCampaign(true);
          };
          return (
            <>
              <EmailAddressManager />
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
              <Modal
                maxWidth="lg"
                open={findSellersOrBuyers.open}
                onClose={() => setFindSellersOrBuyers({ open: false })}
                fullScreenOnSM
                titleChildren={<div />}
                title={`Find ${
                  findSellersOrBuyers.sellers ? "Sellers" : "Buyers"
                }`}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  height="100%"
                  px={{ md: 4, sm: 2, xs: 1 }}
                  style={{
                    overflow: "hidden",
                    minWidth: 300,
                    maxWidth: 800,
                  }}
                >
                  <Typography
                    px={{ md: 18, sm: 4, xs: 0 }}
                    textAlign="center"
                    variant="h4"
                    fontWeight="400"
                    fontFamily="MinervaModern-Regular"
                  >
                    HOW DO YOU WANT TO REACH{" "}
                    {findSellersOrBuyers.sellers ? "SELLERS" : "BUYERS"}?
                  </Typography>

                  <Typography
                    textAlign="center"
                    alignSelf="center"
                    fontSize={17}
                    mt={2}
                    variant="p"
                  >
                    {findSellersOrBuyers.city}{" "}
                    {findSellersOrBuyers.zipCode &&
                    findSellersOrBuyers.zipCode !== "All ZIP Codes"
                      ? "/ " + findSellersOrBuyers.zipCode
                      : ""}
                  </Typography>
                  <Grid
                    paddingX={{ md: 3, sm: 0, xs: 0 }}
                    flexWrap="wrap"
                    display="flex"
                    gap={1}
                    mt={{ md: 0, sm: 3, xs: 3 }}
                    justifyContent="space-between"
                  >
                    <CampaignCardButton
                      onClick={onCreateDigitalCampaign}
                      Icon={Radar}
                      title={
                        adAccount
                          ? "Create a Digital Marketing Campaign"
                          : "Connect Google Ads Account"
                      }
                    />
                    <CampaignCardButton
                      onClick={onCreateEmailCampaign}
                      Icon={ForwardToInbox}
                      title="Create an Email Marketing Campaign"
                    />
                    <CampaignCardButton
                      onClick={onCreatePrintCampaign}
                      Icon={PrintOutlined}
                      title="Create a Print Marketing Campaign"
                    />
                  </Grid>
                </Box>
              </Modal>
            </>
          );
        }
      )
    )
  )
);
