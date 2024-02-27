import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import cshtml from "react-syntax-highlighter/dist/esm/languages/prism/cshtml";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, Trash } from "react-bootstrap-icons";

SyntaxHighlighter.registerLanguage("cshtml", cshtml);

export default function PiercingsBlock(props) {
  const {
    piercings,
    type,
    location,
    handleBtns,
    sessionOver,
    confirmDelete,
    toggleSessionOver,
  } = props;

  const displayedPiercings =
    type && !location
      ? piercings.filter((prc) => prc.type === type)
      : type && location
      ? piercings.filter(
          (prc) => prc.type === type && prc.location === location
        )
      : location && !type
      ? piercings.filter((prc) => prc.location === location)
      : piercings;

  const selected = piercings.filter((prc) => prc.selected);

  const configElements = selected.map((prc) => {
    const pt_name = prc.name.includes("Vanilla")
      ? prc.name
      : `[Van] ${prc.name}`;
    if (prc.selected) {
      // prettier-ignore
      return (
          `\                        
                        <node id="VisualUUIDs"> <!-- ${pt_name} (${prc.color}) - ${prc.pt_bone} --> 
                            <attribute id="Object" type="guid" value="${prc.nodeid}"/>
                        </node>`
      );
    } else {
      return "";
    }
  });

  function formatString() {
    const codeString = configElements.join("");
    return codeString
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "")
      .join("\n");
  }

  const prcElements = displayedPiercings.map((prc) => {
    const contClass =
      prc.site_cat === "vanilla-ab"
        ? "vanilla-ab prc-container"
        : prc.site_cat === "barbarian"
        ? "barbarian prc-container"
        : "mod prc-container";
    const nodeId = prc.nodeid;
    const nodeLoca = prc.bone;

    return (
      <Col key={prc.nodeid} lg={2} className="prc-col">
        {prc.type === "mod" && <span className="set-name">{prc.set_name}</span>}
        <button
          type="button"
          id={prc.index}
          className={`${contClass} ${prc.selected ? "selected" : ""}`}
          onClick={(e) => handleBtns(e, nodeId, nodeLoca)}
          disabled={prc.disabled}
        >
          <div className="img-dummy">
            <img
              src={prc.imgurl}
              className={
                prc.bone === "piercing_lobe_a_l" ||
                prc.bone === "piercing_brow_a_l" ||
                prc.bone === "piercing_lobe_b_l" ||
                prc.bone === "piercing_tragus_a_l" ||
                prc.bone === "beard_upper_lip1_l" ||
                prc.bone === "piercing_brow_b_l"
                  ? "flipped"
                  : undefined
              }
            />
          </div>
          <ul className={`prc-stats config-cont ${prc.location}`}>
            <li className="prc-name">{prc.name}</li>
            <li className="location">{prc.pt_bone}</li>
          </ul>
        </button>
      </Col>
    );
  });

  return (
    <>
      <Row className="mt-4 title-row">
        <Col>
          <h5>
            {sessionOver
              ? "CharacterCreationAccessorySets Nodes:"
              : type === "vanilla"
              ? "Vanilla Sets"
              : type === "mod"
              ? "Mod Piercings"
              : "All Piercings"}
          </h5>
        </Col>
      </Row>
      {sessionOver ? (
        <>
          <Row className="mt-2">
            <Col lg={8}>
              <p className="output-intro">
                Please be very careful when placing these nodes into your file.{" "}
                <span className="warning">
                  By creating your own replacer file and placing it in the
                  game's Data folder, YOU ARE MODDING YOUR GAME!&nbsp;
                </span>
                I can't stress this enough. A slight error (e.g. not closing a
                node, a typo, or missing a quotation mark) may break something.
                It might just be that your 'Body Art' tab disappears, it might
                be something else. If that happens after placing this file in
                your Data folder, you know that your code is corrupted. Either
                find and fix the mistake, or delete the file entirely. <br />
                <br />
                <strong>Always</strong> delete the last thing you changed before
                deleting your game or doing anything drastic - in this case,
                that's this file. :) Feel free to find me or another modder in
                Down By The River server on Discord and ask for help if you're
                concerned.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <SyntaxHighlighter language="cshtml" style={duotoneDark}>
                {formatString()}
              </SyntaxHighlighter>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="d-flex gap-2">
              <Button id="back-btn" onClick={toggleSessionOver}>
                <ArrowLeft />
                Back (Continue Editing)
              </Button>
              <Button onClick={confirmDelete} variant="secondary">
                <Trash /> Clear Set
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="mt-2">{prcElements}</Row>
      )}
    </>
  );
}
