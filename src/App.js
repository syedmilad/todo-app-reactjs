import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todo, setTodo] = useState([
    { id: 1, title: "tasks 1", status: false },
    { id: 2, title: "tasks 2", status: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdatedata] = useState("");
  let [current, setCurrent] = useState(0);
  let [txt, setTxt] = useState("");
  // Add Tasks
  const addTasks = () => {
    if (newTask) {
      const num = todo.length + 1;
      const newEntry = { id: num, title: newTask, status: false };
      setTodo([...todo, newEntry]);
      setNewTask("");
    }
  };
  const deleteTasks = (id) => {
    let newTasks = todo.filter((task) => task.id !== id);
    setTodo(newTasks);
  };
  const markDone = (id) => {
    let newTask = todo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status }; // ye ! task.status
      }
      return task;

    });
    setTodo(newTask);
  };
  const cancleUpdate = () => {
    setUpdatedata("");
  };
  const changeTasks = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setTxt(e.target.value)
    setUpdatedata(newEntry); // why we dont write over []
  };

  const updateTasks = () => {
    // let filterRecords = [...todo].filter((task, index) => task.id !== updateData.id ); // does not understand
    // console.log(filterRecords)
    // let updatedObject = [...filterRecords, updateData];
    // setTodo(updatedObject);
    // setUpdatedata("");
    todo[current] = { id: current + 1, title: txt, status: false }
    setTodo([...todo])
  };  

  // const UpdataKro = () => {

  // }

  return (
    <div className="App container">
      <h1>To Do List App (Reactjs)</h1>

      {/* {Update tasls} */}
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTasks(e)}
                // onChange={(e) => newUpdatedata(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-lg btn-success mr-20"
                onClick={updateTasks}
              >
                Update
              </button>
              <button onClick={cancleUpdate} className="btn btn-lg btn-warning">Cancle</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* this is tasks form  */}

          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button onClick={addTasks} className="btn btn-lg btn-success">
                Add Tasks
              </button>
            </div>
          </div>

          <br />
        </>
      )}

      {/* {Display ToDOs} */}

      {todo && todo.length ? "" : "No Tasks..."}
      {/* ye is "" emty show q kar raha hen */}
      {todo.map((task, index) => {
        return (
          <React.Fragment key={task.id}>
            <div className="col taskBg">
              <div className={task.status ? "done" : ""}>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span
                  title="Complete / Not Completed"
                  onClick={(e) => markDone(task.id)}
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>

                {task.status ? null : (
                  <span
                    title="Edit"
                    onClick={() => {
                      setUpdatedata({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false,
                      })
                      setCurrent(index)
                      console.log(index)
                    }
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}

                <span title="Delete" onClick={() => deleteTasks(task.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;
