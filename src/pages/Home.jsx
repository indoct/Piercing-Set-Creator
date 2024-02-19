import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [settings, setSettings] = useState({
    prc_color: "silver",
    prc_display: "all-piercings",
  });

  const styles = {
    display: settings.prc_color === "other" ? "block" : "none",
  };

  function genLink() {
    const urlBase = "./";
    const urlPage = settings.prc_display;
    const urlArg = settings.prc_color === "gold" ? "?=gold" : "";
    return urlBase + urlPage + urlArg;
  }

  useEffect(() => {
    console.log(genLink());
  }, [settings]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  console.log(settings);
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
            <form>
              <fieldset>
                <legend>Piercings to Display:</legend>
                <section className="display-options">
                  <label className="display-option" htmlFor="all-piercings">
                    <input
                      type="radio"
                      id="all-piercings"
                      name="prc_display"
                      value="all-piercings"
                      checked={settings.prc_display === "all-piercings"}
                      onChange={handleChange}
                    />
                    All Piercings
                    <span className="opt-desc">
                      Show me everything: all vanilla piercings (humanoid sets,
                      barbarian-only sets, Orpheus' piercings, all Mod
                      piercings)
                    </span>
                  </label>
                  <label className="display-option" htmlFor="all-mod">
                    <input
                      type="radio"
                      id="all-mod"
                      name="prc_display"
                      value="all-mod"
                      checked={settings.prc_display === "all-mod"}
                      onChange={handleChange}
                    />
                    Only Mod Piercings
                    <span className="opt-desc">
                      ONLY show me Mod piercings (Indoct's Subtler Piercings,
                      Trips' Accessory Collection, Ghouls' Custom Piercings)
                    </span>
                  </label>
                  <label className="display-option" htmlFor="all-vanilla">
                    <input
                      type="radio"
                      id="all-vanilla"
                      name="prc_display"
                      value="all-vanilla"
                      checked={settings.prc_display === "all-vanilla"}
                      onChange={handleChange}
                    />
                    Only Vanilla Piercings.
                    <span className="opt-desc">
                      Show me all vanilla piercings (humanoid sets,
                      barbarian-only sets, Orpheus' piercings) and NO Mod
                      piercings.
                    </span>
                  </label>
                </section>
              </fieldset>
              <fieldset>
                <legend>Piercing Metal Color:</legend>
                <section className="options">
                  <label className="color-option" htmlFor="silver">
                    <div className="silver-gr color"></div>
                    <input
                      type="radio"
                      id="silver"
                      name="prc_color"
                      value="silver"
                      checked={settings.prc_color === "silver"}
                      onChange={handleChange}
                    />
                    Silver
                  </label>
                  <label className="color-option" htmlFor="gold">
                    <div className="gold-gr color"></div>
                    <input
                      type="radio"
                      id="gold"
                      name="prc_color"
                      value="gold"
                      checked={settings.prc_color === "gold"}
                      onChange={handleChange}
                    />
                    Gold
                  </label>
                  <label className="color-option" htmlFor="other">
                    <div className="other-gr color">?</div>
                    <input
                      type="radio"
                      id="other"
                      name="prc_color"
                      value="other"
                      checked={settings.prc_color === "other"}
                      onChange={handleChange}
                    />
                    Other Color
                  </label>
                </section>
                <p className="warning" style={styles}>
                  WARNING: The piercing images in the app AND your piercings
                  in-game will be Silver until you have downloaded and added the
                  correct Recolor pak from here!
                </p>
              </fieldset>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
