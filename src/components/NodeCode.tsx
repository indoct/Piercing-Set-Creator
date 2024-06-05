import { useAppContext } from "../AppContext";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, Check2Circle, Copy, Trash } from "react-bootstrap-icons";
import { nanoid } from "nanoid";
import { Piercing } from "../types";

export default function NodeCode(): JSX.Element {
  SyntaxHighlighter.registerLanguage("markup", markup);
  const { piercings, confirmDelete, toggleSessionOver } = useAppContext();

  const [copyBtnPressed, setCopyBtnPressed] = useState<boolean>(false);

  const selected: Piercing[] = piercings.filter((prc) => prc.selected);
  const containsMod: Piercing[] = piercings.filter(
    (prc) => prc.selected && prc.type === "mod"
  );

  const configElements: string[] = selected.map((prc) => {
    const author: string =
      prc.site_cat === "isp_silver" || prc.site_cat === "isp_gold"
        ? "Indoct's Subtler Piercings"
        : prc.site_cat === "p4_blooming"
        ? "P4 Blooming Circlets"
        : "Ghouls Custom Piercings";
    const pt_name: string =
      prc.name.includes("Vanilla") && prc.type === "vanilla"
        ? prc.name
        : !prc.name.includes("Vanilla") && prc.type === "mod"
        ? `[${author}] ${prc.name}`
        : `[Van] ${prc.name}`;
    const color: string = prc.site_cat === "isp_gold" ? "" : `(${prc.color})`;

    // prettier-ignore
    return (
          `\                        
                        <node id="VisualUUIDs"> <!-- ${pt_name} ${color} - ${prc.pt_bone} --> 
                            <attribute id="Object" type="guid" value="${prc.nodeid}"/>
                        </node>`
      );
  });

  function formatString(): string {
    const codeString: string = configElements.join("");
    return codeString
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "")
      .join("\n");
  }

  async function copyToClipboard(): Promise<void> {
    const codeToCopy: string = formatString();
    await navigator.clipboard.writeText(codeToCopy);
  }

  function handleCopyBtn(): void {
    setCopyBtnPressed(true);
    setTimeout(() => {
      setCopyBtnPressed(false);
    }, 2000);
  }

  const generateModEls = (): JSX.Element[] => {
    const filteredData: Piercing[] = Array.from(
      new Map(containsMod.map((obj) => [obj.set_name, obj])).values()
    );

    const modElements: JSX.Element[] = filteredData.map((mod) => {
      return (
        <li key={nanoid()}>
          <a href={mod.modurl} target="_blank">
            {mod.set_name}
          </a>
        </li>
      );
    });

    return modElements;
  };

  return (
    <>
      <Row className="mt-4">
        <Col lg={8}>
          <h5 className="prc-block-h mb-3">
            CharacterCreationAccessorySets Nodes:
          </h5>
          <p className="output-intro">
            <span className="warning">
              By creating your own replacer sets to put in the game's Data
              folder, YOU ARE MODDING YOUR GAME!&nbsp;
            </span>
            <br />
            <strong>
              There are risks involved with modding, and by using this generator
              you're agreeing to take those risks.
            </strong>
          </p>
          <p className="output-intro">
            Feel free to find me or another modder in Down By The River server
            on Discord and ask for help.
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <SyntaxHighlighter language="markup" style={duotoneDark}>
            {formatString()}
          </SyntaxHighlighter>
        </Col>
        {containsMod.length > 0 && (
          <Col lg={4}>
            <div className="mod-warning">
              <p>
                You have {containsMod.length} mod piercings in your set. You
                MUST download & install the below mods or the piercings will not
                show in your game! (Opens in new window)
              </p>
              <ul className="mod-list">{generateModEls()}</ul>
            </div>
          </Col>
        )}
      </Row>
      <Row className="mt-2 flex-row">
        <Col lg={4}>
          <Button
            id="copy-btn"
            onClick={() => {
              handleCopyBtn();
              copyToClipboard();
            }}
          >
            {!copyBtnPressed ? (
              <>
                <Copy /> Copy Code to Clipboard
              </>
            ) : (
              <>
                <Check2Circle /> Copied to Clipboard!
              </>
            )}
          </Button>
        </Col>
        <Col className="d-flex gap-2 mt-2 mt-sm-0 nc-btns-cont" lg={4}>
          <Button
            id="back-btn"
            onClick={(e) => toggleSessionOver(e)}
            variant="secondary"
          >
            <ArrowLeft />
            Continue Editing
          </Button>
          <Button onClick={confirmDelete} variant="secondary">
            <Trash /> Clear Set
          </Button>
        </Col>
      </Row>
    </>
  );
}
