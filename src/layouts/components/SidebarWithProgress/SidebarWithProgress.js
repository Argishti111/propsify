import { Box, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouterContext } from "../../../routing/AppRoutes";
import { NavCheckBox, NavCheckBoxDivider } from "./components";
import "./SidebarWithProgress.css";

const SIGN_IN = "/sign-in";
const SIGN_UP_ACCOUNT = "/sign-up/account";
const SIGN_UP = "/sign-up";
const EMAIL_ACCESS = "/sign-up/email-access";
const JOIN_WAITLIST = "/sign-up/join-waitlist";

const resizeTimeout = 0;

export function SidebarWithProgress({ ...rest }) {
  const { route } = useContext(RouterContext);
  const sidebarRef = useRef();
  const navigate = useNavigate();

  const inSignUp = useMemo(
    () =>
      route.to.includes(SIGN_UP) &&
      route.to !== EMAIL_ACCESS &&
      route.to !== JOIN_WAITLIST, // TODO: remove this in future
    [route]
  );
  const [top, setTop] = useState("auto");

  useEffect(() => {
    window.addEventListener("resize", changeLogoTextPosition);
    return () => {
      window.removeEventListener("resize", changeLogoTextPosition);
    };
  }, []);

  const changeLogoTextPosition = useCallback(() => {
    clearTimeout(resizeTimeout);
    setTimeout(() => {
      setTop(sidebarRef.current.getBoundingClientRect().height / 2 - 16);
    }, 10);
  }, [sidebarRef]);

  useMemo(() => {
    if (sidebarRef.current) {
      changeLogoTextPosition();
    }
  }, [sidebarRef.current, inSignUp]);

  const accountDone = useMemo(
    () =>
      route.to !== SIGN_UP_ACCOUNT &&
      inSignUp &&
      route.to !== EMAIL_ACCESS &&
      route.to !== JOIN_WAITLIST,
    [inSignUp, route]
  );
  const sidebarHeight = useMemo(() => (inSignUp ? 216 : 100), [inSignUp]);
  return (
    <Box
      ref={sidebarRef}
      width={390}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="left"
      sx={{
        height: {
          md: "auto",
          sx: sidebarHeight,
          xs: sidebarHeight,
        },
      }}
      className={`sidebar sidebar-with-progress ${
        inSignUp ? "sidebar-sign-up" : ""
      }`}
    >
      <Link style={{ display: "contents" }} to="/sign-up/email-access">
        <img
          alt=""
          onClick={() => {
            navigate("/");
          }}
          width={250}
          style={
            inSignUp
              ? {
                  padding: "0 20px",
                  top: 88,
                  position: "absolute",
                  pointerEvents: "all",
                }
              : {
                  top,
                  padding: "0 20px",
                  position: "absolute",
                  pointerEvents: "all",
                }
          }
          src={require("../../../shared/static/icons/logo-text.svg").default}
        />
      </Link>
      {route.from === SIGN_IN && SIGN_IN === route.to ? null : (
        <Box
          alignSelf="start"
          mt={{ md: 0, sm: 2, xs: 2 }}
          pl={{ md: 11, sm: 0, xs: 0 }}
          className={
            inSignUp
              ? "nav-checkbox-main-container opacity-1-500 w-100"
              : "nav-checkbox-main-container opacity-0-500 w-100"
          }
        >
          <Typography
            pb={{ md: 6, sm: 0, xs: 0 }}
            className="step-number"
            textAlign={{ md: "unset", sm: "center", xs: "center" }}
            color="#ECD9CC"
            variant="h5"
            fontWeight="500"
            fontStyle="italic"
          >
            Step {accountDone && inSignUp ? 2 : 1} of 2
          </Typography>
          <Box className="nav-checkbox-container">
            <NavCheckBox
              // style={{ alignItems: "flex-start" }}
              checked={accountDone}
              to={SIGN_UP_ACCOUNT}
              label="Account info"
            />
            <NavCheckBoxDivider />
            <NavCheckBox
              // style={{ alignItems: "flex-end" }}
              to="/sign-up/payment"
              label="Payment & Billing"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
