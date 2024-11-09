import { RootState, AppDispatch } from "../store";


export type TCurrency = "BYN" | "RUB" | "EUR" | "USD" | null;



export type LoadingStatus = "idle" | "loading" | "error";
export interface ICardProps {
    user_id: number,
    id: number
    currency: TCurrency,
    amount: number | null,
    number: string | null,
    name?: string | null,
    date?: string | null,
    cvv?: number | null,
    system: string | null
    style: "black" | "gold" | "platinum" | null
}

export type ThunkApiConfig = {
    state: RootState
    dispatch: AppDispatch
}