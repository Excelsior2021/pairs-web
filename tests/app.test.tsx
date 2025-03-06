import { describe, expect, it } from "vitest"
import { render } from "@solidjs/testing-library"
import App from "../src/app"
import userEvent from "@testing-library/user-event"

describe("App component", () => {
  const { getByRole, getByTestId } = render(() => <App />)

  const appComponent = getByTestId("app")

  const appName = getByRole("heading", { name: /pairs/i })

  it("renders", () => {
    expect(appComponent).toBeInTheDocument()
    expect(appName).toBeInTheDocument()
  })

  it("renders the main menu", () => {
    const mainMenu = getByTestId("main menu")
    expect(mainMenu).toBeInTheDocument()
  })
})

describe("App Component Integrations", () => {
  const user = userEvent.setup()

  it("renders single player session", async () => {
    const { getByRole, getByTestId } = render(() => <App />)

    const singlePlayerButton = getByRole("button", {
      name: /single player/i,
    })
    await user.click(singlePlayerButton)
    const sessionElement = getByTestId("session")
    expect(sessionElement).toBeInTheDocument()
  })

  it("renders multiplayer menu", async () => {
    const { getByRole, getByTestId } = render(() => <App />)
    const multiplayerButton = getByRole("button", {
      name: /multiplayer/i,
    })
    await user.click(multiplayerButton)
    const multiplayerElement = getByTestId("multiplayer menu")
    expect(multiplayerElement).toBeInTheDocument()
  })

  it("renders instructions", async () => {
    const { getByRole, getByTestId } = render(() => <App />)
    const instructionsButton = getByRole("button", {
      name: /instructions/i,
    })
    await user.click(instructionsButton)
    const instructionsElement = getByTestId("instructions")
    expect(instructionsElement).toBeInTheDocument()
  })
})
