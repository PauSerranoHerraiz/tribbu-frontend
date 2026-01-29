import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TribbuListPage from "./pages/TribbuListPage";
import TribbuDetailsPage from "./pages/TribbuDetailsPage";
import EditTribbuPage from "./pages/EditTribbuPage";
import DemoPage from "./pages/DemoPage";
import TribbuGatePage from "./pages/TribbuGatePage";
import InvitationPage from "./pages/InvitationPage";
import About from "./pages/About";
import NotificationsPage from "./pages/NotificationsPage";

import Layout from "./components/Layout";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import { logPageView } from "./utils/analytics";

function App() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/tribbus"
          element={
            <IsPrivate>
              <Layout>
                <TribbuListPage />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/tribbus/:tribbuId"
          element={
            <IsPrivate>
              <Layout>
                <TribbuDetailsPage />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/tribbus/:tribbuId/edit"
          element={
            <IsPrivate>
              <Layout>
                <EditTribbuPage />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/tribbus/gate/:tribbuId"
          element={
            <IsPrivate>
              <Layout>
                <TribbuGatePage />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/invitations/:invitationId"
          element={
            <IsPrivate>
              <Layout>
                <InvitationPage />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/notifications"
          element={
            <IsPrivate>
              <Layout>
                <NotificationsPage />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Layout>
                <SignupPage />
              </Layout>
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Layout>
                <LoginPage />
              </Layout>
            </IsAnon>
          }
        />
        <Route
          path="/demo"
          element={
            <Layout>
              <DemoPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;