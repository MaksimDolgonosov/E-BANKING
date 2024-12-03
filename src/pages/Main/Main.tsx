
import "./main.scss";
import { useState } from "react";


import Header from "../../components/HeaderMain/Header";
import Promo from "../../components/Promo/Promo";
// import HeaderBoot from "../../components/HeaderBoot/HeaderBoot";
import Burger from "../../components/Burger/Burger";
import Description from "../../components/Description/Description";
import Overview from "../../components/overview/Overview";

// import { useEffect } from "react";
// import { useAppDispatch } from "../../hooks/hook";
// import { fetchUserCards } from "../../reducers/cardReducer";





const MainPage: React.FC = () => {

    const [activeBurger, setActiveBurger] = useState(false);

    // fetch(`http://localhost:3002/api/cards`, { method: "POST", body: JSON.stringify(1), headers: { "Content-Type": "application/json" } })
    // fetch(`http://localhost:3002/api/cards/getCards?id=1`)


    const onToggleBurger = (state: boolean): void => {
        setActiveBurger(state)
    }
    // console.log(activeBurger + ": active burger");
    return (
        <div className="main">
            {/* <HeaderBoot/> */}
            <Header onToggleBurger={onToggleBurger} />
            {activeBurger ? <Burger /> : null}
            <Promo />
            <Description />
            <Overview />
        </div>

    )

}

export default MainPage;