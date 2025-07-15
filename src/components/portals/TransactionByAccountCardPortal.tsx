// import "./depositCardPortal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import InputSum from "../InputSum/InputSum";
import { depositCard, remittanceCard } from "../../reducers/cardReducer";
import Portal from "./Portal";
import { useState } from "react";
import { LoadingStatus } from "../../types/types";
import { Spinner } from "react-bootstrap";
import useExchange from "../../hooks/exchange";
import { InputMask } from "@react-input/mask";
import { checkCard } from "../../reducers/cardReducer";
import { ICardProps } from "../../types/types";
import { TAnonymusCard } from "../../types/types";
import { isNamedCard } from "../../types/typeQuardrs";
import { isAnonymusCard } from "../../types/typeQuardrs";
import { checkInput } from "../../hooks/checkInput";
import { useCallback } from "react";
import DropdownCardList from "../DropdownCardList/DropdownCardList";
import RecipientInfo from "../CardItem/RecipientInfo";
import { TExchange } from "../../hooks/exchange";

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
    setCardStateFrom(<CardItemMini key={item.number} {...item} />);
  }, []);

  const dispatch = useAppDispatch();
  const exchange = useExchange();

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
    setLoading("loading");
    e.preventDefault();
    if (!cardStateFrom.props.currency) {
      setStyleFrom("1px solid red");
      return;
    } else if (!("number" in cardStateTo) || cardStateTo.number?.length !== 19) {
      setStyleTo("1px solid red");
      return;
    } else if (+transaction < 0.01) {
      setStyleTransaction("1px solid red");
      return;
    }
    if (isAnonymusCard(cardStateTo)) {
      dispatch(
        remittanceCard({ id: cardStateFrom.props.id, user_id: cardStateFrom.props.user_id, deposit: +transaction })
      )
        .then((remittanceResolve) => {
          if (remittanceResolve.meta.requestStatus === "fulfilled") {
            setLoading("idle");
            setTransaction("");
            setCardStateFrom(<CardItemDefaltFrom />);
            setCardStateTo({});
            setTransactionByAccountPortal(false);
          } else if ("error" in remittanceResolve) {
            setLoading("error");
          }
        })
        .catch((error) => {
          if (error instanceof TypeError) {
            setLoading("error");
          }
        });
    }
    if (isNamedCard(cardStateTo)) {
      const { minus, plus } = exchange(
        cardStateFrom.props.currency,
        cardStateTo.currency as TExchange,
        +transaction,
        activeCurrency
      );
      dispatch(depositCard({ id: cardStateTo.id, user_id: cardStateTo.user_id, deposit: plus })).then(
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
              setCardStateTo({});
              setTransactionByAccountPortal(false);
            }
          });
        }
      );
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
            style={styleFrom}
            cardState={cardStateFrom}
            cards={cards}
            onChangeCard={onChangeCardFrom}
            filterElement={-1}
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
          {isNamedCard(cardStateTo) ? <RecipientInfo isNamed={true} cardState={cardStateTo} /> : null}
          {isAnonymusCard(cardStateTo) ? <RecipientInfo isNamed={false} cardState={cardStateTo} /> : null}
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
          </h4>

          <InputSum
            styleTransaction={styleTransaction}
            transaction={transaction}
            setTransactionHandler={setTransactionHandler}
          />
          {loading === "error" ? <span className="error_message">Что то пошло не так, попробуйте позже...</span> : null}
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
