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

  const handleEdit = useCallback(
    (item) => {
      return () => {
        onEdit(item, true);
      };
    },
    [items]
  );

  const handleDelete = useCallback(() => {
    onDelete(itemToDelete);
    setItemToDelete(null);
  }, [onDelete, itemToDelete]);

  const closeDeleteDialog = useCallback(() => {
    setItemToDelete(null);
  }, []);

  return (
    <>
      <DeleteModal
        open={!!itemToDelete}
        onClose={closeDeleteDialog}
        onDelete={handleDelete}
        modalTitle="Delete campaign"
        title="Are you sure you'd like to delete this campaign?"
        subtitle="Deleting this campaign is permanent and cannot be undone"
      />
      <Table style={{ minWidth: 930, height: "auto" }}>
        <THead align="left">
          <tr>
            <Th style={{ paddingLeft: 30 }} name="name">
              <span className="flex-row">
                Name <SortIcon />
              </span>
            </Th>
            <Th name="recipients">
              <span className="flex-row">
                Recipients <SortIcon />
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
                onEdit={handleEdit}
              />
            );
          })}
        </TBody>
      </Table>
    </>
  );
}
