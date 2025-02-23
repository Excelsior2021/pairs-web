import { describe, expect, test, it, afterEach } from "vitest"
import { render } from "@solidjs/testing-library"
import GameOver from "@components/game-over/game-over"
import { Outcome } from "@enums"

describe("GameOver component", () => {
  test("render player wins outcome", () => {
    const { getByText } = render(() => (
      <GameOver
        outcome={Outcome.Player}
        playerPairsCount={20}
        opponentPairsCount={10}
        deckCount={0}
      />
    ))

    const outcome = getByText(Outcome.Player)

    expect(outcome).toBeInTheDocument()
  })

  test("render opponent wins outcome", () => {
    const { getByText } = render(() => (
      <GameOver
        outcome={Outcome.Opponent}
        playerPairsCount={10}
        opponentPairsCount={20}
        deckCount={0}
      />
    ))

    const outcome = getByText(Outcome.Opponent)

    expect(outcome).toBeInTheDocument()
  })

  test("render draw outcome", () => {
    const { getByText } = render(() => (
      <GameOver
        outcome={Outcome.Draw}
        playerPairsCount={20}
        opponentPairsCount={20}
        deckCount={0}
      />
    ))

    const outcome = getByText(Outcome.Draw)

    expect(outcome).toBeInTheDocument()
  })

  it("renders correctly", () => {
    const { getByRole, getByText } = render(() => (
      <GameOver
        outcome={Outcome.Player}
        playerPairsCount={20}
        opponentPairsCount={10}
        deckCount={0}
      />
    ))

    const gameOverHeading = getByRole("heading", {
      name: /game over/i,
    })
    const statsHeading = getByRole("heading", {
      name: /stats/i,
    })
    const playerPairsCount = getByText(/your pairs/i)
    const opponentPairsCount = getByText(/opponent pairs/i)
    const deckCount = getByText(/remaining cards in deck/i)

    expect(gameOverHeading).toBeInTheDocument()
    expect(statsHeading).toBeInTheDocument()
    expect(playerPairsCount).toHaveTextContent(/your pairs: 20/i)
    expect(opponentPairsCount).toHaveTextContent(/opponent pairs: 10/i)
    expect(deckCount).toHaveTextContent(/remaining cards in deck: 0/i)
  })
})
