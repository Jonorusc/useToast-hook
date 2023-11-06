# useToast Hook

The `useToast` hook is a custom hook built with [Zustand](https://github.com/pmndrs/zustand) for managing toast notifications in a React application. It provides a simple and flexible API for adding, removing, and managing toast notifications.

## Features

- Add a toast with a custom message, type, position, and timeout.
- Automatically remove a toast after a specified timeout.
- Pause the timeout when a toast is hovered over.
- Resume the timeout with the remaining time when the toast is no longer being hovered over.

## Usage

First, import the `useToast` hook:

```jsx
import { useToast } from './use-toast'
```

Then, you can use it in your components

```jsx
const YourComponent = () => {
  const { addToast } = useToast()

  const showToast = () => {
    const toast = {
      id: Date.now(), // unique id for the toast
      type: 'success',
      position: 'top-right',
      timeout: 5000, // 5 seconds
      data: {
        message: 'This is a toast message',
      }
    }

    addToast(toast)
  }

  return (
    <button onClick={showToast}>Show Toast</button>
  )
}
```

In the toast rendering component, you should add `onMouseEnter` and `onMouseLeave` event handlers to call `pauseToast` and `resumeToast` respectively:

```jsx
const ToastComponent = ({ toast }) => {
  const { removeToast, pauseToast, resumeToast } = useToast()

  return (
    <div
      onMouseEnter={() => pauseToast(toast.id)}
      onMouseLeave={() => resumeToast(toast.id)}
    >
      {toast.data.message}
      <button onClick={() => removeToast(toast.id)}>Close</button>
    </div>
  )
}
```

In this example, when the mouse enters the toast, the timeout is paused, and when the mouse leaves the toast, the timeout is resumed. The close button removes the toast immediately.

## API

The useToast hook provides the following functions:

- addToast(toast: Toast): Adds a new toast.
- removeToast(id: number): Removes a toast by id.
- pauseToast(id: number): Pauses the timeout of a toast by id.
- resumeToast(id: number): Resumes the timeout of a toast by id.

The Toast type has the following properties:

- id: number: A unique id for the toast.
- type: 'success' | 'error' | 'warning' | 'info': The type of the toast.
- position: POSITION: The position of the toast.
- timeout: number: The timeout in milliseconds after which the toast will be automatically removed.
- data: ToastData: The data for the toast, such as the message to be displayed.
- hovered: boolean: Whether the toast is being hovered over. This is managed internally by the hook.


