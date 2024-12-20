import { createSignal, For, type Component } from "solid-js"
import { io } from "socket.io-client"
import {
  setJoinGameMenu,
  setMultiplayerSessionStarted,
  setMultiplayerMenu,
  socket,
  setSocket,
} from "@components/game-screen/game-screen"
import { joinGameHandler } from "./component-lib"
import "./join-game.scss"

const JoinGame: Component = () => {
  const [joinSessionID, setJoinSessionID] = createSignal("")
  const [sessionIDNotValid, setSessionIDNotValid] = createSignal(false)
  const [noSessionExists, setNoSessionExists] = createSignal(false)
  const [connecting, setConnecting] = createSignal(false)
  const [serverConnected, setServerConnected] = createSignal<boolean | null>(
    null
  )

  const actions = [
    {
      name: "join",
      onclick: () =>
        joinGameHandler(
          joinSessionID(),
          io,
          setSocket,
          setJoinGameMenu,
          setMultiplayerSessionStarted,
          setSessionIDNotValid,
          setNoSessionExists,
          setServerConnected,
          setConnecting
        ),
      disabled: () => connecting(),
    },
    {
      name: "←",
      onclick: () => {
        setJoinGameMenu(false)
        setMultiplayerMenu(true)
        setSessionIDNotValid(false)
        setNoSessionExists(false)
        socket()?.disconnect()
      },
    },
  ]

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
        value={joinSessionID()}
        onchange={event => setJoinSessionID(event.currentTarget.value)}
        aria-label="session id"
      />
      {connecting() && (
        <p class="join-game__text join-game__text--info">
          Attempting to join session...
        </p>
      )}
      {sessionIDNotValid() && (
        <p class="join-game__text join-game__text--info">
          Please enter a valid session ID.
        </p>
      )}
      {noSessionExists() && (
        <p class="join-game__text join-game__text--info">
          This session does not exist. Please check the session ID is correct.
        </p>
      )}
      {serverConnected() === false && (
        <p class="join-game__text join-game__text--info">
          There seems to be an issue connecting to the server. Please try again
          later.
        </p>
      )}
      <div class="join-game__actions">
        <For each={actions}>
          {action => (
            <button
              class="join-game__button"
              onclick={action.onclick}
              disabled={action.disabled && action.disabled()}>
              {action.name}
            </button>
          )}
        </For>
      </div>
    </div>
  )
}

export default JoinGame
