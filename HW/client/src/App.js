import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [workNAME, setworkName] = useState("");
  const [workID, setworkID ]= useState(0);
  const [workINTRO, setworkINTRO] = useState("");
  const [workPATH, setworkPATH] = useState("");

  const [newWage, setNewWage] = useState(0);

  const [worklist, setworklist] = useState([]);

  const AddWork = () => {
    Axios.post("http://localhost:3001/create", {
      workNAME: workNAME,
      workID: workID,
      workINTRO: workINTRO,
      workPATH: workPATH,
    }).then(() => {
      setworklist([
        ...worklist,
        {
          workNAME: workNAME,
          workID: workID,
          workINTRO: workINTRO,
          workPATH: workPATH,
        },
      ]);
    });
  };

  const ShowWork = () => {
    Axios.get("http://localhost:3001/works").then((response) => {
      setworklist(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Work's Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setworkName(event.target.value);
          }}
        />
        <label>Work's ID</label>
        <input
          type="number"
          onChange={(event) => {
            setworkID(event.target.value);
          }}
        />
        <label>Work's INTRO</label>
        <input
          type="text"
          onChange={(event) => {
            setworkINTRO(event.target.value);
          }}
        />
        <label>Work's PATH</label>
        <input
          type="text"
          onChange={(event) => {
            setworkPATH(event.target.value);
          }}
        />
        {/* 設好input */}
        <button onClick={AddWork}>Add Work</button>
      </div>
      <div className="works">
        <button onClick={ShowWork}>Show Work</button>

        {worklist.map((val, key) => {
          return (
            <div className="works">
              <div>
                <h3>Work's Name: {val.workNAME}</h3>
                <h3>Work's ID {val.workID}</h3>
                <h3>Work's INTRO {val.workINTRO}</h3>
                <h3>Work's PATH {val.workPATH}</h3>
                
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
