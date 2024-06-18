import { fireEvent, render, screen } from '@testing-library/react';
import { AppProvider, useAppContext } from '../../AppContext';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ContextValues } from '../../types';

function ContextExtractor(props: { children: (context: ContextValues) => JSX.Element }) {
  const context = useAppContext()
  return props.children(context)
}

test("renders the AppProvider", () => {
  render(<AppProvider><></></AppProvider>, { wrapper: BrowserRouter });
  userEvent.setup()
})

test("gets the search parameters", () => {
  const { rerender } = render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <span data-testid="value">Received: {context.type}</span>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  expect(screen.getByTestId("value").textContent).toBe("Received: example")

  rerender(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <span data-testid="value">Received: {context.location}</span>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  expect(screen.getByTestId("value").textContent).toBe("Received: testing")
})

test("updates the piercing selected state", async () => {
  render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <>
          <span data-testid="selected">Selected: {context.piercings[0].selected ? "true" : "false"}</span>
          <button role="button" onClick={() => context.handleBtns(context.piercings[0].nodeid, context.piercings[0].site_cat)} />
        </>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  expect(screen.getByTestId("selected").textContent).toBe("Selected: false")
  fireEvent.click(screen.getByRole("button"))

  expect(screen.getByTestId("selected").textContent).toBe("Selected: true")
})

test("updates mod filter change", async () => {
  render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <>
          <span data-testid="filter">Selected: {context.modFilters.join(",")}</span>
          <button role="button" onClick={() => context.handleModFilterChange("isp_gold")} />
        </>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  expect(screen.getByTestId("filter").textContent).toContain("isp_gold")

  fireEvent.click(screen.getByRole("button"))
  expect(screen.getByTestId("filter").textContent).not.toContain("isp_gold")
})

test("handles filter change", async () => {
  const user = userEvent.setup()
  const now = Date.now().toString()

  render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <>
          <span data-testid="type">Selected: {context.type}</span>
          <button role="button" onClick={() => context.handleFilterChange("type", now)} />
        </>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  await user.click(screen.getByRole("button"))
  expect(screen.getByTestId("type").textContent).toContain(now)
})

test("handles filter clear", async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <>
          <span data-testid="type">Selected: {[context.type, context.location]}</span>
          <button role="button" onClick={() => context.handleClearFilters()} />
        </>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  const { textContent } = screen.getByTestId("type")
  expect(textContent).toContain("example")
  expect(textContent).toContain("testing")

  await user.click(screen.getByRole("button"))
  const { textContent: updatedTextContent } = screen.getByTestId("type")

  expect(updatedTextContent).not.toContain("example")
  expect(updatedTextContent).not.toContain("testing")
})

test("confirms delete and resets sessions", async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockImplementation(() => true)

  render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <>
          <span data-testid="session">{context.sessionOver ? "SESSION_OVER" : "SESSION_OK"}</span>
          <button role="button" onClick={() => context.confirmDelete()} />
        </>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  await user.click(screen.getByRole("button"))
  expect((await screen.findByTestId("session")).textContent).toContain("SESSION_OK")
})

test("sets session over to false if the back button was used", async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <>
          <span data-testid="session">{context.sessionOver ? "SESSION_OVER" : "SESSION_OK"}</span>
          <button id="back-btn" role="button" onClick={(e) => context.toggleSessionOver(e)} />
        </>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  await user.click(screen.getByRole("button"))
  expect((await screen.findByTestId("session")).textContent).toContain("SESSION_OK")
})

test("sets session over to true if the generate-btn used", async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={["/?type=example&location=testing"]}>
      <AppProvider>
        <ContextExtractor>{context => <>
          <span data-testid="session">{context.sessionOver ? "SESSION_OVER" : "SESSION_OK"}</span>
          <button id="generate-btn" role="button" onClick={(e) => context.toggleSessionOver(e)} />
        </>}</ContextExtractor>
      </AppProvider>
    </MemoryRouter>
  )

  await user.click(screen.getByRole("button"))
  expect((await screen.findByTestId("session")).textContent).toContain("SESSION_OVER")
})