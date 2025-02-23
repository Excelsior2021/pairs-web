import { test, it, describe, expect, beforeEach, vi } from "vitest"
import { playerTurn, playerResponse } from "@multiplayer-event-functions"
import { Action, Suit } from "@enums"
import type { card, player, playerRequest } from "@types"

describe("multiplayer event functions", () => {
  const playerID = 1
  const handleActionMock = vi.fn()
  let player: player

  beforeEach(() => {
    vi.clearAllMocks()
    player = {
      hand: [{ id: "1_of_clubs", img: "", suit: Suit.clubs, value: 1 }],
    } as player
  })

  describe("playerTurn()", () => {
    const chosenCard = {
      target: {
        id: "1_of_clubs",
      },
    } as any

    it("dispatches game action correctly", () => {
      playerTurn(chosenCard, player, playerID, handleActionMock, Action)

      expect(handleActionMock).toBeCalledWith({
        type: Action.PLAYER_REQUEST,
        playerRequest: {
          card: { ...player.hand[0] },
          playerID,
        },
      })
    })
  })

  describe("playerResponse()", () => {
    describe("hasCard true", () => {
      const hasCard = true
      let log = "It's your opponent's turn again."

      test("player has card", () => {
        const card = { ...player.hand[0] }
        const opponentRequest = {
          card,
        } as playerRequest

        playerResponse(
          hasCard,
          opponentRequest,
          player,
          playerID,
          handleActionMock,
          Action
        )

        expect(handleActionMock).toBeCalledWith({
          type: Action.PLAYER_MATCH,
          playerCard: { playerID, card },
          opponentRequest,
          log,
        })
      })

      test("player doesn't have card", () => {
        const card = {
          id: "2_of_clubs",
          img: "",
          suit: Suit.clubs,
          value: 2,
        } as card
        log = `Are you sure? Do you have a ${card.value}?`
        const opponentRequest = {
          card,
        } as playerRequest
        playerResponse(
          hasCard,
          opponentRequest,
          player,
          playerID,
          handleActionMock,
          Action
        )

        expect(handleActionMock).toBeCalledWith({
          type: Action.PLAYER_RESPONSE_MESSAGE,
          log,
        })
      })
    })

    describe("hasCard false", () => {
      const hasCard = false

      test("player has card", () => {
        const card = { ...player.hand[0] }
        const opponentRequest = {
          card,
        } as playerRequest

        const log = `Are you sure? Do you have a ${card.value}?`
        playerResponse(
          hasCard,
          opponentRequest,
          player,
          playerID,
          handleActionMock,
          Action
        )

        expect(handleActionMock).toBeCalledWith({
          type: Action.PLAYER_RESPONSE_MESSAGE,
          log,
        })
      })

      test("player doesn't have card", () => {
        const opponentRequest = {
          card: {
            id: "2_of_clubs",
            img: "",
            suit: Suit.clubs,
            value: 2,
          },
        } as playerRequest
        const log = "Your opponent must now deal a card from the deck."
        playerResponse(
          hasCard,
          opponentRequest,
          player,
          playerID,
          handleActionMock,
          Action
        )

        expect(handleActionMock).toBeCalledWith({
          type: Action.NO_PLAYER_MATCH,
          opponentRequest,
          log,
        })
      })
    })
  })
})
