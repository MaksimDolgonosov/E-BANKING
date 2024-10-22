import "./accountPage.scss";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { exitAccount } from "../../reducers/userReducer";
import { useAppDispatch } from "../../hooks/hook";
import { VscAccount } from "react-icons/vsc";
import { useAppSelector } from "../../hooks/hook";
import { useEffect } from "react";
import { fetchUserCards } from "../../reducers/cardReducer";
import CardItem from "../../components/CardItem/CardItem";

const AccountPage = () => {
    const id = useAppSelector(state => state.user.id);
    const cards = useAppSelector(state => state.cards);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const exitAccountHandler = () => {
        dispatch(exitAccount());
        navigate("/")
    }

    useEffect(() => {

        if (id) {
            dispatch(fetchUserCards(id))
        }

    }, [])

    return (
        <div className="accountPage">
            <div className="accountPage_header">
                <Link to="/" className="accountPage_header-logo">E-banking</Link>
                <div className="accountPage_header-list">
                    <Link className="accountPage_header-list-item active" to="/accoutPage" >Главная</Link>
                    <Link className="accountPage_header-list-item" to="/accoutPage" >Переводы</Link>
                    <Link className="accountPage_header-list-item" to="/accoutPage" >Сервисы</Link>
                    <Link className="accountPage_header-list-item" to="/accoutPage" >Карты</Link>
                </div>
                <div className="accountPage_header-account">
                    <NavDropdown title={<VscAccount />} className='d-block header_black'
                        // id='dropdown-button-drop-down-centered'
                        align={{ lg: 'end' }}
                        drop="down-centered">
                        <NavDropdown.Item style={{ fontSize: "13px", padding: "4px 10px" }}><Link to="/settings" style={{ color: "black", }}><IoSettingsOutline />Перейти в настройки</Link></NavDropdown.Item>
                        <NavDropdown.Item style={{ fontSize: "13px", padding: "4px 10px" }} onClick={exitAccountHandler}><IoLogOutOutline />Выйти</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>
            <div className="accountPage_main">
                <div className="accountPage_main_cardList">
                    {cards.map(item => {
                        return <CardItem  key={item.number} currency={item.currency}  ammount={item.ammount} number={item.number} style={item.style} system={item.system}/>
                    })}
                </div>
                <div className="accountPage_main_actions">

                </div>
            </div>
        </div >
    )
}

export default AccountPage;