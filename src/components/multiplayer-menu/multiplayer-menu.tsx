import { createSignal, type Setter, type Component } from "solid-js"
import { io } from "socket.io-client"
import { createSessionHandler } from "./component-lib"
import { GameMode, PlayerID, SessionType } from "@enums"
import Actions from "@components/actions/actions"
import "./multiplayer-menu.scss"

import type { multiplayerConfig } from "@types"

type props = {
  multiplayerConfig: multiplayerConfig
  setGameMode: Setter<GameMode>
  setJoinGameMenu: Setter<boolean>
  setMultiplayerMenu: Setter<boolean>
  terminateSession: (sessionType: SessionType) => void
}

const MultiplayerMenu: Component<props> = props => {
  const [serverConnected, setServerConnected] = createSignal<false | null>(null)
  const [connecting, setConnecting] = createSignal(false)

  return (
    <div class="multiplayer-menu" data-testid="multiplayer menu">
      <h2 class="multiplayer-menu__heading">multiplayer</h2>
      <Actions
        class="multiplayer-menu__actions"
        buttonClass="multiplayer-menu__button"
        actions={[
          {
            name: "create session",
            onclick: () =>
              createSessionHandler(
                io,
                props.multiplayerConfig,
                props.setGameMode,
                props.setMultiplayerMenu,
                setConnecting,
                setServerConnected,
                GameMode,
                PlayerID
              ),
            disabled: () => connecting(),
          },
          {
            name: "join session",
            onclick: () => {
              props.terminateSession(SessionType.Create)
              props.setJoinGameMenu(true)
            },
          },
          {
            name: "←",
            onclick: () => props.terminateSession(SessionType.Create),
          },
        ]}
      />
      {connecting() && (
        <p class="multiplayer-menu__text">Creating session...</p>
      )}
      {serverConnected() === false && (
        <p class="multiplayer-menu__text">
          There seems to be an issue connecting to the server. Please try again.
        </p>
      )}
    </div>
  )
}

export default MultiplayerMenu
