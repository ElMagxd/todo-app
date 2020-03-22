const currentListReducer = (state = 0, action) => {
   switch (action.type) {
      case 'UPDATE_CURRENTLIST':
         return action.payload;
      default:
         return state;
   }
}

export default currentListReducer;