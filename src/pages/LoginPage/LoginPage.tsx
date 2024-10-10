
import "./loginPage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../hooks/hook";
import { fetchUser } from "../../reducers/userReducer";




// interface Login {
//     email: string | null,
//     password: string | null
// }

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    // const [login, setLogin] = useState<Login>({ login: null, password: null })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ email, password });

        dispatch(fetchUser({ email: email, password: password }))

        // console.log(login);
        setEmail("");
        setPassword("");
    }


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
                        <button>Войти</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage