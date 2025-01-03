import React,{useState} from 'react';
import Routing from './Routing';


const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  return (
    <div>
      <Routing />
      
    
    </div>
  

  );
};

export default App;
