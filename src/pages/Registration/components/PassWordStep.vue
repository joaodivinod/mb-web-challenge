<script setup>
import { ref, computed, watch } from "vue";
import { defineEmits } from "vue";
import inputError from "@/components/inputError.vue";

defineOptions({
  name: "PassWordStep",
});

const emit = defineEmits(["nextStep", "backStep"]);

const password = ref("");
const confirmPassword = ref("");
const hasTyped = ref(false);
const hasTypedConfirm = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const criteria = ref({
  hasUppercase: false,
  hasLowercase: false,
  hasNumber: false,
  hasSpecialChar: false,
  isValidLength: false,
  passwordsMatch: false,
});

const validatePassword = (password) => {
  criteria.value.hasUppercase = /[A-Z]/.test(password);
  criteria.value.hasLowercase = /[a-z]/.test(password);
  criteria.value.hasNumber = /\d/.test(password);
  criteria.value.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  criteria.value.isValidLength = password.length >= 8;
};

const validatePasswordsMatch = () => {
  criteria.value.passwordsMatch = password.value === confirmPassword.value;
};

const isFormValid = computed(() => {
  return Object.values(criteria.value).every(Boolean);
});

watch(password, (newPassword) => {
  validatePassword(newPassword);
  validatePasswordsMatch();
});

watch(confirmPassword, () => {
  validatePasswordsMatch();
});

const nextStep = () => {
  if (isFormValid.value) {
    emit("nextStep");
  }
};

const backStep = () => {
  emit("backStep");
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<template>
  <section class="stepContainer">
    <div class="defaultInput">
      <h3>Sua Senha</h3>
      <div class="inputWithIcon">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Defina uma Senha"
          v-model="password"
          @input="hasTyped = true"
        />
        <img
          v-if="showPassword"
          @click="togglePasswordVisibility"
          class="togglePassword"
          src="@/assets/visibility.svg"
          alt=""
        />
        <img
          v-else
          @click="togglePasswordVisibility"
          class="togglePassword"
          src="@/assets/visibility_off.svg"
          alt=""
        />
      </div>
      <inputError
        v-if="
          hasTyped &&
          (!criteria.isValidLength ||
            !criteria.hasUppercase ||
            !criteria.hasLowercase ||
            !criteria.hasNumber ||
            !criteria.hasSpecialChar)
        "
        :errorMessage="'A senha não atende aos critérios.'"
      />
    </div>
    <div class="defaultInput">
      <h3>Confirme Sua Senha</h3>
      <div class="inputWithIcon">
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirme sua Senha"
          v-model="confirmPassword"
          @input="hasTypedConfirm = true"
        />
        <img
          v-if="showConfirmPassword"
          @click="toggleConfirmPasswordVisibility"
          class="togglePassword"
          src="@/assets/visibility.svg"
          alt=""
        />
        <img
          v-else
          @click="toggleConfirmPasswordVisibility"
          class="togglePassword"
          src="@/assets/visibility_off.svg"
          alt=""
        />
      </div>
      <inputError
        v-if="
          hasTypedConfirm &&
          !criteria.passwordsMatch &&
          (password.length > 0 || confirmPassword.length > 0)
        "
        :errorMessage="'As senhas não coincidem.'"
      />
    </div>
    <div class="criteriaList">
      <ul>
        <li
          :class="{
            valid: criteria.hasUppercase,
            invalid: !criteria.hasUppercase,
          }"
        >
          Pelo menos uma letra maiúscula
        </li>
        <li
          :class="{
            valid: criteria.hasLowercase,
            invalid: !criteria.hasLowercase,
          }"
        >
          Pelo menos uma letra minúscula
        </li>
        <li
          :class="{ valid: criteria.hasNumber, invalid: !criteria.hasNumber }"
        >
          Pelo menos um número
        </li>
        <li
          :class="{
            valid: criteria.hasSpecialChar,
            invalid: !criteria.hasSpecialChar,
          }"
        >
          Pelo menos um caractere especial
        </li>
        <li
          :class="{
            valid: criteria.isValidLength,
            invalid: !criteria.isValidLength,
          }"
        >
          Pelo menos 8 caracteres
        </li>
        <li
          :class="{
            valid: criteria.passwordsMatch,
            invalid: !criteria.passwordsMatch,
          }"
        >
          Senhas precisam ser iguais
        </li>
      </ul>
    </div>
    <div class="sideBySideBtn">
      <div class="backButton">
        <button @click="backStep">Voltar</button>
      </div>
      <div class="submitButton">
        <button :disabled="!isFormValid" @click="nextStep">Continuar</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stepContainer {
}

.inputWithIcon {
  display: flex;
  align-items: center;
  position: relative;
}

input {
  flex: 1;
}

.togglePassword {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.criteriaList {
  ul {
    list-style: none;
    padding: 0;
    font-size: 13px;
  }
  li {
    line-height: 1.3;
    list-style: disc;
    margin-left: 20px;
    &.valid {
      color: green;
    }
    &.invalid {
      color: red;
    }
  }
}
</style>
