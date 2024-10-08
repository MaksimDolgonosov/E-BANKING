
import "./main.scss";
import { useState } from "react";


import Header from "../../components/HeaderMain/Header";
import Promo from "../../components/Promo/Promo";
// import HeaderBoot from "../../components/HeaderBoot/HeaderBoot";
import Burger from "../../components/Burger/Burger";
import Descriptiont from "../../components/Description/Description";
import Overview from "../../components/overview/Overview";
const MainPage: React.FC = () => {

    const [activeBurger, setActiveBurger] = useState(false);

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
            <Descriptiont />
            <Overview/>
        </div>

    )

}

export default MainPage;