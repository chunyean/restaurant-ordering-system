import React, { useEffect, useContext, useState } from "react";
import styles from "../admin/Admin.module.css";
import AuthContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = (props) => {
  const auth = useContext(AuthContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  
  const [errorId, setErrorId] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader3(true);
  };

  const login = async () => {
    console.log("1");
    const res = await fetchData("/employee/login", "POST", {
      id: props.employeeId,
      password: props.password,
    });
    if (res.ok) {
      auth.setAccessToken(res.data.access);
      props.setHeader3(false);
      props.setHeader4(true);
      props.setUser(res.data.payload);
      navigate("/admin/food");
    } else {
      console.log(res.data);
      //check error data
      setErrorId(res.data);
      setErrorPassword(res.data);
    }
  };

  useEffect(() => {
    handleHeader();
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.register}>
          <div className={styles.title}>
            <label>LOGIN</label>
          </div>
          <div className={styles.id}>
            <label htmlFor="id">Employee ID:</label>
            <input
              id="id"
              placeholder="Enter employee ID"
              type="text"
              onChange={props.handleEmployeeId}
            ></input>
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter password"
              type="password"
              onChange={props.handlePassword}
            ></input>
          </div>
          <button className={styles.loginbtn} onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
