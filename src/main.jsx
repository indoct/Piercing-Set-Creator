import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Vanilla from "./pages/Vanilla";
import Modded from "./pages/Modded";
import AllPiercings from "./pages/AllPiercings";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">
          #VanLife
        </Link>
        <nav>
          <Link to="/allpiercings">All Piercings</Link>
          <Link to="/vanilla">Vanilla Piercings</Link>
          <Link to="/modded">Mod Piercings</Link>
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
