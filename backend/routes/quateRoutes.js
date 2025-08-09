const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const { authMiddleware } = require("../middleware/AuthMiddleware");
const router = express.Router();
const path = require('path')

const upload = multer({ dest: "uploads/" });

router.post(
  "/quate",
  authMiddleware,
  upload.single("image"),
  (req, res, next) => {
    const imagePath = req.file.path;

    
    const pythonPath = path.join("./", "venv", "Scripts", "python.exe");
    
    const python = spawn(pythonPath, ["quate_generator.py", imagePath]);
    const pythonVersion = spawn(pythonPath, [
      "-c",
      "import sys; print(sys.executable)",
    ]);

    pythonVersion.stdout.on("data", (data) => {
      console.log("Python being used:", data.toString());
    });

    let result = "";
    python.stdout.on("data", (data) => (result += data.toString()));
    python.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    python.on("error", (err) => {
      console.error(`Failed to start Python process: ${err}`);
      if (!res.headersSent) {
        res.status(500).json({ error: "AI processing failed" });
      }
    });

    python.on("close", () => {
      if (!res.headersSent) {
        res.status(200).json({ quate: result.trim() });
      }
    }); //   res.status(200).json({ message: "file received", imagePath });
  }
);

module.exports = router;
