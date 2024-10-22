import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import { RootState, AppDispatch } from "../store";
import { ICardProps } from "../types/types";
import { IUserState } from "./userReducer";
import { LoadingStatus } from "../types/types";

// type TUserId = Pick<IUserState, "id">
type TUserId = number
interface ICardsState extends ICardProps {
    loadingStatus?: LoadingStatus
}


export type ThunkApiConfig = {
    state: RootState
    dispatch: AppDispatch
}

export const fetchUserCards = createAsyncThunk<ICardProps[], TUserId, ThunkApiConfig>(
    "cards/fetchUserCard",
    async (id) => {
        const request = useHttp();
        return await (request({ url: `http://localhost:3002/api/cards/getCards?id=${id}` })) as ICardProps[];
    }
)

const initialState: ICardsState[] = []


const cardsSlice = createSlice({
    name: 'cards',
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
                state = action.payload
                return state

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
            .addDefaultCase(() => { })
    }
});



const { actions, reducer } = cardsSlice;


export const {

} = actions;

export default reducer;