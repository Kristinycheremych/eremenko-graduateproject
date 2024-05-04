import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: string;
  serviceNumber: number;
  position: {
    _id: string;
    title: string;
  };
  employeeStatus: {
    _id: string;
    title: string;
  };
  divisions: {
    _id: string;
    code: number;
    title: string;
  };
}

function UpdateEmployees() {
  const { id } = useParams();
  const [lastName, setLastName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [serviceNumber, setServiceNumber] = useState<number>();
  const [positionId, setPositionId] = useState<string>();
  const [positionList, setPositionList] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<string>();
  const [divisionsList, setDivisionsList] = useState<any[]>([]);
  const [employeeStatusId, setEmployeeStatusId] = useState<string>();
  const [employeeStatusList, setEmployeeStatusList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Employee>(
          `http://localhost:3001/get/employees/${id}`
        );
        setLastName(response.data.lastName);
        setFirstName(response.data.firstName);
        setMiddleName(response.data.middleName);
        setGender(response.data.gender);
        setServiceNumber(response.data.serviceNumber);
        setPositionId(response.data.position._id);
        setDivisions(response.data.divisions._id);
        setEmployeeStatusId(response.data.employeeStatus._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    axios
      .get("http://localhost:3001/get/position")
      .then((res) => {
        setPositionList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/get/employeeStatus")
      .then((res) => {
        setEmployeeStatusList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/get/divisions")
      .then((res) => {
        setDivisionsList(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/update/employees/${id}`, {
        lastName,
        firstName,
        middleName,
        gender,
        serviceNumber,
        position: positionId,
        divisions: divisions,
        employeeStatus: employeeStatusId,
      })
      .then((res) => {
        navigate("/employeesPage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={"pade"}>
        <div className={"wrapper"}>
          <form onSubmit={handleUpdate}>
            <div className="title-add">
              <h3>Изменение сотрудника</h3>
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
                      checked={gender === "Мужской"}
                      value="Мужской"
                      onChange={(e: any) => setGender(e.target.value)}
                    />
                    Мужской
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "Женский"}
                      value="Женский"
                      onChange={(e: any) => setGender(e.target.value)}
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
                    className="form_control"
                    value={positionId}
                    onChange={(e: any) => setPositionId(e.target.value)}
                  >
                    <option value={""}>Выберите должность:</option>
                    {positionList.map((positionItem) => {
                      return (
                        <option key={positionItem._id} value={positionItem._id}>
                          {positionItem.title}
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
                    className="form_control"
                    value={divisions}
                    onChange={(e: any) => setDivisions(e.target.value)}
                  >
                    <option value={""}>Выберите подразделение:</option>
                    {divisionsList.map((divisionsItem) => {
                      return (
                        <option
                          key={divisionsItem._id}
                          value={divisionsItem._id}
                        >
                          {divisionsItem.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="middleName">Табельный намер</label>
                <div>
                  <input
                    type="number"
                    placeholder="Введите табельный номер"
                    className={"form_control"}
                    onChange={(e: any) => setServiceNumber(e.target.value)}
                    value={serviceNumber}
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label>Статус</label>
                <div className="div_input_radio">
                  {employeeStatusList.map((status) => (
                    <label key={status._id}>
                      <input
                        type="radio"
                        name="employeeStatus"
                        value={status._id}
                        checked={employeeStatusId === status._id}
                        onChange={() => setEmployeeStatusId(status._id)}
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
                  <button className={"button_add"}>Изменить</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateEmployees;
