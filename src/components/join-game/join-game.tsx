import { createSignal, type Setter, type Component } from "solid-js"
import { io } from "socket.io-client"
import { joinSessionHandler } from "./component-lib"
import { GameMode, PlayerID, SessionType } from "@enums"
import Actions from "@components/actions/actions"
import "./join-game.scss"

import type { multiplayerConfig } from "@types"

type props = {
  multiplayerConfig: multiplayerConfig
  setGameMode: Setter<GameMode>
  setJoinGameMenu: Setter<boolean>
  setMultiplayerMenu: Setter<boolean>
  terminateSession: (sessionType: SessionType) => void
}

const JoinGame: Component<props> = props => {
  const [joinSessionID, setJoinSessionID] = createSignal("")
  const [sessionIDNotValid, setSessionIDNotValid] = createSignal(false)
  const [noSessionExists, setNoSessionExists] = createSignal(false)
  const [connecting, setConnecting] = createSignal(false)
  const [serverConnected, setServerConnected] = createSignal<boolean | null>(
    null
  )

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
      <Actions
        class="join-game__actions"
        buttonClass="join-game__button"
        actions={[
          {
            name: "join",
            onclick: () =>
              joinSessionHandler(
                joinSessionID(),
                io,
                props.multiplayerConfig,
                props.setGameMode,
                props.setJoinGameMenu,
                setSessionIDNotValid,
                setNoSessionExists,
                setServerConnected,
                setConnecting,
                GameMode,
                PlayerID
              ),
            disabled: () => connecting(),
          },
          {
            name: "←",
            onclick: () => {
              props.terminateSession(SessionType.Join)
            },
          },
        ]}
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
          This session does not exist. Please check that the session ID is
          correct.
        </p>
      )}
      {serverConnected() === false && (
        <p class="join-game__text join-game__text--info">
          There seems to be an issue connecting to the server. Please try again
          later.
        </p>
      )}
    </div>
  )
}

export default JoinGame
