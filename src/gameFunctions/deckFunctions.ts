import playerFunctions from "./playerFunctions"
import { dispatchGameAction } from "../components/Session/Session"
import { gameDeckHandlerType } from "../types/function-types"
import { PlayerOutput } from "../types/enums"

export const gameDeckHandler: gameDeckHandlerType = (
  playerHandEvent,
  game,
  deck,
  player,
  opponent
) => {
  const playerOutput = playerFunctions.playerDealt(
    playerHandEvent,
    game,
    deck,
    player,
    opponent
  )

  dispatchGameAction({
    type: "PLAYER_ACTION",
    playerOutput,
    player,
  })

  if (
    playerOutput === PlayerOutput.HandMatch ||
    playerOutput === PlayerOutput.NoMatch
  )
    opponent.turn(
      game,
      deck,
      player,
      playerFunctions.playerTurnHandler,
      dispatchGameAction
    )

  game.end(
    deck,
    player,
    opponent,
    playerFunctions.playerTurnHandler,
    dispatchGameAction
  )
}

export default {
  gameDeckHandler,
}
