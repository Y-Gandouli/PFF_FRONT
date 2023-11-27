import React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { customFetch } from "../utilities/customFetch";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function FilesUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileNames, setFileNames] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/fileNames", {
      method: "GET",
    })
      .then((r) => {
        console.log(r);
        return r.json(); // Retournez la promesse r.json()
      })
      .then((fileNames) => {
        console.log(fileNames);
        setFileNames(fileNames);
      });
  }, []);

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:3002/filesUpload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        window.location.reload();
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        //width: "100%",
        //height: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <List
        sx={{
          "& p": { fontSize: "12px" },
          "& span": { fontSize: "20px" },
          //"& img ": { height: "20px" },
          width: "100%",
          maxWidth: 500,
          /* From https://css.glass */
          background: `rgba(232, 234, 246, 1)`,
          borderRadius: `16px`,
          boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
          backdropFilter: `blur(6.4px)`,
          border: `1px solid rgba(232, 234, 246, 0.3)`,
        }}
      >
        <ListItem>
          <PermMediaIcon fontSize="large" />
          <h1 style={{ marginLeft: "10px" }}> Files Manager</h1>
        </ListItem>
        <Divider />
        {fileNames &&
          fileNames.map((fileName, index) => {
            const parts = fileName.split("-");
            const date = parts[1].split(".")[0].split("_").join("/");
            return (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <CropOriginalIcon fontSize="large" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={parts[0]} secondary={date} />
              </ListItem>
            );
          })}
        <Divider />
        <ListItem>
          <form
            style={{
              display: "flex",
              width: "100%",
              height: "40px",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={onSubmitHandler}
          >
            {/* <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button> */}
            <input type="file" onChange={onChangeHandler} />
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              type="submit"
              disabled={!selectedFile}
            >
              Upload file
            </Button>
            {/* <button type="submit">Upload</button> */}
          </form>
        </ListItem>
      </List>
    </Box>
  );
}

export default FilesUpload;
