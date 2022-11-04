import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Partition from "./pages/Partition";
import WarGame from "./pages/WarGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="partition" element={<Partition />} />
        <Route path="wargame" element={<WarGame />} />

        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
