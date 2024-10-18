import "./accountPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa6";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { exitAccount } from "../../reducers/userReducer";
import { useAppDispatch } from "../../hooks/hook";


const AccountPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const exitAccountHandler = () => {
        dispatch(exitAccount());
        navigate("/")
    }
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
                    <NavDropdown title={<FaUserCheck />} className='d-block header_black'
                        // id='dropdown-button-drop-down-centered'
                        align={{ lg: 'end' }}
                        drop="down-centered">
                        <NavDropdown.Item ><Link to="/settings"><IoSettingsOutline />Перейти в настройки</Link></NavDropdown.Item>
                        <NavDropdown.Item onClick={exitAccountHandler}><IoLogOutOutline />Выйти</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>
        </div >
    )
}

export default AccountPage;