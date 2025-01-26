import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import "./FileUploader.css";

export function FileUploader({
  id = "fileUpolad",
  style,
  onChange = () => {},
  name = "",
  error,
  uploading,
  ...rest
}) {
  const dragEnd = useCallback((e) => {
    e.target.classList.remove(["file-upload-dragover"]);
    e.preventDefault();
  }, []);

  const handleChange = useCallback(
    (e) => {
      if (!uploading) onChange(e.target.files);
      e.target.value = null;
    },
    [uploading]
  );

  return (
    <label
      htmlFor={id}
      style={style}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.target.classList.add("file-upload-dragover");
        e.preventDefault();
      }}
      onDragLeave={dragEnd}
      onDragEnd={dragEnd}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        if (!uploading) {
          onChange(e.dataTransfer.files);
          e.target.classList.remove(["file-upload-dragover"]);
        }
        e.preventDefault();
      }}
      className={`file-upload-container ${
        error ? "file-upload-container-error" : ""
      }`}
    >
      {uploading ? (
        <Typography
          sx={{ pointerEvents: "none" }}
          textAlign="center"
          variant="p"
          fontFamily="MinervaModern-Bold"
        >
          Uploading
        </Typography>
      ) : (
        <Typography
          sx={{ pointerEvents: "none" }}
          textAlign="center"
          fontSize={13}
          variant="p"
          letterSpacing="1.04px"
          fontFamily="MinervaModern-Regular"
          fontWeight="500"
        >
          <span style={{ lineHeight: "1.2rem" }} className="text-underline">
            CLICK HERE
          </span>
          <span className="drag-n-drop-text"> OR DRAG AND DROP</span> TO UPLOAD{" "}
          {name}
        </Typography>
      )}
      <input
        disabled={uploading}
        id={id}
        type="file"
        onChange={handleChange}
        {...rest}
      />
    </label>
  );
}
