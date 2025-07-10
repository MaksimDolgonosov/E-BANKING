import { ICardProps } from "../../types/types";
import { FaCcMastercard } from "react-icons/fa6";
import masterCardIcon from "../../assets/icons/masterCard.png";

type TCardMini = Pick<ICardProps, "number" | "style" | "system">;

const MiniCard = ({ style, number, system }: TCardMini) => {
  return (
    <div className={`cardItem_mini_card ${style}`}>
      <div className="cardItem_mini_card-number">*{number!.slice(-4)}</div>
      <div className="cardItem_mini_card-system">
        {system === "MasterCard" ? <img className="cardItem_mini_card-system-img" src={masterCardIcon}></img> : system}
      </div>
    </div>
  );
};

export default MiniCard;
