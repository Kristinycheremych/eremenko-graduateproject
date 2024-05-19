const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName, middleName } = req.body;

  try {
    // Проверка, не существует ли уже пользователь с таким именем
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    // Создание нового пользователя с ролью разработчика
    const newUser = new User({
      username,
      password,
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
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, соответствует ли введенный логин и пароль администратору
    if (username === "admin" && password === "admin") {
      return res.json({ username: "admin", role: "admin" });
    }

    // Проверяем, существует ли пользователь с переданным логином и паролем
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Проверяем, является ли найденный пользователь разработчиком
    if (user.role !== "developer") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    // Если пользователь аутентифицирован успешно, отправляем информацию о пользователе
    res.json({ username: user.username, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;