import { describe, expect, it, vi } from "vitest"
import { render } from "@solidjs/testing-library"
import PlayerModal from "@components/player-modal/player-modal"
import { PlayerModalHeading, PlayerModalSubHeading } from "@enums"

describe("PlayerModal component", () => {
  const closePlayerModalHandlerMock = vi.fn()
  const playerModalTextMock = "hello world"

  const { getByText, getByTestId } = render(() => (
    <PlayerModal
      showPlayerModal={true}
      playerModalHeading={PlayerModalHeading.Match}
      playerModalSubHeading={PlayerModalSubHeading.Opponent}
      playerModalText={playerModalTextMock}
      playerModalCards={[]}
      closePlayerModalHandler={closePlayerModalHandlerMock}
    />
  ))

  const playerModalTextEl = getByText(playerModalTextMock)
  const playerModalCardsEl = getByTestId("player modal cards")

  it("renders modal content", () => {
    expect(playerModalTextEl).toBeInTheDocument()
    expect(playerModalCardsEl).toBeInTheDocument()
  })
})
