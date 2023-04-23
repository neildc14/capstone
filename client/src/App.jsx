import { Routes, Route, Navigate } from "react-router-dom";
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

const DashboardContext = React.createContext();

function App() {
  const queryClient = new QueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [loadRoute, setLoadRoute] = useState(false);

  const toggleDashboard = () => {
    onOpen();
  };

  useEffect(() => {
    let userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      setUser(userLoggedIn);
    }
    setLoadRoute(true);
  });
  console.log(user);
  const parsed_user_data = JSON.parse(user);
  const user_type = parsed_user_data?.user_type;
  console.log(user_type);

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContext.Provider value={{ toggleDashboard, isOpen, onClose }}>
        <AuthContext.Provider value={user}>
          <div className="App">
            {loadRoute && (
              <React.Fragment>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/account/login" element={<Login />} />
                  <Route path="/account/signup" element={<SignUp />} />
                  <Route path="map" element={<ViewMap />} />
                </Routes>

                <Routes>
                  <Route
                    path="requestor"
                    element={
                      user && user_type === "requestor" ? (
                        <RequestorDashboard />
                      ) : (
                        <Navigate to="/account/login" />
                      )
                    }
                  >
                    <Route path="" element={<RequestorDashboardPanel />} />
                    <Route path="request" element={<RequestForm />} />
                    <Route path="requests" element={<RequestorAllRequests />} />
                    <Route
                      path="trip_tickets"
                      element={<RequestorTripTickets />}
                    />
                    <Route path="map" element={<ViewMap />} />
                  </Route>
                </Routes>

                <Routes>
                  <Route
                    path="/administrator"
                    element={
                      user && user_type === "administrator" ? (
                        <AdministratorDashboard />
                      ) : (
                        <Navigate to="/account/login " />
                      )
                    }
                  >
                    <Route path="" element={<AdministratorDashboardPanel />} />
                    <Route
                      path="requests"
                      element={<AdministratorRequests />}
                    />
                    <Route
                      path="ambulance"
                      element={<AdministratorAmbulance />}
                    />
                    <Route path="drivers" element={<AdministratorDrivers />} />
                    <Route
                      path="trip_tickets"
                      element={<AdministratorTripTickets />}
                    />
                    <Route path="map" element={<ViewMap />} />
                    <Route path="reports" element={<AdministratorReports />} />
                  </Route>
                </Routes>

                <Routes>
                  <Route
                    path="ambulance_personnel"
                    element={
                      user && user_type === "ambulance_personnel" ? (
                        <AmbulancePersonnelDashboard />
                      ) : (
                        <Navigate to="/account/login" />
                      )
                    }
                  >
                    <Route path="" element={<PersonnelDashboardPanel />} />
                    <Route path="requests" element={<HandledRequest />} />
                    <Route
                      path="pending_requests"
                      element={<PersonnelAllRequests2 />}
                    />
                    <Route
                      path="trip_tickets"
                      element={<PersonnelTripTickets />}
                    />
                    <Route path="ambulance" element={<PersonnelAmbulance />} />
                    <Route path="map" element={<ViewMap />} />
                  </Route>
                </Routes>
              </React.Fragment>
            )}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContext.Provider>
      </DashboardContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
export const useDashboardContext = () => useContext(DashboardContext);
