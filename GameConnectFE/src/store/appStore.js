import { createStore } from './store.js'

const initialState = {
  token: undefined,
}
const appStore = createStore(initialState)

export { appStore }
