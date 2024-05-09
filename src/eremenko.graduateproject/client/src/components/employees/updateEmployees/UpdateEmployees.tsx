import React, { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "../../../views/employees/UserInterfaces";
import { style } from "../../ui/StyleSelect";
import Select from "react-select";

const URL = process.env.REACT_APP_URL;

function UpdateEmployees({ isOpen, onClose, employeeId }: any) {
  const id = employeeId;
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [serviceNumber, setServiceNumber] = useState<number | undefined>(
    undefined
  );
  const [position, setPosition] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [positionList, setPositionList] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [divisionsList, setDivisionsList] = useState<any[]>([]);
  const [employeeStatusId, setEmployeeStatusId] = useState<string>("");
  const [employeeStatusList, setEmployeeStatusList] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Employee>(
          `${URL}/get/employees/${id}`
        );
        const {
          lastName,
          firstName,
          middleName,
          gender,
          serviceNumber,
          position,
          divisions,
          employeeStatus,
        } = response.data;
        setLastName(lastName);
        setFirstName(firstName);
        setMiddleName(middleName);
        setGender(gender);
        setServiceNumber(serviceNumber);
        setPosition({ value: position._id, label: position.title });
        setDivisions({ value: divisions._id, label: divisions.title });
        setEmployeeStatusId(employeeStatus._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    axios
      .get(`${URL}/get/position`)
      .then((res) => {
        setPositionList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${URL}/get/employeeStatus`)
      .then((res) => {
        setEmployeeStatusList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${URL}/get/divisions`)
      .then((res) => {
        setDivisionsList(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`${URL}/update/employees/${id}`, {
        lastName,
        firstName,
        middleName,
        gender,
        serviceNumber,
        position: position?.value,
        divisions: divisions?.value,
        employeeStatus: employeeStatusId,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isOpen && (
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
                  <div>
                    <Select
                      options={positionList.map((positionItem) => ({
                        value: positionItem._id,
                        label: positionItem.title,
                      }))}
                      onChange={(selectedOption: any) =>
                        setPosition(selectedOption)
                      }
                      styles={style}
                      value={position}
                    />
                  </div>
                </div>
                <div className={"input_div"}>
                  <label htmlFor="divisions">Подразделения</label>
                  <div>
                    <Select
                      options={divisionsList.map((divisionsItem) => ({
                        value: divisionsItem._id,
                        label: divisionsItem.title,
                      }))}
                      onChange={(selectedOption: any) =>
                        setDivisions(selectedOption)
                      }
                      styles={style}
                      value={divisions}
                    />
                  </div>
                </div>
                <div className={"input_div"}>
                  <label htmlFor="middleName">Табельный номер</label>
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
                    <button className={"button_add_cancel"} onClick={onClose}>
                      Отменить
                    </button>
                  </div>
                  <div>
                    <button className={"button_add"}>Изменить</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateEmployees;
