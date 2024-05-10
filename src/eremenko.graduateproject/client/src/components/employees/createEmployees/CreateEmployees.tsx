import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { style } from "../../ui/StyleSelect";

const URL = process.env.REACT_APP_URL;

function CreateEmployees({ isOpen, onClose }: any) {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [serviceNumber, setServiceNumber] = useState<string>("");
  const [positionId, setPosition] = useState<string>("");
  const [divisionsId, setDivisions] = useState<string>("");
  const [dataPosition, setDataPosition] = useState<any[]>([]);
  const [dataDivisions, setDataDivisions] = useState<any[]>([]);
  const [employeeStatusId, setEmployeeStatus] = useState<string>("");
  const [dataEmployeeStatus, setDataEmployeeStatus] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${URL}/get/position`)
      .then((res) => {
        setDataPosition(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/get/employeeStatus`)
      .then((res) => {
        setDataEmployeeStatus(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/get/divisions`)
      .then((res) => {
        setDataDivisions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${URL}/create/employees`, {
        lastName,
        firstName,
        middleName,
        serviceNumber,
        gender,
        positionId,
        employeeStatusId,
        divisionsId,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePositionChange = (selectedOption: any) => {
    if (selectedOption) {
      setPosition(selectedOption.value);
    }
  };

  const handleDivisionsChange = (selectedOption: any) => {
    if (selectedOption) {
      setDivisions(selectedOption.value);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="pade">
          <div className="wrapper">
            <div className="modal">
              <div className="modal-content">
                <div className="form-container">
                  <form onSubmit={handleSubmit}>
                    <div className="title-add">
                      <h3>Добавление сотрудника</h3>
                    </div>
                    <div className="container-data-form">
                      <div className="personal_information">
                        <p>Личная информация</p>
                      </div>
                      <div className={"input_div"}>
                        <label htmlFor="lastName">Фамилия</label>
                        <div className="container_input">
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
                        <div className="container_input">
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
                        <div className="container_input">
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
                        <div className="container_input">
                          <Select
                            options={dataPosition.map((position) => ({
                              value: position._id,
                              label: position.title,
                            }))}
                            onChange={handlePositionChange}
                            isClearable
                            placeholder="Выберите должность"
                            isSearchable
                            styles={style}
                            required
                          />
                        </div>
                      </div>
                      <div className={"input_div"}>
                        <label htmlFor="position">Подразделение</label>
                        <div className="container_input">
                          <Select
                            options={dataDivisions.map((divisions) => ({
                              value: divisions._id,
                              label: divisions.title,
                            }))}
                            onChange={handleDivisionsChange}
                            // Возможность очистить выбранное значение
                            isClearable
                            // Возможность поиска куратора по имени
                            isSearchable
                            placeholder="Выберите подразделение"
                            styles={style}
                            required
                          />
                        </div>
                      </div>
                      <div className={"input_div"}>
                        <label htmlFor="serviceNumber">Табельный номер</label>
                        <div className="container_input">
                          <input
                            type="number"
                            placeholder="Введите табельный номер"
                            className={"form_control"}
                            onChange={(e: any) =>
                              setServiceNumber(e.target.value)
                            }
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
                                checked={employeeStatusId === status._id}
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
                          <button
                            className={"button_add_cancel"}
                            onClick={onClose}
                          >
                            Отменить
                          </button>
                        </div>
                        <div>
                          <button className={"button_add"}>Добавить</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateEmployees;