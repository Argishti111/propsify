import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import "./DigitalMarketing.css";
import { TopNavbar } from "../../layouts/components";
import {
  ChooseAdAccount,
  CreateAdAccount,
  DisconnectAdAccount,
  Empty,
  Navbar,
} from "./components";
import { withCreateDigitalCampaign } from "../../shared/higherOrderComponents";
import { CampaignList, Loading } from "../../shared/components";
import { Box } from "@mui/material";
import {
  deleteDigitalCampaign,
  endDigitalCampaign,
  getDigitalCampaignDetails,
  getDigitalCampaigns,
  getDigitalDraftCampaignDetails,
  getDigitalDraftCampaigns,
  getMyAdAccount,
  HOST,
} from "../../services";
import { Route, Routes } from "react-router";
import { Campaigns, Drafts } from "./nestedPages";
import { useDispatch } from "react-redux";
import store, { setDefaultKeywords, setDefaultPlace } from "../../redux";
import { getCityOrZipCodeName } from "../../shared/helpers";

export const DigitalMarketing = withCreateDigitalCampaign(
  ({
    openCreateDigitalCampaign,
    setModalLoading,
    setSelectedCampaign,
    goToLastPage,
    fetchDigitalCampaignCount,
  }) => {
    const [adAccount, setAdAccount] = useState(null);
    const [disconnectOpen, setDisconnectOpen] = useState(false);
    const [createAdAcountOpen, setCreateAdAccountOpen] = useState(false);
    const [token, setToken] = useState("");
    const [chooseAddAccountOpen, setChooseAddAccountOpen] = useState(false);
    const [newAccountOpen, setNewAccountOpen] = useState(false);
    const [digitalCampaigns, setDigitalCampaigns] = useState([]);
    const [draftDigitalCampaigns, setDraftDigitalCampaigns] = useState([]);

    const [listLoading, setListLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
      if (!newAccountOpen) {
        fetchAdAccount();
      }
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, [newAccountOpen]);

    const getDigitalCampaignsByType = useCallback(
      (typeId, period, statusId, orderColumn, orderType) => {
        if (adAccount) {
          setListLoading(true);
          const filters = {
            typeId,
            period,
            statusId,
            orderColumn,
            orderType,
          };
          switch (typeId) {
            case 3:
              getDigitalCampaigns(filters)
                .then((data) => {
                  setDigitalCampaigns(data);
                })
                .finally(() => setListLoading(false));
              return;
            case 1:
              getDigitalDraftCampaigns(filters)
                .then((data) => {
                  setDraftDigitalCampaigns(data);
                })
                .finally(() => setListLoading(false));
              return;
          }
          setListLoading(true);
        }
      },
      [digitalCampaigns, draftDigitalCampaigns, adAccount]
    );

    const handleMessage = useCallback(
      (message) => {
        if (message.data && message.origin === HOST) {
          if (newAccountOpen) {
            setCreateAdAccountOpen(true);
          } else {
            setChooseAddAccountOpen(true);
          }
          setToken(message.data);
        }
      },
      [newAccountOpen]
    );

    const fetchAdAccount = useCallback(() => {
      getMyAdAccount()
        .then((data) => {
          setAdAccount(data);
          setNewAccountOpen(false);
          setCreateAdAccountOpen(false);
          setChooseAddAccountOpen(false);
        })
        .finally(() => setLoading(false));
    }, []);

    const handleEdit = useCallback((item) => {
      setModalLoading(true);
      getDigitalCampaignDetails(item.id)
        .then((data) => {
          setSelectedCampaign(data);
          goToLastPage();
          openCreateDigitalCampaign(false);
        })
        .catch(() => {})
        .finally(() => {
          setModalLoading(false);
        });
    }, []);

    const handleDraftEdit = useCallback((item) => {
      setModalLoading(true);
      getDigitalDraftCampaignDetails(item.id)
        .then((data) => {
          setSelectedCampaign(data);
          goToLastPage();
          openCreateDigitalCampaign(false, true);
        })
        .catch(() => {})
        .finally(() => {
          setModalLoading(false);
        });
    }, []);

    const handleDelete = useCallback((item) => {
      setModalLoading(true);
      endDigitalCampaign(item.id)
        .then((data) => {
          if (data.success) {
            fetchDigitalCampaignCount();
            setDigitalCampaigns((prev) => prev.filter((c) => c.id !== item.id));
          }
        })
        .finally(() => setModalLoading(false));
    }, []);

    const handleDeleteDraft = useCallback((item) => {
      setModalLoading(true);
      deleteDigitalCampaign(item.id)
        .then((data) => {
          if (data.success) {
            fetchDigitalCampaignCount();
            setDraftDigitalCampaigns((prev) =>
              prev.filter((c) => c.id !== item.id)
            );
          }
        })
        .finally(() => setModalLoading(false));
    }, []);

    const handleDraftSort = useCallback(
      (name, orderType) => {
        // if the type of column is number then sort it in different way
        if (draftDigitalCampaigns.length) {
          // find a column value wich is not null
          let typeofColumn = typeof draftDigitalCampaigns.find(
            (v) => v !== null
          );
          // check if it is number or boolean
          if (typeofColumn === "number" || typeofColumn === "boolean") {
            let ot = orderType === "asc" ? 1 : -1;
            setDraftDigitalCampaigns((prev) => {
              prev.sort((a, b) => (a[name] - b[name]) * ot);
              return [...prev];
            });
            return;
          }
        }
        // for other types localeCompare
        let ot = orderType === "asc" ? 1 : -1;
        setDraftDigitalCampaigns((prev) => {
          prev.sort((a, b) => a[name]?.localeCompare(b[name]) * ot);
          return [...prev];
        });
      },
      [draftDigitalCampaigns]
    );

    const handleClone = useCallback(() => {
      fetchDigitalCampaignCount();
    }, []);

    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1 }}
          className="digital-marketing content"
        >
          <TopNavbar title="Digital Marketing">
            {!!adAccount && (
              <Navbar
                onCreateDigitalCampaign={() => {
                  openCreateDigitalCampaign(true);
                  dispatch(setDefaultKeywords());
                  dispatch(
                    setDefaultPlace(
                      getCityOrZipCodeName(
                        store.getState().marketInsights.findSellersOrBuyers
                      )
                    )
                  );
                }}
                onDisconnect={() => setDisconnectOpen(true)}
                adAccount={adAccount}
              />
            )}
          </TopNavbar>
          {loading ? (
            <Box
              position="relative"
              height="80%"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Loading />
            </Box>
          ) : (
            <>
              {!adAccount ? (
                <>
                  <Empty setNewAccountOpen={setNewAccountOpen} />
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
              ) : (
                <>
                  <DisconnectAdAccount
                    adAccount={adAccount}
                    setAdAccount={setAdAccount}
                    open={disconnectOpen}
                    onClose={() => setDisconnectOpen(false)}
                  />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <CampaignList
                          campaignType="digitalMarketing"
                          type={3}
                          sx={{ height: "auto" }}
                          loading={listLoading}
                          getData={getDigitalCampaignsByType}
                        >
                          <Campaigns
                            setItems={setDigitalCampaigns}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onClone={handleClone}
                            items={digitalCampaigns}
                          />
                        </CampaignList>
                      }
                    />
                    <Route
                      path="/draft"
                      element={
                        <CampaignList
                          campaignType="digitalMarketing"
                          type={1}
                          sx={{ height: "auto" }}
                          onSort={handleDraftSort}
                          loading={listLoading}
                          getData={getDigitalCampaignsByType}
                        >
                          <Drafts
                            onDelete={handleDeleteDraft}
                            onEdit={handleDraftEdit}
                            items={draftDigitalCampaigns}
                          />
                        </CampaignList>
                      }
                    />
                  </Routes>
                </>
              )}
            </>
          )}
        </motion.div>
      </>
    );
  }
);
