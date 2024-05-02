import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";
import Header from "../../../../components/header/Header";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface TaskStatuses {
  _id: string;
  title: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Stage {
  _id: string;
  title: string;
  description: string;
}

interface StageProject {
  _id: string;
  periodExecution: string;
  startDate: string;
  endDate: string;
  projectId: Project;
  stageId: Stage;
}

interface ProjectFormData {
  _id: string;
  stageProjectId: StageProject;
  taskStatusesId: TaskStatuses[];
}

const StagesPage: React.FC = () => {
  const [projectForm, setProjectForm] = useState<ProjectFormData[]>([]);
  const { projectId, stageId } = useParams<{
    stageId: string;
    projectId: string;
  }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  useEffect(() => {
    if (stageId) {
      fetchProjectForm(stageId);
    }
  }, [stageId]);

  const fetchProjectForm = async (stageId: string) => {
    try {
      const response = await axios.get<ProjectFormData[]>(
        `http://localhost:3001/get/taskStatusProjectStage`
      );
      const filteredData = response.data.filter(
        (stage) => stage.stageProjectId.projectId._id === stageId
      );
      setProjectForm(filteredData);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  console.log(stageId);

  // Удаление
  const handleDelete = (id: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить этот этап проекта`)) {
      axios
        .delete(`http://localhost:3001/taskStatusProjectStage/${id}`)
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
            <Link to={`/projectsPage/stageDetails/${projectId}/stages`}>
              <button className={"btn_add"}>Добавить</button>
            </Link>
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
                    {/* <td>
                      <p className="description">{project.stageProjectId.stageId.description}</p>
                    </td> */}
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
                    {/* <td>
                      <Link
                        to={`/projectsPage/updateProject/${project._id}`}
                        className={"icon_edit"}
                      >
                        <FiEdit />
                      </Link>
                    </td> */}
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
                                to={`/projectsPage/stageDetails/${projectId}/${stageId}/${project.stageProjectId.stageId._id}`}
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
    </>
  );
};

export default StagesPage;
