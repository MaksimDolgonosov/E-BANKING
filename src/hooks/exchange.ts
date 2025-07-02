import { TCurrenciesState } from "../reducers/currenciesReducer";
import { TCurrency } from "../types/types";
import { useAppSelector } from "./hook";

type TExchange = Exclude<TCurrency, null>;
type TCurrencyExchangeFunction = { minus: number; plus: number };

const useExchange = () => {
  const currencies = useAppSelector((state) => state.currencies);

  const currenciesWithBYN: TCurrenciesState[] = [
    ...currencies,
    {
      Cur_Abbreviation: "BYN",
      Cur_OfficialRate: 1,
      Cur_Scale: 1,
    },
  ];

  const currencyExchange = <T extends TExchange, K extends TExchange>(
    from: T,
    to: K,
    ammount: number,
    activeCurrency: T | K
  ): TCurrencyExchangeFunction => {
    const currencyFrom = currenciesWithBYN.find((item) => item.Cur_Abbreviation === from);
    const currencyTo = currenciesWithBYN.find((item) => item.Cur_Abbreviation === to);
    if (currencyFrom === currencyTo) return { minus: ammount, plus: ammount };
    if (currencyFrom && currencyTo) {
      if (activeCurrency === from) {
        const sum = Number(
          (
            ammount *
            (currencyFrom?.Cur_OfficialRate / currencyTo?.Cur_OfficialRate) *
            currencyFrom?.Cur_Scale *
            currencyTo?.Cur_Scale
          ).toFixed(2)
        );
        return {
          minus: ammount,
          plus: sum,
        };
      } else {
        const sum = Number(
          (
            (ammount * (currencyTo?.Cur_OfficialRate / currencyFrom?.Cur_OfficialRate)) /
            currencyTo?.Cur_Scale /
            currencyFrom?.Cur_Scale
          ).toFixed(2)
        );
        return {
          minus: sum,
          plus: ammount,
        };
      }
    }
    return { minus: 0, plus: 0 };
  };
  return currencyExchange;
};

// const useExchange = () => {
//   const currencies = useAppSelector((state) => state.currencies);

//   const currencyExchange = (from: TExchange, to: TExchange, ammount: number) => {
//     const currencyTo = currencies.find((item) => item.Cur_Abbreviation === to);
//     const currencyFrom = currencies.find((item) => item.Cur_Abbreviation === from);
//     if (currencies.length) {
//       if (from === to) {
//         return ammount;
//       } else if (currencyTo && from === "BYN") {
//         return ((ammount / currencyTo.Cur_OfficialRate) * currencyTo.Cur_Scale).toFixed(2);
//       } else if (currencyFrom && to === "BYN") {
//         return ((ammount * currencyFrom.Cur_OfficialRate) / currencyFrom.Cur_Scale).toFixed(2);
//       } else if (to === "RUB") {
//         return (
//           ammount *
//           (currencyFrom!.Cur_OfficialRate / currencyTo!.Cur_OfficialRate) *
//           currencyTo!.Cur_Scale
//         ).toFixed(2);
//       } else if (from === "RUB") {
//         return (
//           (ammount * (currencyFrom!.Cur_OfficialRate / currencyTo!.Cur_OfficialRate)) /
//           currencyFrom!.Cur_Scale
//         ).toFixed(2);
//       } else {
//         return (
//           ammount *
//           (currencyFrom!.Cur_OfficialRate / currencyTo!.Cur_OfficialRate) *
//           currencyTo!.Cur_Scale
//         ).toFixed(2);
//       }
//     }
//   };
//   return currencyExchange;
// };

export default useExchange;
