import { createConnectedStore } from 'undux'

export default createConnectedStore({
  authToken: '',
  themeId: 0,
  themeBackgroundId: 0,
  userId: 0,
  user: 'Tomek Adamczyk',
})
