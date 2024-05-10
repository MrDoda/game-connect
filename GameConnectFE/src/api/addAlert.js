import { appStore } from '../store/appStore.js'

export const addAlert = ({ key, message }) => {
  appStore.setState({
    alerts: { ...appStore.getState().alerts, [key]: message },
  })
}
