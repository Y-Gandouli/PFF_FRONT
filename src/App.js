import React from "react";
import "./App.css";
import Menubar from "./components/Menubar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./components/Client";
import Home from "./components/Home";
import FilesUpload from "./components/FilesUpload";

function App() {
  // const port = process.env.port || 8080;
  return (
    <div>
      <Menubar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientsManagement" element={<Client />} />
          <Route path="/filesUpload" element={<FilesUpload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
