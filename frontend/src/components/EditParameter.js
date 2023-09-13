import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";
import icon from "../icon.png";

function EditParameter() {
  let { id } = useParams();

  const paramRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [parameterkey, setParameterkey] = useState();
  const [value, setValue] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const getParameter = async () => {
      try {
        const response = await axiosPrivate.get("/parameter/" + id);
        console.log(response.data);

        setParameterkey(response.data["parameterkey"]);
        setValue(response.data["value"]);
        setDescription(response.data["description"]);
      } catch (err) {
        console.error(err);
      }
    };

    getParameter();
  }, []);

  const handleSubmit = () => {
    try {
      const response = axiosPrivate.put(
        "/parameter/" + id,
        JSON.stringify({ parameterkey, value, description }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //ifsucces navigate to list
      navigate("/", { state: { from: location }, replace: true });
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else {
        alert("Failed");
      }
    }
  };
  const goBack = () => {
    navigate("/", { state: { from: location }, replace: true });
  };
  return (
    <div className={"mainContainer"}>
        <div className={"titleContainer"} style={{fontSize:"50px"}}>Update Parameter</div>
       <div className={"titleContainer"}>
        <img src={icon} alt="logo" />
      </div>
    
      <br/>
      <div>
      <label htmlFor="parameterkey" className="inputLabel">Parameter Key</label>
      </div>
      <div  className={"inputContainer"}>
        <input
          className={"inputBox"}
          type="text"
          id="parameterkey"
          ref={paramRef}
          autoComplete="off"
          onChange={(e) => setParameterkey(e.target.value)}
          value={parameterkey}
          required
        />
      </div>
      <div>
      <label htmlFor="value" className="inputLabel">Value</label>
      </div>
      <div  className={"inputContainer"}>
        <input
          className={"inputBox"}
          type="text"
          id="value"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required
        />
      </div>
      <div>
      <label htmlFor="description" className="inputLabel">Description</label>
      </div>
      <div  className={"inputContainer"}>
        <input
          className={"inputBox"}
          type="text"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={handleSubmit}
          value={"Update"}
        />
      </div>
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={goBack}
          value={"Back"}
        />
      </div>
    </div>
  );
}

export default EditParameter;
