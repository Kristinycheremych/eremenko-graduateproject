const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/UserRoutes');
const taskStatusesRoutes = require('./routes/TaskStatusesRoutes');
const projectStatusesRoutes = require('./routes/ProjectStatusesRoutes');
const employeeStatusRoutes = require('./routes/EmployeeStatusRoutes');
const projectRouter = require('./routes/ProjectRoutes');
const positionRoutes = require('./routes/PositionRoutes');
const stagesRoutes = require('./routes/StagesRoutes');

const app = express();

// Подключаем middleware для обработки CORS
app.use(cors());

// Парсинг JSON-тела запроса
app.use(express.json());

// Подключаемся к базе данных MongoDB
mongoose.connect("mongodb://localhost:27017/Project_Management")
    .then(db => console.log('База данных подключена'))
    .catch(error => console.log(error));

// Подключаем роуты
app.use('/', employeeStatusRoutes);
app.use('/', positionRoutes);
app.use('/', projectRouter);
app.use('/', projectStatusesRoutes);
app.use('/', stagesRoutes);
app.use('/', taskStatusesRoutes);
app.use('/', routes);

// Слушаем порт 3001
app.listen(3001, () => {
    console.log('Сервер запущен');
});