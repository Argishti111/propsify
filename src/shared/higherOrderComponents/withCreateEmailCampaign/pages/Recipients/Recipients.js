import { Grid, Typography, Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  deleteEmailRecipients,
  setEmailCampaignRecipientsData,
} from "../../../../../redux";
import {
  deleteEmailCampaignRecipientFile,
  getEmailRecipients,
  uploadEmailCampaignRecipients,
} from "../../../../../services";
import {
  DeleteDialog,
  ErrorBox,
  ModalLoading,
  UploadedFile,
} from "../../../../components";
import { FileUploader } from "../../../../components/Form";
import { validateCustomerListFile } from "../../../../validators";
import { Progress, RemainingEmails } from "../../components";
import {
  DownloadSample,
  FileRequirements,
  RecipientListPreview,
} from "./components";
import EmalMarketingEventRecorder from "../../../../analytics/google/EmalMarketingEventRecorder";

const errorMessage =
  "We could not upload your file. Please check your internet connection or try later";

const mapStateToProps = (state) => {
  return {
    id: state.emailMarketing.campaign.id,
    recipients: state.emailMarketing.campaign.recipients,
    fileName: state.emailMarketing.campaign.fileName,
    duplicateRecipientsCount:
      state.emailMarketing.campaign.duplicateRecipientsCount,
    uniqueRecipientsCount: state.emailMarketing.campaign.uniqueRecipientsCount,
    template: state.emailMarketing.campaign.template,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setRecipientsData: (data) => dispatch(setEmailCampaignRecipientsData(data)),
    deleteRecipients: () => dispatch(deleteEmailRecipients()),
  };
};

export const Recipients = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    goToPage,
    goNext,
    template,
    page,
    recipients,
    id,
    fileName,
    deleteRecipients,
    setRecipientsData,
    uniqueRecipientsCount,
    duplicateRecipientsCount,
  }) => {
    const [uploadError, setUploadError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(EmalMarketingEventRecorder.uploadEmailList, []);

    const fetchData = useCallback(() => {
      if (id) {
        setModalLoading(true);
        getEmailRecipients(id)
          .then((data) => {
            setRecipientsData(data);
          })
          .finally(() => setModalLoading(false));
      }
    }, [id]);

    const handleUpload = useCallback(
      (files) => {
        if (!files.length) {
          return;
        }
        let error = validateCustomerListFile(files[0]);
        if (error) {
          setUploadError(error);
        }
        const file = files[0];

        setUploadError("");
        setUploading(true);

        uploadEmailCampaignRecipients({ file, id })
          .then((data) => {
            if (data.success) {
              fetchData();
            } else {
              setUploadError(data.errorMessage);
            }
          })
          .catch((_) => {
            setUploadError(errorMessage);
          })
          .finally(() => {
            setUploading(false);
          });
      },
      [id]
    );

    const completed = useMemo(() => !!recipients?.length, [recipients]);

    const handleDelete = useCallback(() => {
      setDeleteModalOpen(false);
      setModalLoading(true);
      deleteEmailCampaignRecipientFile(id)
        .then((data) => {
          if (data.success) {
            deleteRecipients();
          }
        })
        .finally(() => {
          setModalLoading(false);
        });
    }, [id]);

    const openDeleteModal = useCallback(() => {
      setDeleteModalOpen(true);
    }, []);

    const closeDeleteModal = useCallback(() => {
      setDeleteModalOpen(false);
    }, []);

    const handleNextAction = useCallback(() => {
      goNext();
    }, [template]);

    return (
      <>
        <Grid
          height="calc(100vh - 120px)"
          sx={{ overflowY: "auto" }}
          display="flex"
          justifyContent="center"
          container
          pt={6}
          px={{ lg: 12, md: 6, sm: 2, xs: 2 }}
          mb={5}
        >
          {modalLoading && <ModalLoading />}
          <DeleteDialog
            open={deleteModalOpen}
            onClose={closeDeleteModal}
            onNo={closeDeleteModal}
            onYes={handleDelete}
          />
          <Grid
            display="flex"
            flexDirection="column"
            alignItems={alignItems}
            pr={2}
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Typography
              whiteSpace="nowrap"
              fontFamily="MinervaModern-Regular"
              variant="h4"
            >
              UPLOAD YOUR EMAIL LIST
            </Typography>
            <Box maxWidth={"calc(100% - 86px)"}>
              <RemainingEmails />
              <Box mt={8}>
                {completed ? (
                  <>
                    <UploadedFile onDelete={openDeleteModal} name={fileName} />
                    <Typography
                      ml={2}
                      mt={4}
                      variant="subtitle2"
                      fontStyle="italic"
                    >
                      {uniqueRecipientsCount} unique recipients
                    </Typography>
                    <Typography ml={2} variant="subtitle2" fontStyle="italic">
                      {duplicateRecipientsCount} duplicate email addresses
                      removed
                    </Typography>
                  </>
                ) : (
                  <>
                    <DownloadSample />
                    <FileRequirements style={{ marginTop: 50 }} />
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            display="flex"
            flexDirection="column"
            alignItems={alignItems}
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Box
              display="flex"
              flexDirection="column"
              mb={3}
              mt={{ lg: 23, md: 20.5, sm: 10, xs: 10 }}
            >
              {completed ? (
                <RecipientListPreview recipients={recipients} />
              ) : (
                <>
                  <Typography
                    maxWidth={400}
                    variant="subtitle2"
                    fontWeight="400"
                    mb={1}
                    fontStyle="italic"
                  >
                    Choose any .xlsx , .csv, or .tsv containing your addressed
                    list and add it to the box below.
                  </Typography>
                  <ErrorBox
                    maxWidth={400}
                    title="Upload error:"
                    message={uploadError}
                  />

                  <FileUploader
                    error={!!uploadError}
                    uploading={uploading}
                    onChange={handleUpload}
                    style={{
                      marginTop: 22,
                      maxWidth: 400,
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}
                    accept=".csv, .tsv, .xlsx"
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
        <Progress
          currentPage={page}
          goToPage={goToPage}
          nextDisabled={!completed}
          onNext={handleNextAction}
        />
      </>
    );
  }
);

const alignItems = {
  lg: "unset",
  md: "unset",
  sm: "center",
  xs: "center",
};
