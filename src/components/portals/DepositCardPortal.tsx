import "./portal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import { depositCard } from "../../reducers/cardReducer";
import DropdownCardList from "../DropdownCardList/DropdownCardList";
import { checkInput } from "../../hooks/checkInput";
import { useState } from "react";
import { LoadingStatus } from "../../types/types";
import { Spinner } from "react-bootstrap";
import Portal from "./Portal";
import { useCallback } from "react";
import { TStyle } from "./TransactionByAccountCardPortal";
import { ICardProps } from "../../types/types";
import InputSum from "../InputSum/InputSum";
interface IDepositCardProps {
  setDepositPortal: (state: boolean) => void;
}

const DepositCardPortal = ({ setDepositPortal }: IDepositCardProps) => {
  const cards = useAppSelector((state) => state.cards);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [cardState, setCardState] = useState(<CardItemDefalt />);
  const [deposit, setDeposit] = useState<string>("");
  const [user_id, setUser_id] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [styleFrom, setStyleFrom] = useState<TStyle>("none");
  const [styleInput, setStyleInput] = useState<TStyle>("none");
  const dispatch = useAppDispatch();

  const onChangeCard = (item: ICardProps) => {
    setStyleFrom("none");
    setId(item.id);
    setUser_id(item.user_id);
    setCurrency(item.currency);
    setCardState(<CardItemMini key={item.number} {...item} />);
  };

  const setTransactionHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleInput("none");
    setDeposit(checkInput(e.target.value));
  }, []);

  const onSubmitTransactionForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardState.props.currency) {
      setStyleFrom("1px solid red");
      return;
    } else if (+deposit < 0.01) {
      setStyleInput("1px solid red");
      return;
    }
    setLoading("loading");

    dispatch(depositCard({ id, user_id, deposit: parseFloat(deposit) })).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        setLoading("idle");
        setDeposit("");
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
          <DropdownCardList
            cardState={cardState}
            style={styleFrom}
            cards={cards}
            onChangeCard={onChangeCard}
            filterElement={-1}
          />
          <h4>Введите сумму{currency ? ` в ${currency}` : null}:</h4>
          <InputSum styleTransaction={styleInput} transaction={deposit} setTransactionHandler={setTransactionHandler} />
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
