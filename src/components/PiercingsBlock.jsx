import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CodeBlock from "react-copy-code";

export default function PiercingsBlock(props) {
  const { piercings, type, location, handleBtns, sessionOver, confirmDelete } =
    props;

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

  const configElements = piercings.map((prc) => {
    const pt_name = prc.name.includes("Vanilla")
      ? prc.name
      : `[Van] ${prc.name}`;
    if (prc.selected) {
      // prettier-ignore
      return (
        <CodeBlock>
          <code key={prc.nodeid}>
            {/* {`
                        <node id="VisualUUIDs"> <!-- ${pt_name} (${prc.color}) - ${prc.pt_bone} --> 
                            <attribute id="Object" type="guid" value="${prc.nodeid}"/>
                        </node>`} */}
          </code>
        </CodeBlock>
      );
    }
  });

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
      <Row className="mt-2">
        {sessionOver ? (
          <Col>
            <p className="output-intro">
              Please be very careful when placing these nodes into your file.{" "}
              <span className="warning">
                By creating your own replacer file with this creator, YOU ARE
                MODDING YOUR GAME!
              </span>
              I can't stress this enough. A slight error (e.g. not closing a
              node, a typo, or missing a quotation mark) can break your game. It
              may just be that your 'Body Art' tab disappears - but I can't say
              what the result will be. If that happens after placing this file
              in your Data folder, you know that your code is corrupted. Either
              check it and find out where the mistake is, or delete the file
              entirely. <strong>Always</strong> delete the last thing you
              changed before deleting your game or doing anything drastic - in
              this case, that's this file. :) You may find me or another modder
              in Down By The River server on Discord and ask for help if you're
              concerned.
            </p>
            <pre>{configElements}</pre>
            <Button onClick={confirmDelete}>Clear Set</Button>
          </Col>
        ) : (
          prcElements
        )}
      </Row>
    </>
  );
}
