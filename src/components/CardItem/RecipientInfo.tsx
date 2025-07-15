import { ICardProps, TAnonymusCard } from "../../types/types";
import { shortName } from "../../hooks/shortName";
import MiniCard from "./MiniCard";
import cardNumber from "../../hooks/cardNumber";
interface IRecipientInfoProps {
  isNamed: boolean;
  cardState: ICardProps | TAnonymusCard;
}

const RecipientInfo = ({ isNamed, cardState }: IRecipientInfoProps) => {
  ///isNamed ? (cardState as ICardProps) : (cardState as TAnonymusCard);

  if (isNamed) {
    return (
      <div className="modal_form_recipient">
        <span>Получатель: {shortName((cardState as ICardProps).name)}</span>
        <MiniCard
          style={(cardState as ICardProps).style}
          number={cardState.number}
          system={cardNumber(cardState.number!)}
        />
      </div>
    );
  } else {
    return (
      <div className="modal_form_recipient">
        <span>Получатель: {shortName(null)}</span>
        <MiniCard style={"standart"} number={cardState.number} system={cardNumber(cardState.number!)} />
      </div>
    );
  }
};

export default RecipientInfo;
