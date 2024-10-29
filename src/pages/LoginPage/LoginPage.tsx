
import "./loginPage.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { fetchUser } from "../../reducers/userReducer";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";



// interface Login {
//     email: string | null,
//     password: string | null
// }

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loading = useAppSelector(state => state.user.loadingStatus);
    const loginStatus = useAppSelector(state => state.user.login);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        await dispatch(fetchUser({ email: email, password: password }));


    }

    useEffect(() => {
        if (loginStatus) {
            navigate("/accountPage")
        }
    }, [loginStatus])

    return (
        <div className="loginPage">
            <div className="loginPage_wrapper">
                <div className="loginPage_wrapper-header">
                    <Link to="/">E-banking</Link>
                    <Link to="/register">Регистрация</Link>
                </div>
                <div className="loginPage_form_wrapper">
                    <Link to="/" className="loginPage_back">
                        <svg color="#020222b3" fill="#020222b3" width="19px" height="16px" clipPath=""><g><path fillRule="evenodd" clipRule="evenodd" d="M5.60948 8.00016L10.4716 3.13813L9.52879 2.19531L4.19527 7.52874C4.07024 7.65377 4 7.82334 4 8.00015C4 8.17696 4.07024 8.34653 4.19526 8.47156L9.5287 13.805L10.4715 12.8622L5.60948 8.00016Z"></path></g></svg>
                        Назад</Link>
                    <h2>Вход в E-banking</h2>
                    <form className="loginPage_form" onSubmit={handleSubmit}>
                        {/* <label htmlFor="email">Ваш логин: </label> */}
                        <input name="email" type="email" id="email" placeholder="example@mail.ru" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        {/* <label htmlFor="password">Пароль: </label> */}
                        <input name="password" type="password" id="password" placeholder="Пароль" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {loading == "error" ? <div className="loginPage_error">Ошибка загрузки...Пожалуйста, повторите попытку!</div> : null}
                        <button className="loginPage_button loading" disabled={loading === 'loading' ? true : false}>{loading === 'loading' ? <Spinner size="sm" /> : "Войти"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage