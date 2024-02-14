import { useState } from "react";
import data from "./piercings/data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";
import PiercingSetBlock from "./components/PiercingSetBlock";

function App() {
  const [piercings, setPiercings] = useState(data);

  const prcSet = data.map((card) => {
    return (
      <Card
        img={card.coverImg}
        rating={card.stats.rating}
        reviewCount={card.stats.reviewCount}
        location={card.location}
        title={card.title}
        price={card.price}
      />
    );
  });

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <PiercingSetBlock piercingName={piercings[0].prc_name} />
    </ThemeProvider>
  );
}

export default App;
