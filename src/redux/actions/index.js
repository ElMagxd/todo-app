export const updateUserInfo = newData => {
   return {
      type: 'USER_UPDATE',
      payload: newData
   }
}

export const setUserData = newData => {
   return {
      type: 'USERDATA_UPDATE',
      payload: newData
   }
}

export const setCurrentList = newData => {
   return {
      type: 'UPDATE_CURRENTLIST',
      payload: newData
   }
}