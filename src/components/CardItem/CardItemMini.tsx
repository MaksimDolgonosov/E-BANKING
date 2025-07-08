import "./cardItemMini.scss";

import { ICardProps } from "../../types/types";
import { Currency } from "./CardItem";
import { getSymbol } from "./CardItem";
import MiniCard from "./MiniCard";

export type TCardItemMini = Pick<ICardProps, "amount" | "currency" | "number" | "style" | "system">;

const CardItemMini = ({ currency, amount, number, style, system }: TCardItemMini) => {
  return (
    <div className="cardItem_mini">
      <div className="cardItem_mini_img">
        <Currency currency={currency} />
      </div>
      {/* <div className="cardItem_mini_wrapper"> */}
      <div className="cardItem_mini_ammount">
        {amount!.toFixed(2)} {getSymbol(currency)}{" "}
      </div>
      <MiniCard style={style} number={number} system={system} />
      {/* <div className={`cardItem_mini_card ${style}`}>
        <div className="cardItem_mini_card-number">{number!.slice(-4)}</div>
        <div className="cardItem_mini_card-system">{system}</div>
      </div> */}
    </div>
  );
};

export default CardItemMini;
