import { Box, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  setCampaignName,
  setPrintProductId,
  setPrintProduct,
  changePrintCampaignField,
} from "../../../../../redux";
import { updatePrintCampaignBudget } from "../../../../../services";
import { ErrorBox, StackPagination } from "../../../../components";
import { Input } from "../../../../components/Form";
import { CampaignCostContainer, PostcardSizing } from "./components";
import { getRoundedPrice } from "../../../../helpers";
import PrintMarketingEventRecorder from "../../../../analytics/google/PrintMarketingEventRecorder";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    productId: state.printMarketing.productId,
    campaignName: state.printMarketing.campaignName,
    recipientCount: state.printMarketing.recipientCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrintProductId: (value) => dispatch(setPrintProductId(value)),
    setPrintProduct: (value) => dispatch(setPrintProduct(value)),
    setCampaignName: (value) => dispatch(setCampaignName(value)),
    changeField: (key, value) => dispatch(changePrintCampaignField(key, value)),
  };
};
export const MailCampaignConfig = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    goNext,
    pageCount,
    page,
    goBack,
    printProducts,
    productId,
    recipientCount,
    setPrintProductId,
    setPrintProduct,
    setCampaignName,
    selectedCampaign,
    campaignName,
    setModalLoading,
    changeField,
  }) => {
    const [memorizedProductId] = useState(productId);
    const [error, setError] = useState("");

    useEffect(PrintMarketingEventRecorder.configureEmailCampaign, []);
    const printProduct = useMemo(() => {
      let result = printProducts.find((p) => p.id === productId);
      result = result ? result : printProducts[0];

      let pp = { ...result };
      pp.productId = pp.id;
      delete pp.id;

      setPrintProduct(pp);
      return result;
    }, [printProducts, productId]);

    const [campaignNameError, setCampaignNameError] = useState(false);

    const handleSave = useCallback(() => {
      if (!campaignName) {
        setCampaignNameError("This field is required!");
        return false;
      }
      setModalLoading(true);

      const budget = getRoundedPrice(printProduct.price * recipientCount);
      setError("");

      changeField("product", printProduct.name);
      updatePrintCampaignBudget({
        id: selectedCampaign.id,
        productId,
        name: campaignName,
        budget,
      })
        .then((data) => {
          if (data.success) {
            changeField("budget", budget);
            if (memorizedProductId !== productId) {
              changeField("backArtwork", "");
              changeField("frontArtwork", "");
            }
            goNext();
          } else {
            setError(data.errorMessage);
          }
        })
        .catch(() =>
          setError("Please check your internet connection or try later")
        )
        .finally(() => {
          setTimeout(() => {
            setError("");
          }, 3000);
          setModalLoading(false);
        });
    }, [printProduct, campaignName, productId, selectedCampaign]);

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
          <Box
            display="flex"
            px={{ md: 5, sm: 3, xs: 2 }}
            flexDirection="column"
          >
            <Typography
              mt={7}
              textAlign="center"
              variant="h4"
              fontFamily="MinervaModern-Regular"
            >
              CONFIGURE YOUR MAIL CAMPAIGN
            </Typography>
            <Typography
              mt={3}
              variant="p"
              fontSize="1.063rem"
              textAlign="center"
            >
              Configure your personalized mail campaign
            </Typography>
          </Box>
          <CampaignCostContainer
            count={selectedCampaign.recipientTotalCount}
            price={printProduct?.price}
          />
          <ErrorBox mt={2} mb={-3} title="Failed" message={error} />
          <Input
            id="campaignName"
            error={campaignNameError}
            label="Campaign Name"
            required
            value={campaignName}
            onBlur={() => setCampaignNameError(false)}
            onFocus={() => setCampaignNameError(false)}
            onChange={(e) => setCampaignName(e.target.value)}
            sx={{ marginTop: 6 }}
          />
          <Typography variant="p" mt={5}>
            Choose postcard size
          </Typography>
          <PostcardSizing
            printProducts={printProducts}
            setPrintProductId={setPrintProductId}
            productId={productId}
          />
        </Box>
        <StackPagination
          page={page}
          pageCount={pageCount}
          onBack={goBack}
          onNext={handleSave}
          nextDisabled={!recipientCount || !campaignName}
        />
      </>
    );
  }
);
