import React, { useRef, useContext } from "react";
import AuthContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css"

const Register = () => {
  const auth = useContext(AuthContext);
  const fetchData = useFetch();

  const userNameRef = useRef();
  const contactRef = useRef();
  const passwordRed = useRef();

  return (
    <>
      <div className={styles.register}>

      </div>
    </>
  );
};

export default Register;
