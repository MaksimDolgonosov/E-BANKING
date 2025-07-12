import { memo } from "react";

interface IInputSumProps {
  styleTransaction: string;
  transaction: string;
  setTransactionHandler(e: React.ChangeEvent<HTMLInputElement>): void;
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

export default InputSum;
