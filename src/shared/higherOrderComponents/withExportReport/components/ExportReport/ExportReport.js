import {
  Language,
  LocationOnOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { periods } from "../../../../../layouts/components/MarketInsightsNavbar/components/Comparison/data";
import { ErrorBox, StackPagination } from "../../../../components";
import { Input, MuiSelect } from "../../../../components/Form";
import { EditIcon } from "../../../../static/icons";
import { CompanyImage } from "../CompanyImage";
import "./ExportReport.css";

export function ExportReport({
  setModalLoading,
  additionalData,
  handleChange,
  state,
  goBack,
  onClose,
  canChoosePeriod,
  onSubmit,
}) {
  const [recipientName, setRecipientName] = useState("");
  const [personalizedNote, setPersonalizedNote] = useState("");
  const [period, setPeriod] = useState("6mo");
  const ref = useRef();

  const [error, setError] = useState("");

  const handleSubmit = useCallback(() => {
    setModalLoading(true);
    onSubmit({
      ...state,
      ...additionalData,
      recipientName,
      personalizedNote,
      period,
    })
      .then((data) => {
        if (data) {
          onClose();
          return;
        }
        throw new Error();
      })
      .catch(() => {
        ref.current.scroll(0, 0);
        setError("Failed to export report");
      })
      .finally(() => setModalLoading(false));
  }, [state, personalizedNote, recipientName, period, ref]);

  return (
    <>
      <Box
        display="flex"
        px={{ md: 13, sm: 6, xs: 2 }}
        ref={ref}
        flexDirection="column"
        overflow="auto"
        style={{
          overflowX: "hidden",
          width: "100%",
          maxWidth: 800,
          height: "100%",
          marginBottom: 6,
        }}
      >
        {/* Uploading files */}
        <ErrorBox
          title="Upload error:"
          message={error}
          marginTop={2}
          marginBottom={-2}
        />
        <Grid
          marginTop={4}
          display="flex"
          justifyContent={{ md: "normal", sm: "center", xs: "center" }}
          flexWrap="wrap"
          alignItems="center"
        >
          <Grid
            mb={1}
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {!!additionalData.entityCity && (
              <Typography textAlign="center" fontStyle="italic" variant="h6">
                {additionalData.entityCity.name}{" "}
                {additionalData.entityZipCode?.id
                  ? `/ ${additionalData.entityZipCode.code}`
                  : ""}
              </Typography>
            )}
            <Typography
              textAlign="center"
              maxWidth={360}
              marginTop={1}
              lineHeight={1.2}
              variant="body1"
            >
              Personalize your report with your logo or photo and contact
              information.
            </Typography>
          </Grid>
          <CompanyImage
            uploadError={error}
            setUploadError={setError}
            logoUrl={state.logoUrl}
            handleChange={handleChange}
          />
        </Grid>
        {!state.logoUrl && (
          <Grid
            marginTop={1}
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography
                textAlign="center"
                fontSize="0.75rem"
                fontWeight="400"
              >
                Supported file types: .jpg .png
              </Typography>
              <Typography
                textAlign="center"
                fontSize="0.75rem"
                fontWeight="400"
              >
                Maximum file size: 2MB
              </Typography>
              <Typography
                textAlign="center"
                fontSize="0.75rem"
                fontWeight="400"
              >
                Smallest file dimensions: 240x168px
              </Typography>
            </Grid>
          </Grid>
        )}
        <Box marginTop={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontStyle="italic" variant="h6">
              {state.name}
            </Typography>
            <EditIcon
              onClick={() => {
                goBack();
              }}
            />
          </Box>
          <Typography fontWeight="500" fontStyle="italic" variant="subtitle2">
            License: {state.brokerageName}
          </Typography>
          <Typography fontWeight="500" fontStyle="italic" variant="subtitle2">
            Brokerage license: {state.licenseNumber}
          </Typography>
          <Box marginTop={1} display="flex" alignItems="center">
            <LocationOnOutlined sx={{ marginLeft: -0.3 }} htmlColor="#BEB082" />
            <Typography marginLeft={1.7} variant="p">
              {state.address}, {state.city}, {state.zipCode}
            </Typography>
          </Box>
          <Box marginTop={1} display="flex" alignItems="center">
            <PhoneOutlined fontSize="small" htmlColor="#BEB082" />
            <Typography marginLeft={2} variant="p">
              {state.phone}
            </Typography>
          </Box>
          <Box marginTop={1} display="flex" alignItems="center">
            <MailOutlined fontSize="small" htmlColor="#BEB082" />
            <Typography marginLeft={2} variant="p">
              {state.email}
            </Typography>
          </Box>
          <Box marginTop={1} display="flex" alignItems="center">
            <Language fontSize="small" htmlColor="#BEB082" />
            <Typography marginLeft={2} variant="p">
              {state.website}
            </Typography>
          </Box>
        </Box>

        <Typography width={800} variant="h1"></Typography>
        <Box marginTop={7}>
          {canChoosePeriod && (
            <MuiSelect
              onChange={(e) => setPeriod(e.target.value)}
              value={period}
              fullWidth
              label="Report period"
              required
            >
              {periods.map((p) => {
                return (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                );
              })}
            </MuiSelect>
          )}
          <Input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            style={{ marginTop: 32 }}
            fullWidth
            label="Recipient name"
          />
        </Box>

        <Input
          value={personalizedNote}
          onChange={(e) => {
            if (e.target.value.length < 1001) {
              setPersonalizedNote(e.target.value);
            }
          }}
          style={{ marginTop: 8 }}
          sx={{ "& textarea": { p: "0 !important", pt: "4px !important" } }}
          multiline
          rows={4}
          fullWidth
          label="Personalized note"
        />
        <Box>
          <Typography textAlign="end" fontStyle="italic" variant="subtitle2">
            {personalizedNote.length}/1000
          </Typography>
        </Box>
      </Box>
      <StackPagination hideSteps nextText="EXPORT" onNext={handleSubmit} />
    </>
  );
}
