import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [settings, setSettings] = useState({
    recolor: false,
    displayPrcs: [],
  });
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="7">
          <h1>Indoct's Piercing Set Creator</h1>
          <p className="warning-txt">
            It is strongly advised to use a desktop or laptop device for this as
            the page may be incredibly long and probably hard to use on mobile.
            You will also be copying and pasting the code into your file, and
            that's also difficult on a phone!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="7">
          <div className="settings-box">
            <h4>Customise Settings</h4>
            <p>Choose which piercings you want to display in the app</p>
            <form>
              <label for="cars">Piercing Color:</label>
              <br />
              <select id="cars" name="cars">
                <option value="volvo">Silver</option>
                <option value="saab">Gold</option>
              </select>
              <br />
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                I'm using Ghouls Vanilla Piercing Recolors
              </label>
              <label for="prc-type">Piercing Color:</label>
              <br />
              <select id="prc-type" name="prc-type">
                <option value="all-prcs">All Piercings</option>
                <option value="vanilla-basic">Vanilla Basic Only</option>
                <option value="vanilla-all">Vanilla All Only</option>
                <option value="mods-only">Mod Piercings Only</option>
              </select>
            </form>
          </div>
        </Col>
        {/* <Col xs lg="4">
          <div className="settings-box">
            <h4>Show me (silver) everything!</h4>
            <p>
              Start Set Creator with all silver piercings displayed:
              <br />
              vanilla, barbarian, Orpheus, mod
              <strong>
                Click the customize box if you want piercings in a color other
                than silver
              </strong>
            </p>
          </div>
        </Col> */}
      </Row>
      <Row className="justify-content-md-center mt-4">
        <Col xs lg="8">
          <p>Please select the settings for the set you want to create:</p>
          <form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1">Just show me everything!</label>
            <span>
              This will start the Piercing Set Creator with no custom settings
              (all SILVER piercings including vanilla, barbarian, Orpheus and
              mod piercings will be displayed)
            </span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1">
              I'm using Ghouls Vanilla Piercing Recolors
            </label>
            <br />
            <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
            <br />
            <label for="cars">What piercings do you want to include:</label>
            <select id="cars" name="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="fiat">Fiat</option>
              <option value="audi">Audi</option>
            </select>
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
            <label for="vehicle3"> I have a boat</label>
            <br />
          </form>
        </Col>
      </Row>
    </Container>
  );
}
