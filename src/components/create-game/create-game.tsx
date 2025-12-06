import "./create-game.scss"

import type { Component } from "solid-js"

type props = {
  sessionID: string
  serverError: string
}

const CreateGame: Component<props> = props => (
  <div class="create-game" data-testid="create game">
    <h2 class="create-game__heading">Create Game Session</h2>

    {props.serverError ? (
      <p class="create-game__text">
        There was an issue with the server. Please try again.
      </p>
    ) : (
      <>
        <p class="create-game__text">
          Share the session ID with the user you want to play with
        </p>
        <p class="create-game__text">
          session ID: <span class="create-game__id">{props.sessionID}</span>
        </p>
        <p class="create-game__text">waiting for opponent to connect...</p>
      </>
    )}
  </div>
)

export default CreateGame
