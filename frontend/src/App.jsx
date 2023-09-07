import React, { useState } from "react";
import "./App.css";
import DataAuth from "./components/context/data";

function App() {
  return (
    <>
      <DataAuth.Provider value></DataAuth.Provider>
    </>
  );
}

export default App;
