import React from "react";
import "./App.css";
import Menubar from "./components/Menubar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./components/Client";
import Home from "./components/Home";
import FilesUpload from "./components/FilesUpload";
<<<<<<< HEAD
import Contact from "./components/contact";
=======
import { CssBaseline } from "@mui/material";
>>>>>>> 6b52924 (add material UI package)

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
