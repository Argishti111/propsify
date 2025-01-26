import { Cancel } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { CustomButton, ErrorBox } from "../../../../components";
import { Input } from "../../../../components/Form";
import { formatPhone } from "../../../../helpers";
import { CompanyImage } from "../CompanyImage";
import "./Company.css";

export function Company({ state, additionalData, handleChange, goNext }) {
  const [uploadError, setUploadError] = useState("");

  const nextButtonDisabled = useMemo(() => {
    return !(
      state.address &&
      state.brokerageLicenseNumber &&
      state.city &&
      state.email &&
      state.licenseNumber &&
      state.logoUrl &&
      state.phone &&
      state.website &&
      state.zipCode
    );
  });
  return (
    <form
      onSubmit={() => {
        if (!nextButtonDisabled) goNext();
      }}
      style={{ all: "inherit", margin: 0 }}
    >
      <Box
        display="flex"
        px={{ md: 13, sm: 6, xs: 2 }}
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
        {/* Uploading files */}
        <ErrorBox
          title="Upload error:"
          message={uploadError}
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
            alignItems={{
              lg: "unset",
              md: "unset",
              sm: "center",
              xs: "center",
            }}
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
              textAlign={{
                lg: "left",
                md: "left",
                sm: "center",
                xs: "center",
              }}
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
            uploadError={uploadError}
            setUploadError={setUploadError}
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
              <Typography textAlign="center" fontSize={12}>
                Supported file types: .jpg .png
              </Typography>
              <Typography textAlign="center" fontSize={12}>
                Maximum file size: 2MB
              </Typography>
              <Typography textAlign="center" fontSize={12}>
                Smallest file dimensions: 240x168px
              </Typography>
            </Grid>
          </Grid>
        )}
        <Box className="children-mt-1" marginTop={3}>
          <Input
            value={state.brokerageName}
            onChange={handleChange("brokerageName")}
            fullWidth
            label="Brokerage name"
          />
          <Input
            value={state.licenseNumber}
            onChange={handleChange("licenseNumber")}
            fullWidth
            label="License number"
            required
          />
          <Input
            value={state.brokerageLicenseNumber}
            onChange={handleChange("brokerageLicenseNumber")}
            fullWidth
            label="Brokerage license number"
            required
          />
          <Input
            value={state.address}
            onChange={handleChange("address")}
            fullWidth
            label="Address"
            required
          />
          <Grid display="flex" paddingTop={1}>
            <Grid item lg={6} md={6} sm={12} xs={12} paddingRight={0.5}>
              <Input
                value={state.city}
                onChange={handleChange("city")}
                fullWidth
                label="City"
                required
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} paddingLeft={0.5}>
              <Input
                value={state.zipCode}
                onChange={handleChange("zipCode")}
                fullWidth
                label="ZIP Code"
                required
              />
            </Grid>
          </Grid>
          <Input
            value={state.phone}
            type="tel"
            onChange={(e) => {
              handleChange("phone")({
                target: { value: formatPhone(e.target.value) },
              });
            }}
            fullWidth
            label="Phone number"
            required
          />
          <Input
            value={state.email}
            onChange={handleChange("email")}
            fullWidth
            label="Email address"
            type="email"
            required
          />
          <Input
            value={state.website}
            onChange={handleChange("website")}
            fullWidth
            label="Website"
            required
          />
          <FormControlLabel
            // disabled={loading}
            control={
              <Checkbox
                sx={{ marginLeft: 1, color: "#beb082" }}
                value={state.save}
                onChange={() =>
                  handleChange("save")({ target: { value: !state.save } })
                }
              />
            }
            label={
              <Typography variant="p">
                Save to my account for future use
              </Typography>
            }
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        style={{ borderTop: "1px solid #e0d9c3" }}
      >
        <CustomButton
          disabled={nextButtonDisabled}
          type="submit"
          sx={nextButtonStyle}
        >
          NEXT
        </CustomButton>
      </Box>
    </form>
  );
}

const nextButtonStyle = {
  fontSize: 20,
  alignSelf: "flex-end",
  letterSpacing: "0.375rem",
  height: "3.438rem",
  fontSize: "1.25rem",
  paddingLeft: "calc(16px + 0.375rem)",
};
