import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { CustomButton, Info } from "../../../../../../components";
import { Requirements } from "./components";
import { downloadPdfProof } from "../../../../../../../services";
export function FileRequirements({ artworkUploaded, selectedCampaign }) {
  const [proof, setProof] = useState("");
  useEffect(() => {
    if (artworkUploaded || selectedCampaign.finalize) {
      downloadPdfProof(selectedCampaign.id).then((data) => {
        setProof(data);
      });
    }
  }, [artworkUploaded, selectedCampaign.finalize]);
  return (
    <>
      {artworkUploaded || selectedCampaign.finalize ? (
        <Box
          marginTop={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex">
            <Typography
              marginRight={2}
              fontStyle="italic"
              fontWeight="500"
              variant="p"
            >
              File requirements
            </Typography>
            <Info
              defaultPosition="bottomStart"
              contentStyle={{ minWidth: 284 }}
              value=" "
            >
              <Requirements
                id={selectedCampaign.id}
                height={selectedCampaign.height}
                width={selectedCampaign.width}
              />
            </Info>
          </Box>
          {!!proof && (
            <CustomButton>
              <a
                style={{ textDecoration: "none" }}
                download="proof"
                target="_blank"
                href={proof}
              >
                VIEW PDF PROOF
              </a>
            </CustomButton>
          )}
        </Box>
      ) : null}
      <div
        className="file-requirements-container"
        style={artworkUploaded || selectedCampaign.finalize ? hidden : visible}
      >
        <Typography
          fontSize={15}
          variant="p"
          fontWeight="500"
          fontStyle="italic"
          color="#beb082"
          letterSpacing={0.9}
        >
          File requirements
        </Typography>
        <Requirements
          id={selectedCampaign.id}
          height={selectedCampaign.height}
          width={selectedCampaign.width}
        />
      </div>
    </>
  );
}

const hidden = {
  display: "block",
  height: 0,
  visibility: "hidden",
  lineHeight: 0,
  overflow: "hidden",
  margin: 0,
  padding: 0,
  opacity: 0,
};
const visible = {
  height: 300,
  visibility: "visible",
};
