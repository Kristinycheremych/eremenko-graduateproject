const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeesRoutes = require("./routes/EmployeesRoutes");
const taskStatusesRoutes = require("./routes/TaskStatusesRoutes");
const projectStatusesRoutes = require("./routes/ProjectStatusesRoutes");
const employeeStatusRoutes = require("./routes/EmployeeStatusRoutes");
const projectRouter = require("./routes/ProjectRoutes");
const positionRoutes = require("./routes/PositionRoutes");
const stageProjectRoutes = require("./routes/StageProjectRoutes");
const stageRoutes = require("./routes/StageRoutes");
const taskRoutes = require("./routes/TaskRoutes");

const app = express();

// Подключаем middleware для обработки CORS
app.use(cors());

// Парсинг JSON-тела запроса
app.use(express.json());

// Подключаемся к базе данных MongoDB
mongoose
  .connect("mongodb://localhost:27017/Project_Management")
  .then((db) => console.log("База данных подключена"))
  .catch((error) => console.log(error));

// Подключаем роуты
app.use("/", employeesRoutes);
app.use("/", employeeStatusRoutes);
app.use("/", positionRoutes);
app.use("/", projectRouter);
app.use("/", projectStatusesRoutes);
app.use("/", stageProjectRoutes);
app.use("/", stageRoutes);
app.use("/", taskRoutes);
app.use("/", taskStatusesRoutes);

// Слушаем порт 3001
app.listen(3001, () => {
  console.log("Сервер запущен");
});
