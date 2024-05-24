const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName, middleName } = req.body;

  try {
    // Проверка, не существует ли уже пользователь с таким именем
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error("Пользователь уже существует");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Создание нового пользователя с ролью разработчика
    const newUser = new User({
      username,
      password: hash,
      role: "developer",
      firstName,
      lastName,
      middleName,
    });
    await newUser.save();

    res.json({
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, соответствует ли введенный логин и пароль администратору
    if (username === "admin" && password === "admin") {
      return res.json({ username: "admin", role: "admin" });
    }

    // Проверяем, существует ли пользователь с переданным логином
    const user = await User.findOne({ username });
    if (!user) {
      console.error("Неверное имя пользователя или пароль");
    }

    // Проверяем, соответствует ли введенный пароль хэшированному паролю в базе данных
    const hash = bcrypt.compareSync(password, user.password);
    if (!hash) {
      console.error("Неверное имя пользователя или пароль");
    }
    
    // Проверяем, является ли найденный пользователь разработчиком
    if (user.role !== "developer") {
      console.error("Доступ запрещен");
    }

    // Если пользователь аутентифицирован успешно, отправляем информацию о пользователе
    res.json({ username: user.username, role: user.role });
  } catch (error) {
    console.error("Ошибка сервера");
  }
});

module.exports = router;
