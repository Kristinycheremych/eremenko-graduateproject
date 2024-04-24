const express = require("express");
const router = express.Router();
const EmployeeProjectModel = require("../models/EmployeeProjectModel");

// Роут для получения всех связей сотрудников и проектов
router.get("/get/employeeProject", (req, res) => {
  EmployeeProjectModel.find()
    .populate("employee")
    .populate({
      path: "project",
      populate: { path: "status" },
    })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

router.get("/employeeProject/:id", async (req, res) => {
  try {
    const employeeProject = await EmployeeProjectModel.findById(req.params.id)
      .populate("employee")
      .populate({
        path: "project",
        populate: { path: "status" },
      });
    if (!employeeProject) {
      return res
        .status(404)
        .json({ message: "Связь сотрудника и проекта не найдена" });
    }
    res.json(employeeProject);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Ошибка при получении связи сотрудника и проекта" });
  }
});

// Удаление связи сотрудника и проекта по уникальному идентификатору
router.delete("/employeeProject/:id", async (req, res) => {
  try {
    const deletedEmployeeProject = await EmployeeProjectModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmployeeProject) {
      return res
        .status(404)
        .json({ message: "Связь сотрудника и проекта не найдена" });
    }
    res.json({ message: "Связь сотрудника и проекта успешно удалена" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Ошибка при удалении связи сотрудника и проекта" });
  }
});

module.exports = router;
