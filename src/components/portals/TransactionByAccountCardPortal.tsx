// import "./depositCardPortal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import { depositCard, remittanceCard } from "../../reducers/cardReducer";
import Portal from "./Portal";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { LoadingStatus } from "../../types/types";
import { Spinner } from "react-bootstrap";
import useExchange from "../../hooks/exchange";
import { InputMask } from "@react-input/mask";
interface ITransactionCardProps {
  setTransactionByAccountPortal: (state: boolean) => void;
}

const TransactionByAccountCardPortal = ({ setTransactionByAccountPortal }: ITransactionCardProps) => {
  const cards = useAppSelector((state) => state.cards);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [cardStateFrom, setCardStateFrom] = useState(<CardItemDefaltFrom />);
  const [cardNumberInput, setCardNumberInput] = useState("");
  const [transaction, setTransaction] = useState<number>(0);
  const [activeCurrency, setActiveCurrency] = useState<string | undefined>(undefined);
  // const [activeCardId, setActiveCardId] = useState<number | null>(null);
  // const [user_id, setUser_id] = useState<number | null>(null);
  // const [id, setId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const exchange = useExchange();

  // console.log(activeCurrency);
  // console.log(cardStateFrom.props.currency, cardStateTo.props.currency);
  const cardNumberHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCardNumberInput(e.target.value);
    if (e.target.value[0] === "4" && e.target.value.length === 19) {
      console.log("VISA");
    }
  };

  const onSubmitDepositForm = (e: React.FormEvent) => {
    setLoading("loading");
    e.preventDefault();
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
                {cards.map((item) => (
                  <Dropdown.Item
                    onClick={() => {
                      setActiveCurrency(item.currency ? item.currency : undefined);
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

            {/* <Dropdown className="modal_form_dropdown">
              <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "100%", height: "55px" }}>
                {cardStateTo}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {cards
                  .filter((card) => card.id !== cardStateFrom.props.id)
                  .map((item) => (
                    <Dropdown.Item
                      onClick={() => {
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
            </Dropdown> */}
            {/* <input
              type="string"
              required
              value={String(transaction)}
              onChange={(e) => {
                setTransaction(parseFloat(e.target.value));
              }}
            /> */}
            <InputMask
              name="card-number_input"
              className="card-number_input"
              mask="____ ____ ____ ____"
              replacement={{ _: /\d/ }}
              value={cardNumberInput}
              required
              onChange={cardNumberHandler}
            />
            {/* <div className={`cardItem_mini_card ${"black"}`}>
              <div className="cardItem_mini_card-number">{"2323523523".slice(-4)}</div>
              <div className="cardItem_mini_card-system">{"VISA"}</div>
            </div> */}
            {/* <CardItemMini
              key={34}
              currency={"USD"}
              amount={444}
              number={"sdg"}
              style={"black"}
              system={"VISA"}
              user_id={1}
              id={1}
            /> */}
            <h4>
              Введите сумму перевода
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
            <input
              type="number"
              min="1,00"
              max="100000000,00"
              required
              value={String(transaction)}
              onChange={(e) => {
                setTransaction(parseFloat(e.target.value));
              }}
            />
            <button className="modal_form_submit" type="submit" disabled={loading === "loading" ? true : false}>
              {loading === "loading" ? <Spinner size="sm" /> : "Перевести"}
            </button>

            <div className="modal_form_close" onClick={() => setTransactionByAccountPortal(false)}></div>
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

export default TransactionByAccountCardPortal;
