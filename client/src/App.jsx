import { Routes, Route } from "react-router-dom";
import AdministratorDashboard from "./pages/AdministratorDashboard";
import AmbulancePersonnelDashboard from "./pages/AmbulancePersonnelDashboard";
import Login from "./pages/Login";
import RequestorDashboard from "./pages/RequestorDashboard";
import SignUp from "./pages/SignUp";
import RequestForm from "./components/requestor/RequestForm";
import RequestorAllRequests from "./components/requestor/RequestorAllRequests";
import ViewMap from "./components/ViewMap";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<SignUp />} />
        <Route path="map" element={<ViewMap />} />
        <Route path="requestor" element={<RequestorDashboard />}>
          <Route path="request" element={<RequestForm />} />
          <Route path="requests" element={<RequestorAllRequests />} />
          <Route path="map" element={<ViewMap />} />
        </Route>
        <Route path="/administrator" element={<AdministratorDashboard />} />
        <Route
          path="/ambulance_personnel"
          element={<AmbulancePersonnelDashboard />}
        />
      </Routes>
    </div>
  );
}

export default App;
