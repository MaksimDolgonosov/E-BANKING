import "./accountPage.scss";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { exitAccount } from "../../reducers/userReducer";
import { useAppDispatch } from "../../hooks/hook";
import { VscAccount } from "react-icons/vsc";
import { useAppSelector } from "../../hooks/hook";
import { useEffect, useState } from "react";
import { fetchUserCards } from "../../reducers/cardReducer";
import { fetchCurrencies } from "../../reducers/currenciesReducer";
import CardItem from "../../components/CardItem/CardItem";
import money from "../../assets/icons/actions/money-bag.png";
import list from "../../assets/icons/actions/list.png";
import smartphone from "../../assets/icons/actions/smartphone.png";
import cardsLogo from "../../assets/icons/actions/cards.png";
import { checkUser } from "../../reducers/userReducer";
// import Currency from "../../components/Currency/Currency";
import Portal from "../../components/portals/Portal";
import DepositCardPortal from "../../components/portals/DepositCardPortal";
import TransactionCardPortal from "../../components/portals/TransactionCardPortal";
import TransactionByAccountCardPortal from "../../components/portals/TransactionByAccountCardPortal";
import MobilePayPortal from "../../components/portals/MobilePayPortal";
import CurrencyList from "../../components/Currency/CurrencyList";

const AccountPage = () => {
  const id = useAppSelector((state) => state.user.id);
  const userName = useAppSelector((state) => state.user.name);
  const cards = useAppSelector((state) => state.cards);
  const loginStatus = useAppSelector((state) => state.user.login);
  // const currencies = useAppSelector(state => state.currencies);
  const [depositPortal, setDepositPortal] = useState(false);
  const [transactionPortal, setTransactionPortal] = useState(false);
  const [transactionByAccountPortal, setTransactionByAccountPortal] = useState(false);
  const [mobilePayPortal, setMobilePayPortal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const date = new Date().toLocaleDateString();

  const exitAccountHandler: React.MouseEventHandler<HTMLElement> = () => {
    dispatch(exitAccount());
    navigate("/");
  };
  const moveToSettingsPage = () => {
    dispatch(checkUser(null));
    // navigate("/settings")
  };
  //   useEffect(() => {
  //     if (!loginStatus) {
  //       navigate("/loginPage");
  //     }
  //   }, []);

  useEffect(() => {
    // if (id) {
    dispatch(fetchCurrencies(null));
    dispatch(fetchUserCards(id!));
    // }
  }, [depositPortal, transactionPortal, transactionByAccountPortal, mobilePayPortal]);

  return (
    // <div className="accountWrapper">
    <div className="accountPage">
      <div className="accountPage_header">
        <Link to="/" className="accountPage_header-logo">
          E-banking
        </Link>
        <div className="accountPage_header-list">
          <Link className="accountPage_header-list-item active" to="/accoutPage">
            Главная
          </Link>
          <Link className="accountPage_header-list-item" to="/accoutPage">
            Переводы
          </Link>
          <Link className="accountPage_header-list-item" to="/accoutPage">
            Сервисы
          </Link>
          <Link className="accountPage_header-list-item" to="/accoutPage">
            Карты
          </Link>
        </div>
        <div className="accountPage_header-account">
          <div>{userName}</div>
          <NavDropdown
            title={<VscAccount />}
            className="d-block header_black"
            // id='dropdown-button-drop-down-centered'
            align={{ lg: "end" }}
            drop="down-centered"
          >
            <NavDropdown.Item style={{ fontSize: "13px", padding: "4px 10px" }} onClick={moveToSettingsPage}>
              <IoSettingsOutline />
              Перейти в настройки
            </NavDropdown.Item>
            <NavDropdown.Item style={{ fontSize: "13px", padding: "4px 10px" }} onClick={exitAccountHandler}>
              <IoLogOutOutline />
              Выйти
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
      <div className="accountPage_main">
        <div className="accountPage_main_cardList">
          {cards.length ? null : <div className="accountPage_main_noCards">У вас нет активных карт</div>}
          {cards.map((item) => {
            return (
              <CardItem
                key={item.number}
                currency={item.currency}
                amount={item.amount}
                number={item.number}
                style={item.style}
                system={item.system}
                name={item.name}
                user_id={item.user_id}
                id={item.id}
              />
            );
          })}
        </div>
        <div className="accountPage_main_actions">
          <div className="accountPage_main_actions-list">
            <div
              className="accountPage_main_actions-item"
              onClick={() => {
                setDepositPortal(true);
              }}
            >
              <div className="accountPage_main_actions-item-img">
                <img src={money} alt="money" />
              </div>
              <div className="accountPage_main_actions-item-descr">Пополнить карту</div>
            </div>

            <div
              className="accountPage_main_actions-item"
              onClick={() => {
                setTransactionByAccountPortal(true);
              }}
            >
              <div className="accountPage_main_actions-item-img">
                <img src={list} alt="list" />
              </div>
              <div className="accountPage_main_actions-item-descr">Перевести по реквизитам</div>
            </div>
            <div
              className="accountPage_main_actions-item"
              onClick={() => {
                setTransactionPortal(true);
              }}
            >
              <div className="accountPage_main_actions-item-img">
                <img src={cardsLogo} alt="cards" />
              </div>
              <div className="accountPage_main_actions-item-descr">Перевести между своими картами</div>
            </div>
            <div
              className="accountPage_main_actions-item"
              onClick={() => {
                setMobilePayPortal(true);
              }}
            >
              <div className="accountPage_main_actions-item-img">
                <img src={smartphone} alt="smartphone" />
              </div>
              <div className="accountPage_main_actions-item-descr">Оплатить мобильный</div>
            </div>
            <Link to="/issueCardPage" className="accountPage_main_actions-item">
              <div className="accountPage_main_actions-item-img">
                <img src={cardsLogo} alt="card" />
              </div>
              <div className="accountPage_main_actions-item-descr">Выпустить новую карту</div>
            </Link>
          </div>
          <div className="accountPage_main_currencies">
            <div className="accountPage_main_currencies_header">Курсы валют</div>
            <div className="accountPage_main_currencies_descr">Белорусского рубля</div>
            <div className="accountPage_main_currencies_operation">
              <span>Покупка</span>
              <span>Продажа</span>
            </div>
            <div className="accountPage_main_currencies_list">
              <CurrencyList />
              {/* {currencies.map(currency => {
                                    return <Currency key={currency.Cur_OfficialRate} name={currency.Cur_Abbreviation} rate={currency.Cur_OfficialRate} />
                                })} */}
            </div>
            <div className="accountPage_main_currencies_date">{date}</div>
          </div>
        </div>
      </div>
      {depositPortal ? <DepositCardPortal setDepositPortal={setDepositPortal}></DepositCardPortal> : null}
      {transactionPortal ? <TransactionCardPortal setTransactionPortal={setTransactionPortal} /> : null}
      {mobilePayPortal ? <MobilePayPortal setMobilePayPortal={setMobilePayPortal}></MobilePayPortal> : null}
      {transactionByAccountPortal ? (
        <TransactionByAccountCardPortal setTransactionByAccountPortal={setTransactionByAccountPortal} />
      ) : null}
    </div>
    // </div>
  );
};

export default AccountPage;
