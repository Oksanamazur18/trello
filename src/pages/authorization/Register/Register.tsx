import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/request.ts";
import { emailRegex } from "../../../common/constants/regex.ts";
import styles from "./register.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorValidation, setError] = useState<{ [key: string]: string }>({});
  const strength = zxcvbn(password);

  useEffect(() => {
    const newErrors: { [keys: string]: string } = {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Некоректний email";
    }

    if (strength.score < 4) {
      newErrors.password = "Недостатньо безпечний пароль"
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають"
    }

    setError(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
    console.log(isValid)
  }, [email, password, confirmPassword]);

  const postUser = async () => {
    try {
      const response = await api.post("/user", { email, password });
      if (response.data.result === "Created") {
        const loginResponse = await api.post("/login", { email, password });
        if (loginResponse.data.token) {
          localStorage.setItem("token", loginResponse.data.token);
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      postUser();
      console.log("Registration is succesfull")
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}> Реєстрація </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label htmlFor="email">Поштова скринька:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            name="email"
            type="text" />
          {errorValidation.email && <div className={styles.error}>{errorValidation.email}</div>}
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Пароль:</label>
          <input
            onChange={(e) => { setPassword(e.target.value) }}
            placeholder="password"
            name="password"
            type="text" />
          {errorValidation.password && <div className={styles.error}>{errorValidation.password}</div>}
          <p className={styles.level_str}>Рівень складності паролю: {strength.score} / 4</p>
          <p>{strength.feedback.warning}</p>
        </div>
        <div className={styles.input}>
          <label htmlFor="confirmPassword">Повтори пароль:</label>
          <input
            onChange={(e) => { setConfirmPassword(e.target.value) }}
            placeholder="confirm password"
            name="confirmPassword"
            type="text" />
          {errorValidation.confirmPassword && <div className="error">{errorValidation.confirmPassword}</div>}
        </div>
        <div>
          <button className={styles.btn_submit} type="submit" disabled={!isValid}>Зареєструватися</button>
        </div>
      </form>

      <Link
        to='/auth'
        className={styles.login}>
        Увійти
      </Link>
    </div>
  );
};
export default Register;
