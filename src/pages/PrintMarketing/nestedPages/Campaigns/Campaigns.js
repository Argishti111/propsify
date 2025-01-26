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
import { OrderTracking } from "../../components/OrderTracking";
import { Campaign } from "./components";

export function Campaigns({ items = [], onEdit, onCancel }) {
  const [selectedItem, setSelectedItem] = useState({});
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [itemToCancel, setItemToDelete] = useState(null);

  const timer = useTimer(items);

  const handleEdit = useCallback(
    (item) => {
      return (e) => {
        e.preventDefault();
        onEdit(item, true);
      };
    },
    [items]
  );

  const handleClone = useCallback((item) => {
    onEdit(item, false);
  }, []);

  const handleCloseTracking = useCallback(() => {
    setTrackingOpen(false);
    setSelectedItem({});
  }, []);

  const closeCancelDialog = useCallback(() => {
    setItemToDelete(null);
  }, []);

  const handleCancel = useCallback(() => {
    onCancel(itemToCancel);
    closeCancelDialog();
  }, [onCancel, itemToCancel]);

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
        <OrderTracking
          onClose={handleCloseTracking}
          selectedItem={selectedItem}
          open={trackingOpen}
        />
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
            <Th name="recipients">
              <span className="flex-row">
                Recipients <SortIcon />
              </span>
            </Th>
            <Th name="cpr">
              <span className="flex-row">
                CPR&nbsp;
                <Info
                  sx={{ marginTop: 0.3 }}
                  contentStyle={{ right: "-100%" }}
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
            <th style={{ width: 50 }}></th>
          </tr>
        </THead>
        <TBody>
          {items.map((item) => {
            return (
              <Campaign
                key={item.id}
                item={item}
                timer={timer}
                onEdit={handleEdit(item)}
                onCancel={() => setItemToDelete(item)}
                onClone={handleClone}
                onStatusClick={() => {
                  setSelectedItem(item);
                  setTrackingOpen(true);
                }}
              />
            );
          })}
        </TBody>
      </Table>
    </>
  );
}
