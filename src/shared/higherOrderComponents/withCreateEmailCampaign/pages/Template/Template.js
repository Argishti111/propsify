import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { setEmailTemplate } from "../../../../../redux";
import { Progress, RemainingEmails } from "../../components";
import { Navigation, PreviewTemplate } from "./components";
import { TEMPLATE_PAGES } from "./components/Navigation";
import { MyTemplates, TemplateLibrary } from "./options";
import EmalMarketingEventRecorder from "../../../../analytics/google/EmalMarketingEventRecorder";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    selectedTemplate: state.emailMarketing.campaign.selectedTemplate,
    template: state.emailMarketing.campaign.template,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTemplate: (template) => dispatch(setEmailTemplate(template)),
  };
};

export const Template = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    goToPage,
    goNext,
    page,
    setSelectedTemplate,
    selectedTemplate,
    template,
  }) => {
    const [selectedOption, setSelectedOption] = useState(
      TEMPLATE_PAGES.TEMPLATE_LIBRARY
    );

    useEffect(EmalMarketingEventRecorder.templateSettings, []);

    const handleSelectOption = useCallback((e) => {
      setSelectedOption(+e.currentTarget.id);
    }, []);

    return (
      <>
        <Grid
          sx={{ overflowY: "auto" }}
          container
          pt={6}
          height="calc(100vh - 108px)"
          // pr={{ xl: 12, lg: 8, md: 2, sm: 2, xs: 2 }}
          px={{ xl: 12, lg: 12, md: 2, sm: 2, xs: 2 }}
          mb={3}
          rowGap={6}
        >
          <Grid
            width="100%"
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            display="block"
          >
            <Typography fontFamily="MinervaModern-Regular" variant="h4">
              CHOOSE A TEMPLATE
            </Typography>
            <RemainingEmails style={{ maxWidth: 400 }} />
          </Grid>
          <Grid
            columnGap={{ xl: 9, lg: 9, md: 4 }}
            rowGap={2}
            item
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Grid style={{ maxWidth: 412 }} item lg={6} md={6} sm={12} xs={12}>
              <Navigation
                onSelect={handleSelectOption}
                selected={selectedOption}
              />
              <Box
                maxWidth={412}
                height={{ lg: "calc(100vh - 108px)" }}
                sx={{ overflowY: "auto" }}
              >
                <Box
                  display="flex"
                  gap={5}
                  pb={5}
                  columnGap={5}
                  rowGap={5}
                  flexWrap="wrap"
                  sx={{
                    overflowY: "hidden",
                  }}
                >
                  {selectedOption === TEMPLATE_PAGES.TEMPLATE_LIBRARY && (
                    <TemplateLibrary
                      selected={selectedTemplate}
                      onSelect={setSelectedTemplate}
                    />
                  )}
                  {selectedOption === TEMPLATE_PAGES.MY_TEMPLATES && (
                    <MyTemplates
                      selected={selectedTemplate}
                      onSelect={setSelectedTemplate}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5} md={5} sm={11} xs={11}>
              <PreviewTemplate template={selectedTemplate} />
            </Grid>
          </Grid>
        </Grid>
        <Progress
          currentPage={page}
          goToPage={goToPage}
          nextDisabled={!template}
          onNext={goNext}
        />
      </>
    );
  }
);
