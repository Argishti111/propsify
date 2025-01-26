import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  Table,
  TBody,
  THead,
  CampaignTh as Th,
  DeleteModal,
} from "../../../../shared/components";
import { SortIcon } from "../../../../shared/static/icons";
import { Draft } from "./components";

export function Drafts({ items = [], onDelete, onEdit }) {
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = useCallback(() => {
    onDelete(itemToDelete);
    setItemToDelete(null);
  }, [onDelete, itemToDelete]);

  const closeDeleteDialog = useCallback(() => {
    setItemToDelete(null);
  }, []);

  return (
    <Grid
      sx={{
        height: "calc(100% - 58px)",
      }}
    >
      <DeleteModal
        open={!!itemToDelete}
        onClose={closeDeleteDialog}
        onDelete={handleDelete}
        modalTitle="Delete draft"
        title="Are you sure you'd like to delete this draft?"
        subtitle="Deleting this draft is permanent and cannot be undone"
      />
      <Table style={{ minWidth: 800 }}>
        <THead style={{ paddingLeft: 16 }} align="left">
          <tr>
            <Th name="platform">
              <span className="flex-row">
                Platform <SortIcon />
              </span>
            </Th>
            <Th name="name">
              <span className="flex-row">
                Name <SortIcon />
              </span>
            </Th>
            <Th name="type">
              <span className="flex-row">
                Type
                <SortIcon style={{ marginTop: -2 }} />
              </span>
            </Th>
            <Th name="created">
              <span className="flex-row">
                Created <SortIcon />
              </span>
            </Th>
            <th style={{ width: 50 }}></th>
          </tr>
        </THead>
        <TBody>
          {items.map((item) => {
            return (
              <Draft
                key={item.id}
                item={item}
                onDelete={setItemToDelete}
                onEdit={onEdit}
              />
            );
          })}
        </TBody>
      </Table>
    </Grid>
  );
}
