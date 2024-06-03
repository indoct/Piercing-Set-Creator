import { lazy, Suspense } from "react";
import { AppProvider, useAppContext } from "./AppContext";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";
import Container from "react-bootstrap/Container";
import PiercingsBlock from "./components/PiercingsBlock";
import Header from "./components/Header";

const NodeCode = lazy(() => import("./components/NodeCode"));

export default function Home() {
  return (
    <AppProvider>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <Container fluid>
          <Header />
          <Content />
        </Container>
      </ThemeProvider>
    </AppProvider>
  );
}

const Content = () => {
  const { sessionOver } = useAppContext();

  return (
    <Suspense
      fallback={
        <div className="loading">Generating Nodes - Please Wait...</div>
      }
    >
      {sessionOver ? <NodeCode /> : <PiercingsBlock />}
    </Suspense>
  );
};
