import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import MainPage from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage/LoginPage";
import AccountPage from "../../pages/AccountPage/AccountPage";
import { useEffect } from "react";
import { checkUser, fetchUser } from "../../reducers/userReducer";
import { useAppDispatch } from "../../hooks/hook";
import { TServerDataToken } from "../../types/types";
import { TToken } from "../../reducers/userReducer";
import { jwtDecode } from "jwt-decode";
import useExchange from "../../hooks/exchange";
import { checkCard } from "../../reducers/cardReducer";

function App() {
  const dispatch = useAppDispatch();
  dispatch(checkCard("2244 6784 9876 5429")).then((data) => console.log(data.payload));

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkUser(localStorage.getItem("token"))).then(() => {
        const token = jwtDecode(localStorage.getItem("token")!);
        console.log(token);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/accountPage" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
