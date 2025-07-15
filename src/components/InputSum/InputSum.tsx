import { memo } from "react";
import { InputMask } from "@react-input/mask";
import { TStyle } from "../portals/TransactionByAccountCardPortal";
import { TRegion } from "../../types/types";
interface IInputSumProps {
  styleTransaction: string;
  transaction: string;
  setTransactionHandler(e: React.ChangeEvent<HTMLInputElement>): void;
}
interface IInputMobileNumber {
  style: TStyle;
  region: TRegion;
  phoneNumberInput: string;
  setPhoneNumberInput(e: React.ChangeEvent<HTMLInputElement>): void;
}

const InputSum = memo(({ styleTransaction, transaction, setTransactionHandler }: IInputSumProps) => {
  return (
    <input
      style={{ border: `${styleTransaction}` }}
      type="number"
      min="0.01"
      max="100000000.00"
      step="0.01"
      placeholder="0,00"
      required
      //onBlur={(e) => setTransaction(checkInput(e.target.value))}
      value={transaction}
      onChange={setTransactionHandler}
    />
  );
});

export const InputMobileNumber = ({ style, region, phoneNumberInput, setPhoneNumberInput }: IInputMobileNumber) => {
  return region === "RUS" ? (
    <InputMask
      name="card-number_input"
      className="card-number_input"
      mask="+7(___) ___-__-__"
      replacement={{ _: /\d/ }}
      value={phoneNumberInput}
      required
      onChange={setPhoneNumberInput}
      // placeholder="Введите номер карты"
      style={{ border: `${style}` }}
      showMask
    />
  ) : (
    <InputMask
      name="card-number_input"
      className="card-number_input"
      mask="+375(__) ___-__-__"
      replacement={{ _: /\d/ }}
      value={phoneNumberInput}
      required
      onChange={setPhoneNumberInput}
      // placeholder="Введите номер карты"
      style={{ border: `${style}` }}
      showMask
    />
  );
};

export default InputSum;
