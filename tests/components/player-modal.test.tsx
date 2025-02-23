import { describe, expect, it, vi } from "vitest"
import { render } from "@solidjs/testing-library"
import PlayerModal from "@components/player-modal/player-modal"
import { player } from "@types"
import { PlayerModalHeading, PlayerModalSubHeading, PlayerOutput } from "@enums"

describe("PlayerModal component", () => {
  const playerMock: player = {
    hand: [],
    pairs: [],
  }
  const closePlayerModalHandlerMock = vi.fn()
  const playerModalTextMock = "hello world"

  const { getByText, getByTestId } = render(() => (
    <PlayerModal
      player={playerMock}
      playerOutput={PlayerOutput.OpponentMatch}
      showPlayerModal={true}
      playerModalHeading={PlayerModalHeading.Match}
      playerModalSubHeading={PlayerModalSubHeading.Opponent}
      playerModalText={playerModalTextMock}
      playerModalCards={[]}
      closePlayerModalHandler={closePlayerModalHandlerMock}
    />
  ))

  const playerModalText = getByText(playerModalTextMock)
  const playerModalCards = getByTestId("player modal cards")

  it("renders modal content", () => {
    expect(playerModalText).toBeInTheDocument()
    expect(playerModalCards).toBeInTheDocument()
  })
})
