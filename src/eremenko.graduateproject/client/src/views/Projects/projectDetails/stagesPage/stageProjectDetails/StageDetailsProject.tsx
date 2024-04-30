import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../../../../components/header/Header";

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
  const { stageId } = useParams<{ stageId: string }>();
  const [stage, setStage] = useState<StageFormData | null>(null);

  useEffect(() => {
    if (stageId) {
      fetchStageDetails(stageId);
    }
  }, [stageId]);

  const fetchStageDetails = async (stageId: string) => {
    try {
      const response = await axios.get<StageFormData[]>(`http://localhost:3001/get/taskStatusProjectStage/${stageId}`);
      if (response.data.length > 0) {
        setStage(response.data[0]);
      } else {

      }
    } catch (error) {
      console.error("Error fetching stage details:", error);
    }
  };

  if (!stage) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="stage-details-container">
        <h2>{stage.stageProjectId.stageId.title}</h2>
        <p>{stage.stageProjectId.stageId.description}</p>
        <p>Start Date: {new Date(stage.stageProjectId.startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(stage.stageProjectId.endDate).toLocaleDateString()}</p>
      </div>
    </>
  );
};

export default StageDetailsPage;