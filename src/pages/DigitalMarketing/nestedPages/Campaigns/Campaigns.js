import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  Info,
  Table,
  TBody,
  THead,
  CampaignTh as Th,
  Success,
  ModalLoading,
  DeleteModal,
  ChangeCampaignStatus,
} from "../../../../shared/components";
import { SortIcon } from "../../../../shared/static/icons";
import { CampaignSecondary, CampaignPrimary } from "./components";
import "./Campaigns.css";
import {
  cloneDigitalCampaign,
  changeStatusDigitalCampaign,
} from "../../../../services";
import { useNavigate } from "react-router";
import { useEqualizeTableRows } from "../../../../shared/hooks";

export function Campaigns({ items = [], setItems, onDelete, onEdit, onClone }) {
  const [clonedCampaign, setClonedCampaign] = useState(null);
  const [cloning, setCloning] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);
  const navigate = useNavigate();
  useEqualizeTableRows(items);

  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEdit = useCallback(
    (item) => {
      onEdit(item);
    },
    [items]
  );

  const handleClone = useCallback(
    (item) => {
      setCloning(true);

      cloneDigitalCampaign(item.id)
        .then(() => {
          setClonedCampaign(item);
          setTimeout(() => {
            setClonedCampaign(null);
            onClone();
            navigate("/lead-generation/digital-marketing/draft");
          }, 3000);
        })
        .finally(() => {
          setCloning(false);
        });
    },
    [items]
  );

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
    const paused = selectedCampaign.status === "Paused";
    changeStatusDigitalCampaign(selectedCampaign.id, paused);
    setItems((prev) => {
      return prev.map((c) => {
        if (c.id === selectedCampaign.id) {
          c.status = paused ? "Enabled" : "Paused";
        }
        return c;
      });
    });
  }, [selectedCampaign]);

  const handleDelete = useCallback(() => {
    onDelete(itemToDelete);
    setItemToDelete(null);
  }, [onDelete, itemToDelete]);

  const closeDeleteDialog = useCallback(() => {
    setItemToDelete(null);
  }, []);
  return (
    <>
      <ChangeCampaignStatus
        paused={selectedCampaign.status === "Paused"}
        open={changeStatusOpen}
        onClose={handleChangeStatusClose}
        onChangeStatus={handleChangeStatusCampaign}
      />
      <Grid
        sx={{
          "& *": {
            scrollBehavior: "unset",
          },
        }}
        display="inline-flex"
        height="100%"
        pb={1}
      >
        {cloning && <ModalLoading />}
        <Success
          message={`The ${clonedCampaign?.name} campaign has been cloned`}
          open={!!clonedCampaign}
        />
        <DeleteModal
          open={!!itemToDelete}
          onClose={closeDeleteDialog}
          onDelete={handleDelete}
          modalTitle="Delete campaign"
          title="Are you sure you'd like to delete this campaign?"
          subtitle="Deleting this campaign is permanent and cannot be undone"
        />
        <Grid
          sx={{
            overflowX: "hidden",
            overflowY: "hidden",
          }}
          lg={7}
          item
        >
          <Table style={{ minWidth: 600 }} className="digital-table-primary">
            <THead style={{ paddingLeft: 16, paddingBottom: 17 }} align="left">
              <tr>
                <Th name="id">
                  <span className="flex-row">
                    Platform <SortIcon />
                  </span>
                </Th>
                <Th style={{ width: "auto" }} name="Name">
                  <span className="flex-row">
                    Name <SortIcon />
                  </span>
                </Th>
                <Th name="Type">
                  <span className="flex-row">
                    Type
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th name="Status">
                  <span className="flex-row">
                    Status <SortIcon />
                  </span>
                </Th>
                <th style={{ width: 80 }}></th>
              </tr>
            </THead>
            <TBody
              id="primaryBody"
              style={{
                marginRight: -5,
              }}
            >
              {items.map((item) => {
                return (
                  <CampaignPrimary
                    key={item.id}
                    item={item}
                    onDelete={setItemToDelete}
                    onEdit={handleEdit}
                    onClone={handleClone}
                    onChangeStatus={handleChangeStatusOpen}
                  />
                );
              })}
            </TBody>
          </Table>
        </Grid>
        <Grid sx={{ overflowX: "auto", overflowY: "hidden" }} lg={5} item>
          <Table
            className="digital-table-secondary"
            style={{ minWidth: 800, marginRight: -200 }}
          >
            <THead style={{ paddingLeft: 16, paddingBottom: 18 }} align="left">
              <tr>
                <Th name="Impressions">
                  <span className="flex-row">
                    Impressions&nbsp;
                    <Info
                      contentStyle={{ right: "-100%" }}
                      sx={{ marginTop: 0.3 }}
                      fontSize="16"
                      value="Count of how often your ad has appeared on a search results page or website on the Google Network"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th name="Clicks">
                  <span className="flex-row">
                    Clicks&nbsp;
                    <Info
                      contentStyle={{ right: "-100%" }}
                      sx={{ marginTop: 0.3 }}
                      fontSize="16"
                      value="The number of clicks"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th name="CTR">
                  <span className="flex-row">
                    CTR&nbsp;
                    <Info
                      contentStyle={{ right: "-100%" }}
                      sx={{ marginTop: 0.3 }}
                      fontSize="16"
                      value="The number of clicks your ad receives (Clicks) divided by the number of times your ad is shown (Impressions)"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th name="Average CPC">
                  <span className="flex-row">
                    Average CPC&nbsp;
                    <Info
                      contentStyle={{ right: "-100%" }}
                      sx={{ marginTop: 0.3 }}
                      fontSize="16"
                      value="The total cost of all clicks divided by the total number of clicks received"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
                <Th name="Cost">
                  <span className="flex-row">
                    Cost&nbsp;
                    <Info
                      contentStyle={{ right: "-100%" }}
                      sx={{ marginTop: 0.3 }}
                      fontSize="16"
                      value="The sum of your cost-per-click (CPC) and cost-per-thousand impressions (CPM) costs during this period"
                    />
                    <SortIcon style={{ marginTop: -2 }} />
                  </span>
                </Th>
              </tr>
            </THead>
            <TBody id="targetBody" style={{ overflowX: "hidden" }}>
              {items.map((item) => {
                return <CampaignSecondary key={item.id} item={item} />;
              })}
            </TBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}
