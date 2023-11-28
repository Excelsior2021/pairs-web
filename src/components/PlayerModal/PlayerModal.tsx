import { Component, createSignal, Switch, Match } from "solid-js"
import Modal from "../Modal/Modal"
import { gameStateMultiplayerProp, gameStateProp } from "../../types/general"
import "./PlayerModal.scss"

export const [showPlayerModal, setShowPlayerModal] = createSignal(false)
export const [matchStatusHeading, setMatchStatusHeading] = createSignal("")
export const [matchStatusSubHeading, setMatchStatusSubHeading] =
  createSignal("")

const PlayerModal: Component<
  gameStateProp | gameStateMultiplayerProp
> = props => (
  <Modal
    showModal={showPlayerModal}
    setShowModal={setShowPlayerModal}
    heading={matchStatusHeading()}
    subHeading={matchStatusSubHeading()}
    playerOutput={props.gameState().playerOutput!}>
    <div class="player-modal__output">
      <p class="player-modal__text">
        <Switch>
          <Match when={props.gameState().playerOutput === 0}>
            You have a match! Both cards will be added to your pairs. It's your
            turn again!
          </Match>
          <Match when={props.gameState().playerOutput === 1}>
            The value of the card you chose matches the value of the card you
            dealt from the deck! Both cards will be added to your pairs. It's
            your turn again!
          </Match>
          <Match when={props.gameState().playerOutput === 2}>
            The value of the card you chose didn't match with the value of the
            dealt card but you had another match in your hand, both
          </Match>
          <Match when={props.gameState().playerOutput === 3}>
            No matches, the dealt card has been added to your hand. It's your
            opponent's turn.
          </Match>
        </Switch>
      </p>
      <div class="player-modal__cards">
        <Switch>
          <Match when={props.gameState().playerOutput !== 3}>
            {props.gameState().playerPairsLast}
            {props.gameState().playerPairsSecondLast}
          </Match>
          <Match when={props.gameState().playerOutput === 3}>
            {props.gameState().playerHandLast}
          </Match>
        </Switch>
      </div>
    </div>
  </Modal>
)

export default PlayerModal
