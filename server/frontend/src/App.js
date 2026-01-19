import LoginPanel from "./components/Login/Login"
import { Routes, Route } from "react-router-dom";

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
       
        {/* Add other pages later */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/dealers" element={<Dealers />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
       
        {/* Fallback for unknown routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}  
export default App;
