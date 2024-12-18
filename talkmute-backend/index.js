require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");

// AssemblyAI API key
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

if (!ASSEMBLYAI_API_KEY) {
  throw new Error("ASSEMBLYAI_API_KEY is not set in the environment.");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for images
app.use("/images", express.static(path.join(__dirname, "asl_images")));

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// Transcription endpoint using AssemblyAI
app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded." });
    }

    // Read the uploaded file
    const filePath = req.file.path;
    const fileStream = fs.createReadStream(filePath);

    // Upload the file to AssemblyAI
    const uploadResponse = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      fileStream,
      {
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const uploadUrl = uploadResponse.data.upload_url;

    // Request transcription
    const transcriptionResponse = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      {
        audio_url: uploadUrl,
      },
      {
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const transcriptId = transcriptionResponse.data.id;

    // Poll for transcription result
    let transcriptionStatus = "processing";
    let transcriptionResult;

    while (transcriptionStatus === "processing") {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds

      const statusResponse = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: { authorization: ASSEMBLYAI_API_KEY },
        }
      );

      transcriptionStatus = statusResponse.data.status;

      if (transcriptionStatus === "completed") {
        transcriptionResult = statusResponse.data.text;
      } else if (transcriptionStatus === "failed") {
        throw new Error("Transcription failed.");
      }
    }

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Respond with the transcription result
    res.json({
      transcribedText: transcriptionResult,
    });
  } catch (error) {
    // Clean up the file in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Transcription error:", error);

    res.status(500).json({ error: "Error during transcription." });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
  });
});

app.post("/api/translate", (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  // Split text into individual characters and words
  const characters = text.toLowerCase().split("");
  const images = [];
  const missingImages = [];
  const unsupportedChars = [];

  for (const char of characters) {
    if (char.match(/[a-z0-9]/)) {
      // Handle alphabetic and numeric characters
      const charPath = path.join(
        __dirname,
        "asl_images",
        `${char.toUpperCase()}.jpg`
      );
      if (fs.existsSync(charPath)) {
        images.push(`/images/${char.toUpperCase()}.jpg`);
      } else {
        missingImages.push(char);
      }
    } else if (char === " ") {
      // Handle space
      const spacePath = path.join(
        __dirname,
        "asl_images",
        "SPACE.jpg" // Use a specific image for space if available
      );
      if (fs.existsSync(spacePath)) {
        images.push(`/images/SPACE.jpg`);
      }
    } else if ([".", ",", "?", "!", ":", ";"].includes(char)) {
      // Handle punctuation (optional: map to specific images)
      const punctPath = path.join(
        __dirname,
        "asl_images",
        `${char}.jpg` // Example: "." -> "DOT.jpg", "," -> "COMMA.jpg"
      );
      if (fs.existsSync(punctPath)) {
        images.push(`/images/${char}.jpg`);
      } else {
        unsupportedChars.push(char);
      }
    } else {
      // Log unsupported characters
      unsupportedChars.push(char);
    }
  }

  if (images.length === 0) {
    return res.status(404).json({
      error: "No matching sign language images found.",
      missingImages: missingImages.length > 0 ? missingImages : undefined,
      unsupportedChars:
        unsupportedChars.length > 0 ? unsupportedChars : undefined,
    });
  }

  res.status(200).json({
    signLanguageImages: images,
    missingImages: missingImages.length > 0 ? missingImages : undefined,
    unsupportedChars:
      unsupportedChars.length > 0 ? unsupportedChars : undefined,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
