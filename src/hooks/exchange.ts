import { TCurrenciesState } from "../reducers/currenciesReducer";
import { TCurrency } from "../types/types";
import { useAppSelector } from "./hook";

type TExchange = Exclude<TCurrency, null>;

const useExchange = () => {
  const currencies = useAppSelector((state) => state.currencies);

  const currencyExchange = (from: TExchange, to: TExchange, ammount: number) => {
    const currencyTo = currencies.find((item) => item.Cur_Abbreviation === to);
    const currencyFrom = currencies.find((item) => item.Cur_Abbreviation === from);
    if (currencies.length) {
      if (from === to) {
        return ammount;
      } else if (currencyTo && from === "BYN") {
        return ((ammount / currencyTo.Cur_OfficialRate) * currencyTo.Cur_Scale).toFixed(4);
      } else if (currencyFrom && to === "BYN") {
        return ((ammount * currencyFrom.Cur_OfficialRate) / currencyFrom.Cur_Scale).toFixed(4);
      } else if (to === "RUB") {
        return (
          ammount *
          (currencyFrom!.Cur_OfficialRate / currencyTo!.Cur_OfficialRate) *
          currencyTo!.Cur_Scale
        ).toFixed(4);
      } else if (from === "RUB") {
        return (
          (ammount * (currencyFrom!.Cur_OfficialRate / currencyTo!.Cur_OfficialRate)) /
          currencyFrom!.Cur_Scale
        ).toFixed(4);
      } else {
        return (
          ammount *
          (currencyFrom!.Cur_OfficialRate / currencyTo!.Cur_OfficialRate) *
          currencyTo!.Cur_Scale
        ).toFixed(4);
      }
    }
  };
  return currencyExchange;
};

export default useExchange;
