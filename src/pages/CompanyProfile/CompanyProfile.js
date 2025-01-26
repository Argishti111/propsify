import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  getUserCompany,
  uploadCompanyLogo,
  editCompany,
  removeCompanyLogo,
} from "../../services";
import { FileUploader, Input } from "../../shared/components/Form";
import {
  CustomButton,
  ErrorBox,
  Info,
  TinyButton,
} from "../../shared/components";
import { formatPhone } from "../../shared/helpers";
import { validateImage } from "../../shared/validators";
import { PageTitle } from "../../shared/components/Titles";
import { useDispatch } from "react-redux";
import { setUserCompany } from "../../redux";

const initialState = {
  name: "",
  brokerageName: "",
  licenseNumber: "",
  brokerageLicenseNumber: "",
  address: "",
  city: "",
  zipCode: "",
  phone: "",
  email: "",
  website: "",
  logoUrl: "",
};

const CHANGE_VALUE = Symbol();
const INIT = Symbol();

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case INIT:
      return action.payload;

    default:
      return state;
  }
};

export function CompanyProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [uploadError, setUploadError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    getUserCompany().then((data) => {
      dispatch({ type: INIT, payload: data });
      reduxDispatch(setUserCompany(state));
    });
  }, []);

  const handleChange = useCallback((key) => {
    return (e) => {
      dispatch({
        type: CHANGE_VALUE,
        payload: {
          key,
          value: e.target.value,
        },
      });
    };
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    editCompany(state);
    reduxDispatch(setUserCompany(state));
  };

  const handleImageUpload = useCallback((files) => {
    setUploadError("");
    if (!files.length) {
      return;
    }
    if (!validateImage(files[0])) {
      setUploadError("Invalid image");
      return;
    }
    setImageUploading(true);

    uploadCompanyLogo({
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

  const handleRemoveLogo = useCallback(() => {
    handleChange("logoUrl")({ target: { value: null } });
    removeCompanyLogo();
  }, []);

  const handlePhoneChange = useCallback((e) => {
    dispatch({
      type: CHANGE_VALUE,
      payload: {
        key: "phone",
        value: formatPhone(e.target.value),
      },
    });
  }, []);

  return (
    <>
      <Grid paddingX={2} borderBottom="1px solid #d8cfb4">
        <PageTitle>COMPANY PROFILE</PageTitle>
      </Grid>

      <Grid
        height="calc(100vh - 216px)"
        p={{ md: 4, sm: 2, xs: 2 }}
        overflow="auto !important"
        sx={{
          flexFlow: {
            md: "row",
            sm: "column-reverse",
            xs: "column-reverse",
          },
        }}
        container
      >
        <Grid
          display="flex"
          flexDirection="column"
          xl={7}
          lg={7}
          md={6}
          sm={12}
          xs={12}
          item
          className="children-mt-1"
          marginTop={3}
        >
          <form
            className="flex-column"
            style={{ gap: 4 }}
            onSubmit={handleEdit}
          >
            <Input
              value={state.name}
              onChange={handleChange("name")}
              fullWidth
              label="Company name"
            />
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
            />
            <Input
              value={state.brokerageLicenseNumber}
              onChange={handleChange("brokerageLicenseNumber")}
              fullWidth
              label="Brokerage license number"
            />
            <Input
              value={state.address}
              onChange={handleChange("address")}
              fullWidth
              label="Address"
            />
            <Grid display="flex">
              <Grid item lg={6} md={6} sm={12} paddingRight={0.5}>
                <Input
                  value={state.city}
                  onChange={handleChange("city")}
                  fullWidth
                  label="City"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} paddingLeft={0.5}>
                <Input
                  value={state.zipCode}
                  onChange={handleChange("zipCode")}
                  fullWidth
                  label="ZIP Code"
                />
              </Grid>
            </Grid>
            <Input
              value={state.phone}
              onChange={handlePhoneChange}
              fullWidth
              label="Phone number"
            />
            <Input
              value={state.email}
              onChange={handleChange("email")}
              fullWidth
              type="email"
              label="Email address"
            />
            <Input
              value={state.website}
              onChange={handleChange("website")}
              fullWidth
              label="Website"
            />
            <CustomButton sx={{ alignSelf: "end", width: 200 }} type="submit">
              SAVE
            </CustomButton>
          </form>
        </Grid>

        <Grid
          display="flex"
          flexDirection="column"
          xl={5}
          lg={5}
          md={6}
          sm={12}
          xs={12}
          alignItems={{ md: "flex-end", sm: "flex-start" }}
          item
        >
          <ErrorBox
            title="Upload Error:"
            width={240}
            mb={1}
            mt={4}
            message={uploadError}
          />

          {!state.logoUrl || imageUploading ? (
            <>
              <Box
                mb={1}
                width={240}
                display="flex"
                justifyContent="space-between"
              >
                <Typography fontStyle="italic" variant="subtitle2">
                  Your company logo
                </Typography>
                <Info contentStyle={{ width: 272, maxWidth: 272 }} value=" ">
                  <ul style={{ padding: 16 }}>
                    <li>Supported file types: .jpg .png</li>
                    <li>Maximum file size: 2MB</li>
                    <li>Smallest file dimensions: 240x168px</li>
                  </ul>
                </Info>
              </Box>
              <FileUploader
                error={uploadError}
                uploading={imageUploading}
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,image/x-eps"
                style={{
                  width: 240,
                  height: 168,
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </>
          ) : (
            <Box display="flex" flexDirection="column" style={{ width: 240 }}>
              <Box
                mb={1}
                width={240}
                display="flex"
                justifyContent="space-between"
              >
                <Typography fontStyle="italic" variant="subtitle2">
                  Your company logo
                </Typography>
                <Info contentStyle={{ width: 272, maxWidth: 272 }} value=" ">
                  <ul style={{ padding: 16 }}>
                    <li>Supported file types: .jpg .png</li>
                    <li>Maximum file size: 2MB</li>
                    <li>Smallest file dimensions: 240x168px</li>
                  </ul>
                </Info>
              </Box>
              <img
                alt=""
                src={state.logoUrl + "&x=" + Date.now()}
                width={240}
              />
              <Box mt={1} display="flex" justifyContent="space-between">
                <input
                  id="uploadLogo"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf,image/x-eps"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  hidden
                />
                <TinyButton
                  onClick={() => document.getElementById("uploadLogo").click()}
                  color="secondary"
                >
                  UPLOAD
                </TinyButton>
                <TinyButton onClick={handleRemoveLogo} color="secondary">
                  REMOVE
                </TinyButton>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}
