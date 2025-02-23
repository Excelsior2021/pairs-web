import MultiplayerMenu from "@components/multiplayer-menu/multiplayer-menu"
import { render } from "@solidjs/testing-library"
import * as lib from "@components/multiplayer-menu/component-lib"
import { describe, expect, test, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { io } from "socket.io-client"

describe("MultiplayerMenu Component", () => {
  const multiplayerConfigMock = {
    socket: null,
    sessionID: "",
    playerID: null,
  }
  const setGameModeMock = vi.fn()
  const setJoinGameMock = vi.fn()
  const setMultiplayerMenuMock = vi.fn()

  const terminateCreateSessionSpy = vi.spyOn(lib, "terminateCreateSession")
  const createSessionHandlerSpy = vi.spyOn(lib, "createSessionHandler")

  const user = userEvent.setup()

  const { getByRole, getByText } = render(() => (
    <MultiplayerMenu
      multiplayerConfig={multiplayerConfigMock}
      setGameMode={setGameModeMock}
      setJoinGameMenu={setJoinGameMock}
      setMultiplayerMenu={setMultiplayerMenuMock}
    />
  ))

  const createSessionButton = getByRole("button", {
    name: /create session/i,
  })

  const joinSessionButton = getByRole("button", {
    name: /join session/i,
  })

  const backButton = getByRole("button", {
    name: /←/i,
  })

  test("create session action", async () => {
    await user.click(createSessionButton)
    const text = getByText(/creating session.../i)
    expect(createSessionHandlerSpy).toHaveBeenCalledOnce()
    expect(text).toBeInTheDocument()
    expect(createSessionButton).toBeDisabled()
  })

  test("join session action", async () => {
    await user.click(joinSessionButton)
    expect(terminateCreateSessionSpy).toHaveBeenCalledWith(
      multiplayerConfigMock.socket,
      setMultiplayerMenuMock
    )
    expect(setJoinGameMock).toHaveBeenCalledWith(true)
  })
})
