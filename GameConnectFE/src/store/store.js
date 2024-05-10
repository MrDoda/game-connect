export function createStore(initialState) {
  let state = initialState
  const listeners = new Set()

  return {
    getState: () => state,
    setState: (newState) => {
      if (typeof newState === 'function') {
        if (
          typeof state === 'object' &&
          state !== null &&
          !Array.isArray(state)
        ) {
          state = { ...state, ...newState(state) }
        } else {
          state = newState(state)
        }
      } else if (
        typeof state === 'object' &&
        state !== null &&
        !Array.isArray(state)
      ) {
        state = { ...state, ...newState }
      } else {
        state = newState
      }
      listeners.forEach((listener) => listener(state))
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}
