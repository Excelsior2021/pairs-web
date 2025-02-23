import Modal, { Content } from "@components/modal/modal"
import {
  ModalHeadingColor,
  PlayerModalHeading,
  PlayerModalSubHeading,
} from "@enums"
import { render } from "@solidjs/testing-library"
import { describe, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event"

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
  it("shows the modal when showModal prop true", () => {
    const { getByRole, getByTestId } = render(() => (
      <Modal setShowModal={vi.fn()} showModal={true} />
    ))

    const modalBackdrop = getByTestId("modal backdrop")
    const modalCloseButton = getByRole("button", {
      name: "close",
    })

    expect(modalBackdrop).toBeInTheDocument()
    expect(modalCloseButton).toBeInTheDocument()
  })

  it("hides the modal when showModal prop false", () => {
    const { queryByTestId } = render(() => (
      <Modal setShowModal={vi.fn()} showModal={false} />
    ))

    const modalBackdrop = queryByTestId("modal backdrop")

    expect(modalBackdrop).not.toBeInTheDocument()
  })

  it("closes the modal when the close button is clicked", async () => {
    const setShowModalMock = vi.fn()
    const { getByRole, getByTestId } = render(() => (
      <Modal setShowModal={setShowModalMock} showModal={true} />
    ))
    const user = userEvent.setup()

    let modalBackdrop = getByTestId("modal backdrop")
    const modalCloseButton = getByRole("button", {
      name: "close",
    })

    expect(modalBackdrop).toBeInTheDocument()

    await user.click(modalCloseButton)

    expect(setShowModalMock).toHaveBeenCalledWith(false)
  })
})
