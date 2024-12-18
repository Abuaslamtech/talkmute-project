const express = require("express");
const { transcribeSpeech, translateTextToSign } = require("./controllers");

const router = express.Router();

router.post("/transcribe", transcribeSpeech);
router.post("/translate", translateTextToSign);

module.exports = router;
