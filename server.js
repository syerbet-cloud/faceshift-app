const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 FaceShift API online e rodando!");
});

app.get("/status", (req, res) => {
  res.json({ status: "ok", message: "Servidor e banco online" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

app.get("/db-status", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    const states = ["desconectado", "conectando", "conectado", "desconectando"];
    res.json({ status: states[state] });
  } catch (err) {
    res.status(500).json({ error: "Erro ao verificar o estado do banco" });
  }
});
