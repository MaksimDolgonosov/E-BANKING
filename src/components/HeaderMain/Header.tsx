import { useEffect, useState } from 'react';
import './header.scss'
import { Link } from "react-router-dom";


// import Logo from "../../assets/images/logo.svg"
interface IHeader {
    onToggleBurger: (state: boolean) => void;
};

const Header: React.FC<IHeader> = ({ onToggleBurger }) => {
    const [activeHeader, setActiveHeader] = useState(false);
    const [activeReg, setActiveReg] = useState(false);
    const [activeBurger, setActiveBurger] = useState(false);

    useEffect(() => {
        onToggleBurger(activeBurger)
    }, [activeBurger])

    const styleRegBG = () => {
        if (activeHeader && !activeReg) {
            return { backgroundColor: "#00000018", color: "black" }
        } else if (!activeHeader && activeReg) {
            return { backgroundColor: "#ffffffe8" }
        }
    }

    const styleRegC = () => {
        if (activeHeader && !activeReg) {
            return { color: "black" }
        } else if (!activeHeader && activeReg) {
            return { color: "#702ff4" }
        }
    }
    //console.log(activeBurger)
    return (
        <header className="header" style={activeHeader || activeBurger ? { backgroundColor: "#ffffff" } : { backgroundColor: "#ffffff00" }}>
            <div className="header__wrapper" style={activeHeader ? { backgroundColor: "#ffffff" } : { backgroundColor: "#ffffff00" }}>
                <div className="header__logo">
                    <Link to="/">
                        <span style={activeHeader || activeBurger ? { color: "#702ff4" } : { color: "#ffffff" }}>E-banking</span>
                    </Link>
                </div>
                <div className="header__links">
                    <span className="header__link_buying"
                        onMouseEnter={() => setActiveHeader(true)}
                        onMouseLeave={() => setActiveHeader(false)}
                        style={activeHeader ? { color: "#000000" } : { color: "#ffffff" }}
                    >Для покупок
                        <svg fill={activeHeader ? "#000000" : "#ffffff"} className="header__link_img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M483.072 714.496l30.165333 30.208 415.957334-415.829333a42.837333 42.837333 0 0 0 0-60.288 42.538667 42.538667 0 0 0-60.330667-0.042667l-355.541333 355.413333-355.242667-355.413333a42.496 42.496 0 0 0-60.288 0 42.837333 42.837333 0 0 0-0.085333 60.330667l383.701333 383.872 1.706667 1.749333z" /></svg>
                    </span>
                    <span className="header__btn_business"
                        onMouseEnter={() => setActiveHeader(true)}
                        onMouseLeave={() => setActiveHeader(false)}
                        style={activeHeader ? { color: "#000000" } : { color: "#ffffff" }}
                    >Для бизнеса
                        <svg fill={activeHeader ? "#000000" : "#ffffff"} className="header__link_img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M483.072 714.496l30.165333 30.208 415.957334-415.829333a42.837333 42.837333 0 0 0 0-60.288 42.538667 42.538667 0 0 0-60.330667-0.042667l-355.541333 355.413333-355.242667-355.413333a42.496 42.496 0 0 0-60.288 0 42.837333 42.837333 0 0 0-0.085333 60.330667l383.701333 383.872 1.706667 1.749333z" /></svg>
                    </span>
                </div>
                <div className="header__btns">
                    <button
                        style={styleRegBG()}
                        // style={activeHeader ? { backgroundColor: "#00000018", filter: "brightness(0.97)", color: "black" } : { backgroundColor: "#ffffff00" }} 
                        onMouseEnter={() => setActiveReg(true)}
                        onMouseLeave={() => setActiveReg(false)}
                        className="header__btn_reg">
                        <Link to="/registration" style={styleRegC()}>Регистрация</Link></button>
                    <button style={activeHeader || activeBurger ? { backgroundColor: "#702ff4" } : { backgroundColor: "#ffffff" }} className="header__btn_log">
                        <Link to="/login" style={activeHeader || activeBurger ? { color: "#ffffff" } : { color: "#702ff4" }}>Войти</Link></button>

                </div>
                <div className={activeBurger ? "header__burger active" : "header__burger"} onClick={() => setActiveBurger(!activeBurger)}>
                    <div id='burger_1'></div>
                    <div id='burger_2'></div>
                    <div id='burger_3'></div>
                </div>
            </div>
        </header >
    )
}

export default Header;