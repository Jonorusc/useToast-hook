import { create } from 'zustand'

type POSITION = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export interface ToastData {
  profile?: {
    picture: string
    name: string
  }
  redirect?: string
  title?: string
  message: string
}

export type Toast = {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  position: POSITION
  timeout: number
  remainingTime: number
  startTime: number
  data: ToastData
  hovered: boolean
  timerId?: NodeJS.Timeout
}

export type ToastProps = {
  toasts: Toast[]
  show: boolean
  addToast: (toast: Toast) => void
  removeToast: (id: number) => void
  pauseToast: (id: number) => void
  resumeToast: (id: number) => void
}

export const useToast = create<ToastProps>((set, get) => ({
  toasts: [],
  show: false,
  addToast: (toast) => {
    toast.hovered = false
    toast.remainingTime = toast.timeout
    toast.startTime = Date.now()
    set((state) => ({ toasts: [...state.toasts, toast], show: true }))

    toast.timerId = setTimeout(() => {
      if (!toast.hovered) {
        get().removeToast(toast.id)
      }
    }, toast.timeout)
  },
  removeToast: (id: number) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
      show: state.toasts.length > 1
    }))
  },
  pauseToast: (id: number) => {
    set((state) => {
      const toast = state.toasts.find((toast) => toast.id === id)
      if (toast) {
        toast.hovered = true
        if (toast.timerId) {
          clearTimeout(toast.timerId)
          toast.remainingTime -= Date.now() - toast.startTime
        }
      }
      return { toasts: [...state.toasts] }
    })
  },
  resumeToast: (id: number) => {
    set((state) => {
      const toast = state.toasts.find((toast) => toast.id === id)
      if (toast) {
        toast.hovered = false
        toast.startTime = Date.now()
        toast.timerId = setTimeout(() => {
          if (!toast.hovered) {
            get().removeToast(toast.id)
          }
        }, toast.remainingTime)
      }
      return { toasts: [...state.toasts] }
    })
  }
}))
