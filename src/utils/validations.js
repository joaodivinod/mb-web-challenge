export const validateName = (name, isLegalPerson) => {
  const nameType = isLegalPerson ? "razão social" : "nome";

  if (name.trim() === "") return `O campo ${nameType} não pode estar vazio.`;
  if (name.length > 200)
    return `O campo ${nameType} não pode ter mais de 200 caracteres.`;
  return "";
};

export const formatCPF = (value) => {
  if (value.length <= 11) {
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }
  return value;
};

export const formatCNPJ = (value) => {
  if (value.length <= 14) {
    return value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }
  return value;
};

export const validateCPF = (cpf) => {
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
export const validateCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, "");

  if (!cnpj || cnpj.length !== 14) return "O CNPJ deve ter 14 dígitos.";

  if (/^(\d)\1{13}$/.test(cnpj)) return "O CNPJ é inválido.";

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * (i < 4 ? 5 - i : 13 - i);
  }
  let remainder = sum % 11;
  let firstDigit = remainder < 2 ? 0 : 11 - remainder;
  if (firstDigit !== parseInt(cnpj.charAt(12))) return "O CNPJ é inválido.";

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * (i < 5 ? 6 - i : 14 - i);
  }
  remainder = sum % 11;
  let secondDigit = remainder < 2 ? 0 : 11 - remainder;
  if (secondDigit !== parseInt(cnpj.charAt(13))) return "O CNPJ é inválido.";

  return "";
};

export const validateDate = (date) => {
  const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!date) return "O campo data não pode estar vazio.";
  if (!regex.test(date)) return "A data deve estar no formato DD/MM/AAAA.";

  const [day, month, year] = date.split("/").map(Number);
  const isValidDate = (d, m, y) => {
    const dateObj = new Date(y, m - 1, d);
    return (
      dateObj.getFullYear() === y &&
      dateObj.getMonth() + 1 === m &&
      dateObj.getDate() === d
    );
  };

  if (!isValidDate(day, month, year)) return "A data não é válida.";
  return "";
};

export const formatDate = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length <= 2) return value;
  if (value.length <= 4) return value.replace(/^(\d{2})(\d{2})$/, "$1/$2");
  return value.replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3");
};

export const formatPhone = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length <= 11) {
    return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
  }
  return value;
};

export const validatePhone = (phone) => {
  phone = phone.replace(/\D/g, "");
  if (!phone) return "O campo telefone não pode estar vazio.";
  if (phone.length !== 11) return "O telefone deve ter 11 dígitos.";
  return "";
};

export const validatePassword = (password) => {
  criteria.value.hasUppercase = /[A-Z]/.test(password);
  criteria.value.hasLowercase = /[a-z]/.test(password);
  criteria.value.hasNumber = /\d/.test(password);
  criteria.value.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  criteria.value.isValidLength = password.length >= 8;
};
