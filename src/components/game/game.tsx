import { Show, type Component } from "solid-js"
import Hand from "@components/hand/hand"
import Actions from "@components/actions/actions"
import GameOver from "@components/game-over/game-over"
import "./game.scss"

import type { card } from "@types"

type props = {
  playerHand: card[]
  opponentHand: card[]
  playerPairsCount: number
  opponentPairsCount: number
  isPlayerTurn: boolean
  isOpponentTurn: boolean
  log: string
  gameOver: boolean
  outcome: string
  deckCount: number | null
  playerTurnHandler: (playerHandEvent: MouseEvent) => void
  playerResponseHandler: (hasCard: boolean) => void
}

const Game: Component<props> = props => (
  <div class="game">
    <Hand heading="Opponent Hand" hand={props.opponentHand} />
    <div class="game__console">
      <Show
        when={!props.gameOver}
        fallback={
          <GameOver
            outcome={props.outcome}
            playerPairsCount={props.playerPairsCount}
            opponentPairsCount={props.opponentPairsCount}
            deckCount={props.deckCount}
          />
        }>
        {props.log}
        <Show when={props.isOpponentTurn} fallback={null}>
          <Actions
            class="game__actions"
            buttonClass="game__button"
            actions={[
              {
                name: "yes",
                onclick: () => props.playerResponseHandler(true),
              },
              {
                name: "no",
                onclick: () => props.playerResponseHandler(false),
              },
            ]}
          />
        </Show>
      </Show>
    </div>
    <Hand
      heading="Your Hand"
      hand={props.playerHand}
      isPlayer={true}
      isPlayerTurn={props.isPlayerTurn}
      playerTurnHandler={props.playerTurnHandler}
    />
  </div>
)

export default Game
