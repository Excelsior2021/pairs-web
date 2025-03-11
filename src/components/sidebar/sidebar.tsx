import { type Setter, type Component } from "solid-js"
import Actions from "@components/actions/actions"
import "./sidebar.scss"

import type { GameMode } from "@enums"

type props = {
  isDealFromDeck: boolean
  gameMode: GameMode
  playerDealsHandler: (() => void) | null
  setShowPairsModal: Setter<boolean>
  setShowInstructions: Setter<boolean>
  setShowQuitGameModal: Setter<boolean>
}

const Sidebar: Component<props> = props => (
  <div class="sidebar">
    <div>
      <h3 class="sidebar__heading">deck</h3>
      <div class="sidebar__deck">
        <img
          class={
            props.isDealFromDeck
              ? "card card--deck card--deck--active"
              : "card card--deck"
          }
          src="./cards/back.webp"
          alt="game deck"
          onclick={() => {
            if (props.isDealFromDeck && props.playerDealsHandler)
              props.playerDealsHandler()
          }}
        />
      </div>
    </div>

    <div>
      <h3 class="sidebar__heading">{props.gameMode}</h3>
      <Actions
        class="sidebar__actions"
        buttonClass="sidebar__button"
        actions={[
          {
            name: "pairs",
            onclick: () => props.setShowPairsModal(true),
          },
          {
            name: "instructions",
            onclick: () => props.setShowInstructions(true),
          },
          {
            name: "quit",
            onclick: () => props.setShowQuitGameModal(true),
            class: "sidebar__button--quit",
          },
        ]}
      />
    </div>
  </div>
)

export default Sidebar
