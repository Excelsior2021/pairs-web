import { type Component, For } from "solid-js"
import Card from "@components/card/card"
import Modal from "@components/modal/modal"
import {
  ModalHeadingColor,
  PlayerModalHeading,
  type PlayerModalSubHeading,
  type PlayerOutput,
} from "@enums"
import "./player-modal.scss"

import type { card, player } from "@types"

type props = {
  player: player
  playerOutput: PlayerOutput
  showPlayerModal: boolean
  playerModalHeading: PlayerModalHeading
  playerModalSubHeading: PlayerModalSubHeading
  playerModalText: string
  playerModalCards: card[]
  closePlayerModalHandler: () => void
}

const PlayerModal: Component<props> = props => (
  <Modal
    showModal={props.showPlayerModal}
    setShowModal={props.closePlayerModalHandler}
    heading={props.playerModalHeading}
    subHeading={props.playerModalSubHeading}
    headingColor={
      props.playerModalHeading === PlayerModalHeading.Match
        ? ModalHeadingColor.green
        : ModalHeadingColor.red
    }
    hideTitle={true}>
    <div class="player-modal__content">
      <p class="player-modal__text">{props.playerModalText}</p>
      <div class="player-modal__cards" data-testid="player modal cards">
        <For each={props.playerModalCards}>
          {card => <Card card={card} show={true} />}
        </For>
      </div>
    </div>
  </Modal>
)

export default PlayerModal
