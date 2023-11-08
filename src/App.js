import React from 'react';
import './App.css';
import Menubar from "./components/Menubar";

const port = process.env.port || 8080;

function App() {
  return (
    <div>
      <Menubar /> 
    </div>
  );
}

export default App;
