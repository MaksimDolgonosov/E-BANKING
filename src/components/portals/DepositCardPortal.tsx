import "./portal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import { depositCard } from "../../reducers/cardReducer";
import DropdownCardList from "../DropdownCardList/DropdownCardList";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { LoadingStatus } from "../../types/types";
import { Spinner } from "react-bootstrap";
import Portal from "./Portal";
import { use } from "framer-motion/client";

interface IDepositCardProps {
  setDepositPortal: (state: boolean) => void;
}

const DepositCardPortal = ({ setDepositPortal }: IDepositCardProps) => {
  const cards = useAppSelector((state) => state.cards);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [cardState, setCardState] = useState(<CardItemDefalt />);
  const [deposit, setDeposit] = useState<number>(0);
  const [user_id, setUser_id] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [styleFrom, setStyleFrom] = useState<TStyle>("none");
  const dispatch = useAppDispatch();

  const onSubmitTransactionForm = (e: React.FormEvent) => {
    setLoading("loading");
    e.preventDefault();
    dispatch(depositCard({ id, user_id, deposit })).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        setLoading("idle");
        setDeposit(0);
        setCardState(<CardItemDefalt />);
        setDepositPortal(false);
      }
    });
  };
  return (
    <Portal>
      <motion.div
        className="modal_wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={onSubmitTransactionForm} className="modal_form">
          <DropdownCardList cardState={cardState} style={styleFrom} cards={cards} onChangeCard={onChangeCard} />

          <Dropdown className="modal_form_dropdown">
            <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "100%", height: "55px" }}>
              {cardState}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cards.map((item) => (
                <Dropdown.Item
                  onClick={() => {
                    setId(item.id);
                    setUser_id(item.user_id);
                    setCurrency(item.currency);
                    setCardState(
                      <CardItemMini
                        key={item.number}
                        currency={item.currency}
                        amount={item.amount}
                        number={item.number}
                        style={item.style}
                        system={item.system}
                        user_id={item.user_id}
                        id={item.id}
                      />
                    );
                  }}
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
                    user_id={item.user_id}
                    id={item.id}
                  />{" "}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <h4>Введите сумму{currency ? ` в ${currency}` : null}:</h4>
          <input
            type="number"
            min="1,00"
            max="100000000,00"
            required
            value={String(deposit)}
            onChange={(e) => {
              setDeposit(parseFloat(e.target.value));
            }}
          />
          <button className="modal_form_submit" type="submit" disabled={loading === "loading" ? true : false}>
            {loading === "loading" ? <Spinner size="sm" /> : "Пополнить"}
          </button>

          <div className="modal_form_close" onClick={() => setDepositPortal(false)}></div>
        </form>
      </motion.div>
    </Portal>
  );
};
const CardItemDefalt = () => {
  return <div>Выберете карту</div>;
};
export default DepositCardPortal;
