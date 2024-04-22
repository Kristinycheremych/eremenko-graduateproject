const express = require("express");
const StageProjectModal = require("../models/StageProjectModel");
const router = express.Router();

// Получение этапа для конкретного проекта
router.get("/get/projects/:projectId/stageProject", (req, res) => {
  const projectId = req.params.projectId;
  StageProjectModal.find({ projectId })
    .populate("projectId")
    .populate("stageId")
    .populate("employees")
    .then((stageProject) => res.json(stageProject))
    .catch((err) => res.json(err));
});

router.get("/get/projects/:projectId/stageProject/:id", (req, res) => {
  const id = req.params.id;
  StageProjectModal.findOne({ _id: id })
    .populate("projectId")
    .populate("stageId")
    .populate("employees")
    .then((stageProject) => res.json(stageProject))
    .catch((err) => res.json(err));
});

// Добавить этап для конкретного проекта
router.post("/create/projects/:projectId/stageProject", async (req, res) => {
  const { projectId } = req.params;
  const { startDate, endDate, stageId, employees } = req.body;
  const newStage = new StageProjectModal({
    projectId,
    startDate,
    endDate,
    stageId,
    employees,
  });

  newStage
    .save()
    .then((project) => res.json(project))
    .catch((err) => res.json(err));
});

// Изменение этапов проекта
router.put("/update/projects/:projectId/stageProject/:id", (req, res) => {
  const id = req.params.id;
  StageProjectModal.findByIdAndUpdate(
    id,
    {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      stageId: req.body.stageId,
      employees: req.body.employees,
    },
    { new: true }
  )
    .then((updatedStageProject) => res.json(updatedStageProject))
    .catch((err) => res.json(err));
});

// Удалить этап для конкретного проекта
router.delete(
  "/delete/projects/:projectId/stageProject/:stageProjectId",
  async (req, res) => {
    const { stageProjectId } = req.params;

    try {
      const deletedStage = await StageProjectModal.findByIdAndDelete(
        stageProjectId
      );
      if (!deletedStage) {
        return res.status(404).json({ error: "Этап не найден" });
      }
      res.status(200).json(deletedStage);
    } catch (error) {
      console.error("Ошибка при удалении этапа:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
);


router.get("/get/stageDetails/:stageId", async (req, res) => {
  const stageId = req.params.stageId;

  try {
    const stageDetails = await StageProjectModal.findOne({
      _id: stageId,
    }).populate("stageId");

    // Проверяем, найден ли этап
    if (!stageDetails) {
      return res.status(404).json({ error: "Этап не найден" });
    }

    // Отправляем данные этапа в ответе
    res.json(stageDetails);
  } catch (error) {
    console.error("Ошибка при получении подробностей об этапе:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
