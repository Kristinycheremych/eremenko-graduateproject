/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./projectStatusesStyle.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

function ProjectStatuses() {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/projectStatuses")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
    //поиск пользователей и фильтр по должности
    const search = data.filter((data) => {
      const fullName = `${data.title} ${data.description}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredEmployees(search);
  }, [data]);

  const handleDelete = (id: any) => {
    axios
      .delete("http://localhost:3001/deleteProjectStatuses/" + id)
      .then((res) => {
        console.log(res);
        navigate("/projectStatuses");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <div className="container_search_filter">
          <div className="div_input_search">
            <input
              type="text"
              className="input_search"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="containet_btn_add">
            <Link to="./addProjectStatuses">
              <button className="btn_add">Добавить</button>
            </Link>
          </div>
        </div>

        <div className="container_settings">
          <div className="title">
            <h2>Статусы проекта</h2>
          </div>

          <div className="table_user_settings">
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Описание</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((projectStatuses, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className="text_td">{projectStatuses.title}</td>
                        <td className="text_td">
                          {projectStatuses.description}
                        </td>
                        <td className="td-icon">
                          <div className={"icon_edit"}>
                            <Link
                              to={`/projectStatuses/updateProjectStatuses/${projectStatuses._id}`}
                            >
                              <FiEdit />
                            </Link>
                          </div>
                        </td>
                        <td className="td-icon">
                          <div className={"icon_delete"}>
                            <AiOutlineDelete
                              onClick={() => handleDelete(projectStatuses._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectStatuses;
