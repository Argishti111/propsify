import { Box, FormControlLabel, Radio, Typography } from "@mui/material";
import React from "react";
import { Info } from "../../../../../../../../components";
import "./PostcardSize.css";

export function PostcardSize({ printProduct, style, infoPosition }) {
  return (
    <>
      <Box style={style}>
        <Box display="flex" justifyContent="space-between">
          <FormControlLabel
            style={{ paddingRight: 85 }}
            value={printProduct.id}
            control={
              <Radio
                sx={{
                  color: "#beb082",
                }}
              />
            }
            label={printProduct.name}
          />
          <Info
            defaultPosition={infoPosition}
            value={printProduct.description}
            fontSize="medium"
            containerClassName="postcard-sm-info"
          />
        </Box>
        <Typography variant="body2" fontStyle="italic" marginLeft={4}>
          {printProduct.price}¢ per postcard
        </Typography>
        <Box
          marginTop={5}
          display={{ md: "block", sm: "none", xs: "none" }}
          position="relative"
          style={{
            height: printProduct.width * 30,
            width: printProduct.height * 30,
            background: "#FEFAF6",
            border: "1px solid #D8CFB4",
          }}
        >
          <Typography position="absolute" sx={{ left: -20, top: "40%" }}>
            {printProduct.width}"
          </Typography>
          <Typography position="absolute" sx={{ top: -24, left: "46%" }}>
            {printProduct.height}"
          </Typography>
          <Info
            defaultPosition={infoPosition}
            value={printProduct.description}
            style={{ float: "right", margin: 10 }}
          />
        </Box>
      </Box>
    </>
  );
}
