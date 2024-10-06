import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import MainPage from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage/LoginPage";
function App() {

  return (
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    
    </BrowserRouter>

  )
}

export default App
