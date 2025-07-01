import { ICurrenciesResponse, TCurrenciesState } from "../reducers/currenciesReducer";

export default function currenciesState(incoming: ICurrenciesResponse[]): TCurrenciesState[] {
  return incoming.map((item) => {
    return {
      Cur_Abbreviation: item.Cur_Abbreviation,
      Cur_OfficialRate: item.Cur_OfficialRate,
      Cur_Scale: item.Cur_Scale,
    };
  });
}
