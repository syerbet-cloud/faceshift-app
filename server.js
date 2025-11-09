const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================
// Rotas básicas
// ============================
app.get("/", (req, res) => {
  res.send("🚀 FaceShift API online e rodando!");
});

app.get("/status", (req, res) => {
  res.json({ status: "ok", message: "Servidor e banco online" });
});

// ============================
// Conexão com MongoDB
// ============================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch((err) => console.error("❌ Erro ao conectar MongoDB:", err));

// ============================
// Modelo de Usuário
// ============================
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// ============================
// ROTA: Registro de Usuário
// ============================
app.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await User.create({
      nome,
      email,
      senha: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "segredo",
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "Usuário criado com sucesso!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// ============================
// ROTA: Login
// ============================
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "segredo",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login bem-sucedido!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// ============================
// ROTA: Status do banco
// ============================
app.get("/db-status", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    const states = ["desconectado", "conectando", "conectado", "desconectando"];
    res.json({ status: states[state] });
  } catch (err) {
    res.status(500).json({ error: "Erro ao verificar o estado do banco" });
  }
});

// ============================
// Inicialização do servidor
// ============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
