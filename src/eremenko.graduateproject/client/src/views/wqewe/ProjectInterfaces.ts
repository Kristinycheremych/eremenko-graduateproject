export interface EmployeeStatus {
  _id: string;
  title: string;
}

export interface Position {
  _id: string;
  title: string;
}

export interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: String;
  serviceNumber: number;
  positionId: Position;
  employeeStatusId: EmployeeStatus;
}

export interface ProjectStatus {
  _id: string;
  title: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  statusProjectId: ProjectStatus;
  supervisorId: Employee[];
}

export interface EmployeeProject {
  _id: string;
  employeeId: Employee[];
  projectId: Project;
}
//
export interface ProjectFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  statusProjectId: string;
  supervisorId: string;
  employeeId: string[];
}
