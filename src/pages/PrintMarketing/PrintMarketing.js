import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import "./PrintMarketing.css";
import { TopNavbar } from "../../layouts/components";
import { Navbar, CampaignEmpty } from "./components";
import { Campaigns, Drafts, Tests } from "./nestedPages";
import {
  cancelPrintCampaign,
  deletePrintCampaign,
  getPrintCampaignDetails,
  getPrintCampaigns,
} from "../../services";
import { Alert, CampaignList } from "../../shared/components";
import { Route, Routes } from "react-router";
import { withCreatePrintCampaign } from "../../shared/higherOrderComponents";
import { useSelector } from "react-redux";

export const PrintMarketing = withCreatePrintCampaign(
  ({
    setRecipientsUploaded,
    goToLastPage,
    setPrintModalLoading: setModalLoading,
    setCreatePrintCampaignOpen: setOpen,
    setSelectedCampaign,
    fetchPrintCampaignCount,
    modalLoading,
  }) => {
    const [printCampaigns, setPrintCampaigns] = useState([]);
    const [testPrintCampaigns, setTestPrintCampaigns] = useState([]);
    const [draftPrintCampaigns, setDraftPrintCampaigns] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [error, setError] = useState(null);

    const isEmpty = useSelector((state) => {
      return state.printMarketing.isEmpty;
    });

    const getPrintCampaignsByType = useCallback(
      (typeId, period, statusId, orderColumn, orderType) => {
        setListLoading(true);

        getPrintCampaigns({
          period,
          statusId,
          typeId,
          orderColumn,
          orderType,
        })
          .then((data) => {
            switch (typeId) {
              case 3:
                setPrintCampaigns(data);
                return;
              case 2:
                setTestPrintCampaigns(data);
                return;
              case 1:
                setDraftPrintCampaigns(data);
                return;
            }
          })
          .finally(() => setListLoading(false));
      },
      [printCampaigns, testPrintCampaigns, draftPrintCampaigns]
    );

    const handleCreatePrintCampaign = useCallback(() => {
      setOpen(true);
    }, []);

    const handleEdit = useCallback((item, finalize = false) => {
      setModalLoading(true);
      getPrintCampaignDetails(item.id)
        .then((data) => {
          data.id = item.id;
          data.campaignName = data.name;
          data.finalize = finalize;
          data.isTest = finalize ? false : data.isTest;
          setSelectedCampaign(data);
          goToLastPage();
          setOpen(true);
          setRecipientsUploaded(true);
        })
        .catch(() => {})
        .finally(() => {
          setModalLoading(false);
        });
    }, []);

    const handleDelete = useCallback(
      (item) => {
        setModalLoading(true);
        deletePrintCampaign(item.id)
          .then((data) => {
            if (data.success) {
              fetchPrintCampaignCount();
              setDraftPrintCampaigns((prev) =>
                prev.filter((c) => c.id !== item.id)
              );
            } else {
              setError(data.errorMessage);
            }
          })
          .catch(() => setError("Failed to delete the campaign"))
          .finally(() => setModalLoading(false));
      },
      [setTestPrintCampaigns, setDraftPrintCampaigns]
    );

    const handleCancel = useCallback((item) => {
      setModalLoading(true);
      cancelPrintCampaign(item.id)
        .then((data) => {
          if (data.success) {
            fetchPrintCampaignCount();
            setTestPrintCampaigns((prev) =>
              prev.map((c) => {
                if (c.id === item.id) {
                  c.status = "Canceled";
                }
                return c;
              })
            );
            setPrintCampaigns((prev) =>
              prev.map((c) => {
                if (c.id === item.id) {
                  c.status = "Canceled";
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

    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1 }}
          className="print-marketing content"
          style={{ position: "relative" }}
        >
          <Alert message={error} onAction={() => setError(null)} />
          <TopNavbar title="Print Marketing">
            {isEmpty ? (
              ""
            ) : (
              <Navbar handleCreatePrintCampaign={handleCreatePrintCampaign} />
            )}
          </TopNavbar>
          {isEmpty ? (
            <CampaignEmpty
              handleCreatePrintCampaign={handleCreatePrintCampaign}
            />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <CampaignList
                    type={3}
                    loading={listLoading && !modalLoading}
                    getData={getPrintCampaignsByType}
                    handleCreatePrintCampaign={handleCreatePrintCampaign}
                    items={printCampaigns}
                  >
                    <Campaigns
                      onCancel={handleCancel}
                      onEdit={handleEdit}
                      items={printCampaigns}
                    />
                  </CampaignList>
                }
              />
              <Route
                path="/test"
                element={
                  <CampaignList
                    type={2}
                    loading={listLoading && !modalLoading}
                    getData={getPrintCampaignsByType}
                    handleCreatePrintCampaign={handleCreatePrintCampaign}
                    items={testPrintCampaigns}
                  >
                    <Tests
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      items={testPrintCampaigns}
                    />
                  </CampaignList>
                }
              />
              <Route
                path="/draft"
                element={
                  <CampaignList
                    type={1}
                    loading={listLoading && !modalLoading}
                    getData={getPrintCampaignsByType}
                    handleCreatePrintCampaign={handleCreatePrintCampaign}
                    items={draftPrintCampaigns}
                  >
                    <Drafts
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      items={draftPrintCampaigns}
                    />
                  </CampaignList>
                }
              />
            </Routes>
          )}
        </motion.div>
      </>
    );
  }
);
