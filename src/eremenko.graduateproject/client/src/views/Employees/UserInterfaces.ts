export interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: string;
  serviceNumber: number;
  positionId: {
    _id: string;
    title: string;
  };
  employeeStatusId: {
    _id: string;
    title: string;
  };
  divisionsId: {
    _id: string;
    code: number;
    title: string;
  };
}