const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/UserRoutes');
const taskStatusesRoutes = require('./routes/TaskStatusesRoutes');
const projectStatusesRoutes = require('./routes/ProjectStatusesRoutes');
const employeeStatusRoutes = require('./routes/EmployeeStatusRoutes');
const projectRouter = require('./routes/ProjectRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Project_Management")
    .then(db => console.log('База данных подключена'))
    .catch(error => console.log(error));

app.use('/', employeeStatusRoutes);
app.use('/',projectRouter);
app.use('/', projectStatusesRoutes);
app.use('/', taskStatusesRoutes);
app.use('/', routes);


app.listen(3001, () => {
    console.log('Сервер запущен');
})