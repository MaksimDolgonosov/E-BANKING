import { Dropdown } from "react-bootstrap";
import { memo } from "react";
import CardItemMini from "../CardItem/CardItemMini";
import { TStyle } from "../portals/TransactionByAccountCardPortal";
import { ReactNode } from "react";
import { ICardProps } from "../../types/types";

interface IDropdownCardList {
  style: TStyle;
  cardState: ReactNode;
  cards: ICardProps[];
  onChangeCard: (item: ICardProps) => void;
  filterElement: number;
}

const DropdownCardList = memo(({ style, cardState, cards, onChangeCard, filterElement }: IDropdownCardList) => {
  return (
    <Dropdown className="modal_form_dropdown" style={{ border: `${style}` }}>
      <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "100%", height: "55px" }}>
        {cardState}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {cards
          .filter((card) => card.id !== filterElement)
          .map((item) => (
            <Dropdown.Item
              onClick={() => onChangeCard(item)}
              className={`depositCard_option ${item.style}`}
              key={item.number}
            >
              <CardItemMini
                key={item.number}
                currency={item.currency}
                amount={item.amount}
                number={item.number}
                style={item.style}
                system={item.system}
                id={item.id}
                user_id={item.user_id}
              />{" "}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default DropdownCardList;
