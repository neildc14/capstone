import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
