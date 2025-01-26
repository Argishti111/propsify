import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { AppRoutes } from "./routing";
import { connect } from "react-redux";
import { fetchUser } from "./redux";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./shared/styles/theme";
import "./services/axiosMiddlewares";
import { Loading } from "./shared/components";

function App({ fetchUser, auth, hasPayment, loading, maintenance }) {
  useEffect(() => {
    fetchUser();
  }, [auth]);

  if (loading) {
    return <Loading style={{ top: 0, bottom: 100 }} />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes
          auth={auth}
          hasPayment={hasPayment}
          maintenance={maintenance}
        />
      </Router>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    hasPayment: state.user.hasPayment,
    loading: state.user.loading,
    maintenance: state.user.maintenance,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
