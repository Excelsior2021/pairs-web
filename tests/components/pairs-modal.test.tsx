import PairsModal from "@components/pairs-modal/pairs-modal"
import { render } from "@solidjs/testing-library"
import { describe, expect, it, vi } from "vitest"
import type { card } from "@types"

describe("Pairs Modal Component", () => {
  const playerPairsMock = [{}, {}] as card[]
  const opponentPairsMock = [{}, {}, {}, {}] as card[]
  const playersPairsMock = [
    {
      id: "player",
      heading: `Your Pairs (${playerPairsMock.length})`,
      pairs: playerPairsMock,
    },
    {
      id: "opponent",
      heading: `Opponent's Pairs (${opponentPairsMock.length})`,
      pairs: opponentPairsMock,
    },
  ]
  const setShowPairsModalMock = vi.fn()

  const { getByText, getByTestId } = render(() => (
    <PairsModal
      playersPairs={playersPairsMock}
      showPairsModal={true}
      setShowPairsModal={setShowPairsModalMock}
    />
  ))
  const playerPairsHeading = getByText(`Your Pairs (${playerPairsMock.length})`)
  const opponentPairsHeading = getByText(
    `Opponent's Pairs (${opponentPairsMock.length})`
  )
  const playerPairs = getByTestId("player pairs")
  const opponentPairs = getByTestId("opponent pairs")

  it("renders", () => {
    expect(playerPairsHeading).toBeInTheDocument()
    expect(opponentPairsHeading).toBeInTheDocument()
    expect(playerPairs).toBeInTheDocument()
    expect(opponentPairs).toBeInTheDocument()
  })
})
