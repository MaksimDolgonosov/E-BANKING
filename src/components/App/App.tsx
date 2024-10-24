import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import MainPage from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage/LoginPage";
import AccountPage from "../../pages/AccountPage/AccountPage";
function App() {




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/accountPage" element={<AccountPage />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
