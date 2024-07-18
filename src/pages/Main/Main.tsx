import Header from "../../components/HeaderMain/Header";
import "./main.scss";
import Promo from "../../components/Promo/Promo";
import HeaderBoot from "../../components/HeaderBoot/HeaderBoot";
const MainPage: React.FC = () => {

    return (
        <div className="main">
            <HeaderBoot/>
            {/* <Header /> */}
            <Promo/>
        </div>

    )

}

export default MainPage;