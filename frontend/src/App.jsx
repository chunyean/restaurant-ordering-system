import React, { useState } from "react";
import UserContext from "./components/context/user";
import Header from "./components/customer/Header";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import MenuPage from "./components/fnb_item/MenuPage";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [register, setRegister] = useState(true);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [foodPage, setFoodPage] = useState(true);
  const [beveragePage, setBeveragePage] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        {/* <Header setRegister={setRegister} setLogin={setLogin}></Header>
        {register && (
          <Register setRegister={setRegister} setLogin={setLogin}></Register>
        )}
        {login && <Login setRegister={setRegister} setUser={setUser}></Login>} */}
        <MenuPage
          user={user}
          foodPage={foodPage}
          setFoodPage={setFoodPage}
          beveragePage={beveragePage}
          setBeveragePage={setBeveragePage}
        ></MenuPage>
      </UserContext.Provider>
    </>
  );
};

export default App;
