import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateEmployees() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [position, setPosition] = useState("");
  const [divisions, setDivisions] = useState("");
  const [dataPosition, setDataPosition] = useState<any[]>([]);
  const [dataDivisions, setDataDivisions] = useState<any[]>([]);
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [dataEmployeeStatus, setDataEmployeeStatus] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/position")
      .then((res) => {
        setDataPosition(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/employeeStatus")
      .then((res) => {
        setDataEmployeeStatus(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/divisions")
      .then((res) => {
        setDataDivisions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitPosition = async (event: any) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/create/employees", {
        lastName,
        firstName,
        middleName,
        serviceNumber,
        gender,
        position,
        employeeStatus,
        divisions,
      })
      .then((res) => {
        console.log(res);
        navigate("/employeesPage");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={"pade"}>
        <div className={"wrapper"}>
          <form onSubmit={handleSubmitPosition}>
            <div className="title-add">
              <h3>Добавление сотрудника</h3>
            </div>
            <div className="container-data-form">
              <div className="personal_information">
                <p>Личная информация</p>
              </div>
              <div className={"input_div"}>
                <label htmlFor="lastName">Фамилия</label>
                <div>
                  <input
                    type="text"
                    placeholder="Еременко"
                    className={"form_control"}
                    onChange={(e: any) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="firstName">Имя</label>
                <div>
                  <input
                    type="text"
                    placeholder="Кристина"
                    className={"form_control"}
                    onChange={(e: any) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="middleName">Отчество</label>
                <div>
                  <input
                    type="text"
                    placeholder="Юрьевна"
                    className={"form_control"}
                    onChange={(e: any) => setMiddleName(e.target.value)}
                    value={middleName}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label>Пол</label>
                <div className="div_input_radio">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Мужской"
                      checked={gender === "Мужской"}
                      onChange={() => setGender("Мужской")}
                    />
                    Мужской
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Женский"
                      checked={gender === "Женский"}
                      onChange={() => setGender("Женский")}
                    />
                    Женский
                  </label>
                </div>
              </div>
              <hr className="dividing_strip" />
              <div className="personal_information">
                <p>Рабочая информация</p>
              </div>
              <div className={"input_div"}>
                <label htmlFor="position">Должность</label>
                <div className="select">
                  <select
                    className={"form_control"}
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  >
                    <option value="">Выберете должность:</option>
                    {dataPosition.map((position) => {
                      return (
                        <option key={position._id} value={position._id}>
                          {position.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="divisions">Подразделения</label>
                <div className="select">
                  <select
                    className={"form_control"}
                    value={divisions}
                    onChange={(e) => setDivisions(e.target.value)}
                    required
                  >
                    <option value="">Выберете подразделение:</option>
                    {dataDivisions.map((divisions) => {
                      return (
                        <option key={divisions._id} value={divisions._id}>
                          {divisions.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="serviceNumber">Табельный номер</label>
                <div>
                  <input
                    type="number"
                    placeholder="Введите табельный номер"
                    className={"form_control"}
                    onChange={(e: any) => setServiceNumber(e.target.value)}
                    value={serviceNumber}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label>Статус</label>
                <div className="div_input_radio">
                  {dataEmployeeStatus.map((status) => (
                    <label key={status._id}>
                      <input
                        type="radio"
                        name="employeeStatus"
                        value={status._id}
                        checked={employeeStatus === status._id}
                        onChange={() => setEmployeeStatus(status._id)}
                      />
                      {status.title}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className={"action_buttons"}>
              <div className="buttons">
                <div>
                  <Link to={"/employeesPage"}>
                    <button className={"button_add_cancel"}>Отменить</button>
                  </Link>
                </div>
                <div>
                  <button className={"button_add"}>Добавить</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateEmployees;
