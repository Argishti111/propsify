import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setRecipientCount,
  setRecipientTotalCount,
} from "../../../../../redux";
import {
  addPrintCampaign,
  uploadPrintCampaignRecipients,
} from "../../../../../services";
import { ErrorBox, StackPagination } from "../../../../components";
import { FileUploader } from "../../../../components/Form";
import { validateCustomerListFile } from "../../../../validators";
import { FileRequirements, FileTemplates } from "./components";

const errorMessage =
  "We could not upload your file. Please check your internet connection or try later";

export function CustomerListUpload({
  goNext,
  pageCount,
  page,
  selectedCampaign,
  setSelectedCampaign,
}) {
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const handleUploadRecipient = useCallback(
    (file) => {
      // if there is a selected campaign then upload the file by id
      // else create one and upload
      if (selectedCampaign.id) {
        handleUpload(file, selectedCampaign.id);
        return;
      }
      setUploading(true);
      setUploadError("");
      addPrintCampaign()
        .then((res) => {
          if (res.success) {
            res.data.isNew = true;
            selectedCampaign.id = res.data.id;
            setSelectedCampaign(res.data);
            handleUpload(file, res.data.id);
          } else {
            setUploadError(res.errorMessage);
          }
        })
        .catch((_) => {
          setUploadError(errorMessage);
        });
    },
    [selectedCampaign]
  );

  const handleUpload = useCallback(
    (file, id) => {
      setUploadError("");
      setUploading(true);
      uploadPrintCampaignRecipients({ file, id })
        .then((res) => {
          if (res.success) {
            dispatch(setRecipientCount(res.data.count));
            dispatch(setRecipientTotalCount(res.data.count));
            goNext();
          } else {
            setUploadError(res.errorMessage);
          }
        })
        .catch((_) => {
          setUploadError(errorMessage);
        })
        .finally(() => {
          setUploading(false);
        });
    },
    [selectedCampaign]
  );

  const validateAndUpload = useCallback((files) => {
    if (!files.length) {
      return;
    }
    let error = validateCustomerListFile(files[0]);
    if (!error) {
      return handleUploadRecipient(files[0]);
    }
    setUploadError(error);
  }, []);

  return (
    <>
      <Box
        display="flex"
        px={{ md: 11, sm: 1, xs: 1 }}
        flexDirection="column"
        overflow="auto"
        style={{
          minWidth: 300,
          maxWidth: 800,
          marginBottom: -16,
        }}
      >
        <Typography
          textAlign="center"
          variant="h4"
          marginTop={7}
          fontFamily="MinervaModern-Regular"
        >
          UPLOAD YOUR CUSTOMER LIST
        </Typography>

        <Typography
          textAlign="center"
          alignSelf="center"
          fontStyle="italic"
          fontWeight="500"
          variant="h6"
          style={{ maxWidth: 506, marginTop: 23 }}
        >
          Choose any .xlsx , .csv, or .tsv containing your addressed list and
          add it to the box below.
        </Typography>
        <FileTemplates />
        <ErrorBox marginTop={2} title="Upload error:" message={uploadError} />
        <FileUploader
          uploading={uploading}
          onChange={validateAndUpload}
          style={{ marginTop: 50 }}
          accept=".csv, .tsv, .xlsx"
        />
        <Typography textAlign="center" marginTop={2} variant="p">
          Once you upload your custom list, we will validate it.
        </Typography>
        <FileRequirements />
      </Box>

      <StackPagination page={page} pageCount={pageCount} nextDisabled={true} />
    </>
  );
}
