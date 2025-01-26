import { Add, Close } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Info, SelectedKeyword } from "../../../../../../components";
import { Input } from "../../../../../../components/Form";

export function SelectedKeywordManager({
  selectedKeywords,
  setKeywords,
  setWebsiteKeywords,
  setSelectedKeywords,
}) {
  const [inputOpen, setInputOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const removeKeyword = useCallback(
    (item) => {
      if (!item.userDefined) {
        if (item.isWebsiteKeyword) {
          setWebsiteKeywords((prev) => [...prev, item]);
        } else {
          setKeywords((prev) => [...prev, item]);
        }
      }
      setSelectedKeywords((prev) =>
        prev.filter((keyword) => keyword.resourceName !== item.resourceName)
      );
    },
    [selectedKeywords]
  );

  const addKeywordIfTyped = useCallback(
    (e) => {
      e.preventDefault();
      if (inputOpen) {
        setInputOpen(false);
        if (keyword) {
          setKeyword("");
          setSelectedKeywords((prev) => [
            ...prev,
            {
              resourceName: Date.now(),
              displayName: keyword,
              userDefined: true,
            },
          ]);
        }
      } else {
        setInputOpen(true);
      }
    },
    [inputOpen, keyword]
  );
  return (
    <>
      {!!selectedKeywords.length && (
        <Box mb={2} display="flex">
          <Typography variant="body2" fontStyle="italic" fontWeight="500">
            My keyword themes
          </Typography>
          <Info
            style={{ marginLeft: 8 }}
            defaultPosition="right"
            value="Keywords are words or phrases that are used to match your ads with the terms people are searching for"
          />
        </Box>
      )}
      {selectedKeywords.map((keyword) => (
        <SelectedKeyword
          key={keyword.resourceName}
          data={keyword}
          onClick={removeKeyword}
        />
      ))}
      <form onSubmit={addKeywordIfTyped}>
        {inputOpen && (
          <Input
            value={keyword}
            onBlur={addKeywordIfTyped}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{
              "& fieldset": {
                borderRadius: "15px",
                marginRight: 1,
              },
            }}
            style={{ borderRadius: "50%" }}
            inputStyle={{
              padding: 3,
              paddingLeft: 10,
              fontSize: "0.813rem",
              height: 26,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="toggle input visibility"
                    onClick={() => setInputOpen(false)}
                    sx={{ fontSize: "1rem" }}
                    edge="end"
                  >
                    <Close fontSize="inherit" htmlColor="#BEB082" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        <Typography
          style={{ cursor: "pointer" }}
          onClick={addKeywordIfTyped}
          fontSize="0.813rem"
          color="#BEB082"
          variant="body1"
          mb={2}
          mt={1}
        >
          + New keyword theme
        </Typography>
      </form>
    </>
  );
}
