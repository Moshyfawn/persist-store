export const loadState = () => {
  try {
    const serializableState = localStorage.getItem('state')
    if (serializableState === null) {
      return undefined
    }
    return JSON.parse(serializableState)
  } catch (error) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializableState = JSON.stringify(state)

    localStorage.setItem('state', serializableState)
  } catch (error) {
    console.log(error)
  }
}
