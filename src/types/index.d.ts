import type { Accessor, Setter } from "solid-js"
import type { Socket } from "socket.io-client"
import type { Card, Deck, Game, Player, Opponent } from "@/game-objects"
import type {
  GameAction as GameActionType,
  GameMode as GameModeType,
} from "@/enums"

export type io = (serverDomain: string) => Socket

export type connectToServer = (
  io: io,
  tTimeout: number,
  tInterval: number
) => Promise<Socket>

export type createGameHandler = (
  io: io,
  connectToServer: connectToServer,
  setSocket: Setter<Socket | null>,
  setCreateSessionID: Setter<string>,
  setMultiplayerMenu: Setter<boolean>,
  setMultiplayerSessionStarted: Setter<boolean>,
  setServerTimeout: Setter<boolean>,
  setServerConnected: Setter<boolean | null>,
  UITimer: Accessor<number>,
  setUITimer: Setter<number>,
  dispatchGameAction: dispatchGameActionType,
  GameAction: typeof GameActionType
) => void

export type joinGameHandler = (
  sessionID: string,
  io: io,
  connectToServer: connectToServer,
  setSocket: Setter<Socket | null>,
  setJoinGame: Setter<boolean>,
  setMultiplayerSessionStarted: Setter<boolean>,
  setSessionIDNotValid: Setter<boolean>,
  setNoSessionExists: Setter<boolean>,
  setServerConnected: Setter<boolean | null>,
  setLoading: Setter<boolean>,
  dispatchGameAction: dispatchGameActionType,
  GameAction: typeof GameActionType
) => void

export type terminateCreateSession = (
  socket: Socket | null,
  setMultiplayerMenu: Setter<boolean>
) => void

export type gameStateProp = {
  gameState: Accessor<gameStateType & gameStateMultiplayer>
}

export type playerRequest = {
  card: Card
  clientPlayer: number
}

export type gameStateType = {
  gameMode: typeof GameModeType
  game?: Game | null
  deck?: Deck | null
  player?: Player | null
  opponent?: Opponent | Player | null
  playerTurnHandlerFactory?: ((playerHandEvent: MouseEvent) => void) | null
  playerHandClickable?: boolean
  playerResponseHandlerFactory?: ((hasCard: boolean) => void) | null
  deckHandlerFactory?: (() => void) | null
  deckClickable: boolean
  playerOutput: number | null
  opponentTurn: boolean
  opponentRequest?: Card | null
  playerRequest?: playerRequest
  log: string
  outcome: string
  gameOver: boolean
}

export type gameStateMultiplayer = gameStateType & {
  shuffledDeck?: Card[] | null
  socket?: Socket | null
  clientPlayer?: number
  sessionID?: string | undefined
  gameState?: clientStateMutiplayer | null
  playerTurn?: number | null
  opponentRequestMultiplayer?: playerRequest | null
}

export type gameAction = {
  type: string
  game?: Game
  deck?: Deck
  player?: Player
  opponent?: Opponent
  playerTurnHandlerFactory?: (playerHandEvent: MouseEvent) => void
  playerHandClickable?: boolean
  playerResponseHandlerFactory?: (hasCard: boolean) => void
  deckHandlerFactory?: () => void
  deckClickable?: boolean
  playerOutput?: number | boolean
  opponentTurn?: boolean
  opponentRequest?: Card | null
  log?: string
  chosenCard?: Card
  opponentAsked?: Card
  outcome?: string
  gameOver?: boolean
}

export type gameActionMultiplayer = gameAction & {
  shuffledDeck?: Card[]
  playerTurnHandler?: (playerHandEvent: MouseEvent) => void
  playerCard?: playerRequest
  opponentRequestMultiplayer?: playerRequest | null
  socket?: Socket | null
  clientPlayer?: number
  sessionID?: string
  serverState?: serverStateMultiplayer
  playerTurn?: number
  player1Log?: string
  player2Log?: string
  playerRequest?: playerRequest
  requestPlayer?: number
  dealtCard?: Card
}

export type dispatchGameActionType = (
  action: gameAction | gameActionMultiplayer
) => void

type serverState = {
  shuffledDeck: Card[]
}

export type serverStateMultiplayer = serverState & {
  player1: Player
  player2: Player
}

export type clientStateMutiplayer = serverState & {
  player: Player
  opponent: Player
}

//PLAYER FUNCTIONS
export type playerTurnHandlerMultiplayerType = (
  playerHandEvent: MouseEvent,
  player: Player | null,
  clientPlayer: number,
  dispatchGAmeAction: dispatchGameActionType
) => void

export type playerResponseHandlerMultiplayerType = (
  hasCard: boolean,
  oppenentRequest: playerRequest,
  player: Player,
  clientPlayer: number,
  dispatchGAmeAction: dispatchGameActionType
) => void
