import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../AuthStyles.css";

const URL = process.env.REACT_APP_URL;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFoundError, setUserNotFoundError] = useState<boolean>(false); // Переменная для отображения ошибки о несуществующем пользователе
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({}); // Переменная для хранения ошибок ввода
  const navigate = useNavigate();

  const handleLogin = async () => {
    let newErrors: { username?: string; password?: string } = {};

    if (!username) {
      newErrors.username = "Введите логин";
    }
    if (!password) {
      newErrors.password = "Введите пароль";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(`${URL}/auth/login`, {
        username,
        password,
      });
      navigate("/projectsPage");
    } catch (error) {
      if (error) {
        setUserNotFoundError(true); // Устанавливаем переменную состояния, чтобы показать сообщение о несуществующем пользователе
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="login-title">
        <h1>Вход</h1>
      </div>
      <div className="login-input">
        <label htmlFor="">Введите логин</label>
        <div className="container_input">
          <input
            type="text"
            placeholder="Имя пользователя, логин, почта"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors, //включает все существующие ошибки из предыдущего состояния prevErrors
                username: e.target.value ? "" : "Введите логин",
              }));
            }}
            className="form_control"
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}
        </div>
      </div>
      <div className="login-input">
        <label htmlFor="">Введите пароль</label>
        <div className="container_input">
          <input
            type="password"
            placeholder="Введите пароль от учетной записи"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                password: e.target.value ? "" : "Введите пароль",
              }));
            }}
            className="form_control"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
      </div>
      <div className={"action_buttons"}>
        <div className="auth-buttons">
          <Link to={"/register"}>
            <div>
              <button className={"cancel-login"}>
                <p>Регистрация</p>
              </button>
            </div>
          </Link>
          <div>
            <button className={"add-login"} onClick={handleLogin}>
              <p>Войти</p>
            </button>
          </div>
        </div>
      </div>
      <div className="container-error-message">
        {userNotFoundError && (
          <div className="error-message">Такого пользователя не существует</div>
        )}
      </div>
    </div>
  );
};

export default Login;
