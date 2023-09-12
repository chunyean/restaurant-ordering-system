import React, { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useFetch from "../src/components/custom_hooks/useFetch";
import UserContext from "./components/context/user";
import Header from "./components/customer/Header";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import FoodPage from "./components/fnb_item/FoodPage";
import BeveragePage from "./components/fnb_item/BeveragePage";
import OrderCart from "./components/orderCart/OrderCart";
import AdminRegister from "./components/admin/AdminRegister";
import AdminLogin from "./components/admin/AdminLogin";
import Table from "./components/payment/Table";
import ViewTableOrder from "./components/payment/ViewTableOrder";

const App = () => {
  const fetchData = useFetch();

  const test =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNFSSAxMTUiLCJ1c2VybmFtZSI6ImRlc21vbmQiLCJjdXN0SUQiOjk5OTk5LCJpYXQiOjE2OTQ1MDA3MzEsImV4cCI6MTY5NDU4NzEzMSwianRpIjoiOWI0MjcyODgtNTgwYy00NjFhLWJjOGQtMDBiMWM3MWJmZmE1In0.K78mZ1DJGbLe9JqtzGo3JCOWcuNT1AKzA_HGzxKzMkw";

  const [accessToken, setAccessToken] = useState(test);
  // const [showLanding, setShowLanding] = useState(true);

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
  const [employeeId, setEmployeeId] = useState();
  const [cart, setCart] = useState(false);
  const [cartDetail, setCartDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [availableId, setAvailableId] = useState();
  const [tableDetail, setTableDetail] = useState();

  const [header1, setHeader1] = useState(true);
  const [header2, setHeader2] = useState(false);
  const [header3, setHeader3] = useState(false);
  const [header4, setHeader4] = useState(false);

  const auth = useContext(UserContext);

  // const registerClick = () => {
  //   setRegister(true), setLogin(false);
  // };

  // const loginClick = () => {
  //   setLogin(true), setRegister(false);
  // };

  const showPassword = () => {
    const show = document.getElementById("password");
    if (show.type === "password") {
      show.type = "text";
    } else {
      show.type = "password";
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

  const handleEmployeeId = (e) => {
    setEmployeeId(e.target.value);
  };
  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        <Header
          foodPage={foodPage}
          setFoodPage={setFoodPage}
          beveragePage={beveragePage}
          setBeveragePage={setBeveragePage}
          // showLanding={showLanding}
          // setShowLanding={setShowLanding}
          setRegister={setRegister}
          setLogin={setLogin}
          user={user}
          arrayLength={arrayLength}
          cart={cart}
          setCart={setCart}
          setCartDetail={setCartDetail}
          setAvailableId={setAvailableId}
          header1={header1}
          header2={header2}
          header3={header3}
          header4={header4}
        ></Header>

        <Routes>
          <Route
            path=""
            element={
              <Register
                setRegister={setRegister}
                setLogin={setLogin}
                // loginClick={loginClick}
                // registerClick={registerClick}
                showPassword={showPassword}
                username={username}
                setUsername={setUsername}
                handleUsername={handleUsername}
                password={password}
                setPassword={setPassword}
                handlePassword={handlePassword}
                contact={contact}
                setContact={setContact}
                handleContact={handleContact}
              ></Register>
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setRegister={setRegister}
                setUser={setUser}
                // loginClick={loginClick}
                // registerClick={registerClick}
                // setShowLanding={setShowLanding}
                setBeveragePage={setBeveragePage}
                setFoodPage={setFoodPage}
                setLogin={setLogin}
                showPassword={showPassword}
                password={password}
                handlePassword={handlePassword}
                setHeader1={setHeader1}
                setHeader2={setHeader2}
                handleEmployeeId={handleEmployeeId}
              ></Login>
            }
          />
          <Route
            path="/food"
            element={
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
            }
          />
          <Route
            path="/beverage"
            element={
              <BeveragePage
                user={user}
                setFoodPage={setFoodPage}
                setBeveragePage={setBeveragePage}
                setArrayLength={setArrayLength}
                quantity={quantity}
                setQuantity={setQuantity}
              ></BeveragePage>
            }
          />
          <Route
            path="/cart"
            element={
              <OrderCart
                user={user}
                cartDetail={cartDetail}
                setCartDetail={setCartDetail}
                setCart={setCart}
                setFoodPage={setFoodPage}
                quantity={quantity}
                setQuantity={setQuantity}
                setArrayLength={setArrayLength}
              ></OrderCart>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminLogin
                setRegister={setRegister}
                setHeader1={setHeader1}
                setHeader2={setHeader2}
                setHeader3={setHeader3}
                setHeader4={setHeader4}
                showPassword={showPassword}
                password={password}
                handlePassword={handlePassword}
                setUser={setUser}
                employeeId={employeeId}
                handleEmployeeId={handleEmployeeId}
              />
            }
          />
          <Route
            path="/admin/register"
            element={
              <AdminRegister
                setRegister={setRegister}
                setHeader1={setHeader1}
                setHeader2={setHeader2}
                setHeader3={setHeader3}
                setHeader4={setHeader4}
                showPassword={showPassword}
                password={password}
                handlePassword={handlePassword}
                contact={contact}
                setContact={setContact}
                setUser={setUser}
                employeeId={employeeId}
                handleEmployeeId={handleEmployeeId}
                availableId={availableId}
              />
            }
          />
          <Route
            path="/admin/food"
            element={
              <FoodPage
                setRegister={setRegister}
                setHeader1={setHeader1}
                setHeader2={setHeader2}
                setHeader3={setHeader3}
                setHeader4={setHeader4}
                user={user}
                foodPage={foodPage}
                setFoodPage={setFoodPage}
                setBeveragePage={setBeveragePage}
                setArrayLength={setArrayLength}
                arrayLength={arrayLength}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            }
          />
          <Route
            path="/admin/beverage"
            element={
              <BeveragePage
                setRegister={setRegister}
                setHeader1={setHeader1}
                setHeader2={setHeader2}
                setHeader3={setHeader3}
                setHeader4={setHeader4}
                setArrayLength={setArrayLength}
              />
            }
          />
          <Route
            path="/admin/cart"
            element={
              <OrderCart
                user={user}
                setRegister={setRegister}
                setHeader1={setHeader1}
                setHeader2={setHeader2}
                setHeader3={setHeader3}
                setHeader4={setHeader4}
                cartDetail={cartDetail}
                setCartDetail={setCartDetail}
                setCart={setCart}
                setFoodPage={setFoodPage}
                setArrayLength={setArrayLength}
              />
            }
          />
          <Route
            path="/admin/table"
            element={
              <Table
                setHeader1={setHeader1}
                setHeader4={setHeader4}
                tableDetail={tableDetail}
                setTableDetail={setTableDetail}
              />
            }
          />
          <Route
            path="/admin/viewtable"
            element={
              <ViewTableOrder
                setHeader1={setHeader1}
                setHeader4={setHeader4}
                tableDetail={tableDetail}
                setTableDetail={setTableDetail}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
