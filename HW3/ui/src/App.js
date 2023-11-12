import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [workName, setWorkName] = useState("");
  const [workID, setWorkID] = useState(0);
  const [workINTRO, setWorkINTRO] = useState("");
  const [workPATH, setWorkPATH] = useState("");

  const [newWorkINTRO, setNewWorkINTRO] = useState("");

  const [workList, setWorkList] = useState([]);

  const addWork = () => {
    Axios.post("http://localhost:3001/create", {
      workNAME: workName,
      workID: workID,
      workINTRO: workINTRO,
      workPATH: workPATH,
    }).then(() => {
      setWorkList([
        ...workList,
        {
          workNAME: workName,
          workID: workID,
          workINTRO: workINTRO,
          workPATH: workPATH,
        },
      ]);
    });
  };

  const showWork = () => {
    Axios.get("http://localhost:3001/works").then((response) => {
      setWorkList(response.data);
    });
  };

  const updateWorkINTRO = (workID) => {
    Axios.put("http://localhost:3001/update", { workINTRO: newWorkINTRO, workID: workID }).then(
      (response) => {
        setWorkList(
          workList.map((val) => {
            return val.workID === workID
              ? {
                  ...val,
                  workINTRO: newWorkINTRO,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteWork = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setWorkList(
        workList.filter((val) => {
          return val.workID !== id;
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
            setWorkName(event.target.value);
          }}
        />
        <label>Work's ID</label>
        <input
          type="number"
          onChange={(event) => {
            setWorkID(event.target.value);
          }}
        />
        <label>Work's INTRO</label>
        <input
          type="text"
          onChange={(event) => {
            setWorkINTRO(event.target.value);
          }}
        />
        <label>Work's PATH</label>
        <input
          type="text"
          onChange={(event) => {
            setWorkPATH(event.target.value);
          }}
        />
        <button onClick={addWork}>Add Work</button>
      </div>
      <div className="works">
        <button onClick={showWork}>Show Work</button>

        {workList.map((val, key) => {
          return (
            <div className="works" key={key}>
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
                    setNewWorkINTRO(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateWorkINTRO(val.workID);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteWork(val.workID);
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