const userDataReducer = (state = null, action) => {
   switch(action.type) {
      case 'USERDATA_UPDATE':
         return action.payload;
      default:
         return state;
   }
}

export default userDataReducer;