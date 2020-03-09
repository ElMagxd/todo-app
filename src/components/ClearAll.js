import React from 'react';

const ClearAll = props => {
   const clearAllData = () => {
      localStorage.clear();
      const newState = props.setState;
      newState('[]');
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