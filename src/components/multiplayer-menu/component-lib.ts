import type { createGameHandler as createGameHandlerType } from "@types"

export const createSessionHandler: createGameHandlerType = async (
  io,
  multiplayerConfig,
  setGameMode,
  setMultiplayerMenu,
  setConnecting,
  setServerConnected,
  GameMode,
  PlayerID
) => {
  setConnecting(true)
  setServerConnected(null)

  const socket = io(import.meta.env.VITE_SERVER_DOMAIN, {
    reconnectionAttempts: 4,
  })

  //set multiplayerConfig.socket in handler scope in case of the need to terminate
  multiplayerConfig.socket = socket

  socket.on("connect", () => {
    setServerConnected(null)
    setConnecting(false)
    const sessionID = Math.floor(Math.random() * 10 ** 4)
      .toString()
      .padStart(4, "0")

    multiplayerConfig.sessionID = sessionID
    multiplayerConfig.playerID = PlayerID.P1

    socket.emit("create_session", sessionID)

    setMultiplayerMenu(false)
    setGameMode(GameMode.Multiplayer)
  })

  socket.io.on("reconnect_failed", () => {
    setConnecting(false)
    setServerConnected(false)
    socket.disconnect()
  })
}
