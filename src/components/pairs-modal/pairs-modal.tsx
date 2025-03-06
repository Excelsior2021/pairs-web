import { For, type Component, type Setter } from "solid-js"
import Card from "@components/card/card"
import Modal from "@components/modal/modal"
import "./pairs-modal.scss"

import type { card } from "@types"

type props = {
  playersPairs: {
    id: string
    heading: string
    pairs: card[]
  }[]
  showPairsModal: boolean
  setShowPairsModal: Setter<boolean>
}

const PairsModal: Component<props> = props => (
  <Modal
    showModal={props.showPairsModal}
    setShowModal={props.setShowPairsModal}>
    <div class="pairs-modal">
      <For each={props.playersPairs}>
        {player => (
          <div class="pairs-modal__pairs-container">
            <p
              class="pairs-modal__heading"
              data-testid={`${player.id} heading`}>
              {player.heading}
            </p>
            <div class="pairs-modal__pairs" data-testid={`${player.id} pairs`}>
              <For each={player.pairs}>
                {card => <Card card={card} show={true} />}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  </Modal>
)

export default PairsModal
