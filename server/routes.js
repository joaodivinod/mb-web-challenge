const express = require("express");
const router = express.Router();
const {
  validateEmail,
  validateCPF,
  validateCNPJ,
  validatePhone,
  validatePassword,
} = require("./validators"); // Ajuste o caminho conforme necessário

router.post("/registration", (req, res) => {
  const data = req.body;

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

  // Validações adicionais
  if (!validateEmail(data.email)) {
    return res.status(400).json({ error: "E-mail inválido." });
  }

  if (!["fisica", "juridica"].includes(data.userType)) {
    return res.status(400).json({ error: "Tipo de usuário inválido." });
  }

  const cpfError = validateCPF(data.document);
  if (data.userType === "fisica" && cpfError) {
    return res.status(400).json({ error: cpfError });
  }

  const cnpjError = validateCNPJ(data.document);
  if (data.userType === "juridica" && cnpjError) {
    return res.status(400).json({ error: cnpjError });
  }

  if (!validatePhone(data.phone)) {
    return res.status(400).json({ error: "Telefone inválido." });
  }

  if (!validatePassword(data.password)) {
    return res.status(400).json({
      error:
        "Senha inválida. Deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.",
    });
  }

  res.status(200).json({ message: "Cadastro realizado com sucesso!" });
});

module.exports = router;
