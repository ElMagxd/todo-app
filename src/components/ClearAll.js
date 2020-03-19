import React from 'react';
import { useSelector } from 'react-redux';


const ClearAll = props => {
   const user = useSelector(state => state.user);

   const clearAllData = () => {
      const newState = props.setState;
      newState(user.email, { tasks: '[]' });
   }

   return (
      <button
         className="clearAll"
         onClick={clearAllData}
      >
         Clear all
      </button>
   );
};

export default ClearAll;