import Instructions from "@components/instructions/instructions"
import { render } from "@solidjs/testing-library"
import { describe, expect, it, vi } from "vitest"

describe("Instructions Component", () => {
  const setShowInstructionsMock = vi.fn()

  const { getByText, getAllByRole } = render(() => (
    <Instructions
      showInstructions={true}
      setShowInstructions={setShowInstructionsMock}
    />
  ))

  const instructionsTextEl = getByText(
    /The aim is to have the most pairs of cards at the end of the game./i
  )

  const instructionsListEls = getAllByRole("listitem")

  it("renders", () => {
    expect(instructionsTextEl).toBeInTheDocument()
    expect(instructionsListEls.length).toBe(9)
  })
})
