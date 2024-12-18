const { supabase } = require("./config");

const transcribeSpeech = async (req, res) => {
  try {
    const { audio } = req.body; // Expect base64 audio
    // Logic for speech-to-text using APIs like Google Speech-to-Text
    const transcription = "Sample text transcription"; // Replace with actual API result
    res.status(200).json({ text: transcription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const signLanguageDataset = {
  hello: "path/to/hello-sign.gif",
  world: "path/to/world-sign.gif",
};

const translateTextToSign = (req, res) => {
  try {
    const { text } = req.body;
    const words = text.split(" ");
    const signLanguageData = words.map(
      (word) => signLanguageDataset[word.toLowerCase()] || null
    );

    res.status(200).json({ signLanguage: signLanguageData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { transcribeSpeech, translateTextToSign };
