import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive" | "success" | "warning" | "info"
  duration?: number
  icon?: string
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, customDelay?: number) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, customDelay || TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Enhanced toast styling helper
const getToastStyles = (variant?: string) => {
  const baseStyles = "fixed top-4 right-4 z-50 max-w-sm w-full rounded-lg border shadow-lg backdrop-blur-sm p-4 animate-in slide-in-from-right-full duration-300"
  
  switch (variant) {
    case "success":
      return `${baseStyles} bg-green-50 border-green-200 text-green-800`
    case "destructive":
      return `${baseStyles} bg-red-50 border-red-200 text-red-800`
    case "warning":
      return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`
    case "info":
      return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`
    default:
      return `${baseStyles} bg-white border-gray-200 text-gray-800`
  }
}

// Default icons for different variants
const getDefaultIcon = (variant?: string): string => {
  switch (variant) {
    case "success":
      return "✅"
    case "destructive":
      return "🚨"
    case "warning":
      return "⚠️"
    case "info":
      return "ℹ️"
    default:
      return "📢"
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        const toast = state.toasts.find(t => t.id === toastId)
        addToRemoveQueue(toastId, toast?.duration)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id, toast.duration)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ duration = TOAST_REMOVE_DELAY, variant, icon, ...props }: Toast) {
  const id = genId()

  // Enhanced toast with better styling
  const enhancedToast = {
    ...props,
    id,
    duration,
    variant: variant || "default",
    icon: icon || getDefaultIcon(variant),
    className: getToastStyles(variant),
    open: true,
    onOpenChange: (open: boolean) => {
      if (!open) dismiss()
    },
  }

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
    
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: enhancedToast,
  })

  // Auto dismiss with custom duration
  setTimeout(() => {
    dismiss()
  }, duration)

  return {
    id: id,
    dismiss,
    update,
  }
}

// Convenience methods for different toast types
toast.success = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'success' })

toast.error = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'destructive' })

toast.warning = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'warning' })

toast.info = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'info' })

// Enhanced toast with custom styling
toast.custom = (props: Toast & { className?: string }) => {
  const { className, ...restProps } = props
  return toast({
    ...restProps,
    className: className ? `${getToastStyles(props.variant)} ${className}` : undefined
  })
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }