import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { PostcardSize } from "./components";

export function PostcardSizing({
  setPrintProductId,
  printProducts,
  productId,
}) {
  const handleChange = useCallback((e) => {
    setPrintProductId(+e.target.value);
  }, []);

  const defaultValue = useMemo(
    () => (productId ? productId : JSON.stringify(printProducts[0]?.id)),
    [printProducts]
  );

  if (printProducts.length < 1) {
    return null;
  }
  return (
    <RadioGroup
      onChange={handleChange}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 40,
      }}
      sx={{
        flexDirection: { md: "row", sm: "column", xs: "column" },
      }}
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue={defaultValue}
      name="radio-buttons-group"
    >
      {printProducts && printProducts.length > 2 && (
        <>
          <PostcardSize infoPosition="right" printProduct={printProducts[0]} />
          <PostcardSize printProduct={printProducts[1]} />
          <PostcardSize printProduct={printProducts[2]} />
        </>
      )}
    </RadioGroup>
  );
}
