import { GameMode } from "@enums"

export const singlePlayerGamestate = {
  gameMode: GameMode.SinglePlayer,
  game: null,
  deck: null,
  player: null,
  opponent: null,
  playerTurnHandlerFactory: null,
  playerHandClickable: false,
  playerResponseHandlerFactory: null,
  deckHandlerFactory: null,
  deckClickable: false,
  playerChosenCardEvent: null,
  playerOutput: null,
  opponentTurn: false,
  opponentRequest: null,
  log: "",
  outcome: "",
  gameOver: false,
}

export const multiplayerGameState = {
  gameMode: GameMode.Multiplayer,
  player: null,
  opponent: null,
  deck: null,
  playerTurnHandlerFactory: null,
  playerOutput: null,
  log: "",
  outcome: "",
  socket: null,
  clientPlayer: 0,
  sessionID: "",
  gameState: null,
  opponentTurn: false,
  playerTurn: null,
  gameOver: false,
  deckClickable: false,
}