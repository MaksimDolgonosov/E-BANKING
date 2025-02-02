import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../store";
import { LoadingStatus } from "../types/types";

import { useHttp } from "../hooks/http.hook";
// import { ThunkApiConfig } from "../types/types";
import { _apiBase } from "../services/getUserService";

export interface IRequestBody {
    email: string,
    password: string
}

export interface IUserState {
    id: number | null;
    login: boolean | undefined;
    name: string | null;
    surname: string | null;
    token: string | null;
    loadingStatus: LoadingStatus;

}

export type ThunkApiConfig = {
    state: RootState
    dispatch: AppDispatch
}

export type TToken = Pick<IUserState, "token">



export const fetchUser = createAsyncThunk<IUserState, IRequestBody, ThunkApiConfig>(
    "user/fetchUser",
    async ({ email, password }) => {
        // const response = await fetch(`${_apiBase}/user/login`, { method: "POST", body: JSON.stringify({ email, password }), headers: { "Content-Type": "application/json" } })
        // const data = await response.json();
        // console.log(data);
        // return await data as IUserState;
        const request = useHttp();
        return await (request({ url: `${_apiBase}/user/login`, method: "POST", body: JSON.stringify({ email, password }) })) as IUserState;
    }
)

export const checkUser = createAsyncThunk<TToken, string | null, ThunkApiConfig>(
    "user/checkUser",
    async (token: string | null) => {
        const tokenNumber = `Bearer ${token}`
        const request = useHttp();
        return await (request({ url: `${_apiBase}/user/auth`, method: "GET", headers: { authorization: tokenNumber } })) as TToken;
    }
)


const initialState: IUserState = {
    id: null,
    login: false,
    name: null,
    surname: null,
    token: null,
    loadingStatus: "idle"
};


const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        exitAccount(state: IUserState) {
            state.login = false;
            state.name = null;
            state.surname = null;
            state.token = null;
            state.loadingStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, state => { state.loadingStatus = 'loading' })
            .addCase(fetchUser.fulfilled, (state: IUserState, action: PayloadAction<IUserState>) => {
                state.id = action.payload.id
                state.login = action.payload.login
                state.name = action.payload.name
                state.surname = action.payload.surname
                state.token = action.payload.token
                state.loadingStatus = "idle"
                localStorage.setItem("token", action.payload.token!);
            })
            .addCase(fetchUser.rejected, state => { state.loadingStatus = 'error' })

            .addCase(checkUser.fulfilled, (state: IUserState, action: PayloadAction<TToken>) => {
                state.token = action.payload.token
                localStorage.setItem("token", action.payload.token!)
            })
            .addCase(checkUser.rejected, (state: IUserState) => {
                state = initialState
                return state
            })
            .addDefaultCase(() => { })
    }
});



const { actions, reducer } = loginSlice;


export const {
    exitAccount
} = actions;

export default reducer;