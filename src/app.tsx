import {
  createSignal,
  Switch,
  Match,
  type Component,
  type Setter,
} from "solid-js"
import MainMenu from "@components/main-menu/main-menu"
import Session from "@components/session/session"
import Instructions from "@components/instructions/instructions"
import MultiplayerMenu from "@components/multiplayer-menu/multiplayer-menu"
import JoinGame from "@components/join-game/join-game"
import "./app.scss"

import type { Socket } from "socket.io-client"
import { GameMode, PlayerID, SessionType } from "@enums"

const App: Component = () => {
  const [appLoaded, setAppLoaded] = createSignal(false)
  const [gameMode, setGameMode] = createSignal<GameMode | null>(null)
  const [multiplayerMenu, setMultiplayerMenu] = createSignal(false)
  const [joinGameMenu, setJoinGameMenu] = createSignal(false)
  const [showInstructions, setShowInstructions] = createSignal(false)

  const multiplayerConfig: {
    socket: Socket | null
    sessionID: string
    playerID: PlayerID | null
  } = {
    socket: null,
    sessionID: "",
    playerID: null,
  }

  const terminateSessionHandler = (sessionType: SessionType) => {
    if (sessionType === SessionType.Create) setMultiplayerMenu(false)
    if (sessionType === SessionType.Join) {
      setJoinGameMenu(false)
      setMultiplayerMenu(true)
    }
    if (multiplayerConfig.socket) multiplayerConfig.socket.disconnect()
  }

  return (
    <div class="app" data-testid="app">
      <a
        class="app__link"
        href="https://jonathankila.vercel.app"
        target="_blank"
        rel="noreferrer">
        <h1 class="app__title">Pairs</h1>
      </a>
      <a class="counter" href="https://www.free-website-hit-counter.com">
        <img
          src="https://www.free-website-hit-counter.com/c.php?d=9&id=143227&s=5"
          alt="Free Website Hit Counter"
        />
      </a>
      <main class="app__container">
        <Switch
          fallback={
            <MainMenu
              setGameMode={setGameMode as Setter<GameMode>}
              setMultiplayerMenu={setMultiplayerMenu}
              setShowInstructions={setShowInstructions}
              appLoaded={appLoaded()}
              setAppLoaded={setAppLoaded}
            />
          }>
          <Match when={multiplayerMenu()}>
            <MultiplayerMenu
              multiplayerConfig={multiplayerConfig}
              setGameMode={setGameMode as Setter<GameMode>}
              setJoinGameMenu={setJoinGameMenu}
              setMultiplayerMenu={setMultiplayerMenu}
              terminateSession={terminateSessionHandler}
            />
          </Match>
          <Match when={joinGameMenu()}>
            <JoinGame
              multiplayerConfig={multiplayerConfig}
              setGameMode={setGameMode as Setter<GameMode>}
              setJoinGameMenu={setJoinGameMenu}
              setMultiplayerMenu={setMultiplayerMenu}
              terminateSession={terminateSessionHandler}
            />
          </Match>
          <Match when={gameMode()}>
            <Session
              multiplayerConfig={multiplayerConfig}
              gameMode={gameMode() as GameMode}
              setGameMode={setGameMode as Setter<null>}
              setShowInstructions={setShowInstructions}
            />
          </Match>
        </Switch>
        <Instructions
          showInstructions={showInstructions()}
          setShowInstructions={setShowInstructions}
        />
      </main>
    </div>
  )
}

export default App
