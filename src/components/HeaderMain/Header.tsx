import './header.scss'
import { Link } from "react-router-dom";


// import Logo from "../../assets/images/logo.svg"


const Header: React.FC = () => {
    return (

        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo">
                    <Link to="/">
                        <span>E-banking</span>
                        {/* <svg width="57" height="40" viewBox="0 0 57 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.33 0c-11.14 0-20 8.987-20 20 0 11.14 8.987 20 20 20 11.012 0 20-8.987 20-20s-8.988-20-20-20zm0 27.342c-4.051 0-7.47-3.418-7.47-7.469 0-4.05 3.419-7.468 7.47-7.468 4.05 0 7.468 3.418 7.468 7.468-.127 4.178-3.418 7.469-7.469 7.469zM16.203"></path>
                    </svg> */}
                    </Link>
                </div>
                <div className="header__links">
                    <span className="header__link_buying">Для покупок</span>
                    <span className="header__btn_business">Для бизнеса</span>
                </div>
                <div className="header__btns">
                    <button className="header__btn_reg">Регистрация</button>
                    <button className="header__btn_log">Войти</button>
                </div>
            </div>
        </header>
    )
}

export default Header;