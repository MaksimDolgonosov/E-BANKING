import Header from "../../components/HeaderMain/Header";
import "./main.scss";
import Promo from "../../components/Promo/Promo";

const MainPage: React.FC = () => {

    return (
        <div className="main">
            <Header />
            <Promo/>
        </div>

    )

}

export default MainPage;