import React from "react";
import { Modal } from "../../../../components";
import { DeleteEmailConfirm, DeleteEmailFailed } from "./components";

export function DeleteEmailModal({
  email,
  canDelete,
  onDelete,
  open,
  onClose,
  onNavigateToDashBoard,
}) {
  return (
    <Modal
      title="Delete sender’s email address"
      titleChildren={<div />}
      style={{ zIndex: 1302 }}
      open={open}
      titleProps={{ maxWidth: 220 }}
      onClose={onClose}
    >
      {canDelete ? (
        <DeleteEmailConfirm
          email={email}
          onDelete={onDelete}
          onCancel={onClose}
        />
      ) : (
        <DeleteEmailFailed
          onCancel={onClose}
          onNavigateToDashBoard={onNavigateToDashBoard}
        />
      )}
    </Modal>
  );
}
