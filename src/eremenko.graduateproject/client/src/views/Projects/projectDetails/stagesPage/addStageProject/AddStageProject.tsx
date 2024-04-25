import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddStageProject() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodExecution, setPeriodExecution] =useState("");
  const [stageProject, setStageProject] = useState("");
  const [stageList, setStageList] = useState<any[]>([]);
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/stage")
      .then((res) => {
        setStageList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitStatus = async (event: any) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/create/projects/${projectId}/stageProject`, {
        startDate,
        endDate,
        periodExecution,
        stageId: stageProject,
      })
      .then((res) => {
        console.log(res);
        navigate(`/projectsPage/projectDetails/${projectId}/stages`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={"pade"}>
        <div className={"wrapper"}>
          <form onSubmit={handleSubmitStatus}>
            <div className="title-add">
              <h3>Добавление этапа проекта</h3>
            </div>
            <div className="container-data-form">
              <div className={"input_div"}>
                <label htmlFor="status">Этап:</label>
                <div>
                  <select
                    className={"form_control"}
                    value={stageProject}
                    onChange={(e) => setStageProject(e.target.value)}
                    required
                  >
                    <option value="">Выберете этап:</option>
                    {stageList.map((stage) => {
                      return (
                        <option key={stage._id} value={stage._id}>
                          {stage.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className={"input_div"}>
                <label htmlFor="startDate">Дата начала</label>
                <div>
                  <input
                    type="date"
                    className={"form_control"}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    value={startDate}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="endDate">Планируемая дата окончания</label>
                <div>
                  <input
                    type="date"
                    className={"form_control"}
                    onChange={(e: any) => setEndDate(e.target.value)}
                    value={endDate}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="periodExecution">Срок выполнения</label>
                <div>
                  <input
                    type="date"
                    className={"form_control"}
                    onChange={(e: any) => setPeriodExecution(e.target.value)}
                    value={periodExecution}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={"action_buttons"}>
              <div className="buttons">
                <div>
                  <Link to={`/projectsPage/projectDetails/${projectId}/stages`}>
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

export default AddStageProject;
