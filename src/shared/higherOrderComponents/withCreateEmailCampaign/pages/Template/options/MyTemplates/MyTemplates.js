import React, { useCallback, useEffect, useState } from "react";
import {
  deleteTemplate,
  getMyTemplates,
  getTemplateLibraryData,
} from "../../../../../../../services";
import { DeleteModal } from "../../../../../../components";
import { NewTemplate, TemplateItem } from "../../components";

export function MyTemplates({
  editable = false,
  onSelect,
  selected,
  onEdit,
  onDelete,
  onClone,
}) {
  const [items, setItems] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    getMyTemplates().then((data) => {
      setItems(data);
    });
  }, []);

  const handleDelete = useCallback(() => {
    setItems((prev) => prev.filter((item) => item.id !== selected.id));
    !!onDelete && onDelete(selected);
    deleteTemplate(selected.id);
    handleCloseDelete();
  }, [selected]);

  const handleCloseDelete = useCallback(() => {
    setDeleteOpen(false);
  }, []);

  const handleOpenDelete = useCallback(() => {
    setDeleteOpen(true);
  }, []);

  return (
    <>
      <DeleteModal
        modalTitle="Delete template"
        title="Are you sure you'd like to delete this template?"
        subtitle="Deleting this template is permanent and cannot be undone"
        open={deleteOpen}
        onDelete={handleDelete}
        onClose={handleCloseDelete}
        style={{ zIndex: 10000000000 }}
      />
      <NewTemplate onSelect={onSelect} selected={selected} />
      {items.map((item) => {
        return (
          <TemplateItem
            onEdit={onEdit}
            onDelete={handleOpenDelete}
            onClone={onClone}
            editable={editable}
            key={item.id}
            selected={selected}
            onSelect={onSelect}
            value={item}
          />
        );
      })}
    </>
  );
}
