import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {

  try {

    const response = await fetch(process.env.AZURE_AGENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_API_KEY
      },
      body: JSON.stringify({
        message: req.body.message
      })
    });

    const data = await response.json();

    res.json({
      reply: data.output || JSON.stringify(data)
    });

  } catch(error){

    res.status(500).json({
      reply:"Error connecting to Azure AI Foundry"
    });
  }

});

app.listen(3000, () => {
  console.log("API running on port 3000");
});
