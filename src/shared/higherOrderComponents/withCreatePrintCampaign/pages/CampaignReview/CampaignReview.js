import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  CardContainer,
  StackPagination,
  TitleWithEdit,
} from "../../../../components";
import { Input, inputWithoutBorderStyle } from "../../../../components/Form";
import {
  CampaignDetails,
  MailType,
  PaymentMethod,
  TestPrintDetails,
} from "./components";
import {
  getSubscriptionDetails,
  sendPostcard,
  uploadBackArtwork,
  uploadFrontArtwork,
} from "../../../../../services";
import { useNavigate } from "react-router";
import PrintMarketingEventRecorder from "../../../../analytics/google/PrintMarketingEventRecorder";

export function CampaignReview({
  pageCount,
  page,
  goBack,
  selectedCampaign,
  onClose,
  setSuccessOpen,
  setModalLoading,
}) {
  const [front, setFront] = useState(selectedCampaign.frontArtwork);
  const [back, setBack] = useState(selectedCampaign.backArtwork);
  const [frontUploading, setFrontUploading] = useState(false);
  const [backUploading, setBackUploading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkFields();
    fetchPaymentMethod();
    PrintMarketingEventRecorder.reviewCampaign();
  }, []);

  const fetchPaymentMethod = useCallback(() => {
    getSubscriptionDetails().then((data) => {
      setPaymentMethod(data.paymentMethod);
    });
  }, []);

  const checkFields = useCallback(() => {
    if (!selectedCampaign.recipientCount) {
      selectedCampaign.recipientCount = selectedCampaign.recipientTotalCount;
    }

    if (!selectedCampaign.recipientTotalCount) {
      goBack(3);
    } else if (!selectedCampaign.campaignName) {
      goBack(2);
    } else if (
      !selectedCampaign.frontArtwork ||
      !selectedCampaign.backArtwork ||
      (!selectedCampaign.schedule && !selectedCampaign.isTest) ||
      (selectedCampaign.isTest &&
        (!selectedCampaign.address ||
          !selectedCampaign.city ||
          !selectedCampaign.state ||
          !selectedCampaign.zip))
    ) {
      goBack();
    } else if (selectedCampaign.finalize && !selectedCampaign.schedule) {
      goBack();
    }
  }, []);

  const handleFrontUpload = useCallback((files) => {
    setFrontUploading(true);
    uploadFrontArtwork({
      id: selectedCampaign.id,
      file: files[0],
    })
      .then((res) => {
        selectedCampaign.frontArtwork = res.data.path;
        setFront(res.data.path);
      })
      .finally(() => {
        setFrontUploading(false);
      });
  }, []);
  const handleBackUpload = useCallback((files) => {
    setBackUploading(true);
    uploadBackArtwork({
      id: selectedCampaign.id,
      file: files[0],
    })
      .then((res) => {
        selectedCampaign.backArtwork = res.data.path;
        setBack(res.data.path);
      })
      .finally(() => {
        setBackUploading(false);
      });
  }, []);

  const handleSubmit = () => {
    setModalLoading(true);
    sendPostcard(
      selectedCampaign.id,
      !selectedCampaign.isTest ?? selectedCampaign.finalize
    )
      .then((data) => {
        setSuccessOpen(true);
        setTimeout(() => {
          onClose();
          if (selectedCampaign.isTest) {
            navigate("/lead-generation/print-marketing/test");
          } else {
            navigate("/lead-generation/print-marketing");
          }
        }, 2500);
      })
      .finally(() => {
        setModalLoading(false);
      });
  };

  return (
    <>
      <Box
        display="flex"
        pl={{ md: 4, sm: 1, xs: 1 }}
        flexDirection="column"
        overflow="auto"
        style={{
          minWidth: 300,
          maxWidth: 800,
          marginBottom: -16,
        }}
      >
        <Box display="flex" px={{ md: 14, sm: 5, xs: 5 }}>
          <Typography
            textAlign="center"
            variant="h4"
            marginTop={7}
            fontFamily="MinervaModern-Regular"
          >
            REVIEW YOUR CAMPAIGN TO BE SURE IT'S RIGHT
          </Typography>
        </Box>
        <Grid
          display="flex"
          flexWrap={{ md: "wrap", sm: "wrap-reverse", xs: "wrap-reverse" }}
          marginY={5}
        >
          <Grid
            pr={{ md: 4, sm: 1, xs: 1 }}
            item
            xl={7}
            lg={7}
            md={7}
            sm={12}
            xs={12}
            marginBottom={2}
          >
            <Input
              sx={inputWithoutBorderStyle}
              inputProps={{
                readOnly: true,
              }}
              value={selectedCampaign.campaignName}
              fullWidth
              label="Campaign Name"
            />
            {!!selectedCampaign.isTest && (
              <TestPrintDetails
                selectedCampaign={selectedCampaign}
                onEdit={() => {
                  goBack(1);
                }}
              />
            )}
            {!selectedCampaign.isTest && (
              <CampaignDetails
                onEdit={() => {
                  goBack(2);
                }}
                selectedCampaign={selectedCampaign}
              />
            )}
            <MailType selectedCampaign={selectedCampaign} />
            <PaymentMethod name={paymentMethod} />
          </Grid>
          <Grid
            item
            pb={2}
            xl={5}
            lg={5}
            md={5}
            sm={6}
            xs={12}
            mx="auto"
            pr={{ md: 4, sm: 1, xs: 1 }}
          >
            <TitleWithEdit
              accept="image/jpeg,image/png,application/pdf,image/x-eps"
              title="Front*"
              onEdit={handleFrontUpload}
            />
            {!frontUploading ? (
              <embed
                src={front}
                height={192}
                width="100%"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Typography variant="h6">Uploading...</Typography>
            )}
            <TitleWithEdit
              accept="image/jpeg,image/png,application/pdf,image/x-eps"
              marginTop={2}
              title="Back*"
              onEdit={handleBackUpload}
            />
            {!backUploading ? (
              <embed
                style={{ objectFit: "cover" }}
                src={back}
                height={192}
                width="100%"
              />
            ) : (
              <Typography variant="h6">Uploading...</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <StackPagination
        page={page}
        pageCount={pageCount}
        onBack={goBack}
        onNext={handleSubmit}
        nextText={selectedCampaign.isTest ? "SEND TEST PRINT" : "SUBMIT"}
      />
    </>
  );
}
