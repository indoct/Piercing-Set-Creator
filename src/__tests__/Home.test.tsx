import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../Home";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "../AppContext";
import data from "../data";

test("clicking piercings and opening the set modal shows selected entries", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/"]}>
      <AppProvider>
        <Home />
      </AppProvider>
    </MemoryRouter>
  );

  let list = await screen.findByTestId("entries")
  let piercings = Array.from(list?.querySelectorAll("button") ?? [])
  const [first, second, third, ..._] = piercings

  await user.click(first)
  await user.click(second)
  await user.click(third)

  const modalBtn = await screen.findByLabelText("Show Current Set Modal")
  await user.click(modalBtn)

  const modal = await screen.findByTestId("set-modal")
  const rows = Array.from(modal.querySelectorAll(".config-cont"))

  expect(rows[0].textContent).toContain(data[0].name)
  expect(rows[1].textContent).toContain(data[1].name)
  expect(rows[2].textContent).toContain(data[2].name)
})