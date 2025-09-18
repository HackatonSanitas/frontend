import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      
      <Header />

      <Routes>
        {/* tus páginas */}
      </Routes>

     
      <Footer />
    </BrowserRouter>
  );
}

export default App;
