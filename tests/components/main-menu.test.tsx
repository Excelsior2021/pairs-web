import { beforeEach, describe, expect, it, test, vi } from "vitest"
import { render } from "@solidjs/testing-library"
import { userEvent } from "@testing-library/user-event"
import MainMenu from "@components/main-menu/main-menu"
import { GameMode } from "@enums"

describe("MainMenu Component", () => {
  const setGameModeMock = vi.fn()
  const setMultiplayerMenuMock = vi.fn()
  const setShowInstructionsMock = vi.fn()
  const setAppLoadedMock = vi.fn()

  const { getByRole } = render(() => (
    <MainMenu
      setGameMode={setGameModeMock}
      setMultiplayerMenu={setMultiplayerMenuMock}
      setShowInstructions={setShowInstructionsMock}
      appLoaded={false}
      setAppLoaded={setAppLoadedMock}
    />
  ))

  const heading = getByRole("heading", {
    level: 2,
  })

  const singlePlayerButton = getByRole("button", {
    name: /single player/i,
  })

  const multiplayerButton = getByRole("button", {
    name: /multiplayer/i,
  })

  const instructionsButton = getByRole("button", {
    name: /instructions/i,
  })

  it("renders", () => {
    expect(heading).toBeInTheDocument()
    expect(singlePlayerButton).toBeInTheDocument()
    expect(multiplayerButton).toBeInTheDocument()
    expect(instructionsButton).toBeInTheDocument()
  })

  test("no animation", async () => {
    const { getByTestId } = render(() => (
      <MainMenu
        setGameMode={setGameModeMock}
        setMultiplayerMenu={setMultiplayerMenuMock}
        setShowInstructions={setShowInstructionsMock}
        appLoaded={true}
        setAppLoaded={setAppLoadedMock}
      />
    ))

    const mainMenuEl = getByTestId("main menu")

    expect(mainMenuEl.className).toBe("main-menu main-menu--no-animation")
  })

  test("animation", async () => {
    const { getByTestId } = render(() => (
      <MainMenu
        setGameMode={setGameModeMock}
        setMultiplayerMenu={setMultiplayerMenuMock}
        setShowInstructions={setShowInstructionsMock}
        appLoaded={false}
        setAppLoaded={setAppLoadedMock}
      />
    ))

    const mainMenuEl = getByTestId("main menu")

    expect(mainMenuEl.className).toBe("main-menu")
  })

  describe("actions", () => {
    const user = userEvent.setup()

    beforeEach(() => {
      vi.clearAllMocks()
    })

    test("single player button clicked", async () => {
      await user.click(singlePlayerButton)
      expect(setGameModeMock).toHaveBeenCalledWith(GameMode.SinglePlayer)
      expect(setMultiplayerMenuMock).not.toHaveBeenCalled()
      expect(setShowInstructionsMock).not.toHaveBeenCalled()
    })

    test("multiplayer button clicked", async () => {
      await user.click(multiplayerButton)
      expect(setMultiplayerMenuMock).toHaveBeenCalledWith(true)
      expect(setGameModeMock).not.toHaveBeenCalled()
      expect(setShowInstructionsMock).not.toHaveBeenCalled()
    })

    test("instructions button clicked", async () => {
      await user.click(instructionsButton)
      expect(setShowInstructionsMock).toHaveBeenCalledWith(true)
      expect(setGameModeMock).not.toHaveBeenCalled()
      expect(setMultiplayerMenuMock).not.toHaveBeenCalled()
    })
  })
})
