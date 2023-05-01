import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Spinner, Box } from "@chakra-ui/react";
import AuthContext from "./context/AuthContext";
import ScheduleContext, { ScheduleProvider } from "./context/ScheduleContext";
import AmbulanceContext from "./context/AmbulanceContext";

// import AdministratorDashboard from "./pages/AdministratorDashboard";
// import AmbulancePersonnelDashboard from "./pages/AmbulancePersonnelDashboard";
import Login from "./pages/Login";
// import RequestorDashboard from "./pages/RequestorDashboard";
import SignUp from "./pages/SignUp";
import RequestForm from "./components/requestor/RequestForm";
import RequestorAllRequests from "./components/requestor/RequestorAllRequests";
// import ViewMap from "./components/global/ViewMap";
import RequestorDashboardPanel from "./components/requestor/RequestorDashboardPanel";

import PersonnelDashboardPanel from "./components/ambulance-personnel/PersonnelDashboardPanel";
import HandledRequest from "./components/ambulance-personnel/PersonnelHandledRequest";
import PersonnelTripTickets from "./components/ambulance-personnel/PersonnelTripTickets";
import RequestorTripTickets from "./components/requestor/RequestorTripTickets";
import AdministratorTripTickets from "./components/administrator/AdministratorTripTickets";
import AdministratorRequests from "./components/administrator/AdministratorRequests";
import AdministratorAmbulance from "./components/administrator/AdministratorAmbulance";
import AdministratorDrivers from "./components/administrator/AdministratorDrivers";
import AdministratorDashboardPanel from "./components/administrator/AdministratorDashboardPanel";
import AdministratorReports from "./components/administrator/AdministratorReports";
import PersonnelAllRequests2 from "./components/ambulance-personnel/PersonnelAllRequests2";
import PersonnelAmbulance from "./components/ambulance-personnel/PersonnelAmbulance2";

const ViewMap = lazy(() => import("./components/global/ViewMap"));
const AdministratorDashboard = lazy(() =>
  import("./pages/AdministratorDashboard")
);
const AmbulancePersonnelDashboard = lazy(() =>
  import("./pages/AmbulancePersonnelDashboard")
);
const RequestorDashboard = lazy(() => import("./pages/RequestorDashboard"));

const DashboardContext = React.createContext();

const FallbackSpinner = () => {
  return (
    <Box
      height="50vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      Loading...
      <Spinner size="md" color="gray.500" />
    </Box>
  );
};

function App() {
  const queryClient = new QueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [ambulance, setAmbulance] = useState(null);

  const toggleDashboard = () => {
    onOpen();
  };

  const { updateScheduleData } = useContext(ScheduleContext);

  useEffect(() => {
    let userLoggedIn = localStorage.getItem("user");
    let schedule = localStorage.getItem("schedule");
    let ambulance = localStorage.getItem("ambulance");
    if (userLoggedIn) {
      setUser(userLoggedIn);
    }
    if (schedule) {
      updateScheduleData({
        schedule: schedule.status,
        ambulance: schedule.ambulance,
        ambulance_plate: schedule.ambulance_plate,
      });
    }
    if (ambulance) {
      setAmbulance(ambulance);
    }
  }, []);

  const parsed_user_data = JSON.parse(user);
  const user_type = parsed_user_data?.user_type;

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContext.Provider value={{ toggleDashboard, isOpen, onClose }}>
        <AuthContext.Provider value={user}>
          <div className="App">
            <React.Fragment>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/account/login" element={<Login />} />
                <Route exact path="/account/signup" element={<SignUp />} />
                <Route
                  exact
                  path="/map"
                  element={
                    <Suspense fallback={<FallbackSpinner />}>
                      <ViewMap />
                    </Suspense>
                  }
                />
              </Routes>

              <Routes>
                {user !== null && user_type === "requestor" ? (
                  <>
                    <Route
                      exact
                      path="/requestor"
                      element={
                        <Suspense fallback={<FallbackSpinner />}>
                          <RequestorDashboard />
                        </Suspense>
                      }
                    >
                      <Route
                        exact
                        path=""
                        element={<RequestorDashboardPanel />}
                      />
                      <Route exact path="request" element={<RequestForm />} />
                      <Route
                        exact
                        path="requests"
                        element={<RequestorAllRequests />}
                      />
                      <Route
                        exact
                        path="trip_tickets"
                        element={<RequestorTripTickets />}
                      />
                      <Route exact path="map" element={<ViewMap />} />
                    </Route>
                  </>
                ) : (
                  <Route exact element={<Navigate to="/account/login" />} />
                )}
              </Routes>

              <Routes>
                {user !== null && user_type === "administrator" ? (
                  <>
                    <Route
                      exact
                      path="/administrator"
                      element={
                        <Suspense fallback={<FallbackSpinner />}>
                          <AdministratorDashboard />
                        </Suspense>
                      }
                    >
                      <Route
                        exact
                        path=""
                        element={<AdministratorDashboardPanel />}
                      />
                      <Route
                        exact
                        path="requests"
                        element={<AdministratorRequests />}
                      />
                      <Route
                        exact
                        path="ambulance"
                        element={<AdministratorAmbulance />}
                      />
                      <Route
                        exact
                        path="drivers"
                        element={<AdministratorDrivers />}
                      />
                      <Route
                        exact
                        path="trip_tickets"
                        element={<AdministratorTripTickets />}
                      />
                      <Route exact path="map" element={<ViewMap />} />
                      <Route
                        exact
                        path="reports"
                        element={<AdministratorReports />}
                      />
                    </Route>
                  </>
                ) : (
                  <Route exact element={<Navigate to="/account/login" />} />
                )}
              </Routes>
              <ScheduleProvider>
                <AmbulanceContext.Provider value={ambulance}>
                  <Routes>
                    {user !== null && user_type === "ambulance_personnel" ? (
                      <>
                        <Route
                          exact
                          path="/ambulance_personnel"
                          element={
                            <Suspense fallback={<FallbackSpinner />}>
                              <AmbulancePersonnelDashboard />
                            </Suspense>
                          }
                        >
                          <Route
                            exact
                            path=""
                            element={<PersonnelDashboardPanel />}
                          />
                          <Route
                            exact
                            path="requests"
                            element={<HandledRequest />}
                          />
                          <Route
                            exact
                            path="pending_requests"
                            element={<PersonnelAllRequests2 />}
                          />
                          <Route
                            exact
                            path="trip_tickets"
                            element={<PersonnelTripTickets />}
                          />
                          <Route
                            exact
                            path="ambulance"
                            element={<PersonnelAmbulance />}
                          />
                          <Route exact path="map" element={<ViewMap />} />
                        </Route>
                      </>
                    ) : (
                      <Route exact path="/account/login" element={<Login />} />
                    )}
                  </Routes>
                </AmbulanceContext.Provider>
              </ScheduleProvider>
            </React.Fragment>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContext.Provider>
      </DashboardContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
export const useDashboardContext = () => useContext(DashboardContext);
