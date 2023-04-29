import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdministratorDashboard from "./pages/AdministratorDashboard";
import AmbulancePersonnelDashboard from "./pages/AmbulancePersonnelDashboard";
import Login from "./pages/Login";
import RequestorDashboard from "./pages/RequestorDashboard";
import SignUp from "./pages/SignUp";
import RequestForm from "./components/requestor/RequestForm";
import RequestorAllRequests from "./components/requestor/RequestorAllRequests";
import ViewMap from "./components/global/ViewMap";
import RequestorDashboardPanel from "./components/requestor/RequestorDashboardPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import PersonnelAllRequests2 from "./components/ambulance-personnel/PersonnelAllRequests2";
import PersonnelAmbulance from "./components/ambulance-personnel/PersonnelAmbulance2";
import AuthContext from "./context/AuthContext";
import ScheduleContext from "./context/ScheduleContext";
import AmbulanceContext from "./context/AmbulanceContext";

const DashboardContext = React.createContext();

function App() {
  const queryClient = new QueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [ambulance, setAmbulance] = useState(null);
  const navigate = useNavigate();
  const toggleDashboard = () => {
    onOpen();
  };

  useEffect(() => {
    let userLoggedIn = localStorage.getItem("user");
    let schedule = localStorage.getItem("schedule");
    let ambulance = localStorage.getItem("ambulance");
    if (userLoggedIn) {
      setUser(userLoggedIn);
    }
    if (schedule) {
      setSchedule(schedule);
    }
    if (ambulance) {
      setAmbulance(ambulance);
    }
  }, []);
  console.log(user, schedule);
  const parsed_user_data = JSON.parse(user);
  const user_type = parsed_user_data?.user_type;
  console.log(user_type);

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
                <Route exact path="/map" element={<ViewMap />} />
              </Routes>

              <Routes>
                {user !== null && user_type === "requestor" ? (
                  <>
                    <Route
                      exact
                      path="/requestor"
                      element={<RequestorDashboard />}
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

              <ScheduleContext.Provider value={schedule}>
                <AmbulanceContext.Provider value={ambulance}>
                  <Routes>
                    {user !== null && user_type === "administrator" ? (
                      <>
                        <Route
                          exact
                          path="/administrator"
                          element={<AdministratorDashboard />}
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
                  <Routes>
                    {user !== null && user_type === "ambulance_personnel" ? (
                      <>
                        <Route
                          exact
                          path="/ambulance_personnel"
                          element={<AmbulancePersonnelDashboard />}
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
              </ScheduleContext.Provider>
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
