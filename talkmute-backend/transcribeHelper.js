const axios = require("axios");
const fs = require("fs");

/**
 * Sends audio to the Python API for transcription.
 * @param {string} filePath - The path to the audio file.
 * @returns {Promise<string>} - The transcribed text.
 */
const transcribeSpeech = async (filePath) => {
  try {
    // Read the audio file and convert it to base64
    const audio = fs.readFileSync(filePath, { encoding: "base64" });

    // Make a POST request to the Python API
    const response = await axios.post("http://localhost:5001/transcribe", {
      audio: audio, // Send base64-encoded audio
    });

    // Return the transcribed text
    return response.data.text;
  } catch (error) {
    console.error("Error in transcribeSpeech:", error.message);
    throw error;
  }
};

// Export the function
module.exports = { transcribeSpeech };
