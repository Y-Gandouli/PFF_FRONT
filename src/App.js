import React from "react";
import "./App.css";
import Menubar from "./components/Menubar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./components/Client.jsx";
import Home from "./components/Home.jsx";
import FilesUpload from "./components/FilesUpload.jsx";

import Contact from "./components/contact.jsx";

import { CssBaseline } from "@mui/material";

function App() {
  return (
    <div>
      <CssBaseline />
      <Menubar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientsManagement" element={<Client />} />
          <Route path="/filesUpload" element={<FilesUpload />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
