import React, { useState } from "react";
import UserContext from "./components/context/user";
import Header from "./components/customer/Header";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [register, setRegister] = useState(true);
  const [login, setLogin] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        <Header register={register} setRegister={setRegister} login={login}setLogin={setLogin}></Header>
      </UserContext.Provider>
    </>
  );
};

export default App;
