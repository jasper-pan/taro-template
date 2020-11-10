import React from 'react'

import Stores from './store';
import './app.scss';


 

 

const App = (props) =>{
  
  return (
    <Stores.Provider>
      {props.children}
      
    </Stores.Provider>
  )
}

export default App
