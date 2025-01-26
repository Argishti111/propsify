import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import { setEmailTemplate } from "../../../../../../redux";
import { createTemplate } from "../../../../../../services";
import { CustomButton, DeleteModal } from "../../../../../../shared/components";
import {
  Navigation,
  PreviewTemplate,
} from "../../../../../../shared/higherOrderComponents/withCreateEmailCampaign/pages/Template/components";
import { TEMPLATE_PAGES } from "../../../../../../shared/higherOrderComponents/withCreateEmailCampaign/pages/Template/components/Navigation";
import {
  MyTemplates,
  TemplateLibrary,
} from "../../../../../../shared/higherOrderComponents/withCreateEmailCampaign/pages/Template/options";

const mapStateToProps = (state) => {
  return {
    template: state.emailMarketing.campaign.selectedTemplate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTemplate: (template) => dispatch(setEmailTemplate(template)),
  };
};

export const TemplateList = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ goNext, setSelectedTemplate, template }) => {
  const [selectedOption, setSelectedOption] = useState(
    TEMPLATE_PAGES.TEMPLATE_LIBRARY
  );

  const handleSelectOption = useCallback((e) => {
    setSelectedOption(+e.currentTarget.id);
    setSelectedTemplate(0);
  }, []);

  const nextText = useMemo(() => {
    if (template?.notMine) {
      return "CLONE";
    }
    if (!template?.id) {
      return "CREATE";
    }
    return "EDIT";
  }, [template]);

  const nextDisabled = useMemo(() => !template, [template]);

  const handleEdit = useCallback(() => {
    goNext();
  }, []);

  const handleClone = useCallback(
    (value, e) => {
      e.stopPropagation();
      value.id = 0;
      setSelectedTemplate(value);
      goNext();
    },
    [template]
  );

  const handleDelete = useCallback(() => {
    setSelectedTemplate({ content: "" });
  }, []);
  return (
    <>
      <Grid
        height="calc(100vh - 100px)"
        sx={{ overflowY: "auto" }}
        container
        pt={6}
        px={{ lg: 12, md: 6, sm: 2, xs: 2 }}
        mb={3}
      >
        <Grid item mb={6} lg={12} md={12} sm={12} xs={12} display="block">
          <Typography fontFamily="MinervaModern-Regular" variant="h4">
            TEMPLATE SETTINGS
          </Typography>
        </Grid>
        <Grid pr={{ lg: 4, md: 2, xs: 0 }} item lg={6} md={6} sm={12} xs={12}>
          <Navigation onSelect={handleSelectOption} selected={selectedOption} />
          <Box
            display="flex"
            gap={4}
            pb={6}
            flexWrap="wrap"
            sx={{ height: "calc(100vh - 310px)", overflowY: "auto" }}
          >
            {selectedOption === TEMPLATE_PAGES.TEMPLATE_LIBRARY && (
              <TemplateLibrary
                selected={template}
                onSelect={setSelectedTemplate}
              />
            )}
            {selectedOption === TEMPLATE_PAGES.MY_TEMPLATES && (
              <MyTemplates
                editable
                onEdit={handleEdit}
                onClone={handleClone}
                onDelete={handleDelete}
                selected={template}
                onSelect={setSelectedTemplate}
              />
            )}
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PreviewTemplate template={template} />
        </Grid>
      </Grid>

      <Box
        position="absolute"
        bottom={16}
        display="flex"
        borderTop="2px solid #D8CFB4"
        width="100%"
        zIndex={1}
        justifyContent="end"
        sx={{ background: "white" }}
      >
        <CustomButton
          type="submit"
          disabled={nextDisabled}
          onClick={goNext}
          sx={{
            fontSize: 20,
            alignSelf: "flex-end",
            letterSpacing: 2,
          }}
        >
          {nextText}
        </CustomButton>
      </Box>
    </>
  );
});
