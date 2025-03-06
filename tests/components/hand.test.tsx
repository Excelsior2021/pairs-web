import { describe, expect, it, vi } from "vitest"
import { render } from "@solidjs/testing-library"
import Hand from "@components/hand/hand"
import { card } from "@types"

describe("Hand component", () => {
  const hand: card[] = Array(3).fill({})

  const { getByRole, getAllByRole } = render(() => (
    <Hand
      hand={hand}
      heading="hand"
      isPlayerTurn={true}
      isPlayer={true}
      playerTurnHandler={vi.fn()}
    />
  ))

  const heading = getByRole("heading", { level: 3 })
  const cardEls = getAllByRole("img") as HTMLImageElement[]

  it("renders heading and cards", () => {
    expect(heading).toHaveTextContent(/hand/i)
    expect(cardEls).toHaveLength(3)
  })
})
