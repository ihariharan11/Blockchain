import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Rewards from "./components/Rewards";
// import Rewards from "./components/Rewards";
import Fitness from "./components/Fitness";
import SignIn from "./components/SignIn";

const App = () => {
  return (
   
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/fitness" element={<Fitness />} />
      </Routes>
    </Router>
  );
};

export default App;
