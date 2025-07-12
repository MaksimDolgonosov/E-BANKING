// import "./depositCardPortal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import InputSum from "../InputSum/InputSum";
import MiniCard from "../CardItem/MiniCard";
import { shortName } from "../../hooks/shortName";
import { depositCard, remittanceCard } from "../../reducers/cardReducer";
import Portal from "./Portal";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { LoadingStatus, TCheckCardFromServer } from "../../types/types";
import { Spinner } from "react-bootstrap";
import useExchange from "../../hooks/exchange";
import { InputMask } from "@react-input/mask";
import { checkCard } from "../../reducers/cardReducer";
import { ICardProps } from "../../types/types";
import { TAnonymusCard } from "../../types/types";
import cardNumber from "../../hooks/cardNumber";
import { isNamedCard } from "../../types/typeQuardrs";
import { isAnonymusCard } from "../../types/typeQuardrs";
import { checkInput } from "../../hooks/checkInput";
import { useCallback } from "react";
import DropdownCardList from "../DropdownCardList/DropdownCardList";
interface ITransactionCardProps {
  setTransactionByAccountPortal: (state: boolean) => void;
}
export type TStyle = "1px solid red" | "none";

const TransactionByAccountCardPortal = ({ setTransactionByAccountPortal }: ITransactionCardProps) => {
  const cards = useAppSelector((state) => state.cards);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [loadingCard, setLoadingCard] = useState<LoadingStatus>("idle");
  const [cardStateFrom, setCardStateFrom] = useState(<CardItemDefaltFrom />);
  const [cardStateTo, setCardStateTo] = useState<ICardProps | {} | TAnonymusCard>({});
  const [cardNumberInput, setCardNumberInput] = useState("");
  const [transaction, setTransaction] = useState<string>("");
  const [activeCurrency, setActiveCurrency] = useState<string | undefined>(undefined);
  const [styleFrom, setStyleFrom] = useState<TStyle>("none");
  const [styleTo, setStyleTo] = useState<TStyle>("none");
  const [styleTransaction, setStyleTransaction] = useState<TStyle>("none");

  const setTransactionHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleTransaction("none");
    setTransaction(checkInput(e.target.value));
  }, []);

  const onChangeCardFrom = useCallback((item: ICardProps) => {
    setActiveCurrency(item.currency ? item.currency : undefined);
    setStyleFrom("none");
    setCardStateFrom(
      <CardItemMini
        key={item.number}
        currency={item.currency}
        amount={item.amount}
        number={item.number}
        style={item.style}
        system={item.system}
      />
    );
  }, []);

  // const fetchCard = useCardNumber();
  // const [activeCardId, setActiveCardId] = useState<number | null>(null);
  // const [user_id, setUser_id] = useState<number | null>(null);
  // const [id, setId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const exchange = useExchange();

  // console.log(activeCurrency);
  // console.log(cardStateFrom.props.currency, cardStateTo.props.currency);
  const cardNumberHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCardNumberInput(e.target.value);
    setStyleTo("none");
    if (e.target.value.length === 19) {
      // console.log(e.target.value.length);
      setLoadingCard("loading");
      dispatch(checkCard(e.target.value))
        .then((data) => {
          if (data.meta.requestStatus === "fulfilled" && data.payload) {
            setCardStateTo(data.payload);
            setLoadingCard("idle");
          } else {
            setCardStateTo({ number: e.target.value });
            setLoadingCard("idle");
          }
        })
        .catch((error) => {
          setLoadingCard("error");
        });
    } else {
      setCardStateTo({});
    }
  };

  const onSubmitDepositForm = (e: React.FormEvent) => {
    // setLoading("loading");
    e.preventDefault();
    if (!cardStateFrom.props.currency) {
      setStyleFrom("1px solid red");
    } else if (!("number" in cardStateTo) || cardStateTo.number?.length !== 19) {
      setStyleTo("1px solid red");
    } else if (+transaction < 0.01) {
      setStyleTransaction("1px solid red");
      // const { minus, plus } = exchange(
      //   cardStateFrom.props.currency,
      //   cardStateTo.props.currency,
      //   transaction,
      //   activeCurrency
      // );
      // dispatch(depositCard({ id: cardStateTo.props.id, user_id: cardStateTo.props.user_id, deposit: plus })).then(
      //   (depositResolve) => {
      //     dispatch(
      //       remittanceCard({ id: cardStateFrom.props.id, user_id: cardStateFrom.props.user_id, deposit: minus })
      //     ).then((remittanceResolve) => {
      //       if (
      //         depositResolve.meta.requestStatus === "fulfilled" &&
      //         remittanceResolve.meta.requestStatus === "fulfilled"
      //       ) {
      //         setLoading("idle");
      //         setTransaction(0);
      //         setCardStateFrom(<CardItemDefaltFrom />);
      //         setCardStateTo(<CardItemDefaltTo />);
      //         setTransactionByAccountPortal(false);
      //       }
      //     });
      //   }
      // );
    }
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
            styleFrom={styleFrom}
            cardStateFrom={cardStateFrom}
            cards={cards}
            onChangeCardFrom={onChangeCardFrom}
          />
          <InputMask
            name="card-number_input"
            className="card-number_input"
            mask="____ ____ ____ ____"
            replacement={{ _: /\d/ }}
            value={cardNumberInput}
            required
            onChange={cardNumberHandler}
            placeholder="Введите номер карты"
            style={{ border: `${styleTo}` }}
          />
          {loadingCard === "loading" ? <Spinner /> : null}
          {isNamedCard(cardStateTo) ? (
            <div className="modal_form_recipient">
              <span>Получатель: {shortName(cardStateTo.name)}</span>
              <MiniCard style={cardStateTo.style} number={cardStateTo.number} system={cardStateTo.system} />
            </div>
          ) : null}

          {isAnonymusCard(cardStateTo) ? (
            <div className="modal_form_recipient">
              <span>Получатель: {shortName(null)}</span>
              <MiniCard style={"standart"} number={cardStateTo.number} system={cardNumber(cardStateTo.number)} />
            </div>
          ) : null}
          <h4>
            Введите сумму перевода
            {isAnonymusCard(cardStateTo) ? ` в ${cardStateFrom.props.currency}` : null}
            {isNamedCard(cardStateTo) ? (
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
                  <option value={cardStateTo.currency === null ? undefined : cardStateTo.currency}>
                    {cardStateTo.currency}
                  </option>
                </select>
              </>
            ) : null}
            {/* {cardStateFrom.props.currency &&
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
              <> : </> */}
          </h4>

          <InputSum
            styleTransaction={styleTransaction}
            transaction={transaction}
            setTransactionHandler={setTransactionHandler}
          />

          {/* <input
              style={{ border: `${styleTransaction}` }}
              type="number"
              min="0.01"
              max="100000000.00"
              step="0.01"
              placeholder="0,00"
              required
              onBlur={(e) => setTransaction(checkInput(e.target.value))}
              value={transaction}
              onChange={(e) => {
                setStyleTransaction("none");
                setTransaction(checkInput(e.target.value));
              }}
            /> */}
          <button className="modal_form_submit" type="submit" disabled={loading === "loading" ? true : false}>
            {loading === "loading" ? <Spinner size="sm" /> : "Перевести"}
          </button>

          <div className="modal_form_close" onClick={() => setTransactionByAccountPortal(false)}></div>
        </form>
      </motion.div>
    </Portal>
  );
};

const CardItemDefaltFrom = () => {
  return <div>Выберете карту с которой перевести</div>;
};
// const CardItemDefaltTo = () => {
//   return <div>Выберете карту на которую перевести</div>;
// };

export default TransactionByAccountCardPortal;
