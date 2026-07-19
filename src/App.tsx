import "./App.css";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* `:code` là dynamic parameter để lấy mã cca3 của quốc gia */}
        <Route path="/country/:code" element={<DetailPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
