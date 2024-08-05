// validators.js

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (!cpf) return "O campo CPF não pode estar vazio.";
  if (cpf.length !== 11) return "O CPF deve ter 11 dígitos.";

  const validate = (cpf) => {
    let sum = 0;
    let remainder;

    if (cpf === "00000000000") return false; // CPF inválido padrão

    for (let i = 1; i <= 9; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  return validate(cpf) ? "" : "O CPF é inválido.";
};

const validateCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (!cnpj) return "O campo CNPJ não pode estar vazio.";
  if (cnpj.length !== 14) return "O CNPJ deve ter 14 dígitos.";

  const validate = (cnpj) => {
    let sum = 0;
    let remainder;

    if (cnpj === "00000000000000") return false; // CNPJ inválido padrão

    for (let i = 0; i < 12; i++)
      sum += parseInt(cnpj.charAt(i)) * (i < 4 ? 5 - i : 9 - i);
    remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;
    if (remainder !== parseInt(cnpj.charAt(12))) return false;

    sum = 0;
    for (let i = 0; i < 13; i++)
      sum += parseInt(cnpj.charAt(i)) * (i < 5 ? 6 - i : 9 - i);
    remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;
    if (remainder !== parseInt(cnpj.charAt(13))) return false;

    return true;
  };

  return validate(cnpj) ? "" : "O CNPJ é inválido.";
};

const validatePhone = (phone) => {
  const cleanedPhone = phone.replace(/\D/g, "");
  if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
    return "O telefone deve ter entre 10 e 11 dígitos.";
  }
  const phoneRegex = /^(\d{2})(\d{4,5})(\d{4})$/;
  return phoneRegex.test(cleanedPhone);
};

const validatePassword = (password) => {
  const criteria = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    isValidLength: password.length >= 8,
  };
  return (
    criteria.hasUppercase &&
    criteria.hasLowercase &&
    criteria.hasNumber &&
    criteria.hasSpecialChar &&
    criteria.isValidLength
  );
};

module.exports = {
  validateEmail,
  validateCPF,
  validateCNPJ,
  validatePhone,
  validatePassword,
};
