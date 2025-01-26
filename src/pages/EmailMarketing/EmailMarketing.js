import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./EmailMarketing.css";
import { TopNavbar } from "../../layouts/components";
import { EmailCampaignEmpty, Navbar, TemplateManager } from "./components";
import { withCreateEmailCampaign } from "../../shared/higherOrderComponents";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import {
  CampaignList,
  EmailAddressManager,
  ErrorMessage,
  ModalLoading,
  Pagination,
} from "../../shared/components";
import { Campaigns, Drafts } from "./nestedPages";
import {
  cancelEmailCampaign,
  deleteEmailCampaign,
  emailSendingIsBlockedCheck,
  getEmailCampaignDetails,
  getEmailCampaigns,
  getEmailDraftCampaigns,
} from "../../services";
import { useState } from "react";
import { useCallback } from "react";
import STATUS from "../../shared/static/emailCampaignStatuses";

const rowCount = process.env.REACT_APP_ROW_COUNT;

export const EmailMarketingContext = React.createContext();

export const EmailMarketing = withCreateEmailCampaign(
  ({ openCreateEmailCampaign, setCampaign, fetchEmailCampaignCount }) => {
    const { isEmpty } = useSelector((state) => {
      return state.emailMarketing;
    });
    const [error, setError] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [emailCampaigns, setEmailCampaigns] = useState([]);
    const [pagedEmailCampaigns, setPagedEmailCampaigns] = useState([]);
    const [emailCampaignsPage, setEmailCampaignsPage] = useState(1);
    const [emailCampaignsPageCount, setEmailCampaignsPageCount] = useState(0);
    const [emailDraftCampaigns, setEmailDraftCampaigns] = useState([]);
    const [pagedEmailDraftCampaigns, setPagedEmailDraftCampaigns] = useState(
      []
    );
    const [emailDraftCampaignsPage, setEmailDraftCampaignsPage] = useState(1);
    const [emailDraftCampaignsPageCount, setEmailDraftCampaignsPageCount] =
      useState(0);
    const [listLoading, setListLoading] = useState(false);
    const [paused, setPaused] = useState("");

    useEffect(() => {
      checkIfEmailSendingIsBlocked();
    }, []);

    const checkIfEmailSendingIsBlocked = useCallback(() => {
      emailSendingIsBlockedCheck().then((res) => setPaused(res));
    }, []);

    const getEmailCampaignsByType = useCallback(
      (typeId, period, statusId, orderColumn, orderType, page) => {
        const filters = {
          typeId,
          period,
          statusId,
          orderColumn,
          orderType,
        };
        setListLoading(true);

        const start = (page - 1) * rowCount;
        const end = start + +rowCount;
        switch (typeId) {
          case 3:
            getEmailCampaigns(filters)
              .then((data) => {
                setEmailCampaigns(data);
                setPagedEmailCampaigns(data.slice(start, end));
                setEmailCampaignsPageCount(Math.ceil(data.length / rowCount));
              })
              .finally(() => setListLoading(false));
            return;
          case 1:
            getEmailDraftCampaigns(filters)
              .then((data) => {
                setEmailDraftCampaigns(data);
                setPagedEmailDraftCampaigns(data.slice(start, end));
                setEmailDraftCampaignsPageCount(
                  Math.ceil(data.length / rowCount)
                );
              })
              .finally(() => setListLoading(false));
            return;
        }
      },
      [emailCampaigns, emailDraftCampaigns]
    );

    const handleEdit = useCallback((campaign, isDraft = false) => {
      getEmailCampaignDetails(campaign.id).then((data) => {
        setCampaign(data);
        openCreateEmailCampaign(false, isDraft);
      });
    }, []);

    const handleDeleteDraft = useCallback(
      (item) => {
        setModalLoading(true);

        deleteEmailCampaign(item.id)
          .then((data) => {
            if (data.success) {
              fetchEmailCampaignCount();
              if (pagedEmailDraftCampaigns.length === 1) {
                setEmailDraftCampaignsPageCount((prev) => prev - 1);
                if (emailCampaignsPage !== 1) {
                  handleChangeEmailCampaignsPage(null, emailCampaignsPage - 1);
                }
              }
              setEmailDraftCampaigns((prev) =>
                prev.filter((c) => c.id !== item.id)
              );
              setPagedEmailDraftCampaigns((prev) =>
                prev.filter((c) => c.id !== item.id)
              );
            } else {
              setError(data.errorMessage);
            }
          })
          .catch(() => setError("Failed to delete the draft"))
          .finally(() => {
            setModalLoading(false);
            setTimeout(() => setError(""), 3000);
          });
      },
      [
        emailDraftCampaigns,
        pagedEmailDraftCampaigns,
        emailCampaignsPage,
        setEmailDraftCampaignsPageCount,
        emailDraftCampaignsPageCount,
      ]
    );

    const handleCancel = useCallback((item) => {
      setModalLoading(true);
      cancelEmailCampaign(item.id)
        .then((data) => {
          if (data.success) {
            setEmailCampaigns((prev) =>
              prev.map((c) => {
                if (c.id === item.id) {
                  c.status = "Canceled";
                  c.statusId = STATUS.CANCELED;
                }
                return c;
              })
            );
          } else {
            setError(data.errorMessage);
          }
        })
        .catch(() => setError("Failed to cancel the campaign"))
        .finally(() => setModalLoading(false));
    }, []);

    const handleClone = useCallback(() => {
      fetchEmailCampaignCount();
    }, []);

    const handleStatusChange = useCallback((selectedCampaign, paused) => {
      setEmailCampaigns((prev) => {
        return prev.map((c) => {
          if (c.id === selectedCampaign) {
            c.status = paused ? "Sending" : "Paused";
            c.statusId = paused ? STATUS.SENDING : STATUS.PAUSED;
          }
          return c;
        });
      });
    }, []);
    const handleChangeEmailCampaignsPage = useCallback(
      (event, page) => {
        setEmailCampaignsPage(page);
        setPagedEmailCampaigns(
          emailCampaigns.slice((page - 1) * rowCount, page * rowCount)
        );
      },
      [emailCampaigns]
    );
    const handleChangeEmailDraftCampaignsPage = useCallback(
      (event, page) => {
        setEmailDraftCampaignsPage(page);
        setPagedEmailDraftCampaigns(
          emailDraftCampaigns.slice((page - 1) * rowCount, page * rowCount)
        );
      },
      [emailDraftCampaigns]
    );

    return (
      <EmailMarketingContext.Provider value={{ paused }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1 }}
          className="email-marketing content"
        >
          {modalLoading && <ModalLoading />}
          <ErrorMessage
            open={!!error}
            onClose={() => setError("")}
            message={error}
          />
          <EmailAddressManager />
          <TemplateManager />
          <TopNavbar title="Email Marketing">
            {!isEmpty && (
              <Navbar onCreateEmailCampaign={openCreateEmailCampaign} />
            )}
          </TopNavbar>
          {isEmpty ? (
            <EmailCampaignEmpty
              onCreateEmailCampaign={openCreateEmailCampaign}
            />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <CampaignList
                    campaignType="emailMarketing"
                    type={3}
                    sx={{ height: "auto" }}
                    loading={listLoading}
                    getData={getEmailCampaignsByType}
                    page={emailCampaignsPage}
                  >
                    <Campaigns
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onClone={handleClone}
                      onStatusChange={handleStatusChange}
                      items={pagedEmailCampaigns}
                      onLoading={setModalLoading}
                    />
                    <Pagination
                      page={emailCampaignsPage}
                      onChange={handleChangeEmailCampaignsPage}
                      count={emailCampaignsPageCount}
                    />
                  </CampaignList>
                }
              />
              <Route
                path="/draft"
                element={
                  <CampaignList
                    campaignType="emailMarketing"
                    type={1}
                    // onSort={handleDraftSort}
                    page={emailDraftCampaignsPage}
                    loading={listLoading}
                    getData={getEmailCampaignsByType}
                  >
                    <Drafts
                      onDelete={handleDeleteDraft}
                      onEdit={handleEdit}
                      items={pagedEmailDraftCampaigns}
                    />
                    <Pagination
                      page={emailDraftCampaignsPage}
                      onChange={handleChangeEmailDraftCampaignsPage}
                      count={emailDraftCampaignsPageCount}
                    />
                  </CampaignList>
                }
              />
            </Routes>
          )}
        </motion.div>
      </EmailMarketingContext.Provider>
    );
  }
);
