import { Box, Typography } from "@mui/material";
import React from "react";
import { SectionTitle } from "../../../../../../components";

export function PreviewTemplate({ template }) {
  return (
    <Box maxWidth={400}>
      <SectionTitle>
        PREVIEW
        <Typography
          ml={2}
          fontSize="0.875rem"
          borderLeft="1px solid #ECD9CC"
          variant="p"
          p={1}
          px={2}
          fontWeight="400"
        >
          {template?.name}
        </Typography>
      </SectionTitle>
      {!!template ? (
        <Box
          border={!template?.id ? 0 : "1px solid #BEB082"}
          minHeight={577}
          mt={3}
          height="100%"
          width="100%"
        >
          <Typography
            p={3}
            m={!template?.id ? 0 : 2}
            sx={{ display: "block", background: "#F9F4F0", minHeight: 500 }}
            variant="p"
          >
            <p dangerouslySetInnerHTML={{ __html: template.content }}></p>
          </Typography>
        </Box>
      ) : (
        <Box p={4} minHeight={577} />
      )}
    </Box>
  );
}
