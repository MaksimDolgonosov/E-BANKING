import NavDropdown from "react-bootstrap/NavDropdown";
import { VscAccount } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { useAppDispatch } from "../../hooks/hook";
import { exitAccount } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../reducers/userReducer";

interface IAccauntUserProps {
  userName: string | null;
}

const AccauntUser = ({ userName }: IAccauntUserProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const exitAccountHandler = () => {
    dispatch(exitAccount());
    navigate("/");
  };
  const moveToSettingsPage = () => {
    dispatch(checkUser(null));
    // navigate("/settings")
  };
  return (
    <>
      <div>{userName}</div>
      <NavDropdown
        title={<VscAccount />}
        className="d-block header_black"
        // id='dropdown-button-drop-down-centered'
        align={{ lg: "end" }}
        drop="down-centered"
      >
        <NavDropdown.Item
          style={{ fontSize: "13px", padding: "4px 10px", color: "black" }}
          onClick={moveToSettingsPage}
        >
          <IoSettingsOutline />
          Перейти в настройки
        </NavDropdown.Item>
        <NavDropdown.Item
          style={{ fontSize: "13px", padding: "4px 10px", color: "black" }}
          onClick={exitAccountHandler}
        >
          <IoLogOutOutline />
          Выйти
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default AccauntUser;
