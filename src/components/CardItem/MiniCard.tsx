import { ICardProps } from "../../types/types";

type TCardMini = Pick<ICardProps, "number" | "style" | "system">;

const MiniCard = ({ style, number, system }: TCardMini) => {
  return (
    <div className={`cardItem_mini_card ${style}`}>
      <div className="cardItem_mini_card-number">*{number!.slice(-4)}</div>
      <div className="cardItem_mini_card-system">{system}</div>
    </div>
  );
};

export default MiniCard;
