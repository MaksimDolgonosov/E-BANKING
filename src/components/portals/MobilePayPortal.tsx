import "./portal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import { remittanceCard } from "../../reducers/cardReducer";
import DropdownCardList from "../DropdownCardList/DropdownCardList";
import { checkInput } from "../../hooks/checkInput";
import { useEffect, useState } from "react";
import { LoadingStatus } from "../../types/types";
import { Spinner } from "react-bootstrap";
import Portal from "./Portal";
import InputSum, { InputMobileNumber } from "../InputSum/InputSum";
import { DropdownRegion } from "../DropdownCardList/DropdownCardList";
import { useCallback } from "react";
import { TStyle } from "./TransactionByAccountCardPortal";
import { TRegion } from "../../types/types";
import { ICardProps } from "../../types/types";

interface IMobilePayPortalProps {
  setMobilePayPortal: (state: boolean) => void;
}

const MobilePayPortal = ({ setMobilePayPortal }: IMobilePayPortalProps) => {
  const cards = useAppSelector((state) => state.cards);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [cardState, setCardState] = useState(<CardItemDefalt />);
  const [transaction, setTransaction] = useState<string>("");
  const [mobilePhone, setMobilePhone] = useState<string>("+375(__) ___-__-__");
  const [region, setRegion] = useState<TRegion>("BLR");
  const [user_id, setUser_id] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [styleFrom, setStyleFrom] = useState<TStyle>("none");
  const [styleInput, setStyleInput] = useState<TStyle>("none");
  const [styleMobileInput, setStyleMobileInput] = useState<TStyle>("none");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (region === "BLR") {
      setMobilePhone("+375(__) ___-__-__");
    } else {
      setMobilePhone("+7(___) ___-__-__");
    }
  }, [region]);

  const onChangeCard = (item: ICardProps) => {
    setStyleFrom("none");
    setId(item.id);
    setUser_id(item.user_id);
    setCurrency(item.currency);
    setCardState(<CardItemMini key={item.number} {...item} />);
  };

  const onChangeMobilePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleMobileInput("none");
    setMobilePhone(e.target.value);
  };
  const setMobilePaymentHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleInput("none");
    setTransaction(checkInput(e.target.value));
  }, []);

  const onSubmitMobilePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardState.props.currency) {
      setStyleFrom("1px solid red");
      return;
    } else if (mobilePhone.indexOf("_") >= 0) {
      setStyleMobileInput("1px solid red");
      return;
    } else if (+transaction < 0.01) {
      setStyleInput("1px solid red");
      return;
    }
    setLoading("loading");

    dispatch(remittanceCard({ id, user_id, deposit: parseFloat(transaction) })).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        setLoading("idle");
        setTransaction("");
        setCardState(<CardItemDefalt />);
        setMobilePayPortal(false);
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
        <form onSubmit={onSubmitMobilePayment} className="modal_form">
          <DropdownCardList
            cardState={cardState}
            style={styleFrom}
            cards={cards}
            onChangeCard={onChangeCard}
            filterElement={-1}
          />
          <h4>Введите номер телефона:</h4>
          <div className="modal_form__mobileWrapper">
            <DropdownRegion region={region} onChangeRegion={setRegion} />
            <InputMobileNumber
              style={styleMobileInput}
              region={region}
              phoneNumberInput={mobilePhone}
              setPhoneNumberInput={onChangeMobilePhone}
            />
          </div>
          <h4>Введите сумму{currency ? ` в ${currency}` : null}:</h4>
          <InputSum
            styleTransaction={styleInput}
            transaction={transaction}
            setTransactionHandler={setMobilePaymentHandler}
          />
          <button className="modal_form_submit" type="submit" disabled={loading === "loading" ? true : false}>
            {loading === "loading" ? <Spinner size="sm" /> : "Оплатить"}
          </button>

          <div className="modal_form_close" onClick={() => setMobilePayPortal(false)}></div>
        </form>
      </motion.div>
    </Portal>
  );
};

const CardItemDefalt = () => {
  return <div>Выберете карту</div>;
};
export default MobilePayPortal;
