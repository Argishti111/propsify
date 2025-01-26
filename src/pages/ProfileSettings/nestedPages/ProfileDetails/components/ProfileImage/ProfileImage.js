import { Box, Typography } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserField } from "../../../../../../redux";
import {
  removeProfilePicture,
  uploadProfilePicture,
} from "../../../../../../services";
import {
  ErrorBox,
  Info,
  TinyButton,
} from "../../../../../../shared/components";
import { FileUploader } from "../../../../../../shared/components/Form";

export function ProfileImage() {
  const inputRef = useRef();
  const { picture, imageUploading, uploadError } = useSelector(
    (state) => state.user
  );
  const setImageUploading = useCallback((v) =>
    dispatch(changeUserField("imageUploading", v))
  );
  const setUploadError = useCallback((v) =>
    dispatch(changeUserField("uploadError", v))
  );

  const dispatch = useDispatch();

  const handleRemove = useCallback(() => {
    removeProfilePicture();
    dispatch(changeUserField("picture", null));
  }, []);

  const handleImageUpload = useCallback((files) => {
    if (!files.length) {
      return;
    }
    setImageUploading(true);
    setUploadError("");

    uploadProfilePicture({
      file: files[0],
    })
      .then((res) => {
        if (res.success) {
          dispatch(changeUserField("picture", res.data.path));
        } else {
          setUploadError(res.errorMessage);
        }
      })
      .catch(() => {
        setUploadError("Failed to upload");
      })
      .finally(() => {
        setImageUploading(false);
      });
  }, []);

  return (
    <>
      <Box
        maxWidth={200}
        width="100%"
        display="flex"
        justifyContent={{
          lg: "space-between",
          md: "space-between",
          sm: "normal",
          xs: "normal",
        }}
        gap={1.5}
        flexDirection="row"
        mb={1.4}
      >
        <Typography
          display="inline"
          variant="subtitle2"
          fontWeight="500"
          fontStyle="italic"
        >
          Your photo
        </Typography>
        <Info contentStyle={{ width: 272, maxWidth: 272 }} value=" ">
          <ul style={{ padding: 16 }}>
            <li>Supported file types: .jpg .png</li>
            <li>Maximum file size: 2MB</li>
            <li>Smallest file dimensions: 500x500px</li>
          </ul>
        </Info>
      </Box>
      <ErrorBox
        title="Upload Error:"
        maxWidth={200}
        width="100%"
        mb={1}
        message={uploadError}
      />
      {!picture ? (
        <FileUploader
          name="PHOTO"
          error={uploadError}
          uploading={imageUploading}
          onChange={handleImageUpload}
          accept="image/png,image/jpeg"
          style={uploaderStyle}
        />
      ) : (
        <Box position="relative">
          <img src={picture + "&x=" + Date.now()} width={200} />
          <input
            hidden
            ref={inputRef}
            onChange={(e) => handleImageUpload(e.target.files)}
            type="file"
            accept="image/png,image/jpeg"
          />
          <Box
            mt={1}
            maxWidth={200}
            display="flex"
            justifyContent="space-between"
          >
            <TinyButton
              onClick={() => {
                inputRef.current.click();
              }}
              color="secondary"
            >
              UPLOAD
            </TinyButton>
            <TinyButton onClick={handleRemove} color="secondary">
              REMOVE
            </TinyButton>
          </Box>
        </Box>
      )}
    </>
  );
}

const uploaderStyle = {
  height: 180,
  width: 200,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "inline-flex",
  padding: "20px 40px",
};
