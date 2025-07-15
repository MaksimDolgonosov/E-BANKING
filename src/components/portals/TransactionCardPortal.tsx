// import "./depositCardPortal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import { depositCard, remittanceCard } from "../../reducers/cardReducer";
import Portal from "./Portal";
import InputSum from "../InputSum/InputSum";
import { useState } from "react";
import { LoadingStatus } from "../../types/types";
import { Spinner } from "react-bootstrap";
import useExchange from "../../hooks/exchange";
import { TStyle } from "./TransactionByAccountCardPortal";
import DropdownCardList from "../DropdownCardList/DropdownCardList";
import { useCallback } from "react";
import { ICardProps } from "../../types/types";
import { checkInput } from "../../hooks/checkInput";
interface ITransactionCardProps {
  setTransactionPortal: (state: boolean) => void;
}

const TransactionCardPortal = ({ setTransactionPortal }: ITransactionCardProps) => {
  const cards = useAppSelector((state) => state.cards);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [cardStateFrom, setCardStateFrom] = useState(<CardItemDefaltFrom />);
  const [cardStateTo, setCardStateTo] = useState(<CardItemDefaltTo />);
  const [transaction, setTransaction] = useState<string>("");
  const [activeCurrency, setActiveCurrency] = useState<string | undefined>(undefined);
  const [styleFrom, setStyleFrom] = useState<TStyle>("none");
  const [styleTo, setStyleTo] = useState<TStyle>("none");
  const [styleTransaction, setStyleTransaction] = useState<TStyle>("none");
  // const [activeCardId, setActiveCardId] = useState<number | null>(null);
  // const [user_id, setUser_id] = useState<number | null>(null);
  // const [id, setId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const exchange = useExchange();

  const setTransactionHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleTransaction("none");
    setTransaction(checkInput(e.target.value));
  }, []);

  const onChangeCardFrom = useCallback((item: ICardProps) => {
    setActiveCurrency(item.currency ? item.currency : undefined);
    setStyleFrom("none");
    setCardStateFrom(<CardItemMini key={item.number} {...item} />);
  }, []);

  const onChangeCardTo = useCallback((item: ICardProps) => {
    setActiveCurrency(item.currency ? item.currency : undefined);
    setStyleTo("none");
    setCardStateTo(<CardItemMini key={item.number} {...item} />);
  }, []);

  const onSubmitDepositForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardStateFrom.props.currency) {
      setStyleFrom("1px solid red");
      return;
    } else if (!cardStateTo.props.currency) {
      setStyleTo("1px solid red");
      return;
    } else if (+transaction < 0.01) {
      setStyleTransaction("1px solid red");
      return;
    }
    setLoading("loading");
    const { minus, plus } = exchange(
      cardStateFrom.props.currency,
      cardStateTo.props.currency,
      +transaction,
      activeCurrency
    );

    dispatch(depositCard({ id: cardStateTo.props.id, user_id: cardStateTo.props.user_id, deposit: plus })).then(
      (depositResolve) => {
        dispatch(
          remittanceCard({ id: cardStateFrom.props.id, user_id: cardStateFrom.props.user_id, deposit: minus })
        ).then((remittanceResolve) => {
          if (
            depositResolve.meta.requestStatus === "fulfilled" &&
            remittanceResolve.meta.requestStatus === "fulfilled"
          ) {
            setLoading("idle");
            setTransaction("");
            setCardStateFrom(<CardItemDefaltFrom />);
            setCardStateTo(<CardItemDefaltTo />);
            setTransactionPortal(false);
          }
        });
      }
    );
  };
  return (
    <Portal>
      <motion.div
        className="modal_wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={onSubmitDepositForm} className="modal_form">
          <DropdownCardList
            style={styleFrom}
            cardState={cardStateFrom}
            cards={cards}
            onChangeCard={onChangeCardFrom}
            filterElement={cardStateTo.props.id}
          />
          <DropdownCardList
            style={styleTo}
            cardState={cardStateTo}
            cards={cards}
            onChangeCard={onChangeCardTo}
            filterElement={cardStateFrom.props.id}
          />
          <h4>
            Введите сумму перевода
            {cardStateFrom.props.currency &&
            cardStateTo.props.currency &&
            cardStateFrom.props.currency === cardStateTo.props.currency
              ? ` в ${activeCurrency}`
              : null}
            {cardStateFrom.props.currency &&
            cardStateTo.props.currency &&
            cardStateFrom.props.currency !== cardStateTo.props.currency ? (
              <>
                <span> в </span>

                <select
                  id="select_currency_id"
                  //defaultValue={cardStateFrom.props.currency}
                  value={activeCurrency}
                  className="select_currency"
                  onChange={(e) => setActiveCurrency(e.target.value)}
                >
                  <option value={cardStateFrom.props.currency}>{cardStateFrom.props.currency}</option>
                  <option value={cardStateTo.props.currency}>{cardStateTo.props.currency}</option>
                </select>
              </>
            ) : null}
            <> : </>
          </h4>

          <InputSum
            styleTransaction={styleTransaction}
            transaction={transaction}
            setTransactionHandler={setTransactionHandler}
          />
          {/* <input
            type="number"
            min="1,00"
            max="100000000,00"
            required
            value={String(transaction)}
            onChange={(e) => {
              setTransaction(parseFloat(e.target.value));
            }}
          /> */}
          <button className="modal_form_submit" type="submit" disabled={loading === "loading" ? true : false}>
            {loading === "loading" ? <Spinner size="sm" /> : "Перевести"}
          </button>

          <div className="modal_form_close" onClick={() => setTransactionPortal(false)}></div>
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
