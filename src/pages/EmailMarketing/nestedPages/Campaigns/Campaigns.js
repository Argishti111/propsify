import { Box, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {
  cloneEmailCampaign,
  downloadOptOutList,
  pauseEmailCampaign,
  resumeEmailCampaign,
} from "../../../../services";
import {
  Info,
  Table,
  TBody,
  THead,
  CampaignTh as Th,
  DeleteModal,
  Success,
  ChangeCampaignStatus,
} from "../../../../shared/components";
import { useEqualizeTableRows } from "../../../../shared/hooks";
import { SortIcon } from "../../../../shared/static/icons";
import { Campaign, CampaignActions } from "./components";
import "./Campaigns.css";

import STATUS from "../../../../shared/static/emailCampaignStatuses.js";

export function Campaigns({
  items = [],
  onEdit,
  onCancel,
  onLoading,
  onClone,
  onStatusChange,
}) {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState(false);
  const [itemToCancel, setItemToCancel] = useState(null);
  const [clonedCampaign, setClonedCampaign] = useState(null);
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);

  useEqualizeTableRows(items);

  const handleEdit = useCallback(
    (item) => {
      return (e) => {
        e.preventDefault();
        onEdit(item, true);
      };
    },
    [items]
  );

  const handleClone = useCallback(
    (item) => () => {
      onLoading(true);
      setClonedCampaign(item);
      cloneEmailCampaign(item.id)
        .then(() => {
          setTimeout(() => {
            navigate("/lead-generation/email-marketing/draft");
            setClonedCampaign(null);
            onClone(item);
          }, 3000);
        })
        .finally(() => {
          onLoading(false);
        });
    },
    [items]
  );

  const handleCancel = useCallback(() => {
    onCancel(itemToCancel);
    closeCancelDialog();
  }, [itemToCancel]);

  const closeCancelDialog = useCallback(() => {
    setItemToCancel(null);
  }, []);

  const handleChangeStatusOpen = useCallback((item) => {
    setChangeStatusOpen(true);
    setSelectedCampaign(item);
  }, []);

  const handleChangeStatusClose = useCallback(() => {
    setChangeStatusOpen(false);
    setSelectedCampaign({});
  }, []);

  const handleChangeStatusCampaign = useCallback(() => {
    handleChangeStatusClose();
    const paused = selectedCampaign.statusId === STATUS.PAUSED;
    if (paused) {
      resumeEmailCampaign(selectedCampaign.id);
    } else {
      pauseEmailCampaign(selectedCampaign.id);
    }
    onStatusChange(selectedCampaign.id, paused);
  }, [selectedCampaign]);

  const handleOptOutListDownload = useCallback(
    (item) => () => {
      onLoading(true);
      downloadOptOutList(item.id).finally(() => onLoading(false));
    },
    []
  );

  return (
    <Box display="flex">
      <ChangeCampaignStatus
        paused={selectedCampaign.statusId === STATUS.PAUSED}
        open={changeStatusOpen}
        onClose={handleChangeStatusClose}
        onChangeStatus={handleChangeStatusCampaign}
        pausingBody="The campaign can be restarted at any time in the Email Marketing dashboard"
        enablingBody="The campaign can be paused at any time in the Email Marketing dashboard"
      />
      <DeleteModal
        open={!!itemToCancel}
        onClose={closeCancelDialog}
        onDelete={handleCancel}
        firstAction="CLOSE"
        secondAction="CANCEL"
        modalTitle="Cancel campaign"
        title="Are you sure you'd like to cancel this campaign?"
        subtitle="Canceling this campaign is permanent and cannot be undone"
      />
      <Success
        message={`The ${clonedCampaign?.name} campaign has been cloned`}
        open={!!clonedCampaign}
      />
      <Grid
        sx={{
          overflowX: "auto",
          "& *": {
            scrollBehavior: "unset",
          },
          overflowY: "hidden",
        }}
        display="flex"
        height="auto"
        pb={1}
      >
        <Grid
          sx={{ overflowX: "auto", overflowY: "hidden" }}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          item
        >
          <Table style={{ minWidth: 1720 }}>
            <THead align="left">
              <tr>
                <Th style={{ paddingLeft: 30, width: 160 }} name="name">
                  <span className="flex-row">
                    Name <SortIcon />
                  </span>
                </Th>
                <Th style={{ width: 160 }} name="start">
                  <span className="flex-row">
                    Start <SortIcon />
                  </span>
                </Th>
                <Th style={{ width: 90 }} name="status">
                  <span className="flex-row">
                    Status <SortIcon />
                  </span>
                </Th>
                <th style={{ width: 60 }}></th>

                <Th style={{ width: 124 }} name="recipients">
                  <span className="flex-row">
                    Recipients <SortIcon />
                  </span>
                </Th>
                <Th style={{ width: 94 }} name="opens">
                  <span className="flex-row">
                    Opens&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Total number of opens"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 120 }} name="openRate">
                  <span className="flex-row">
                    Open&nbsp;Rate&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Opens / Deliveries"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 80 }} name="clicks">
                  <span className="flex-row">
                    Clicks&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Total number of link clicks"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 80 }} name="ctr">
                  <span className="flex-row">
                    CTR&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Clicks / Opens"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 96 }} name="bounces">
                  <span className="flex-row">
                    Bounces&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Total number of emails bounced"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 120 }} name="bounceRate">
                  <span className="flex-row">
                    Bounce&nbsp;Rate&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Bounces / Sends"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                {/* dskdfjksfjl */}

                <Th style={{ width: 116 }} name="complaint">
                  <span className="flex-row">
                    Complaints&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Total number of emails complainted"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 144 }} name="complaintRate">
                  <span className="flex-row">
                    Complaint&nbsp;Rate&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Complaints / Sends"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                {/* dsfhdfjkh */}
                <Th style={{ width: 148 }} name="unsubscribes">
                  <span className="flex-row">
                    Unsubscribes&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Total number of unsubscribes"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 160 }} name="unsubscribeRate">
                  <span className="flex-row">
                    Unsubscribe&nbsp;Rate&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Unsubscribes / Deliveries"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 86 }} name="sends">
                  <span className="flex-row">
                    Sends&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Total number of emails sent"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 100 }} name="delivers">
                  <span className="flex-row">
                    Delivers&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Total number of emails delivered"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th style={{ width: 116 }} name="deliveryRate">
                  <span className="flex-row">
                    Delivery&nbsp;Rate&nbsp;
                    <Info
                      sx={{ marginTop: 0.3 }}
                      contentStyle={{ right: "-100%" }}
                      fontSize="16"
                      value="Delivers / Sends"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
              </tr>
            </THead>
            <TBody id="primaryBody" style={{ height: "fit-content" }}>
              {items.map((item) => {
                return (
                  <Campaign
                    key={item.id}
                    item={item}
                    onStatusChange={handleChangeStatusOpen}
                  />
                );
              })}
            </TBody>
          </Table>
        </Grid>

        <Grid item display="inline">
          <Table style={{ width: 60 }}>
            <THead className="height-51-50" align="left">
              <tr>
                <Th style={{ width: 24 }}></Th>
              </tr>
            </THead>
            <TBody id="targetBody">
              {items.map((item) => {
                return (
                  <CampaignActions
                    item={item}
                    key={item.id}
                    onEdit={handleEdit(item)}
                    onCancel={() => setItemToCancel(item)}
                    onClone={handleClone(item)}
                    onOptOutListDownload={handleOptOutListDownload(item)}
                  />
                );
              })}
            </TBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}
