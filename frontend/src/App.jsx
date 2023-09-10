import React, { useState } from "react";
import UserContext from "./components/context/user";
import Header from "./components/customer/Header";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import FoodPage from "./components/fnb_item/FoodPage";
import BeveragePage from "./components/fnb_item/BeveragePage";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [showLanding, setShowLanding] = useState(true);

  //need to change login to true, display back the login container
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [foodPage, setFoodPage] = useState(true);
  const [beveragePage, setBeveragePage] = useState(false);
  const [arrayLength, setArrayLength] = useState();

  const registerClick = () => {
    setRegister(true), setLogin(false);
  };

  const loginClick = () => {
    setLogin(true), setRegister(false);
  };

  const lengthOfCart = async () => {
    const res = await fetchData("/length");
    if (res.ok) {
      setArrayLength(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        <Header
          foodPage={foodPage}
          setFoodPage={setFoodPage}
          beveragePage={beveragePage}
          setBeveragePage={setBeveragePage}
          showLanding={showLanding}
          setShowLanding={setShowLanding}
          setRegister={setRegister}
          setLogin={setLogin}
          user={user}
          arrayLength={arrayLength}
        ></Header>
        {register && (
          <Register
            setRegister={setRegister}
            setLogin={setLogin}
            handleLloginClickogin={loginClick}
            registerClick={registerClick}
          ></Register>
        )}
        {login && (
          <Login
            setRegister={setRegister}
            setUser={setUser}
            loginClick={loginClick}
            registerClick={registerClick}
            setShowLanding={setShowLanding}
            setBeveragePage={setBeveragePage}
            setFoodPage={setFoodPage}
            setLogin={setLogin}
          ></Login>
        )}
        {foodPage && (
          <FoodPage
            user={user}
            setFoodPage={setFoodPage}
            setBeveragePage={setBeveragePage}
            lengthOfCart={lengthOfCart}
          ></FoodPage>
        )}
        {beveragePage && (
          <BeveragePage
            user={user}
            setFoodPage={setFoodPage}
            setBeveragePage={setBeveragePage}
            lengthOfCart={lengthOfCart}
          ></BeveragePage>
        )}
      </UserContext.Provider>
    </>
  );
};

export default App;
