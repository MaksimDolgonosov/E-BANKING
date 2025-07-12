import { Dropdown } from "react-bootstrap";
import { memo } from "react";
import CardItemMini from "../CardItem/CardItemMini";
import { TStyle } from "../portals/TransactionByAccountCardPortal";
import { ReactNode } from "react";
import { ICardProps } from "../../types/types";

interface IDropdownCardList {
  styleFrom: TStyle;
  cardStateFrom: ReactNode;
  cards: ICardProps[];
  onChangeCardFrom: (item: ICardProps) => void;
}

const DropdownCardList = memo(({ styleFrom, cardStateFrom, cards, onChangeCardFrom }: IDropdownCardList) => {
  return (
    <Dropdown className="modal_form_dropdown" style={{ border: `${styleFrom}` }}>
      <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "100%", height: "55px" }}>
        {cardStateFrom}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {cards.map((item) => (
          <Dropdown.Item
            onClick={() => onChangeCardFrom(item)}
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
            />{" "}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default DropdownCardList;
