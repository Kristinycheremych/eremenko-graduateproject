import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import Header from "../../../../components/header/Header";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { TaskStatusesStageProject } from "./StageProjectInterface";
import AddStageProject from "../../../../components/project/addStageProject/AddStageProject";

const URL = process.env.REACT_APP_URL;

const StagesPage: React.FC = () => {
  const [projectForm, setProjectForm] = useState<TaskStatusesStageProject[]>(
    []
  );
  const { projectId, stageId } = useParams<{
    stageId: string;
    projectId: string;
  }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Добавляем состояние для модального окна

  useEffect(() => {
    if (stageId) {
      fetchProjectForm(stageId);
    }
  }, [stageId]);

  const fetchProjectForm = async (stageId: string) => {
    try {
      const response = await axios.get<TaskStatusesStageProject[]>(
        `${URL}/get/taskStatusProjectStage`
      );
      const filteredData = response.data.filter(
        (stage) => stage.stageProjectId.projectId._id === stageId
      );
      setProjectForm(filteredData);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Удаление
  const handleDelete = (id: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить этот этап проекта`)) {
      axios
        .delete(`${URL}/taskStatusProjectStage/${id}`)
        .then(() => {
          setProjectForm(projectForm.filter((project) => project._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  // Поиск
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = projectForm.filter((project) => {
    const stageTitle = project.stageProjectId.stageId.title.toLowerCase();
    return stageTitle.includes(searchQuery.toLowerCase());
  });

  const togglePopover = (id: string) => {
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".HiEllipsisHorizontal"))
        setOpenPopoverId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="header">
        <div className="divArrowBackIos">
          <MdArrowBackIos className="MdArrowBackIos" />
        </div>
        <p>
          {filteredProjects.length > 0
            ? `Этапы проекта - ${filteredProjects[0].stageProjectId.projectId.title}`
            : "Название проекта не найдено"}
        </p>
      </div>
      <Header />
      <div className="container">
        <div className={"container_search_filter"}>
          <div className={"div_input_search"}>
            <input
              type="text"
              className={"input_search"}
              placeholder="Поиск"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className={"containet_btn_add"}>
            <button className={"btn_add"} onClick={handleAdd}>
              Добавить
            </button>
          </div>
        </div>
        <div className="table_user_settings">
          <table>
            <thead>
              <tr>
                <th>Этап</th>
                {/* <th>Описание</th> */}
                <th>Дата начала</th>
                <th>Дата завершения</th>
                <th>Срок окончания</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => {
                return (
                  <tr key={project._id}>
                    <td>{project.stageProjectId.stageId.title}</td>
                    <td>
                      {new Date(
                        project.stageProjectId.startDate
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(
                        project.stageProjectId.endDate
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(
                        project.stageProjectId.periodExecution
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <HiEllipsisHorizontal
                        className="HiEllipsisHorizontal"
                        onClick={() => togglePopover(project._id)}
                      />
                      {openPopoverId === project._id && (
                        <div className="popover-content">
                          <div className="div-popover-content">
                            <div className="div_edit">
                              <Link
                                to={`/projectsPage/stageDetails/${projectId}/${stageId}/stages/${project.stageProjectId._id}`}
                              >
                                <p>Подробнее</p>
                              </Link>
                            </div>
                            <div
                              onClick={() => handleDelete(project._id)}
                              className="div_delete"
                            >
                              <p>Удалить</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Добавляем модальное окно */}
      <AddStageProject isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default StagesPage;
