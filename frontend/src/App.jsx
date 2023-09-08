import React, { useState } from "react";
import UserContext from "./components/context/user";
import Header from "./components/customer/Header";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [header, setHeader] = useState(true);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        <Header setRegister={setRegister} setLogin={setLogin}></Header>
        {register && (
          <Register setRegister={setRegister} setLogin={setLogin}></Register>
        )}
        {login && <Login setRegister></Login>}
      </UserContext.Provider>
    </>
  );
};

export default App;
