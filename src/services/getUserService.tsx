import { useHttp } from "../hooks/http.hook";
import { IUserState } from "../reducers/userReducer";
import { IRequestBody } from "../reducers/userReducer";

export const useGetUser = () => {
    const { loadingStatus, request } = useHttp();
    const _apiBase = "http://localhost:3002/api/user/login";


    //console.log("service hook");
    const getUserData = async ({ email, password }: IRequestBody): Promise<IUserState> => {
        console.log("service")
        const res = await (request({ url: _apiBase, method: "POST", body: JSON.stringify({ email, password }) })) as IUserState;
        console.log(res)
        return res
    }







    // const getHistory = async () => {
    //     const base = await getAllAppointments();


    // }

    return { loadingStatus, getUserData }

}