import { Cancel } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { uploadCompanyLogoForReport } from "../../../../../services";
import { FileUploader } from "../../../../components/Form";

export function CompanyImage({
  logoUrl,
  handleChange,
  uploadError,
  setUploadError,
}) {
  const [imageUploading, setImageUploading] = useState(false);

  const removeImage = useCallback(() => {
    handleChange("logoUrl")({ target: { value: "" } });
  }, []);

  const handleImageUpload = useCallback((files) => {
    setImageUploading(true);
    setUploadError("");

    if (!files.length) {
      return;
    }
    uploadCompanyLogoForReport({
      file: files[0],
    })
      .then((res) => {
        if (res.success) {
          handleChange("logoUrl")({ target: { value: res.data.path } });
        } else {
          setUploadError(res.errorMessage);
        }
      })
      .catch((e) => {
        setUploadError("Failed to upload");
      })
      .finally(() => {
        setImageUploading(false);
      });
  }, []);
  return (
    <Grid
      display="flex"
      justifyContent={{ md: "flex-end", sm: "center", xs: "center" }}
      item
      lg={6}
      md={6}
      sm={8}
      xs={8}
    >
      {!logoUrl ? (
        <FileUploader
          name="LOGO"
          required
          error={uploadError}
          uploading={imageUploading}
          onChange={handleImageUpload}
          accept="image/png,image/jpeg"
          style={uploaderStyle}
        />
      ) : (
        <Box position="relative">
          <img alt="" src={logoUrl + "&x=" + Date.now()} width={240} />
          <Cancel
            onClick={removeImage}
            fontSize="small"
            color="primary"
            sx={{
              ":hover": {
                color: "#192231",
              },
            }}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 8,
              top: 8,
            }}
          />
        </Box>
      )}
    </Grid>
  );
}

const uploaderStyle = {
  height: 168,
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "inline-flex",
  padding: "40px 80px",
};
