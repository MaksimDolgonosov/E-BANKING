import './header.scss'
import { Link } from "react-router-dom";
import Arrow from "../../assets/icons/drop-down-arrow-small.svg";


// import Logo from "../../assets/images/logo.svg"


const Header: React.FC = () => {
    return (

        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo">
                    <Link to="/">
                        <span>E-banking</span>
                    </Link>
                </div>
                <div className="header__links">
                    <span className="header__link_buying">Для покупок
                        <svg className="header__link_img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M483.072 714.496l30.165333 30.208 415.957334-415.829333a42.837333 42.837333 0 0 0 0-60.288 42.538667 42.538667 0 0 0-60.330667-0.042667l-355.541333 355.413333-355.242667-355.413333a42.496 42.496 0 0 0-60.288 0 42.837333 42.837333 0 0 0-0.085333 60.330667l383.701333 383.872 1.706667 1.749333z" /></svg>
                    </span>
                    <span className="header__btn_business">Для бизнеса
                        <svg className="header__link_img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M483.072 714.496l30.165333 30.208 415.957334-415.829333a42.837333 42.837333 0 0 0 0-60.288 42.538667 42.538667 0 0 0-60.330667-0.042667l-355.541333 355.413333-355.242667-355.413333a42.496 42.496 0 0 0-60.288 0 42.837333 42.837333 0 0 0-0.085333 60.330667l383.701333 383.872 1.706667 1.749333z" /></svg>
                    </span>
                </div>
                <div className="header__btns">
                    <button className="header__btn_reg"><Link to="/registration">Регистрация</Link></button>
                    <button className="header__btn_log"><Link to="/login">Войти</Link></button>
                </div>
            </div>
        </header>
    )
}

export default Header;