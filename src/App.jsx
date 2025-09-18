import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/home.jsx";
import RemindersPage from './pages/reminders-page/RemindersPage';

function App() {
  return (
    <BrowserRouter>
      
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />git 

        <Route path="/recordatorios" element={<RemindersPage />} />
      </Routes>

    
      <Footer />
    </BrowserRouter>
  );
}

export default App;
