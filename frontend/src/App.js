import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import ParametersList from "./components/ParametersList";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import EditParameter from "./components/EditParameter";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<ParametersList />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/edit/:id" element={<EditParameter />} />
      </Route>
    </Routes>
  );
}

export default App;
