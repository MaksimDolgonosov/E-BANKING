import "./promo.scss"
import Cards from "../../assets/images/cards1.png";
import { Link } from "react-router-dom";


const Promo: React.FC = () => {
    return (
        <div className="promo">
            <div className="promo__wrapper">
                <h1 className="promo__title">E-banking<br />виртуальное банковское приложение</h1>
                <h3 className="promo__subtitle">создано для учебных целей по web-разработке</h3>
                <Link to="/registration"><button className="promo__btn">Зарегистрироваться</button></Link>
            </div>
            <img className="promo__img" src={Cards} alt="cards" />
        </div>
    )
}

export default Promo;