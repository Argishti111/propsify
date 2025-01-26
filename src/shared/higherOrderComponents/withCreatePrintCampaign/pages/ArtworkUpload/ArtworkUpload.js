import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  uploadFrontArtwork,
  uploadBackArtwork,
  updatePrintCampaignSchedule,
  removeArtwork,
} from "../../../../../services";
import {
  ErrorBox,
  StackPagination,
  TitleWithEdit,
} from "../../../../components";
import { DatePicker, FileUploader } from "../../../../components/Form";
import { FileRequirements, TestPrint } from "./components";
import store from "../../../../../redux";
import { validateDate } from "../../../../validators";
import { Cancel as CancelIcon } from "@mui/icons-material";
import PrintMarketingEventRecorder from "../../../../analytics/google/PrintMarketingEventRecorder";

export function ArtworkUpload({
  goNext,
  pageCount,
  page,
  goBack,
  selectedCampaign,
  changeField,
  setModalLoading,
}) {
  const [testChecked, setTestChecked] = useState(selectedCampaign.isTest);
  const [deliveryDate, setDeliveryDate] = useState(
    selectedCampaign.schedule ? selectedCampaign.schedule : null
  );
  const [front, setFront] = useState(selectedCampaign.frontArtwork);
  const [back, setBack] = useState(selectedCampaign.backArtwork);
  const [frontUploading, setFrontUploading] = useState(false);
  const [backUploading, setBackUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(PrintMarketingEventRecorder.uploadArtwork, []);
  const { address, city, state, zip } = selectedCampaign;
  const [allFieldsWriten, setAllFieldsWriten] = useState(
    !!address && !!city && !!state && !!zip
  );
  const defaultChecked = useMemo(
    () => selectedCampaign.isTest,
    [selectedCampaign.isTest]
  );

  const handleFrontUpload = useCallback((files) => {
    setFrontUploading(true);
    setUploadError("");
    if (!files.length) {
      return;
    }
    uploadFrontArtwork({
      id: selectedCampaign.id,
      file: files[0],
    })
      .then((res) => {
        if (res.success) {
          changeField("frontArtwork", res.data.path);
          setFront(res.data.path);
        } else {
          setUploadError(res.errorMessage);
        }
      })
      .catch(() => setUploadError("Failed to upload"))
      .finally(() => {
        setFrontUploading(false);
      });
  }, []);

  const handleBackUpload = useCallback((files) => {
    setBackUploading(true);
    setUploadError("");

    if (!files.length) {
      return;
    }
    uploadBackArtwork({
      id: selectedCampaign.id,
      file: files[0],
    })
      .then((res) => {
        if (res.success) {
          changeField("backArtwork", res.data.path);
          setBack(res.data.path);
        } else {
          setUploadError(res.errorMessage);
        }
      })
      .catch(() => setUploadError("Failed to upload"))
      .finally(() => {
        setBackUploading(false);
      });
  }, []);

  const handleScheduleUpdate = useCallback(() => {
    const state = store.getState().printMarketing;
    selectedCampaign.schedule = deliveryDate;
    const date = new Date(deliveryDate)?.toDateString();
    if (!testChecked) {
      changeField("schedule", date);
    }
    changeField("isTest", testChecked);
    setModalLoading(true);

    updatePrintCampaignSchedule(selectedCampaign.id, {
      isTest: testChecked,
      addressLine1: state.address,
      addressCity: state.city,
      addressState: state.state,
      addressZip: state.zip,
      schedule: new Date(deliveryDate).toDateString(),
    })
      .then((data) => {
        data.success && goNext();
      })
      .finally(() => {
        setModalLoading(false);
      });
  }, [deliveryDate, testChecked]);
  const dateValid = useMemo(
    () => !validateDate(deliveryDate, new Date()),
    [deliveryDate]
  );

  const handleDeleteFrontArtwork = useCallback(() => {
    changeField("frontArtwork", "");
    setFront("");
    removeArtwork({
      id: selectedCampaign.id,
      type: "front",
    });
  }, []);

  const handleDeleteBackArtwork = useCallback(() => {
    changeField("backArtwork", "");
    setBack("");
    removeArtwork({
      id: selectedCampaign.id,
      type: "back",
    });
  }, []);

  const today = useMemo(() => new Date(), []);

  return (
    <>
      <Box
        display="flex"
        px={{ md: 13, sm: 1, xs: 1 }}
        flexDirection="column"
        overflow="auto"
        style={{
          overflowX: "hidden",
          minWidth: 300,
          maxWidth: 800,
          height: "100%",
          marginBottom: 6,
        }}
      >
        <Box justifyContent="center" display="flex">
          <Typography
            textAlign="center"
            variant="h4"
            marginTop={7}
            px={{ md: 0, sm: 5, xs: 5 }}
            fontFamily="MinervaModern-Regular"
          >
            UPLOAD YOUR ARTWORK & SCHEDULE CAMPAIGN
          </Typography>
        </Box>
        {/* Uploading files */}
        <ErrorBox
          marginBottom={-3}
          marginTop={1}
          title="Upload error: "
          message={uploadError}
        />
        <Grid
          className="w-100"
          display="flex"
          flexWrap="wrap"
          width={{ md: 600, sm: "auto", xs: "auto" }}
          marginTop={5}
          gap={1}
        >
          <Grid
            item
            xl={5.9}
            lg={5.9}
            md={5.9}
            sm={5.9}
            xs={12}
            // mr={{ md: 0, sm: 0.5, xs: 0 }}
          >
            {front && !frontUploading ? (
              <>
                <TitleWithEdit
                  accept=".jpeg, .png, .pdf"
                  mb={1}
                  preventDefault
                  titleStyle={{ fontStyle: "normal" }}
                  Icon={Cancel}
                  onIconClick={handleDeleteFrontArtwork}
                  title="Front*"
                />
                <embed
                  style={{
                    objectFit: "cover",
                    // paddingRight: 4,
                  }}
                  src={front}
                  height={192}
                  width="100%"
                />
              </>
            ) : (
              <>
                <Typography marginBottom={1.4} display="block" variant="p">
                  Front*
                </Typography>

                <FileUploader
                  id="front"
                  error={uploadError}
                  accept=".jpeg, .png, .pdf"
                  uploading={frontUploading}
                  onChange={handleFrontUpload}
                  style={{
                    height: 120,
                    width: "100%",
                    textAlign: "center",
                    display: "inline-block",
                    padding: "40px 60px",
                  }}
                />
              </>
            )}
          </Grid>
          <Grid
            item
            xl={5.9}
            lg={5.9}
            md={5.9}
            sm={5.9}
            xs={12}
            // ml={{ md: 0, sm: 0.5, xs: 0 }}
          >
            {back && !backUploading ? (
              <>
                <TitleWithEdit
                  accept=".jpeg, .png, .pdf"
                  marginBottom={1}
                  titleStyle={{ fontStyle: "normal" }}
                  preventDefault
                  onIconClick={handleDeleteBackArtwork}
                  Icon={Cancel}
                  title="Back*"
                />
                <embed
                  style={{ objectFit: "cover" }}
                  src={back}
                  height={192}
                  width="100%"
                />
              </>
            ) : (
              <>
                <Typography marginBottom={1.4} display="block" variant="p">
                  Back*
                </Typography>

                <FileUploader
                  id="back"
                  error={uploadError}
                  accept=".jpeg, .png, .pdf"
                  uploading={backUploading}
                  onChange={handleBackUpload}
                  style={{
                    height: 120,
                    width: "100%",
                    textAlign: "center",
                    display: "inline-block",
                    padding: "40px 60px",
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>
        {/* File Requirements */}
        <FileRequirements
          selectedCampaign={selectedCampaign}
          artworkUploaded={!!front && !!back}
        />
        {/* Test Print */}
        <TestPrint
          setAllFieldsWriten={setAllFieldsWriten}
          defaultChecked={defaultChecked}
          testChecked={testChecked}
          setTestChecked={setTestChecked}
        />
        <Box
          maxWidth={{ md: 470, sm: "default", xs: "default" }}
          display="flex"
          flexDirection="column"
        >
          <DatePicker
            required
            minDate={Date.now()}
            shrink
            disabled={testChecked}
            value={deliveryDate}
            onChange={(newValue) => {
              selectedCampaign.deliveryDate = newValue;
              setDeliveryDate(newValue);
            }}
            sx={{ marginY: 6 }}
            id="scheduleMailing"
            helperText={`The mailing date can't be before ${today.toDateString()}`}
            error={deliveryDate && dateValid}
            label="Schedule mailing"
          />
          <Typography
            pl={2}
            pt={1}
            variant="p"
            fontStyle="italic"
            fontWeight="500"
            fontSize="0.813rem"
          >
            {testChecked
              ? "Schedule delivery after you receive the test print"
              : "Please allow approximately seven (7) business days from the scheduled date for delivery"}
          </Typography>
        </Box>
      </Box>
      <StackPagination
        page={page}
        pageCount={pageCount}
        onBack={goBack}
        onNext={handleScheduleUpdate}
        nextDisabled={
          (testChecked ? !allFieldsWriten : dateValid) || !front || !back
        }
      />
    </>
  );
}

function Cancel({ ...rest }) {
  return (
    <CancelIcon
      sx={{ "&:hover": { color: "#192231" } }}
      htmlColor="#BEB082"
      fontSize="small"
      {...rest}
    />
  );
}
