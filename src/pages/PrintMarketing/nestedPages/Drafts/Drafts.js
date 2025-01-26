import React, { useCallback, useState } from "react";
import {
  Info,
  Table,
  TBody,
  THead,
  CampaignTh as Th,
  DeleteModal,
} from "../../../../shared/components";
import { SortIcon } from "../../../../shared/static/icons";
import { Draft } from "./components";

export function Drafts({ items = [], setItems, onDelete, onEdit }) {
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEdit = useCallback(
    (item) => {
      return () => {
        onEdit(item);
      };
    },
    [items]
  );
  const handleClone = useCallback(
    (item) => {
      let newItemIndex = items.findIndex((i) => i.id === item.id);
      let newItem = { ...item };
      newItem.id = Date.now();

      items.splice(newItemIndex, 0, newItem);
      setItems([...items]);
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
      <Table style={{ minWidth: 930 }}>
        <THead align="left">
          <tr>
            <th style={{ width: 100 }}></th>
            <Th name="name">
              <span className="flex-row">
                Name <SortIcon />
              </span>
            </Th>
            <Th name="recipients">
              <span className="flex-row">
                Recipients <SortIcon />
              </span>
            </Th>
            <Th name="cpr">
              <span className="flex-row">
                CPR&nbsp;
                <Info
                  contentStyle={{ right: "-100%" }}
                  sx={{ marginTop: 0.3 }}
                  fontSize="16"
                  value="Cost per recipient is the cost incurred for each view of the advertisement(s)"
                />
                <SortIcon style={{ marginTop: -2 }} />
              </span>
            </Th>
            <Th name="budget">
              <span className="flex-row">
                Budget <SortIcon />
              </span>
            </Th>
            <Th name="createdDate">
              <span className="flex-row">
                Date created <SortIcon />
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
                onClone={handleClone}
              />
            );
          })}
        </TBody>
      </Table>
    </>
  );
}
