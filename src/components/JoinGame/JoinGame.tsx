import { Component, createSignal } from "solid-js"
import {
  setJoinGame,
  setMultiplayerSessionStarted,
  setMultiplayerMenu,
  setSocket,
  socket,
} from "../GameScreen/GameScreen"
import { dispatchGameAction } from "../MultiplayerSession/MultiplayerSession"
import { io } from "socket.io-client"
import { GameAction } from "../../types/enums"
import "./JoinGame.scss"

const JoinGame: Component = () => {
  const [sessionID, setSessionID] = createSignal("")
  const [sessionIDNotValid, setSessionIDNotValid] = createSignal(false)
  const [noSessionExists, setNoSessionExists] = createSignal(false)
  const [serverConnected, setServerConnected] = createSignal<boolean | null>(
    null
  )

  const joinGameHandler = async (sessionID: string) => {
    if (!socket()) setSocket(io(import.meta.env.VITE_SERVER_URL))

    const socketVar = socket()

    const interval = setInterval(() => {
      if (socketVar) {
        if (!socketVar.connected) {
          setServerConnected(false)
          return
        }
        if (socketVar.connected) {
          setSessionIDNotValid(false)
          setNoSessionExists(false)
          setServerConnected(true)

          if (!sessionID) {
            setSessionIDNotValid(true)
            clearInterval(interval)
            return
          }

          socketVar.emit("join_session", sessionID)

          socketVar.on("no-sessionID", () => setNoSessionExists(true))

          socketVar.on("sessionID-exists", () => {
            dispatchGameAction({ type: GameAction.JOIN_SESSION, sessionID })
            setJoinGame(false)
            setMultiplayerSessionStarted(true)
          })

          clearInterval(interval)
          return
        }
      }
    }, 100)
  }

  return (
    <div class="join-game">
      <h2 class="join-game__heading">Join a Game Session</h2>
      <p class="join-game__text">
        Please enter the session ID from your opponent below
      </p>
      <input
        class="join-game__input"
        type="text"
        placeholder="session ID"
        maxlength="4"
        value={sessionID()}
        onchange={event => setSessionID(event.currentTarget.value)}
        aria-label="session id"
      />
      {sessionIDNotValid() && (
        <p class="join-game__text join-game__text--error">
          Please enter a valid session ID.
        </p>
      )}
      {noSessionExists() && (
        <p class="join-game__text join-game__text--error">
          This session does not exist. Please check the session ID is correct.
        </p>
      )}
      {serverConnected() === false && (
        <p class="join-game__text join-game__text--error">
          There seems to be an issue connecting to the server. Please check your
          internet connection or try again later.
        </p>
      )}
      <div class="join-game__actions">
        <button
          class="join-game__button"
          onclick={() => joinGameHandler(sessionID())}>
          join
        </button>
        <button
          class="join-game__button"
          onclick={() => {
            setJoinGame(false)
            setMultiplayerMenu(true)
            setSessionIDNotValid(false)
            setNoSessionExists(false)
            socket()?.disconnect
          }}>
          ←
        </button>
      </div>
    </div>
  )
}

export default JoinGame
