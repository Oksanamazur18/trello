import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import api from "../../../api/request";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const searchParams = new URLSearchParams(location.search);
    const errorParam = searchParams.get("error");

    useEffect(() => {
        if (errorParam === "not_found") {
            toast.error("Користувача не знайдено. Перевірте email або пароль.")
        }
    }, [errorParam])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", { email, password });
            localStorage.setItem("token", response.data.token);
            console.log("Авторизація успішна:", response.data);
            navigate("/");
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404 || error.response?.status === 401) {
                setError("Не  знайдено користувача з такими поштою чи паролем")
            }
            console.error("Помилка авторизації:", error.response?.data?.message || "Помилка з'єднання");
            return error.response?.data?.message || "Помилка з'єднання";
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Вхід</h1>
            <form onSubmit={handleLogin}>
                <div className={styles.input}>
                    <label htmlFor="email">Поштова скринька:</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="text"
                        placeholder="email" />
                </div>

                <div className={styles.input}>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        type="text" />
                </div>
                <p>{error}</p>
                <button className={styles.btn_submit} type="submit">Увійти</button>
            </form>

            <Link
                className={styles.registration}
                to={"/login"}>
                Зареєструватися
            </Link>
        </div>
    )
}

export default Login;