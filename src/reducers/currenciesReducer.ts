import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import { RootState, AppDispatch } from "../store";
import { ICardProps } from "../types/types";

import { LoadingStatus } from "../types/types";
import currenciesState from "../hooks/currencies";

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export interface ICurrenciesResponse {
  Cur_ID: number;
  Date: string;
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
}

//{ "Cur_ID": 440, "Date": "2024-10-27T00:00:00", "Cur_Abbreviation": "AUD", "Cur_Scale": 1, "Cur_Name": "Австралийский доллар", "Cur_OfficialRate": 2.1956 }

export const fetchCurrencies = createAsyncThunk<ICurrenciesResponse[], null, ThunkApiConfig>(
  "currencies/fetchCurrencies",
  async () => {
    const request = useHttp();
    const response = (await request({
      url: `https://api.nbrb.by/exrates/rates?periodicity=0`,
    })) as ICurrenciesResponse[];
    const data = response.filter(
      (currency) =>
        currency.Cur_Abbreviation == "USD" || currency.Cur_Abbreviation == "EUR" || currency.Cur_Abbreviation == "RUB"
    );
    return data as ICurrenciesResponse[];
    // return await (request({ url: `https://api.nbrb.by/exrates/rates?periodicity=0` })) as ICurrenciesResponse[];
  }
);

export type TCurrenciesState = Pick<ICurrenciesResponse, "Cur_Abbreviation" | "Cur_OfficialRate" | "Cur_Scale">;

const initialState: TCurrenciesState[] = [];

const currenciesSlice = createSlice({
  name: "currencies",
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
      .addCase(fetchCurrencies.fulfilled, (state: TCurrenciesState[], action: PayloadAction<ICurrenciesResponse[]>) => {
        state = currenciesState(action.payload);
        return state;
      })
      // .addCase(fetchUserCards.rejected, state => { state.loadingStatus = 'error' })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = currenciesSlice;

export const {} = actions;

export default reducer;
