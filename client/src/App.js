import React from "react";

// Use to define the different routes of the application
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
//import Edit from "./components/edit";
//import Create from "./components/create";
import RecordList from "./components/recordList";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
      </Routes>
    </div>
  );
};

export default App;
