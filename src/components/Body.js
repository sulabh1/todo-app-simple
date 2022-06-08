import React, { useEffect, useState } from "react";
import axios from "axios";
import { CloseButton, Table, Form, Button } from "react-bootstrap";
import Moment from "react-moment";

const Body = () => {
  const [message, setMessage] = useState("");
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");
  const [valueOfInput, setValueOfInput] = useState([]);
  const [check, setChecked] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const task = await axios.get("http://127.0.0.1:5000/api/v1/task");
        setTask(task.data.task);
      } catch (error) {
        setError(error.response.data.status);
      }
    }
    fetchData();
  }, []);

  const changeInput = (e) => {
    setValueOfInput(e.target.value);
  };
  const checkBox = (e) => {
    setChecked(!check);
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://127.0.0.1:5000/api/v1/task", {
        name: valueOfInput,
        completed: check,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    // e.preventDefault();
    try {
      await axios.delete(`http://127.0.0.1:5000/api/v1/task/${id}`);
    } catch (err) {
      console.log(error);
    }
  };
  const renderData = () => {
    if (task) {
      return task.map((data) => {
        const date = data.createdAt;
        return (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td style={{ height: "5px", width: "5px" }}>
              {data.completed ? "completed" : "not completed"}
            </td>
            <td>
              <Moment>{date}</Moment>
            </td>
            <td>
              <CloseButton onClick={() => deleteData(data.id)} />
            </td>
          </tr>
        );
      });
    }
  };
  return (
    <div>
      <Form style={{ display: "flex", flexDirection: "row" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Todays task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Todays task"
            onChange={changeInput}
            style={{ width: "900px" }}
          />
        </Form.Group>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Completed?"
          onChange={checkBox}
          style={{ marginTop: "30px", fontSize: "30px" }}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={onsubmit}
          style={{
            margin: "6px 0 0 30px ",
            borderRadius: "80%",
          }}
        >
          Submit
        </Button>
      </Form>

      {/* <input type="checkbox" defaultChecked /> */}

      <Table
        striped
        bordered
        hover
        style={{ marginTop: "50px", width: "1200px", alignItems: "center" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Created data</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </div>
  );
};

export default Body;
