import JoinGame from "@components/join-game/join-game"
import { render } from "@solidjs/testing-library"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, test, vi } from "vitest"
import * as lib from "@components/join-game/component-lib"
import { SessionType } from "@enums"
import { io } from "socket.io-client"

describe("Join Game Component", () => {
  const multiplayerConfigMock = {
    socket: null,
    sessionID: "",
    playerID: null,
  }
  const setGameModeMock = vi.fn()
  const setJoinGameMock = vi.fn()
  const setMultiplayerMenuMock = vi.fn()
  const terminateSessionMock = vi.fn()

  const joinSessionHandlerSpy = vi.spyOn(lib, "joinSessionHandler")

  const { getByRole, getByText, queryByText } = render(() => (
    <JoinGame
      multiplayerConfig={multiplayerConfigMock}
      setGameMode={setGameModeMock}
      setJoinGameMenu={setJoinGameMock}
      setMultiplayerMenu={setMultiplayerMenuMock}
      terminateSession={terminateSessionMock}
    />
  ))

  const user = userEvent.setup()

  const joinGameHeadingEl = getByRole("heading")
  const joinGameTextEl = getByText(
    /Please enter the session ID from your opponent below/i
  )
  const joinGameInputEl = getByRole("textbox")
  const joinSessionButton = getByRole("button", {
    name: "join",
  })
  const backButton = getByRole("button", {
    name: "←",
  })
  const joinGameInfo1 = queryByText(/Attempting to join session.../i)
  const joinGameInfo2 = queryByText(/Please enter a valid session ID./i)
  const joinGameInfo3 = queryByText(
    /This session does not exist. Please check that the session ID is correct./i
  )
  const joinGameInfo4 = queryByText(
    /There seems to be an issue connecting to the server. Please try again later./i
  )

  const invalidSessionID = "123"
  const validSessionID = "1234"

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders", () => {
    expect(joinGameHeadingEl).toBeInTheDocument()
    expect(joinGameTextEl).toBeInTheDocument()
    expect(joinSessionButton).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
    expect(joinGameInfo1).not.toBeInTheDocument()
    expect(joinGameInfo2).not.toBeInTheDocument()
    expect(joinGameInfo3).not.toBeInTheDocument()
    expect(joinGameInfo4).not.toBeInTheDocument()
  })

  describe("join session action", () => {
    test("invalid ID", async () => {
      await user.type(joinGameInputEl, invalidSessionID)
      await user.click(joinSessionButton)

      const joinGameInfo = queryByText(/Please enter a valid session ID./i)

      expect(joinSessionHandlerSpy).toHaveBeenCalledOnce()
      expect(joinGameInfo).toBeInTheDocument()
    })

    test("connection attempt", async () => {
      const joinGameInputEl = getByRole("textbox")
      const joinSessionButton = getByRole("button", {
        name: "join",
      })

      await user.type(joinGameInputEl, validSessionID)
      await user.click(joinSessionButton)

      const joinGameInfo = queryByText(/Attempting to join session.../i)

      expect(joinSessionHandlerSpy).toHaveBeenCalledOnce()
      expect(joinGameInfo).toBeInTheDocument()
    })
  })

  test("back button action", async () => {
    await user.click(backButton)
    expect(terminateSessionMock).toHaveBeenCalledWith(SessionType.Join)
  })
})
