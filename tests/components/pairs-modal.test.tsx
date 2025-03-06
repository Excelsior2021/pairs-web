import PairsModal from "@components/pairs-modal/pairs-modal"
import { render } from "@solidjs/testing-library"
import { card } from "@types"
import { describe, expect, it, vi } from "vitest"

describe("Pairs Modal Component", () => {
  const playerPairsMock = [{}, {}] as card[]
  const opponentPairsMock = [{}, {}, {}, {}] as card[]
  const setShowPairsModalMock = vi.fn()

  const { getByText, getByTestId } = render(() => (
    <PairsModal
      playerPairs={playerPairsMock}
      opponentPairs={opponentPairsMock}
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
