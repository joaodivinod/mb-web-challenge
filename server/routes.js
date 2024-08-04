const express = require("express");
const path = require("path");
const router = express.Router();

// Servir o arquivo HTML principal
router.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// Endpoint para receber dados do formulário
router.post("/registration", (req, res) => {
  const data = req.body;

  // Verificação básica dos dados recebidos
  if (
    !data.email ||
    !data.userType ||
    !data.name ||
    !data.document ||
    !data.date ||
    !data.phone ||
    !data.password
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Simular uma resposta de sucesso
  res.status(200).json({ message: "Cadastro realizado com sucesso!" });
});

module.exports = router;
