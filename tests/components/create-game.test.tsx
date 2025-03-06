import { describe, expect, it } from "vitest"
import { render } from "@solidjs/testing-library"
import CreateGame from "@components/create-game/create-game"

describe("CreateGame component", () => {
  const sessionIDMock = "1234"
  const { getByText } = render(() => <CreateGame sessionID={sessionIDMock} />)

  const sessionIDEl = getByText(sessionIDMock)
  const createGameText1 = getByText(
    /Share the session ID with the user you want to play with/i
  )
  const createGameText2 = getByText("session ID:")
  const createGameText3 = getByText("waiting for opponent to connect...")

  it("renders", () => {
    expect(sessionIDEl).toBeInTheDocument()
    expect(createGameText1).toBeInTheDocument()
    expect(createGameText2).toBeInTheDocument()
    expect(createGameText3).toBeInTheDocument()
  })
})
