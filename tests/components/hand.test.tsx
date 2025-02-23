import { describe, expect, it, vi } from "vitest"
import { render } from "@solidjs/testing-library"
import Hand from "@components/hand/hand"
import { card } from "@types"
import { NonNumCardValue, Suit } from "@enums"

describe("Hand component", () => {
  const hand = [
    {
      id: "ace_of_clubs",
      img: "img",
      suit: Suit.clubs,
      value: NonNumCardValue.ace,
    },
    { id: "1_of_clubs", img: "img", suit: Suit.clubs, value: 1 },
    { id: "2_of_clubs", img: "img", suit: Suit.clubs, value: 2 },
  ] as card[]

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
