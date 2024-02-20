import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Settings";
import Vanilla from "./pages/Vanilla";
import Modded from "./pages/Modded";
import AllPiercings from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">
          #VanLife
        </Link>
        <nav>
          <Link to="/allpiercings">Show All Piercings</Link>
          <Link to="/vanilla">Only Vanilla Piercings</Link>
          <Link to="/modded">Only Mod Piercings</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vanilla" element={<Vanilla />} />
        <Route path="/modded" element={<Modded />} />
        <Route path="/allpiercings" element={<AllPiercings />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
