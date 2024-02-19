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
            the page will be very long and probably hard to use on mobile. You
            will also be copying and pasting the code into your file, and that's
            also difficult on a phone!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="7">
          <div className="settings-box">
            <h4>Customise Settings</h4>
            <p>Choose which piercings you want to display in the app</p>
            <form>
              <fieldset>
                <legend>Piercing Color:</legend>
                <input
                  type="radio"
                  id="silver"
                  name="prc_color"
                  value="Silver"
                />
                <label htmlFor="silver"> Silver</label>
                <br />
                <input type="radio" id="gold" name="prc_color" value="Gold" />
                <label htmlFor="gold"> Gold</label>
                <br />
                <input
                  type="radio"
                  id="other"
                  name="prc_color"
                  value="other_color"
                />
                <label htmlFor="other">
                  Other Color (I've installed Ghoul's Vanilla Piercing Recolors
                  mod)
                </label>
                <p className="warning">
                  The piercing images in the app AND your piercings in-game will
                  be Silver until you have downloaded and added the correct
                  Recolor pak from here!
                </p>
              </fieldset>
              <fieldset>
                <legend>Piercings to Display:</legend>
                <input
                  type="radio"
                  id="all_piercings"
                  name="prc_display"
                  value="all_piercings"
                />
                <label htmlFor="all_piercings"> All Piercings. </label>
                <span>
                  Show me everything: all vanilla piercings (humanoid sets,
                  barbarian-only sets, Orpheus' piercings, all Mod piercings)
                </span>
                <br />
                <input
                  type="radio"
                  id="all_mod"
                  name="prc_display"
                  value="all_mod"
                />
                <label htmlFor="all_mod"> Only Mod Piercings. </label>
                <span>
                  ONLY show me Mod piercings (Subtler Piercings, Trips'
                  Accessory, Ghouls' Custom Piercings)
                </span>
                <br />
                <input
                  type="radio"
                  id="all_vanilla"
                  name="prc_display"
                  value="all_vanilla"
                />
                <label htmlFor="all_vanilla"> Only Vanilla Piercings. </label>
                <span>
                  Show me all vanilla piercings (humanoid sets, barbarian-only
                  sets, Orpheus' piercings) and NO Mod piercings.
                </span>
                <br />
              </fieldset>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
