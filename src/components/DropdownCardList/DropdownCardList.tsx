import { Dropdown } from "react-bootstrap";
import { memo } from "react";
import CardItemMini from "../CardItem/CardItemMini";
import { TStyle } from "../portals/TransactionByAccountCardPortal";
import { ReactNode } from "react";
import { ICardProps, TRegion } from "../../types/types";
import BLR from "../../assets/icons/flags/BLR-flag.svg";
import RUS from "../../assets/icons/flags/RUS-flag.svg";
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

interface IDropdownRegionProps {
  region: TRegion;
  onChangeRegion(e: TRegion): void;
}

export const DropdownRegion = ({ region, onChangeRegion }: IDropdownRegionProps) => {
  return (
    <Dropdown className="modal_form_dropdown flag" style={{ borderColor: "none" }}>
      <Dropdown.Toggle
        variant="white"
        id="dropdown-basic"
        style={{ width: "62px", height: "55px", borderColor: "none", padding: "0" }}
      >
        {region === "BLR" ? <img src={BLR} alt="BLR-flag" /> : <img src={RUS} alt="RUS-flag" />}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ width: "62px", padding: "0" }}>
        <Dropdown.Item
          style={{ width: "60px", padding: "0", height: "43px" }}
          onClick={() => onChangeRegion("BLR")}
          className="dropdown-flag-item"
        >
          <img src={BLR} alt="BLR-flag" />
        </Dropdown.Item>
        <Dropdown.Item
          style={{ width: "60px", padding: "0", height: "43px" }}
          onClick={() => onChangeRegion("RUS")}
          className="dropdown-flag-item"
        >
          <img src={RUS} alt="RUS-flag" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownCardList;
