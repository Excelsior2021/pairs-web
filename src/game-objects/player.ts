import { GameAction, OpponentOutput, PlayerOutput } from "@enums"

import type { Deck, Game, Opponent } from "@game-objects"
import type { card, dispatchActionType } from "@types"

export class Player {
  hand: card[]
  pairs: card[]
  chosenCard: card | null
  dispatchAction: dispatchActionType

  constructor(dispatchAction: dispatchActionType) {
    this.hand = []
    this.pairs = []
    this.chosenCard = null
    this.dispatchAction = dispatchAction
  }

  match(game: Game, opponent: Opponent) {
    if (this.chosenCard) {
      for (const card of opponent.hand) {
        if (card.value === this.chosenCard.value) {
          this.pairs.push(card)
          opponent.hand.splice(opponent.hand.indexOf(card), 1)

          for (const card of this.hand) {
            if (this.chosenCard!.id === card.id) {
              this.pairs.push(card)
              this.hand.splice(this.hand.indexOf(card), 1)
              game.updateUI(true)
              this.dispatchAction({ action: GameAction.GAME_LOG, log: "" })
              this.chosenCard = null
              return PlayerOutput.OpponentMatch
            }
          }
        }
      }
      return PlayerOutput.NoOpponentMatch
    }
  }

  dealt(game: Game, deck: Deck) {
    const dealtCard = deck.deck.pop()

    if (this.chosenCard && dealtCard) {
      if (this.chosenCard.value === dealtCard.value) {
        this.pairs.push(dealtCard)
        for (const card of this.hand) {
          if (this.chosenCard.id === card.id) {
            this.pairs.push(card)
            this.hand.splice(this.hand.indexOf(card), 1)
            game.updateUI(true)
            this.dispatchAction({ action: GameAction.GAME_LOG, log: "" })
            return PlayerOutput.DeckMatch
          }
        }
      }

      this.chosenCard = null

      for (const card of this.hand) {
        if (dealtCard.value === card.value) {
          this.pairs.push(dealtCard)
          this.pairs.push(card)
          this.hand.splice(this.hand.indexOf(card), 1)
          game.updateUI()
          return PlayerOutput.HandMatch
        }
      }

      this.hand.push(dealtCard)
      game.updateUI()
      return PlayerOutput.NoMatch
    }
  }

  turn(playerChosenCardEvent: MouseEvent, game: Game, opponent: Opponent) {
    const eventTarget = playerChosenCardEvent.target as HTMLImageElement
    for (const card of this.hand)
      if (card.id === eventTarget.id) this.chosenCard = card

    const playerOutput = this.match(game, opponent)

    this.dispatchAction({
      action: GameAction.PLAYER_ACTION,
      playerOutput,
      player: this,
    })

    const gameOver = game.end()

    if (!gameOver) {
      if (playerOutput === PlayerOutput.NoOpponentMatch) {
        const log =
          "You didn't match with any card in your opponent's hand. Please deal a card from the deck."
        game.updateUI(false, false, true)
        this.dispatchAction({ action: GameAction.GAME_LOG, log })
      }
    }
  }

  response(hasCard: boolean, game: Game, deck: Deck, opponent: Opponent) {
    const opponentTurn = () => opponent.turn(game)

    let log

    if (opponent.request) {
      if (hasCard) {
        for (const card of this.hand) {
          if (card.value === opponent.request.value) {
            opponent.pairs.push(opponent.request)
            opponent.hand.splice(opponent.hand.indexOf(opponent.request), 1)

            opponent.pairs.push(card)
            this.hand.splice(this.hand.indexOf(card), 1)

            game.updateUI()

            log = "It's your opponent's turn again."
            this.dispatchAction({ action: GameAction.GAME_LOG, log })
            setTimeout(opponentTurn, 2000)
            return
          }
        }
        log = `Are you sure? Do you have a ${opponent.request.value}?`

        this.dispatchAction({
          action: GameAction.GAME_LOG,
          log,
        })
        return
      }

      if (!hasCard) {
        for (const card of this.hand) {
          if (card.value === opponent.request.value) {
            log = `Are you sure? Do you have a ${opponent.request.value}?`

            this.dispatchAction({
              action: GameAction.GAME_LOG,
              log,
            })
            return
          }
        }

        const opponentOutput = opponent.dealt(game, deck)

        if (opponentOutput === OpponentOutput.DeckMatch) {
          game.updateUI()
          log =
            "Your opponent has dealt a card from the deck and matched with the dealt card. It's your opponent's turn again."

          this.dispatchAction({ action: GameAction.GAME_LOG, log })
          setTimeout(opponentTurn, 2000)
        }
        if (opponentOutput === OpponentOutput.HandMatch) {
          log =
            "Your opponent has dealt a card from the deck. They didn't match with the dealt card but they had a hand match. It's your turn."
        }
        if (opponentOutput === OpponentOutput.NoMatch) {
          log =
            "Your opponent has dealt a card from the deck and added it to their hand. There were no matches. It's your turn."
        }
      }
    }

    game.updateUI(true, false)
    this.dispatchAction({ action: GameAction.GAME_LOG, log })
  }
}
