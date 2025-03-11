import {
  PlayerModalHeading,
  PlayerModalSubHeading,
  PlayerOutput,
  Action,
} from "@enums"

import type { action, sessionState } from "@types"
import type { SetStoreFunction } from "solid-js/store"

export const singlePlayerReducer = (
  action: action,
  setState: SetStoreFunction<sessionState>,
  reconcile
) => {
  switch (action.type) {
    case Action.UPDATE: {
      setState({
        log: action.log,
        isOpponentTurn: action.isOpponentTurn,
        isPlayerTurn: action.isPlayerTurn,
        isDealFromDeck: action.isDealFromDeck,
        deckCount: action.deckCount,
      })
      setState("player", "hand", reconcile(action.player!.hand))
      setState("player", "pairs", reconcile(action.player!.pairs))

      setState("opponent", "hand", reconcile(action.opponent!.hand))
      setState("opponent", "pairs", reconcile(action.opponent!.pairs))

      break
    }
    case Action.PLAYER_MODAL: {
      let playerModalHeading = PlayerModalHeading.Match
      let playerModalSubHeading = PlayerModalSubHeading.None
      let playerModalText: string = ""
      let playerModalCards = action.player!.pairs.slice(-2)
      switch (action.playerOutput) {
        case PlayerOutput.OpponentMatch: {
          playerModalSubHeading = PlayerModalSubHeading.Opponent
          playerModalText =
            "You have a match! Both cards will be added to your pairs. It's your turn again!"
          break
        }
        case PlayerOutput.DeckMatch: {
          playerModalSubHeading = PlayerModalSubHeading.Deck
          playerModalText =
            "The value of the card you chose matches the value of the card you dealt from the deck! Both cards will be added to your pairs. It's your turn again!"
          break
        }
        case PlayerOutput.HandMatch: {
          playerModalSubHeading = PlayerModalSubHeading.Player
          playerModalText =
            "The value of the card you chose didn't match with the value of the dealt card but you had another match in your hand, both cards will be added to your pairs. It's your opponent's turn."
          break
        }
        case PlayerOutput.NoMatch: {
          playerModalHeading = PlayerModalHeading.NoMatch
          playerModalText =
            "No matches, the dealt card has been added to your hand. It's your opponent's turn."
          playerModalCards = action.player!.hand.slice(-1)
          break
        }
      }
      setState({
        showPlayerModal: true,
        playerOutput: action.playerOutput,
        playerModalHeading,
        playerModalSubHeading,
        playerModalText,
        playerModalCards,
      })
      break
    }
    case Action.GAME_OVER: {
      setState({
        gameOver: true,
        log: "",
        outcome: action.outcome,
        deckCount: action.deckCount,
      })
      break
    }
  }
}
