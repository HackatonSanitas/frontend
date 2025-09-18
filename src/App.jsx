import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/home.jsx";
import MedicationsPage from "./pages/home/Medications.jsx";

function App() {
  return (
    <BrowserRouter>
      
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medications" element={<MedicationsPage />} />
      </Routes>

    
      <Footer />
    </BrowserRouter>
  );
}

export default App;
