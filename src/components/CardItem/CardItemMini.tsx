import "./cardItemMini.scss";

import { ICardProps } from "../../types/types";
import { Currency } from "./CardItem";
import { getSymbol } from "./CardItem";
import MiniCard from "./MiniCard";

export type TCardItemMini = Pick<ICardProps, "amount" | "currency" | "number" | "style" | "system" | "id" | "user_id">;

// const CardItemMini = ({ currency, amount, number, style, system }: TCardItemMini) => {
const CardItemMini = (item: ICardProps) => {
  return (
    <div className="cardItem_mini">
      <div className="cardItem_mini_img">
        <Currency currency={item.currency} />
      </div>
      {/* <div className="cardItem_mini_wrapper"> */}
      <div className="cardItem_mini_ammount">
        {item.amount!.toFixed(2)} {getSymbol(item.currency)}{" "}
      </div>
      <MiniCard style={item.style} number={item.number} system={item.system} />
      {/* <div className={`cardItem_mini_card ${style}`}>
        <div className="cardItem_mini_card-number">{number!.slice(-4)}</div>
        <div className="cardItem_mini_card-system">{system}</div>
      </div> */}
    </div>
  );
};

export default CardItemMini;
