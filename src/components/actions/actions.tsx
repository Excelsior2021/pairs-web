import { Component, For } from "solid-js"

type props = {
  class: string
  buttonClass: string
  actions: {
    name: string
    onclick: () => void
    class?: string
    disabled?: () => boolean
  }[]
}

const Actions: Component<props> = props => (
  <div class={props.class}>
    <For each={props.actions}>
      {action => (
        <button
          class={`${props.buttonClass} ${action.class}`}
          onclick={action.onclick}
          disabled={action.disabled && action.disabled()}>
          {action.name}
        </button>
      )}
    </For>
  </div>
)

export default Actions
