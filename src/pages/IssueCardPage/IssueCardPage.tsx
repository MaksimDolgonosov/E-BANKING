import "./issueCard.scss";
import AccauntUser from "../../components/AccauntUser/AccauntUser";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Link } from "react-router-dom";
import DropdownCurrency, { DropdownSystem } from "../../components/DropdownCurrency/DropdownCurrency";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import { addCard } from "../../reducers/cardReducer";
import { useState } from "react";
import { TCurrency, TStyles } from "../../types/types";
import { TSystems } from "../../types/types";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import { createNumber } from "../../hooks/cardNumber";
import { useNavigate } from "react-router-dom";
import addZero from "../../hooks/addZero";
import { transliterate as tr, slugify } from "transliteration";

const IssueCardPage = () => {
  const [loading, setLoading] = useState(false);
  const userName = useAppSelector((state) => state.user.name);
  const userSurname = useAppSelector((state) => state.user.surname);
  const user_id = useAppSelector((state) => state.user.id);
  const [currency, setCurrency] = useState<TCurrency>("BYN");
  const [system, setSystem] = useState<TSystems>("VISA");
  const [style, setStyle] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const issueCard = () => {
    // setLoading(true);
    const number = createNumber(system);
    const id = +Date.now().toString().slice(0, 11);
    const cvv = +Date.now().toString().slice(0, 3);
    const cardStyle: TStyles[] = ["black", "gold", "platinum"];
    const month = addZero(new Date().getMonth() + 1);
    const year = new Date().getFullYear() + 5;
    const cardName = tr(userName!.toUpperCase() + " " + userSurname!.toUpperCase());
    dispatch(
      addCard({
        user_id,
        id,
        name: cardName,
        currency,
        system,
        cvv,
        amount: 0,
        style: cardStyle[style],
        number,
        date: `${month}/${year}`,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        console.log(res);
        setLoading(false);
        navigate("/accountPage");
      }
    });
  };

  return (
    <div className="issueCardPage">
      <div className="issueCardPage_wrapper">
        <div className="issueCardPage_wrapper-header">
          <Link to="/accountPage">&#9668; Назад</Link>
          <div className="accountPage_header-account">
            <AccauntUser userName={userName} />
          </div>
        </div>
        <h3>Выберете стиль карты:</h3>
        <CardCarousel currency={currency} system={system} setStyle={setStyle} />
        <div className="issueCardPage_money">
          <div className="issueCardPage_money-currency">
            <span style={{ display: "block" }}>Выберете валюту: </span>{" "}
            <DropdownCurrency onChangeCurrency={setCurrency} currency={currency} />
          </div>
          <div className="issueCardPage_money-system">
            <span style={{ display: "block" }}>Выберете платежную систему: </span>{" "}
            <DropdownSystem onChangeSystem={setSystem} system={system} />
          </div>
        </div>
        <Button style={{ display: "block", margin: "15px auto" }} variant="light" onClick={issueCard}>
          {loading ? <Spinner /> : "Выпустить карту"}
        </Button>
      </div>
    </div>
  );
};

export default IssueCardPage;
