import { Show, type ParentComponent, type Setter } from "solid-js"
import {
  ModalHeadingColor,
  PlayerModalHeading,
  PlayerModalSubHeading,
} from "@enums"
import "./modal.scss"

type contentProps = {
  heading?: PlayerModalHeading | "instructions" | "quit game"
  subHeading?: PlayerModalSubHeading
  headingColor?: ModalHeadingColor
}

type modalProps = {
  showModal: boolean
  setShowModal: Setter<boolean>
  heading?: PlayerModalHeading | "instructions" | "quit game"
  subHeading?: PlayerModalSubHeading
  headingColor?: ModalHeadingColor
  hideTitle?: true
}

export const Content: ParentComponent<contentProps> = props => (
  <div class="modal__container">
    <div
      class={
        props.headingColor
          ? `modal__container-heading modal__container-heading--${props.headingColor}`
          : "modal__container-heading"
      }
      data-testid="modal heading container">
      <h2 class="modal__heading">{props.heading}</h2>
      {props.subHeading && <h3 class="modal__heading">{props.subHeading}</h3>}
    </div>
    <div class="modal__content" data-testid="modal content">
      {props.children}
    </div>
  </div>
)

const Modal: ParentComponent<modalProps> = props => (
  <Show when={props.showModal} fallback={null}>
    <div class="modal__backdrop" data-testid="modal backdrop">
      {!props.hideTitle && <p class="modal__title">Pairs</p>}
      <Content
        children={props.children}
        heading={props.heading}
        subHeading={props.subHeading}
        headingColor={props.headingColor}
      />
      <button class="modal__button" onclick={() => props.setShowModal(false)}>
        close
      </button>
    </div>
  </Show>
)

export default Modal
