import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import MainPage from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage/LoginPage";
import AccountPage from "../../pages/AccountPage/AccountPage";
import { useEffect } from "react";
import { checkUser } from "../../reducers/userReducer";
import { useAppDispatch } from "../../hooks/hook";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(localStorage.getItem("token"))
    dispatch(checkUser(null));
    
  }, [])


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
