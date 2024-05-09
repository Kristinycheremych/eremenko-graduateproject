const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeesRoutes = require("./routes/EmployeesRoutes");
const taskStatusesRoutes = require("./routes/TaskStatusesRoutes");
const projectStatusesRoutes = require("./routes/ProjectStatusesRoutes");
const employeeStatusRoutes = require("./routes/EmployeeStatusRoutes");
const projectRouter = require("./routes/ProjectRoutes");
const positionRoutes = require("./routes/PositionRoutes");
const stageRoutes = require("./routes/StageRoutes");
const taskRoutes = require("./routes/TaskRoutes");
const divisionsRoutes = require("./routes/DivisionsRoutes");
const employeeProjectRoutes = require("./routes/EmployeeProjectRoutes");
const taskStatusProjectStageRoutes = require("./routes/TaskStatusProjectStageRoutes")
const executorTaskRoutes = require("./routes/ExecutorTaskRoutes");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT
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
app.use("/", divisionsRoutes);
app.use("/", employeeProjectRoutes);
app.use("/", employeesRoutes);
app.use("/", employeeStatusRoutes);
app.use("/", executorTaskRoutes);
app.use("/", positionRoutes);
app.use("/", projectRouter);
app.use("/", projectStatusesRoutes);
app.use("/", stageRoutes);
app.use("/", taskRoutes);
app.use("/", taskStatusesRoutes);
app.use("/", taskStatusProjectStageRoutes);


// Слушаем порт 3001
app.listen(`${PORT}`, () => {
  console.log("Сервер запущен");
});
