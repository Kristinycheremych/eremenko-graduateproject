// const express = require("express");
// const StageProjectModal = require("../models/StageProjectModel");
// const router = express.Router();

// // Получение этапа для конкретного проекта
// router.get("/get/stageProject", async (req, res) => {
//   try {
//     const taskStatusProjectStage = await StageProjectModal.find()
//     .populate("projectId")
//     .populate("stageId")
//     res.json(taskStatusProjectStage);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Ошибка сервера" });
//   }
// });

// // Роут для получения данных об этапе проекта по его ID
// router.get("/stageProject/:id", async (req, res) => {
//   try {
//     const stageProjectId = req.params.id;
//     const stageProject = await StageProjectModal.findById(stageProjectId);
//     if (!stageProject) {
//       return res.status(404).json({ message: "Этап проекта не найден" });
//     }
//     res.json(stageProject);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Ошибка сервера" });
//   }
// });

// // router.get("/get/stageProject/:projectId", async (req, res) => {
// //   const projectId = req.params.projectId;
// //   try {
// //     const taskStatusProjectStage = await StageProjectModal.find({ projectId })
// //       .populate("projectId")
// //       .populate("stageId");
// //     res.json(taskStatusProjectStage);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Ошибка сервера" });
// //   }
// // });


// // router.get("/get/projectStages/:projectId", async (req, res) => {
// //   try {
// //     const { projectId } = req.params;
// //     const projectStages = await StageProjectModal.find({ "projectId": projectId })
// //       .populate("stageId");
// //     res.json(projectStages);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Ошибка сервера" });
// //   }
// // });


// module.exports = router;
