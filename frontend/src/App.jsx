import React, { useState, useContext } from "react";
import useFetch from "../src/components/custom_hooks/useFetch";
import UserContext from "./components/context/user";
import Header from "./components/customer/Header";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import FoodPage from "./components/fnb_item/FoodPage";
import BeveragePage from "./components/fnb_item/BeveragePage";
import OrderCart from "./components/orderCart/OrderCart";

const App = () => {
  const fetchData = useFetch();

  const test =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjIwMDAyLCJ1c2VybmFtZSI6InBpa2FjaHUxIiwiaWF0IjoxNjk0MzIzNjAyLCJleHAiOjE2OTQ0MTAwMDIsImp0aSI6ImQ4NmUyZmE4LWY5NzEtNDQzNC05Zjk3LTJhZDU5NzE5NWExNCJ9.NuxdGvBvc9L6GTXE9PWstiByASPevbQExRyBm4ZoE-M";

  const [accessToken, setAccessToken] = useState(test);
  const [showLanding, setShowLanding] = useState(true);

  //need to change login to true, display back the login container
  const [register, setRegister] = useState(true);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [arrayLength, setArrayLength] = useState(0);
  const [foodPage, setFoodPage] = useState(false);
  const [beveragePage, setBeveragePage] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [cart, setCart] = useState(false);
  const [cartDetail, setCartDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);


  const auth = useContext(UserContext);

  const registerClick = () => {
    setRegister(true), setLogin(false);
  };

  const loginClick = () => {
    setLogin(true), setRegister(false);
  };

  const showPassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
          cart={cart}
          setCart={setCart}
          setCartDetail={setCartDetail}
        ></Header>
        {register && (
          <Register
            setRegister={setRegister}
            setLogin={setLogin}
            loginClick={loginClick}
            registerClick={registerClick}
            showPassword={showPassword}
            username={username}
            handleUsername={handleUsername}
            password={password}
            handlePassword={handlePassword}
            contact={contact}
            handleContact={handleContact}
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
            showPassword={showPassword}
            username={username}
            handleUsername={handleUsername}
            password={password}
            handlePassword={handlePassword}
            contact={contact}
            handleContact={handleContact}
          ></Login>
        )}
        {foodPage && (
          <FoodPage
            user={user}
            foodPage={foodPage}
            setFoodPage={setFoodPage}
            setBeveragePage={setBeveragePage}
            setArrayLength={setArrayLength}
            arrayLength={arrayLength}
            quantity={quantity}
            setQuantity={setQuantity}
          ></FoodPage>
        )}
        {beveragePage && (
          <BeveragePage
            user={user}
            setFoodPage={setFoodPage}
            setBeveragePage={setBeveragePage}
            setArrayLength={setArrayLength}
            quantity={quantity}
            setQuantity={setQuantity}
          ></BeveragePage>
        )}
        {cart && (
          <OrderCart
            cartDetail={cartDetail}
            setCartDetail={setCartDetail}
            setCart={setCart}
            setFoodPage={setFoodPage}
            quantity={quantity}
            setQuantity={setQuantity}
          ></OrderCart>
        )}
      </UserContext.Provider>
    </>
  );
};

export default App;
