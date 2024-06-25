import { FC, lazy, Suspense } from "react";
import { Provider, useSelector } from "react-redux";
import { RootState } from "./app/store";
import Filters from "./components/Filters";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";
import Container from "react-bootstrap/Container";
import PiercingsBlock from "./components/PiercingsBlock";
import Header from "./components/Header";
import { ErrorBoundary } from "react-error-boundary";
import FallbackRender from "./FallbackRender";
import { store } from "./app/store";

const NodeCode = lazy(() => import("./components/NodeCode"));

export default function Home(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={FallbackRender}>
      <Provider store={store}>
        <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
          <Container fluid>
            <Header />
            <Filters />
            <Content />
          </Container>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

const Content: FC = () => {
  const sessionOver = useSelector((state: RootState) => state.session.sessionOver);

  return <Suspense fallback={<div className="loading">Generating Nodes - Please Wait...</div>}>{sessionOver ? <NodeCode /> : <PiercingsBlock />}</Suspense>;
};
