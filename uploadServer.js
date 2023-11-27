import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = 3002;

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const staticFiles = path.join(__dirname, "client/build");
const uploadPath = path.join(__dirname, "uploads/files");

app.use(cors());
app.use(express.json());
app.use(express.static(staticFiles));

//Route pour servir l'application React
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Configuration du stockage des fichiers avec Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(
      null,
      `${file.originalname.split(".")[0]}-${new Date(Date.now())
        .toJSON()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("_")}${ext}`
    );
  },
});

const upload = multer({ storage: storage });

app.post("/filesUpload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

app.get("/fileNames", (req, res) => {
  console.log("madkhelch");
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error("Erreur lors de la lecture du répertoire :", err);
      return;
    }

    const fileNames = files.map((file) => {
      return file; // Vous pouvez aussi inclure le chemin complet : return `${directoryPath}/${file}`;
    });

    console.log("Noms des fichiers dans le répertoire uploads :", fileNames);

    res.send(fileNames);
    // Utilisez fileNames comme nécessaire, stockez-le dans un tableau, etc.
  });
  // `req.file` contient les informations sur le fichier téléchargé
});

app.listen(port, () => {
  console.log(`front API server listening on port ${port}`);
});
