import React from 'react';
import './App.css';
import Menubar from "./components/Menubar";



function App() {
  const port = process.env.port || 8080;
  return (
    <div>
      <Menubar /> 
    </div>
  );
}

export default App;
