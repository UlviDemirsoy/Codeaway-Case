import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useRef } from "react";
import axios from "../api/axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Button from "@mui/material/Button";

function ParametersList() {
  const [parameters, setParameters] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [refresh, setRefresh] = useState(false);
  const [parameterkey, setParameterkey] = useState();
  const [value, setValue] = useState();
  const [description, setDescription] = useState();
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible((current) => !current);
  };

  //get data
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getParams = async () => {
      try {
        const response = await axiosPrivate.get("/parameterlist");
        console.log(response.data);
        isMounted && setParameters(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getParams();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [refresh]);

  const handleEdit = (item) => {
    navigate("/edit/" + item["Id"], {
      state: { from: location },
      replace: true,
    });
  };

  const handleDelete = (item) => {
    try {
      const response = axiosPrivate.delete("/parameter/" + item["Id"], {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setRefresh(!refresh);
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else {
        alert("Failed");
      }
    }
  };

  const handleInsert = () => {
    try {
      const response = axiosPrivate.post(
        "/parameter",
        JSON.stringify({ parameterkey, value, description }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setRefresh(!refresh);
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else {
        alert("Failed");
      }
    }
  };

  const renderInputRow = () => {
    return (
      <Tr>
        <Td>
          <input
            className={"inputBox"}
            placeholder="New Parameter"
            value={parameterkey}
            onChange={(e) => setParameterkey(e.target.value)}
          ></input>
        </Td>
        <Td>
          <input
            className={"inputBox"}
            placeholder="Value"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          ></input>
        </Td>
        <Td>
          <input
            className={"inputBox"}
            placeholder="New Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></input>
        </Td>
        <Td>
          <Td></Td>
        </Td>
        <Button
          variant="contained"
          onClick={() => handleInsert()}
          style={{
            margin: "4px",
            background: "linear-gradient(to right, #04d3c5 , #8dd8e8)",
          }}
        >
          Add
        </Button>
      </Tr>
    );
  };

  const renderTableRows = () => {
    return parameters.map((item, index) => {
      return (
        <Tr key={index}>
          <Td>
            <div style={{ color: "#e6e8ed" }}>{item["parameterkey"]}</div>
          </Td>
          <Td>
            <div style={{ color: "#e6e8ed" }}>{item["value"]}</div>
          </Td>
          <Td>
            <div style={{ color: "#e6e8ed" }}>{item["description"]}</div>
          </Td>
          <Td>
            <div style={{ color: "#e6e8ed" }}>
              {new Date(item["createdate"]["_seconds"] * 1000).toDateString()}
            </div>
          </Td>
          <span>
            <Td style={{ display: "flex", flexdirection: "row" }}>
              <Button
                onClick={() => handleEdit(item)}
                variant="contained"
                style={{
                  background: "linear-gradient(to right, blue , #2ac1fc)",
                  margin: "4px",
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(item)}
                variant="contained"
                style={{
                  background: "linear-gradient(to right, red , #f276b2)",
                  margin: "4px",
                }}
              >
                Delete
              </Button>
            </Td>
          </span>
        </Tr>
      );
    });
  };

  return (
    <div style={{ height: "100vh", background: "#1E1E29" }}>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          paddingTop: "0px",
          justifyContent: "left",
        }}
      >
       
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: "50px",
          justifyContent: "center",
        }}
      >
        <Table style={{ background: "#1E1E29", width: "95%" }}>
          <Thead>
            <Tr>
              <Th>
                <div
                  style={{
                    display: "flex",
                    fontSize: "22px",
                    color: "#798CA5",
                  }}
                >
                  <span>Parameter Key</span>
                </div>
              </Th>
              <Th>
                <div
                  style={{
                    display: "flex",
                    fontSize: "22px",
                    color: "#798CA5",
                  }}
                >
                  <span>Value</span>
                </div>
              </Th>
              <Th>
                <div
                  style={{
                    display: "flex",
                    fontSize: "22px",
                    color: "#798CA5",
                  }}
                >
                  <span>Description</span>
                </div>
              </Th>
              <Th>
                <div
                  style={{
                    display: "flex",
                    fontSize: "22px",
                    color: "#798CA5",
                  }}
                >
                  <span>Create Date</span>
                </div>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {parameters ? renderTableRows() : null}
            {renderInputRow()}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default ParametersList;
