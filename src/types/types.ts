import { RootState, AppDispatch } from "../store";
import { TToken } from "../reducers/userReducer";

export type TCurrency = "BYN" | "RUB" | "EUR" | "USD" | null;
export type TSystems = "VISA" | "MasterCard" | "МИР" | "Pay" | null;
export type TRegion = "RUS" | "BLR";
export type LoadingStatus = "idle" | "loading" | "error";

export interface ICardProps {
  user_id: number;
  id: number;
  currency: TCurrency;
  amount: number | null;
  number: string | null;
  name?: string | null;
  date?: string | null;
  cvv?: number | null;
  system: TSystems;
  style: "black" | "gold" | "platinum" | "standart" | null;
}

// export type TAnonymusCard = Pick<ICardProps, "number">;
export type TAnonymusCard = { number: string };

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export type TServerDataToken = {
  meta: Object;
  payload: {
    token: string | null;
  };
  type: string;
};

export type TCheckCardFromServer = {
  meta: {
    requestStatus: string;
  };
  payload: ICardProps[];
  type: string;
};
