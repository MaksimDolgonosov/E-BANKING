// import "./depositCardPortal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
// import { depositCard } from "../../reducers/cardReducer";
import Portal from "./Portal";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { LoadingStatus } from "../../types/types";
import { Spinner } from "react-bootstrap";

interface ITransactionCardProps {
  setTransactionPortal: (state: boolean) => void;
}

const TransactionCardPortal = ({ setTransactionPortal }: ITransactionCardProps) => {
  const cards = useAppSelector((state) => state.cards);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [cardStateFrom, setCardStateFrom] = useState(<CardItemDefaltFrom />);
  const [cardStateTo, setCardStateTo] = useState(<CardItemDefaltTo />);
  const [transaction, setTransaction] = useState<number>(0);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const [user_id, setUser_id] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const onSubmitDepositForm = (e: React.FormEvent) => {
    setLoading("loading");
    e.preventDefault();
    //   dispatch(depositCard({ id, user_id, deposit })).then((data) => {
    //     if (data.meta.requestStatus === "fulfilled") {
    //       setLoading("idle");
    //       setDeposit(0);
    //       setCardState(<CardItemDefalt />);
    //       setTransactionPortal(false);
    //     }
    //   });
  };
  return (
    <Portal>
      <motion.div
        className="modal_wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={onSubmitDepositForm}>
          <div className="modal_form">
            <Dropdown className="modal_form_dropdown">
              <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "100%", height: "55px" }}>
                {cardStateFrom}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {cards
                  .filter((card) => card.id !== activeCardId)
                  .map((item) => (
                    <Dropdown.Item
                      onClick={() => {
                        setId(item.id);
                        setUser_id(item.user_id);
                        setActiveCardId(item.id);
                        setCardStateFrom(
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

            <Dropdown className="modal_form_dropdown">
              <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "100%", height: "55px" }}>
                {cardStateTo}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {cards
                  .filter((card) => card.id !== activeCardId)
                  .map((item) => (
                    <Dropdown.Item
                      onClick={() => {
                        setId(item.id);
                        setUser_id(item.user_id);
                        setActiveCardId(item.id);
                        setCardStateTo(
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
            <h4>Введите сумму перевода:</h4>
            <input
              type="number"
              min="1"
              max="100000000"
              required
              value={String(transaction)}
              onChange={(e) => {
                setTransaction(parseInt(e.target.value));
              }}
            />
            <button className="modal_form_submit" type="submit" disabled={loading === "loading" ? true : false}>
              {loading === "loading" ? <Spinner size="sm" /> : "Перевести"}
            </button>

            <div className="modal_form_close" onClick={() => setTransactionPortal(false)}></div>
          </div>
        </form>
      </motion.div>
    </Portal>
  );
};

const CardItemDefaltFrom = () => {
  return <div>Выберете карту с которой перевести</div>;
};
const CardItemDefaltTo = () => {
  return <div>Выберете карту на которую перевести</div>;
};

export default TransactionCardPortal;
