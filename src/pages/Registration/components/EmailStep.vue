<script setup>
import { ref, computed, defineEmits } from "vue";
import inputError from "@/components/inputError.vue";

defineOptions({
  name: "EmailStep",
});

const emit = defineEmits(["nextStep"]);

const email = ref("");
const emailError = ref("");
const userType = ref("fisica");
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

// Computed property to check if the email is valid
const isEmailValid = computed(() => {
  validateEmail();
  return emailError.value === "";
});

// Function to emit nextStep event
const nextStep = () => {
  if (isEmailValid.value) {
    emit("nextStep");
  }
};

// Function to handle user input
const handleInput = () => {
  hasTyped.value = true;
  validateEmail();
};
</script>

<template>
  <section class="email_step">
    <div class="email_step-email">
      <h3>Endereço de e-mail</h3>
      <input
        type="email"
        placeholder="seu endereço de e-mail"
        v-model="email"
        @blur="handleInput"
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
    <div :class="['email_step-submit', { disabled: !isEmailValid }]">
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

  &-email {
    width: 100%;
    margin-bottom: 20px;
    box-sizing: border-box;

    & h3 {
      font-size: 14px;
      margin-bottom: 10px;
      margin-left: 5px;
    }

    & input {
      height: 40px;
      color: rgba(0, 0, 0, 0.8);
      width: 100%;
      border-radius: 7px;
      padding: 10px;
      font-size: 14px;
      box-sizing: border-box;
    }
  }

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

  &-submit {
    margin-top: 20px;

    & button {
      width: 100%;
      height: 40px;
      background-color: $primary-color;
      border: none;
      font-size: 16px;
      color: white;
      border-radius: 8px;
      transition: 300ms;
      &:hover {
        cursor: pointer;
        filter: brightness(1.2);
      }
      &:disabled {
        cursor: not-allowed;
        filter: grayscale(1);
      }
    }
  }
}

.disabled {
  filter: grayscale(1);
}
</style>
