import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

const AddTaskPage: React.FC = () => {
  const { projectId, stageId, stageProjectId } = useParams<{ stageProjectId: string, projectId: string, stageId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [employees, setEmployees] = useState<string[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>("http://localhost:3001/get/employees");
      setAllEmployees(response.data);
    } catch (error) {
      console.error("Ошибка при получении списка сотрудников:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/addExecutorTask`, {
        title,
        description,
        startDate,
        endDate,
        projectId,
        stageProjectId,
        creatorId,
        employees: allEmployees,
      });
      navigate(`/projectsPage/stageDetails/${projectId}/${stageId}/${stageProjectId}`);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Добавление задачи</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Дата начала:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Дата завершения:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Создатель:</label>
            <select value={creatorId} onChange={(e) => setCreatorId(e.target.value)}>
              <option value="">Выберите создателя</option>
              {allEmployees.map((employee) => (
                <option key={employee._id} value={employee._id}>{employee.firstName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Исполнители:</label>
            <select multiple value={employees} onChange={(e) => setEmployees(Array.from(e.target.selectedOptions, option => option.value))}>
              {allEmployees.map((employee) => (
                <option key={employee._id} value={employee._id}>{employee.firstName}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn">Добавить</button>
        </form>
      </div>
    </>
  );
};

export default AddTaskPage;