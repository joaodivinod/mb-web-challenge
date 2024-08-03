<script setup>
import { ref, computed, defineEmits, defineProps, watch } from "vue";
import inputError from "@/components/inputError.vue";

defineOptions({
  name: "EmailStep",
});

const props = defineProps({
  email: { type: String, required: true },
  userType: { type: String, default: "Pessoa Física", required: true },
});

const emit = defineEmits(["nextStep", "setEmail", "setUserType"]);

const email = ref(props.email);
const emailError = ref("");
const userType = ref(props.userType);
const hasTyped = ref(false);

const validateEmail = () => {
  if (email.value.trim() === "") {
    emailError.value = "O e-mail não pode estar vazio";
  } else if (/\s/.test(email.value)) {
    emailError.value = "O e-mail não pode conter espaços em branco";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = emailPattern.test(email.value)
      ? ""
      : "Por favor, insira um e-mail válido";
  }
};

const isEmailValid = computed(() => {
  validateEmail();
  return emailError.value === "";
});

const nextStep = () => {
  if (isEmailValid.value) {
    emit("setEmail", email.value);
    emit("setUserType", userType.value);
    emit("nextStep");
  }
};

const handleInput = () => {
  hasTyped.value = true;
  validateEmail();
};

watch(
  () => props.email,
  (newEmail) => {
    email.value = newEmail;
  }
);

watch(
  () => props.userType,
  (newUserType) => {
    userType.value = newUserType;
  }
);
</script>

<template>
  <section class="email_step">
    <div class="defaultInput">
      <h3>Endereço de e-mail</h3>
      <input
        type="email"
        placeholder="seu endereço de e-mail"
        v-model="email"
        @input="handleInput"
      />
      <inputError v-if="hasTyped" :errorMessage="emailError" />
    </div>
    <div class="email_step-type">
      <label>
        <input type="radio" value="fisica" v-model="userType" />
        Pessoa Física
      </label>
      <label>
        <input type="radio" value="juridica" v-model="userType" />
        Pessoa Jurídica
      </label>
    </div>
    <div :class="['submitButton', { disabled: !isEmailValid }]">
      <button @click="nextStep" :disabled="!isEmailValid">Continuar</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.email_step {
  font-family: $font-poppins;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  &-type {
    width: 100%;
    box-sizing: border-box;
    display: flex;

    & label {
      font-size: 14px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
    }

    & input[type="radio"] {
      margin-right: 5px;
      margin-top: 0;
      appearance: none;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      position: relative;
      outline: none;
      cursor: pointer;
      transition: border 0.2s ease-in-out;

      &:hover {
        cursor: pointer;
      }

      &:checked {
        & {
          border: 6px solid #ff9900;
        }
      }
    }
  }
}
</style>
