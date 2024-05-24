export interface TaskStatuses {
  _id: string;
  title: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Stage {
  _id: string;
  title: string;
  description: string;
}

export interface StageProject {
  _id: string;
  description: string;
  periodExecution: string;
  startDate: string;
  endDate: string;
  projectId: Project;
  stageId: Stage;
}

export interface TaskStatusesStageProject {
  _id: string;
  stageProjectId: StageProject;
  taskStatusesId: TaskStatuses[];
}

export interface ProjectFormData {
  _id: string;
  periodExecution: string;
  startDate: string;
  endDate: string;
  projectId: string;
  stageId: string;
  taskStatusesId: string[];
}
