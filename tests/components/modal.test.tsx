import Modal, { Content } from "@components/modal/modal"
import {
  ModalHeadingColor,
  PlayerModalHeading,
  PlayerModalSubHeading,
} from "@enums"
import { render } from "@solidjs/testing-library"
import { describe, expect, it, vi } from "vitest"

describe("Content component", () => {
  const { getByRole, getByTestId } = render(() => (
    <Content
      heading={PlayerModalHeading.Match}
      subHeading={PlayerModalSubHeading.Deck}
      headingColor={ModalHeadingColor.green}
    />
  ))
  const headingContainer = getByTestId("modal heading container")

  const heading = getByRole("heading", {
    level: 2,
  })

  const subHeading = getByRole("heading", {
    level: 3,
  })

  const modalContent = getByTestId("modal content")

  it("renders headings and content", () => {
    expect(heading).toHaveTextContent(PlayerModalHeading.Match)
    expect(subHeading).toHaveTextContent(PlayerModalSubHeading.Deck)
    expect(modalContent).toBeInTheDocument()
    expect(headingContainer).toHaveClass(
      `modal__container-heading modal__container-heading--${ModalHeadingColor.green}`
    )
  })
})

describe("Modal component", () => {
  describe("modal open", () => {
    it("shows the modal when showModal prop true and shows title", () => {
      const { getByRole, getByTestId } = render(() => (
        <Modal setShowModal={vi.fn()} showModal={true} />
      ))

      const modalBackdrop = getByTestId("modal backdrop")
      const modalCloseButton = getByRole("button", {
        name: "close",
      })
      const modalTitle = getByRole("paragraph")

      expect(modalBackdrop).toBeInTheDocument()
      expect(modalCloseButton).toBeInTheDocument()
      expect(modalTitle).toHaveTextContent(/pairs/i)
    })

    it("hides modal title", () => {
      const { queryByRole } = render(() => (
        <Modal setShowModal={vi.fn()} showModal={true} hideTitle={true} />
      ))

      const modalTitle = queryByRole("paragraph")
      expect(modalTitle).not.toBeInTheDocument()
    })
  })

  it("hides the modal when showModal prop false", () => {
    const { queryByTestId } = render(() => (
      <Modal setShowModal={vi.fn()} showModal={false} />
    ))

    const modalBackdrop = queryByTestId("modal backdrop")
    expect(modalBackdrop).not.toBeInTheDocument()
  })
})
