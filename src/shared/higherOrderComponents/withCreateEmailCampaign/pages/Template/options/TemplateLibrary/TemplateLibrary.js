import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getTemplateLibraryData } from "../../../../../../../services";
import { NewTemplate, TemplateItem } from "../../components";

export function TemplateLibrary({ onSelect, selected }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    getTemplateLibraryData().then((data) => {
      setItems(
        data.map((item) => {
          item.notMine = true;
          return item;
        })
      );
    });
  }, []);

  return (
    <>
      <NewTemplate onSelect={onSelect} selected={selected} />
      {items.map((item) => {
        return (
          <TemplateItem
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
