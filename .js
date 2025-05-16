const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Ganti token dan chat_id sesuai milikmu
const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { name, question } = req.body;
  const text = `New QnA Submission:\nName: ${name}\nQuestion: ${question}`;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    res.json({ message: "Question sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});