import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../../../../components/header/Header";
import "./style.css";

interface TaskStatus {
  _id: string;
  title: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Stage {
  _id: string;
  title: string;
  description: string;
}

interface StageProject {
  _id: string;
  periodExecution: string;
  startDate: string;
  endDate: string;
  projectId: Project;
  stageId: Stage;
}

interface StageFormData {
  _id: string;
  stageProjectId: StageProject;
  taskStatusesId: TaskStatus[];
}

const StageDetailsPage: React.FC = () => {
  const { projectId, stageId,stageProjectId } = useParams<{ stageProjectId: string, projectId: string, stageId: string }>();
  const [stage, setStage] = useState<StageFormData | null>(null);

  useEffect(() => {
    if (stageProjectId) {
      fetchStageDetails(stageProjectId);
    }
  }, [stageProjectId]);

  const fetchStageDetails = async (stageProjectId: string) => {
    try {
      const response = await axios.get<StageFormData[]>(
        `http://localhost:3001/get/taskStatusProjectStage`
      );
      const filteredData = response.data.find(
        (project) => project.stageProjectId.stageId._id === stageProjectId
      );
      if (filteredData) {
        setStage(filteredData);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  console.log(stageProjectId)

  if (!stage) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className={"container_search_filter"}>
          <div className={"div_input_search"}>
            <input type="text" className={"input_search"} placeholder="Поиск" />
          </div>
          <div className={"div_filter"}>
            <select className={"filter"}>
              <option value="">Все</option>
            </select>
          </div>
          <div className={"containet_btn_add"}>
            <Link
              to={`/projectsPage/stageDetails/${projectId}/${stageId}/${stageProjectId}/addTask`}
            >
              <button className={"btn_add"}>
                Добавить задачу
              </button>
            </Link>
          </div>
        </div>

        <div>
          <div className="detailStage">
            <h3>Подробности об этапе:</h3>
            <p>
              {stage.stageProjectId.stageId.title
                ? stage.stageProjectId.stageId.title
                : "Нет данных"}
            </p>
          </div>
        </div>

        <div>
          <p>
            <h5>Описание: </h5>
            {stage.stageProjectId.stageId.description}
          </p>
        </div>
        <div className="stages">
            {stage.taskStatusesId.map((status) => (
                <div key={status._id} className={"stage"}>
                  <div className="titleStatusStage">
                    <p>{status.title}</p>
                  </div>
                 </div>
              ))}
          </div>
      </div>
    </>
  );
};

export default StageDetailsPage;