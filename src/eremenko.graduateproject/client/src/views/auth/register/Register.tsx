import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ErrorState } from "../AuthInterface";

const URL = process.env.REACT_APP_URL;

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});
  const [userExistsError, setUserExistsError] = useState<boolean>(false); // Переменная для отображения ошибки о существующем пользователе
  const navigate = useNavigate();

  const handleRegister = async () => {
    const newErrors: ErrorState = {};

    if (!username) newErrors.username = "Введите имя пользователя";
    if (!password) newErrors.password = "Введите пароль";
    if (!lastName) newErrors.lastName = "Введите фамилию";
    if (!firstName) newErrors.firstName = "Введите имя";
    if (!middleName) newErrors.middleName = "Введите отчество";

    if (Object.keys(newErrors).length > 0) {
      newErrors.all = "Пожалуйста, заполните все обязательные поля";
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${URL}/auth/register`, {
        username,
        password,
        lastName,
        firstName,
        middleName,
      });

      console.log(response.data);
      navigate("/");
    } catch (error) {
      if (error) {
        setUserExistsError(true); // Устанавливаем переменную состояния, чтобы показать сообщение о существующем пользователе
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="login-title">
          <h1>Регистрация</h1>
        </div>
        <div className="login-input">
          <label htmlFor="">Введите фамилию</label>
          <div className="container_input">
            <input
              type="text"
              placeholder="Введите фамилию"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  lastName: e.target.value ? "" : "Введите фамилию",
                }));
              }}
              className="form_control"
            />
            {errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="login-input">
          <label htmlFor="">Введите имя</label>
          <div className="container_input">
            <input
              type="text"
              placeholder="Введите имя"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  firstName: e.target.value ? "" : "Введите имя",
                }));
              }}
              className="form_control"
            />
            {errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>
        </div>
        <div className="login-input">
          <label htmlFor="">Введите отчество</label>
          <div className="container_input">
            <input
              type="text"
              placeholder="Введите отчество"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  middleName: e.target.value ? "" : "Введите отчество",
                }));
              }}
              className="form_control"
            />
            {errors.middleName && (
              <div className="error-message">{errors.middleName}</div>
            )}
          </div>
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
                  ...prevErrors,
                  username: e.target.value ? "" : "Введите имя пользователя",
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
        <div>
          <div className="auth-buttons">
            <Link to={"/"}>
              <div>
                <button className={"add-login"}>
                  <p>Войти</p>
                </button>
              </div>
            </Link>
            <div>
              <button className={"cancel-login"} onClick={handleRegister}>
                <p>Зарегистрироваться</p>
              </button>
            </div>
          </div>
        </div>
        <div className="container-error-message">
          {userExistsError && (
            <div className="error-message">
              Пользователь с таким логином уже существует
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
