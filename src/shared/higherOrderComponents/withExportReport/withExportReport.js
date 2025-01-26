import React, { useCallback, useState, useReducer, useEffect } from "react";
import { Modal, ModalLoading } from "../../components";
import { setModalLoading, setUserCompany } from "../../../redux";
import { connect, useDispatch } from "react-redux";
import { Company, ExportReport } from "./components";
import { useStackNavigation } from "../../hooks";
import { getUserCompany } from "../../../services";

const mapDispatchToProps = (dispatch) => {
  return {
    setModalLoading: (value) => dispatch(setModalLoading(value)),
    setUserCompany: (company) => dispatch(setUserCompany(company)),
  };
};
const mapStateToProps = (state) => {
  return { modalLoading: state.printMarketing.modalLoading };
};

export const withExportReport = (
  WrapedComponent,
  canChoosePeriod,
  onSubmit
) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ setModalLoading, modalLoading, setUserCompany, ...rest }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const reduxDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { Component, goNext, goBack, page } = useStackNavigation([
      Company,
      ExportReport,
    ]);
    const [additionalData, setAdditionalData] = useState({});

    // close all modals
    const handleClose = useCallback(() => {
      setOpen(false);
      if (page === 2) {
        setTimeout(() => {
          goBack();
        }, 0);
      }
    }, [page]);

    useEffect(() => {
      if (open) {
        fetchCompany();
      }
    }, [open]);

    const fetchCompany = useCallback(() => {
      setModalLoading(true);
      getUserCompany()
        .then((data) => {
          let allFilled = true;
          for (let key of Object.keys(data)) {
            if (!data[key]) {
              allFilled = false;
              data[key] = "";
            }
          }
          if (allFilled) {
            goNext();
          }
          dispatch({ type: INIT, payload: { ...data } });
          reduxDispatch(setUserCompany(data));
        })
        .finally(() => {
          setModalLoading(false);
        });
    }, []);

    const handleChange = useCallback(
      (key) => {
        return (e) => {
          dispatch({
            type: CHANGE_VALUE,
            payload: { key, value: e.target.value },
          });
        };
      },
      [state]
    );

    const handleOpen = useCallback((data) => {
      setAdditionalData(data);
      setOpen(true);
    }, []);

    return (
      <>
        <WrapedComponent openExportReport={handleOpen} {...rest} />
        <>
          {modalLoading && <ModalLoading />}
          <Modal
            maxWidth="lg"
            titleChildren={<div />}
            PaperProps={{ style: { height: "100vh" } }}
            open={open}
            style={{ height: "100vh" }}
            onClose={handleClose}
            title="Export report"
            fullScreenOnSM
          >
            <Component
              open={open}
              state={state}
              handleChange={handleChange}
              setModalLoading={setModalLoading}
              additionalData={additionalData}
              onClose={handleClose}
              canChoosePeriod={canChoosePeriod}
              onSubmit={onSubmit}
            />
          </Modal>
        </>
      </>
    );
  });
};

const initialState = {
  name: null,
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
  save: false,
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
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
