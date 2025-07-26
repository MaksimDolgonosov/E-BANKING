import "./cardItemMidle.scss";
import RUB from "../../assets/icons/currency/ruble2.png";
import USD from "../../assets/icons/currency/dollar2.png";
import EUR from "../../assets/icons/currency/euro2.webp";
import BYN from "../../assets/icons/currency/byn2.png";
import { ICardProps } from "../../types/types";
import { TCurrency } from "../../types/types";
import MiniCard from "./MiniCard";
import payWave from "../../assets/icons/card/payWave.svg";
import chip from "../../assets/icons/card/chip-2.png";
import masterCardIcon from "../../assets/icons/masterCard.png";

type TCurrencyProps = Pick<ICardProps, "currency">;

export const getSymbol = (curency: TCurrency) => {
  switch (curency) {
    case "USD":
      return <span>&#36;</span>;
    case "EUR":
      return <span>&euro;</span>;
    case "RUB":
      return <span>&#8381;</span>;
    case "BYN":
      return <span>Br</span>;
    default:
      return "";
  }
};

const CardItemMidle = ({ currency, amount, number, style, system, date, name }: ICardProps) => {
  console.log(date);
  return (
    <div className={`cardItemMiddle ${style}`}>
      <div className="cardItemMiddle_header">
        <h4>E-banking</h4>
        <img src={payWave} alt="payWave" />
      </div>
      <img src={chip} alt="chip" id="middle-chip" />
      <div className="cardItemMiddle_number">{number}</div>
      <div className="cardItemMiddle_footer">
        <div className="cardItemMiddle_footer-info">
          <div className="cardItemMiddle_footer-info-valid">
            <div className="cardItemMiddle_footer-info-valid-text">VALID THRU</div>
            <div className="cardItemMiddle_footer-info-valid-date">{date}</div>
          </div>
          <div className="cardItemMiddle_footer-info-name">{name}</div>
          <div className="cardItemMiddle_footer-info-currency">{amount + " " + currency}</div>
        </div>
        <div className="cardItemMiddle_footer-system">
          {system === "MasterCard" ? (
            <img className="cardItem_mini_card-system-img" src={masterCardIcon}></img>
          ) : (
            system
          )}
        </div>
      </div>
    </div>
  );
};

export const Currency = ({ currency }: TCurrencyProps) => {
  switch (currency) {
    case "USD":
      return <img src={USD} />;
    case "EUR":
      return <img src={EUR} />;
    case "RUB":
      return <img src={RUB} />;
    case "BYN":
      return <img src={BYN} />;
    default:
      return null;
  }
};

export default CardItemMidle;
