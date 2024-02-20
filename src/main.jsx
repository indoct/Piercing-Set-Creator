import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <header>
          <Row>
            <Col>
              <Link className="site-logo" to="/">
                Indoct's BG3 Piercing Set Creator
              </Link>
            </Col>
            <Col>
              <Link to="/about">About</Link>
            </Col>
          </Row>
        </header>
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
