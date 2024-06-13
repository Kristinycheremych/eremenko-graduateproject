const express = require("express");
const router = express.Router();
const EmployeeProjectModel = require("../models/EmployeeProjectModel");
const ProjectModel = require("../models/ProjectModel");

// Роут для получения всех связей сотрудников и проектов
router.get("/get/employeeProject", async (req, res) => {
  try {
    const employeeProjects = await EmployeeProjectModel.find()
      .populate({
        path: "employeeId",
        populate: { path: "positionId" },
      })
      .populate({
        path: "employeeId",
        populate: { path: "employeeStatusId" },
      })
      .populate({
        path: "projectId",
        populate: { path: "statusProjectId" },
      })
      .populate({
        path: "projectId",
        populate: { path: "supervisorId" },
      });
    res.json(employeeProjects);
  } catch (error) {
    console.error(error, "Ошибка сервера");
  }
});

router.get("/employeeProject/:id", async (req, res) => {
  try {
    const employeeProject = await EmployeeProjectModel.findById(req.params.id)
      .populate({
        path: "employeeId",
        populate: { path: "positionId" },
      })
      .populate({
        path: "employeeId",
        populate: { path: "employeeStatusId" },
      })
      .populate({
        path: "projectId",
        populate: { path: "statusProjectId" },
      })
      .populate({
        path: "projectId",
        populate: { path: "supervisorId" },
      });
    if (!employeeProject) {
      console.res("Связь сотрудника и проекта не найдена");
    }
    res.json(employeeProject);
  } catch (error) {
    console.error(error, "Ошибка при получении связи сотрудника и проекта");
  }
});

router.post("/addProjectWithEmployee", async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      statusProjectId,
      supervisorId,
      positionId,
      employeeId,
    } = req.body;

    // Создаем запись проекта
    const newProject = new ProjectModel({
      title,
      description,
      startDate,
      endDate,
      statusProjectId,
      positionId,
      supervisorId,
    });

    // Сохраняем запись проекта
    await newProject.save();

    // Создаем запись в промежуточной таблице
    const employeeProject = new EmployeeProjectModel({
      employeeId,
      projectId: newProject._id,
    });

    // Сохраняем запись в промежуточной таблице
    await employeeProject.save();
  } catch (error) {
    console.error(error, "Ошибка сервера");
  }
  
});
// Редактирование связи сотрудника и проекта по уникальному идентификатору
router.put("/update/employeeProject/:id", async (req, res) => {
  const projectId = req.params.id;
  const {
    title,
    description,
    startDate,
    endDate,
    statusProjectId,
    supervisorId,
    positionId,
    employeeId,
  } = req.body;

  try {
    // Проверяем существование проекта по ID
    const existingProject = await ProjectModel.findById(projectId);
    if (!existingProject) {
      return res.json({ message: "Проект не найден" });
    }

    // Обновляем данные проекта
    existingProject.title = title;
    existingProject.description = description;
    existingProject.startDate = startDate;
    existingProject.endDate = endDate;
    existingProject.statusProjectId = statusProjectId;
    existingProject.supervisorId = supervisorId;
    existingProject.positionId = positionId;

    // Сохраняем обновленные данные проекта
    await existingProject.save();

    // Обновляем участников проекта
    await EmployeeProjectModel.updateMany(
      { projectId },
      { $set: { employeeId } }
    );

    res.json({ message: "Проект успешно обновлен" });
  } catch (error) {
    console.error("Ошибка сервера:", error);
  }
});

// Удаление связи сотрудника и проекта по уникальному идентификатору
router.delete("/employeeProject/:id", async (req, res) => {
  try {
    const deletedEmployeeProject = await EmployeeProjectModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmployeeProject) {
      return res.json({ message: "Связь сотрудника и проекта не найдена" });
    }
    res.json({ message: "Связь сотрудника и проекта успешно удалена" });
  } catch (err) {
    console.error(err);
    res.json({ message: "Ошибка при удалении связи сотрудника и проекта" });
  }
});

module.exports = router;
