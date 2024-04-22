import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateEmployeeStatus() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getEmployeeStatus/" + id
        );
        console.log(response);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = (event: any) => {
    event.preventDefault();
    axios
      .put("http://localhost:3001/updateEmployeeStatus/" + id, {
        title,
        description,
      })
      .then((res) => {
        console.log(res);
        navigate("/employeeStatus");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={"pade"}>
        <div className={"wrapper"}>
          <form onSubmit={handleUpdate}>
            <div className="title-add">
              <h3>Изменение статуса сотрудника</h3>
            </div>
            <div className="container-data-form">
              <div className={"input_div"}>
                <label htmlFor="title">Название</label>
                <div>
                  <input
                    type="text"
                    placeholder="Введите название"
                    className={"form_control"}
                    onChange={(e: any) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="description">Описание</label>
                <div>
                  <textarea
                    placeholder="Введите описание"
                    className={"form_control"}
                    onChange={(e: any) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={"action_buttons"}>
              <div className="buttons">
                <div>
                  <Link to={"/employeeStatus"}>
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

export default UpdateEmployeeStatus;
