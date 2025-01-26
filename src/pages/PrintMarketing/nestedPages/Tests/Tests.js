import React, { useCallback, useState } from "react";
import {
  Info,
  Table,
  TBody,
  THead,
  CampaignTh as Th,
  DeleteModal,
} from "../../../../shared/components";
import { useTimer } from "../../../../shared/hooks";
import { SortIcon } from "../../../../shared/static/icons";
import { Test } from "./components";

export function Tests({ items = [], onEdit, onCancel }) {
  const [itemToCancel, setItemToCancel] = useState(null);

  const timer = useTimer(items);
  const handleEdit = useCallback(
    (item) => {
      return () => {
        onEdit(item, false);
      };
    },
    [items]
  );
  const handleFinlize = useCallback(
    (item) => {
      return () => {
        onEdit(item, true);
      };
    },
    [items]
  );

  const handleClone = useCallback((item) => {
    onEdit(item, false);
  }, []);

  const handleCancel = useCallback(() => {
    onCancel(itemToCancel);
    closeCancelDialog();
  }, [itemToCancel]);

  const closeCancelDialog = useCallback(() => {
    setItemToCancel(null);
  }, []);

  return (
    <>
      <DeleteModal
        open={!!itemToCancel}
        onClose={closeCancelDialog}
        onDelete={handleCancel}
        modalTitle="Cancel campaign"
        title="Are you sure you'd like to cancel this campaign?"
        subtitle="Canceling this campaign is permanent and cannot be undone"
        firstAction="CLOSE"
        secondAction="CANCEL"
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
            <Th name="status">
              <span className="flex-row">
                Status <SortIcon />
              </span>
            </Th>

            <Th name="createdDate">
              <span className="flex-row">
                Date created <SortIcon />
              </span>
            </Th>
            <Th name="deliveryWeek">
              <span className="flex-row">
                Delivery week&nbsp;
                <Info
                  sx={{ marginTop: 0.3 }}
                  contentStyle={{ right: "-100%" }}
                  fontSize="16"
                  value="Allow approximately seven (7) business days from the scheduled mailing date for delivery"
                />
                <SortIcon style={{ marginTop: -2 }} />
              </span>
            </Th>

            <th></th>
            <th style={{ width: 50 }}></th>
          </tr>
        </THead>
        <TBody>
          {items.map((item) => {
            return (
              <Test
                key={item.id}
                timer={timer}
                onEdit={handleEdit(item)}
                onFinlize={handleFinlize(item)}
                onClone={handleClone}
                onCancel={() => setItemToCancel(item)}
                item={item}
              />
            );
          })}
        </TBody>
      </Table>
    </>
  );
}
