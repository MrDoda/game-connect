import { useEffect, useMemo, useState } from 'react'

export function useStore(store, key) {
  const selector = useMemo(() => (state) => (key ? state[key] : state), [key])

  const [state, setState] = useState(selector(store.getState()))

  useEffect(
    () => store.subscribe((state) => setState(selector(state))),
    [selector, store]
  )

  return state
}
