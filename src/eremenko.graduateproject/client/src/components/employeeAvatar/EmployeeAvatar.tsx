// employeeAvatar/EmployeeAvatar.tsx
import React from "react";
import './styleAvatar.css';

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

const EmployeeAvatar: React.FC<{ employee: Employee }> = ({ employee }) => {
  const initials = `${employee.firstName.charAt(0)}${employee.middleName.charAt(0)}`;

  return (
    <div className="employee-avatar">
      <span>{initials}</span>
    </div>
  );
};

export default EmployeeAvatar;