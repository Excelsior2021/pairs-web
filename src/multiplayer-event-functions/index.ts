import type {
  playerRequest,
  playerResponse as playerResponseType,
  playerTurn as playerTurnType,
} from "@types"

export const playerTurn: playerTurnType = (
  chosenCard,
  player,
  playerID,
  handleAction,
  Action
) => {
  const eventTarget = chosenCard.target as HTMLImageElement

  for (const card of player.hand)
    if (card.id === eventTarget.id) {
      handleAction({
        type: Action.PLAYER_REQUEST,
        playerRequest: { card, playerID },
      })
      break
    }
}

export const playerResponse: playerResponseType = (
  hasCard,
  opponentRequest,
  player,
  playerID,
  handleAction,
  Action
) => {
  const { card: opponentRequestCard } = opponentRequest
  let log
  let playerCard: playerRequest

  if (hasCard) {
    for (const card of player.hand) {
      if (card.value === opponentRequestCard.value) {
        log = "It's your opponent's turn again."
        playerCard = { playerID, card }
        handleAction({
          type: Action.PLAYER_MATCH,
          playerCard,
          opponentRequest,
          log,
        })
        return
      }
    }
    log = `Are you sure? Do you have a ${opponentRequestCard.value}?`
    //Used just to log
    handleAction({
      type: Action.PLAYER_RESPONSE_MESSAGE,
      log,
    })
  } else {
    for (const card of player.hand) {
      if (card.value === opponentRequestCard.value) {
        log = `Are you sure? Do you have a ${opponentRequestCard.value}?`
        //Used just to log
        handleAction({
          type: Action.PLAYER_RESPONSE_MESSAGE,
          log,
        })
        return
      }
    }
    log = "Your opponent must now deal a card from the deck."
    handleAction({
      type: Action.NO_PLAYER_MATCH,
      opponentRequest,
      log,
    })
  }
}
