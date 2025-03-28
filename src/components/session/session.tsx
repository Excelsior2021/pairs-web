import { createSignal, Show, type Component, type Setter } from "solid-js"
import { createStore, reconcile } from "solid-js/store"
import { deck } from "@assets"
import Game from "@components/game/game"
import Sidebar from "@components/sidebar/sidebar"
import CreateGame from "@components/create-game/create-game"
import PairsModal from "@components/pairs-modal/pairs-modal"
import QuitGameModal from "@components/quit-game-modal/quit-game-modal"
import PlayerModal from "@components/player-modal/player-modal"
import { GameController } from "@singleplayer-game-controller"
import { playerResponse, playerTurn } from "@multiplayer-event-functions"
import { singlePlayerReducer } from "./single-player-lib"
import { multiplayerReducer, startSession } from "./multiplayer-lib"
import {
  Action,
  GameMode,
  PlayerModalHeading,
  PlayerModalSubHeading,
  type PlayerID,
} from "@enums"
import type {
  action,
  playerRequest,
  multiplayerConfig,
  sessionState,
} from "@types"

import "@components/session/session.scss"

import type { Socket } from "socket.io-client"

type props = {
  multiplayerConfig: multiplayerConfig
  gameMode: GameMode
  setGameMode: Setter<null>
  setShowInstructions: Setter<boolean>
}

const Session: Component<props> = props => {
  const { socket, playerID, sessionID } = props.multiplayerConfig
  const initialSessionState = {
    player: { hand: [], pairs: [] },
    opponent: { hand: [], pairs: [] },
    isPlayerTurn: false,
    isOpponentTurn: false,
    playerOutput: null,
    log: "",
    outcome: "",
    gameOver: false,
    isDealFromDeck: false,
    deckCount: null,
    gameStartedMultiplayer: false,
    playerTurn: null,
    showPlayerModal: false,
    playerModalHeading: null,
    playerModalSubHeading: null,
    playerModalText: "",
    playerModalCards: [],
    opponentRequest: null,
  } as sessionState

  const [showPairsModal, setShowPairsModal] = createSignal(false)
  const [showQuitGameModal, setShowQuitGameModal] = createSignal(false)
  const [sessionState, setState] = createStore(initialSessionState)

  let handleAction: (action: action) => void
  let playerTurnHandler: (playerHandEvent: MouseEvent) => void
  let playerResponseHandler: (hasCard: boolean) => void
  let playerDealsHandler: (() => void) | null
  let playerDisconnectHandler: (() => void) | undefined
  const closePlayerModalHandler = () =>
    setState({
      showPlayerModal: false,
    })

  if (props.gameMode === GameMode.SinglePlayer) {
    handleAction = (action: action) =>
      singlePlayerReducer(action, setState, reconcile)

    const game = new GameController(deck, handleAction)

    const log =
      "The cards have been dealt. Any initial pair of cards have been added to your Pairs. Please select a card from your hand to request a match with your this.opponent."

    game.start(log)

    playerTurnHandler = game.playerTurnHandler
    playerResponseHandler = game.playerResponseHandler
    playerDealsHandler = game.playerDealsHandler
  }

  if (props.gameMode === GameMode.Multiplayer) {
    handleAction = (action: action) =>
      multiplayerReducer(
        action,
        socket as Socket,
        playerID as PlayerID,
        sessionID,
        setState,
        reconcile
      )

    playerTurnHandler = chosenCard =>
      playerTurn(
        chosenCard,
        sessionState.player,
        playerID as PlayerID,
        handleAction,
        Action
      )

    playerResponseHandler = hasCard =>
      playerResponse(
        hasCard,
        sessionState.opponentRequest as playerRequest,
        sessionState.player,
        playerID as PlayerID,
        handleAction,
        Action
      )

    playerDealsHandler = () =>
      handleAction({
        type: Action.PLAYER_DEALT,
        playerRequest: sessionState.playerRequest,
      })

    playerDisconnectHandler = () => socket?.disconnect()

    if (socket) startSession(socket, handleAction)
  }

  return (
    <div class="session" data-testid="session">
      <Show
        when={
          props.gameMode === GameMode.SinglePlayer ||
          sessionState.gameStartedMultiplayer
        }
        fallback={<CreateGame sessionID={sessionID} />}>
        <Game
          playerHand={sessionState.player.hand}
          opponentHand={sessionState.opponent.hand}
          playerPairsCount={sessionState.player.pairs.length}
          opponentPairsCount={sessionState.opponent.pairs.length}
          isPlayerTurn={sessionState.isPlayerTurn}
          isOpponentTurn={sessionState.isOpponentTurn}
          log={sessionState.log}
          gameOver={sessionState.gameOver}
          outcome={sessionState.outcome}
          deckCount={sessionState.deckCount}
          playerTurnHandler={playerTurnHandler!}
          playerResponseHandler={playerResponseHandler!}
        />
        <PlayerModal
          showPlayerModal={sessionState.showPlayerModal}
          playerModalHeading={
            sessionState.playerModalHeading as PlayerModalHeading
          }
          playerModalSubHeading={
            sessionState.playerModalSubHeading as PlayerModalSubHeading
          }
          playerModalText={sessionState.playerModalText}
          playerModalCards={sessionState.playerModalCards}
          closePlayerModalHandler={closePlayerModalHandler}
        />
        <PairsModal
          playersPairs={[
            {
              id: "player",
              heading: `Your Pairs (${sessionState.player.pairs.length})`,
              pairs: sessionState.player.pairs,
            },
            {
              id: "opponent",
              heading: `Opponent's Pairs (${sessionState.opponent.pairs.length})`,
              pairs: sessionState.opponent.pairs,
            },
          ]}
          showPairsModal={showPairsModal()}
          setShowPairsModal={setShowPairsModal}
        />
      </Show>
      <Sidebar
        isDealFromDeck={sessionState.isDealFromDeck}
        gameMode={props.gameMode}
        playerDealsHandler={playerDealsHandler!}
        setShowPairsModal={setShowPairsModal}
        setShowQuitGameModal={setShowQuitGameModal}
        setShowInstructions={props.setShowInstructions}
      />
      <QuitGameModal
        multiplayerConfig={props.multiplayerConfig}
        setGameMode={props.setGameMode}
        playerDisconnectHandler={playerDisconnectHandler}
        showQuitGameModal={showQuitGameModal()}
        setShowQuitGameModal={setShowQuitGameModal}
      />
    </div>
  )
}

export default Session
