import { Component } from "solid-js"
import { setShowPairsModal } from "../PairsModal/PairsModal"
import { setShowInstructions } from "../Instructions/Instructions"
import { setShowQuitGameModal } from "../QuitGameModal/QuitGameModal"
import { gameDeckHandler } from "../../gameFunctions/deckFunctions"
import { gameDeckHandler as gameDeckHandlerMultiplayer } from "../../gameFunctions/multiplayerUIFunctions"
import { gameStateProp } from "../../types/general"
import { GameMode } from "../../types/enums"
import "./Sidebar.scss"

const Sidebar: Component<gameStateProp> = props => {
  const handleGameDeck = () => {
    if (props.gameState().deckClickable) {
      if (props.gameState().gameMode === GameMode.SinglePlayer)
        gameDeckHandler(
          props.gameState().playerChosenCardEvent,
          props.gameState().game,
          props.gameState().deck,
          props.gameState().player,
          props.gameState().opponent
        )
      if (props.gameState().gameMode === GameMode.Multiplayer)
        gameDeckHandlerMultiplayer(props.gameState().playerRequest)
    }
  }
  return (
    <div class="sidebar">
      <div class="sidebar__deck">
        <p class="sidebar__heading">deck</p>
        <img
          class={
            props.gameState().deckClickable
              ? "card card--deck card--deck--active"
              : "card card--deck"
          }
          src="./cards/back.png"
          alt="game deck"
          onclick={handleGameDeck}
        />
      </div>
      <div class="sidebar__actions">
        <p class="sidebar__heading">{props.gameState().gameMode}</p>
        <button class="sidebar__button" onclick={() => setShowPairsModal(true)}>
          pairs
        </button>
        <button
          class="sidebar__button"
          onclick={() => setShowInstructions(true)}>
          instructions
        </button>
        <button
          class="sidebar__button sidebar__button--quit"
          onclick={() => setShowQuitGameModal(true)}>
          quit
        </button>
      </div>
    </div>
  )
}

export default Sidebar
