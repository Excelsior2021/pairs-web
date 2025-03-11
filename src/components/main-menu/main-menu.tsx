import { createEffect, type Setter, type Component } from "solid-js"
import { GameMode } from "@enums"
import Actions from "@components/actions/actions"
import "./main-menu.scss"

type props = {
  setGameMode: Setter<GameMode>
  setMultiplayerMenu: Setter<boolean>
  setShowInstructions: Setter<boolean>
  appLoaded: boolean
  setAppLoaded: Setter<boolean>
}

const MainMenu: Component<props> = props => {
  createEffect(() => setTimeout(() => props.setAppLoaded(true), 500)) //delay for setTimeout, set to 500ms because animation is 500ms

  return (
    <div
      class={
        props.appLoaded ? "main-menu main-menu--no-animation" : "main-menu"
      }
      data-testid="main menu">
      <h2 class="main-menu__heading">main menu</h2>
      <Actions
        class="main-menu__actions"
        buttonClass="main-menu__button"
        actions={[
          {
            name: GameMode.SinglePlayer,
            onclick: () => props.setGameMode(GameMode.SinglePlayer),
          },
          {
            name: GameMode.Multiplayer,
            onclick: () => props.setMultiplayerMenu(true),
          },
          {
            name: "instructions",
            onclick: () => props.setShowInstructions(true),
          },
        ]}
      />
    </div>
  )
}

export default MainMenu
