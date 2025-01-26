import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import { RouteWithLayout } from "./RouteWithLayout";
import { AuthLayout, ProfileLayout, MainLayout, EmptyLayout } from "../layouts";
import {
  EmailMarketing,
  ForgotPassword,
  Home,
  DigitalMarketing,
  SellersInsights,
  PasswordRecover,
  InvalidRecoveryLink,
  RecoveryRequestSent,
  PrintMarketing,
  Properties,
  SignIn,
  SignUp,
  ProfileSettings,
  CompanyProfile,
  SubscriptionPlan,
  UserManagement,
  BuyersInsights,
  WaitlistJoinMessage,
  Unsubscribe,
  Maintenance,
} from "../pages";
import {
  CreateAccount,
  Payment,
  EmailAccessCheck,
  JoinTheWaitlist,
} from "../pages/SignUp/components";
import { ProfileDetails } from "../pages/ProfileSettings/nestedPages";
import { Users } from "../pages/UserManagement/nestedPages";

export const RouterContext = React.createContext();

export function AppRoutes({ auth, hasPayment, maintenance }) {
  const location = useLocation();
  const [route, setRoute] = useState({
    from: location.pathname,
    to: location.pathname,
  });

  useEffect(() => {
    setRoute((prev) => {
      return {
        from: prev.to,
        to: location.pathname,
      };
    });
  }, [location]);

  const returnUrl = auth ? "" : `returnUrl=${location.pathname}`;
  if (maintenance) {
    return (
      <Routes>
        <Route path="*" element={<Maintenance />} />
      </Routes>
    );
  }
  return (
    <RouterContext.Provider value={{ route }}>
      {auth ? (
        <Routes>
          <Route
            path="/unsubscribe"
            element={
              <RouteWithLayout Layout={EmptyLayout} Component={Unsubscribe} />
            }
          />
          <Route
            path="/market-insights/cities-zip-codes"
            element={
              <RouteWithLayout
                Layout={MainLayout}
                Component={SellersInsights}
              />
            }
          />

          <Route
            path="/market-insights/buyers-insights"
            element={
              <RouteWithLayout Layout={MainLayout} Component={BuyersInsights} />
            }
          />
          <Route
            path="/market-insights/properties"
            element={
              <RouteWithLayout Layout={MainLayout} Component={Properties} />
            }
          />
          <Route
            path="/lead-generation/digital-marketing/*"
            element={
              <RouteWithLayout
                Layout={MainLayout}
                Component={DigitalMarketing}
              />
            }
          />
          <Route
            path="/lead-generation/print-marketing/*"
            element={
              <RouteWithLayout Layout={MainLayout} Component={PrintMarketing} />
            }
          />
          <Route
            path="/lead-generation/email-marketing/*"
            element={
              <RouteWithLayout Layout={MainLayout} Component={EmailMarketing} />
            }
          />
          <Route
            path="/profile"
            element={
              <RouteWithLayout
                Layout={ProfileLayout}
                Component={ProfileSettings}
              />
            }
          >
            <Route path="*" element={<ProfileDetails />} />
          </Route>
          <Route
            path="/company"
            element={
              <RouteWithLayout
                Layout={ProfileLayout}
                Component={CompanyProfile}
              />
            }
          />
          <Route
            path="/subscription"
            element={
              <RouteWithLayout
                Layout={ProfileLayout}
                Component={SubscriptionPlan}
              />
            }
          />
          <Route
            path="/user-management"
            element={
              <RouteWithLayout
                Layout={ProfileLayout}
                Component={UserManagement}
              />
            }
          >
            <Route path="*" element={<Users />} />
          </Route>
          <Route
            path="/password-recovery"
            element={
              <RouteWithLayout
                Layout={AuthLayout}
                Component={PasswordRecover}
              />
            }
          />
          <Route
            path="/invalid-recovery"
            element={
              <RouteWithLayout
                Layout={AuthLayout}
                Component={InvalidRecoveryLink}
              />
            }
          />
          <Route
            path="/recovery-request"
            element={
              <RouteWithLayout
                Layout={AuthLayout}
                Component={RecoveryRequestSent}
              />
            }
          />
          <Route
            path="/home"
            element={<RouteWithLayout Layout={MainLayout} Component={Home} />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/unsubscribe"
            element={
              <RouteWithLayout Layout={EmptyLayout} Component={Unsubscribe} />
            }
          />
          <Route
            path="/sign-in"
            element={<RouteWithLayout Layout={AuthLayout} Component={SignIn} />}
          />
          <Route
            path="/waitlist-join-message"
            element={
              <RouteWithLayout
                Layout={AuthLayout}
                Component={WaitlistJoinMessage}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RouteWithLayout Layout={AuthLayout} Component={ForgotPassword} />
            }
          />
          <Route
            path="/password-recovery"
            element={
              <RouteWithLayout
                Layout={AuthLayout}
                Component={PasswordRecover}
              />
            }
          />
          <Route
            path="/invalid-recovery"
            element={
              <RouteWithLayout
                Layout={AuthLayout}
                Component={InvalidRecoveryLink}
              />
            }
          />
          <Route
            path="/recovery-request"
            element={
              <RouteWithLayout
                Layout={AuthLayout}
                Component={RecoveryRequestSent}
              />
            }
          />
          <Route path="/sign-up" element={<Navigate to="/sign-up/account" />} />
          <Route
            path="/sign-up"
            element={<RouteWithLayout Layout={AuthLayout} Component={SignUp} />}
          >
            <Route
              path="/sign-up/email-access"
              element={<EmailAccessCheck />}
            />
            <Route
              path="/sign-up/join-waitlist"
              element={<JoinTheWaitlist />}
            />
            <Route path="/sign-up/account" element={<CreateAccount />} />
            <Route path="/sign-up/payment" element={<Payment />} />
          </Route>

          <Route
            path="*"
            element={
              <Navigate
                to={
                  hasPayment
                    ? `/sign-up/email-access?${returnUrl}`
                    : `/sign-up/payment?${returnUrl}`
                }
              />
            }
          />
        </Routes>
      )}
    </RouterContext.Provider>
  );
}
