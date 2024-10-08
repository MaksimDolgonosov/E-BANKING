
import "./loginPage.scss";
import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";


interface Login {
    login: string | null,
    password: string | null
}

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [login, setLogin] = useState<Login>({ login: null, password: null })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const login: Login = { login: email, password };

        console.log(login);
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
                {/* <div className="loginPage_form"> */}
                <form className="loginPage_form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Ваш логин: </label>
                    <input name="email" type="email" id="email" placeholder="example@mail.ru" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Пароль: </label>
                    <input name="password" type="password" id="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Войти</button>
                </form>
                {/* </div> */}
            </div>
        </div>
    )
}

export default LoginPage