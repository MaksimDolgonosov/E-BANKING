import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../hooks/http.hook";
import { LoadingStatus } from "../hooks/http.hook";

interface IRequestBody {
    email: string,
    password: string
}


export interface IUserState {
    login: boolean;
    name: string | null;
    surname: string | null;
    token: string | null
    loadingStatus: LoadingStatus
}


const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async ({ email, password }: IRequestBody): Promise<IUserState> => {
        const { request } = useHttp();
        return await request({ url: "http://localhost:3002/api/user/login", body: JSON.stringify({ email, password }) })
    }
)



const initialState: IUserState = {
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
        setLogin(state: IUserState, action: PayloadAction<IUserState>) {
            state = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, state => { state.loadingStatus = 'loading' })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state = action.payload;
                state.loadingStatus = 'idle';
            })
            .addCase(fetchUser.rejected, state => { state.loadingStatus = 'error' })
            .addDefaultCase(() => { })
    }
});



const { actions, reducer } = loginSlice;


export const {
    setLogin
} = actions;

export default reducer;