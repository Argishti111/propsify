import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchRecipients,
  deleteRecipients,
  setModalLoading,
} from "../../../../../redux";
import { deletePrintCampaignFile } from "../../../../../services";
import {
  CustomerTable,
  DeleteDialog,
  StackPagination,
  UploadedFile,
} from "../../../../components";

const mapStateToProps = (state) => {
  return {
    recipients: state.printMarketing.recipients,
    fileName: state.printMarketing.fileName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipients: (id) => dispatch(fetchRecipients(id)),
    deleteRecipients: () => dispatch(deleteRecipients()),
    setModalLoading: (value) => dispatch(setModalLoading(value)),
  };
};

export const CustomerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    recipients,
    fetchRecipients,
    goNext,
    pageCount,
    page,
    fileName,
    selectedCampaign,
    goBack,
    setModalLoading,
    deleteRecipients,
  }) => {
    useEffect(() => {
      fetchRecipients(selectedCampaign.id);
    }, []);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const openDeleteModal = useCallback(() => {
      setDeleteModalOpen(true);
    }, []);
    const closeDeleteModal = useCallback(() => {
      setDeleteModalOpen(false);
    }, []);
    const handleDelete = useCallback(() => {
      setDeleteModalOpen(false);
      setModalLoading(true);
      deletePrintCampaignFile(selectedCampaign.id)
        .then((data) => {
          if (data.success) {
            goBack();
            deleteRecipients();
          }
        })
        .finally(() => {
          setModalLoading(false);
        });
    }, [selectedCampaign]);
    return (
      <>
        <DeleteDialog
          open={deleteModalOpen}
          onClose={closeDeleteModal}
          onNo={closeDeleteModal}
          onYes={handleDelete}
        />
        <Box
          display="flex"
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
            mb={3}
            px={{ md: 11, sm: 1, xs: 1 }}
            flexDirection="column"
          >
            <Typography
              textAlign="center"
              variant="h4"
              marginTop={7}
              fontFamily="MinervaModern-Regular"
            >
              UPLOAD YOUR CUSTOMER LIST
            </Typography>
            <UploadedFile
              onDelete={openDeleteModal}
              marginTop={3}
              name={fileName}
            />
            {/* <Typography
              textAlign="center"
              alignSelf="center"
              fontStyle="italic"
              fontWeight="500"
              variant="h6"
              style={{ maxWidth: 506, marginTop: 23 }}
            >
              Identify your fields
            </Typography>
            <Typography
              fontWeight="500"
              fontSize={15}
              fontStyle="italic"
              variant="p"
              textAlign="center"
              marginTop={2}
            >
              No Identify each column for the file you uploaded. Your file must
              contain these required columns: First Name, Last Name, Address,
              City, State, and ZIP Code. Additional columns such as Address 2
              and Company Name are optional. Additionally you may have a column
              named Company name or Full Name in place of the First Name and
              Last name columns.
            </Typography> */}
            <Typography
              fontWeight="500"
              fontSize="0.938rem"
              variant="p"
              textAlign="center"
              mt={2}
            >
              Shown below is a preview of your data file which contains the
              first {recipients.length} rows of data.
            </Typography>
          </Box>
          <Box
            // display="flex"
            minWidth={{ md: 0, sm: 0, xs: "100vw" }}
            sx={{ overflowX: { md: "unset", sm: "scroll", xs: "scroll" } }}
            // flexDirection="column"
          >
            <CustomerTable data={recipients} />
          </Box>
        </Box>
        <StackPagination onNext={goNext} page={page} pageCount={pageCount} />
      </>
    );
  }
);
