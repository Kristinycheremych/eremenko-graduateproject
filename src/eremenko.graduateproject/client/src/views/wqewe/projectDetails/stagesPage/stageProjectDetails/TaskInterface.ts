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
  periodExecution: string;
  startDate: string;
  endDate: string;
  projectId: Project;
  stageId: Stage;
}

export interface TaskStatusesStageProject {
  _id: string;
  stageProjectId: StageProject;
  taskStatusesId: TaskStatus[];
}

export interface TaskStatus {
  _id: string;
  title: string;
}

export interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  taskStatusId: TaskStatus;
  stageProjectId: StageProject;
  creatorId: Employee;
}

export interface ExecutorTask {
  _id: string;
  taskId: Task;
  startDate: string;
  endDate: string;
  employeeId: Employee[];
}
