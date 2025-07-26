import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import { RootState, AppDispatch } from "../store";
import { ICardProps, TCurrency, TSystems } from "../types/types";
import { IUserState } from "./userReducer";
import { LoadingStatus } from "../types/types";
import { _apiBase } from "../services/getUserService";
import { TStyle } from "../components/portals/TransactionByAccountCardPortal";
// type TUserId = Pick<IUserState, "id">
type TUserId = number;
interface ICardsState extends ICardProps {
  loadingStatus?: LoadingStatus;
}

interface IDepositCardProps {
  id: number | null;
  user_id: number | null;
  deposit: number;
}
interface ICreateCardProps {
  user_id: number | null;
  style: TStyle;
  system: TSystems;
  currency: TCurrency;
}

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export const fetchUserCards = createAsyncThunk<ICardProps[], TUserId, ThunkApiConfig>(
  "cards/fetchUserCard",
  async (id) => {
    const request = useHttp();
    return await request({ url: `${_apiBase}/cards/getCards?id=${id}` });
  }
);

export const depositCard = createAsyncThunk<ICardProps, IDepositCardProps, ThunkApiConfig>(
  "cards/depositCard",
  async ({ id, user_id, deposit }) => {
    const request = useHttp();
    return (await request({
      url: `${_apiBase}/cards/depositCard?id=${id}&user_id=${user_id}&deposit=${deposit}`,
      method: "POST",
    })) as ICardProps;
  }
);

export const remittanceCard = createAsyncThunk<ICardProps, IDepositCardProps, ThunkApiConfig>(
  "cards/remittanceCard",
  async ({ id, user_id, deposit }) => {
    const request = useHttp();
    return (await request({
      url: `${_apiBase}/cards/remittanceCard?id=${id}&user_id=${user_id}&deposit=${deposit}`,
      method: "PATCH",
    })) as ICardProps;
  }
);

export const addCard = createAsyncThunk<ICardProps, ICardProps, ThunkApiConfig>(
  "cards/addCard",
  async ({ user_id, style, system, currency, name, amount, cvv, date, id, number }) => {
    console.log(user_id, id);
    const request = useHttp();
    return (await request({
      // url: `${_apiBase}/cards/addCard?&user_id=${user_id}&style=${style}&system=${system}&currency=${currency}&name=${name}&amount=${amount}&cvv=${cvv}&date=${date}&id=${id}&number=${number}`,
      url: `${_apiBase}/cards/addCard`,
      method: "POST",
      body: JSON.stringify({ user_id, style, system, currency, name, amount, cvv, date, id, number }),
    })) as ICardProps;
  }
);

export const checkCard = createAsyncThunk<ICardProps, string, ThunkApiConfig>("cards/checkCard", async (cardNumber) => {
  const request = useHttp();
  return (await request({
    url: `${_apiBase}/cards/checkCard?number=${cardNumber}`,
    method: "GET",
  })) as ICardProps;
});

const initialState: ICardsState[] = [];

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // exitAccount(state: IUserState) {
    //     state.login = false;
    //     state.name = null;
    //     state.surname = null;
    //     state.token = null;
    //     state.loadingStatus = "idle";
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUserCards.pending, state => { state.loadingStatus = 'loading' })
      .addCase(fetchUserCards.fulfilled, (state: ICardsState[], action: PayloadAction<ICardProps[]>) => {
        state = action.payload;
        return state;

        // return state.concat(action.payload)
        // state.push(action.payload)
        // state.currency = action.payload.currency
        // state.ammount = action.payload.ammount
        // state.number = action.payload.number
        // state.name = action.payload.name
        // state.date = action.payload.date
        // state.cvv = action.payload.cvv
        // state.system = action.payload.system
        // state.style = action.payload.style
        // state.loadingStatus = "idle"
      })
      // .addCase(fetchUserCards.rejected, state => { state.loadingStatus = 'error' })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = cardsSlice;

export const {} = actions;

export default reducer;
