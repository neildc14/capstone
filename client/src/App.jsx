import { Routes, Route } from "react-router-dom";
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
import AllRequests from "./components/ambulance-personnel/PersonnelAllRequests";
import PersonnelTripTickets from "./components/ambulance-personnel/PersonnelTripTickets";
import PersonnelAmbulancePage from "./components/ambulance-personnel/PersonnelAmbulance";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="map" element={<ViewMap />} />
          <Route path="requestor" element={<RequestorDashboard />}>
            <Route path="" element={<RequestorDashboardPanel />} />
            <Route path="request" element={<RequestForm />} />
            <Route path="requests" element={<RequestorAllRequests />} />
            <Route path="map" element={<ViewMap />} />
          </Route>
          <Route path="/administrator" element={<AdministratorDashboard />} />
          <Route
            path="ambulance_personnel"
            element={<AmbulancePersonnelDashboard />}
          >
            <Route path="" element={<PersonnelDashboardPanel />} />
            <Route path="requests" element={<HandledRequest />} />
            <Route path="all_requests" element={<AllRequests />} />
            <Route path="trip_tickets" element={<PersonnelTripTickets />} />
            <Route path="ambulance" element={<PersonnelAmbulancePage />} />
            <Route path="map" element={<ViewMap />} />
          </Route>
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
