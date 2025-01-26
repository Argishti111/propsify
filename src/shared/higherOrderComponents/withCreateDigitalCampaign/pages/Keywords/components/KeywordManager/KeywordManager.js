import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { Info, Loading, Keyword } from "../../../../../../components";

export function KeywordManager({
  keywords,
  setKeywords,
  selectedKeywords,
  setSelectedKeywords,
  gettingKeywords,
  children,
  hideTitle = false,
}) {
  const addKeyword = useCallback(
    (item) => {
      setSelectedKeywords((prev) => [...prev, item]);
      setKeywords((prev) =>
        prev.filter((keyword) => keyword.resourceName !== item.resourceName)
      );
    },
    [selectedKeywords]
  );
  return (
    <Box mb={4}>
      <Box>
        {!hideTitle && (
          <Box mb={2} display="flex">
            <Typography variant="body2" fontStyle="italic" fontWeight="500">
              Suggested keyword themes
            </Typography>
            <Info
              style={{ marginLeft: 8 }}
              defaultPosition="bottom"
              value="Keywords are words or phrases that are used to match your ads with the terms people are searching for"
            />
          </Box>
        )}
        {gettingKeywords ? (
          <Box display="flex" justifyContent="center">
            <Loading style={{ position: "static" }} />
          </Box>
        ) : (
          keywords.map((keyword) => (
            <Keyword
              key={keyword.resourceName}
              data={keyword}
              onClick={addKeyword}
            />
          ))
        )}
      </Box>
      {!gettingKeywords && children}
    </Box>
  );
}
