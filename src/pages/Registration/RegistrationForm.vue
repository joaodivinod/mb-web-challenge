<script setup>
import { ref, computed, reactive, watch } from "vue";
import RegistrationHeader from "./components/RegistragionHeader.vue";
import EmailStep from "./components/EmailStep.vue";
import InfoStep from "./components/InfoStep.vue";
import PassWordStep from "./components/PassWordStep.vue";

defineOptions({
  name: "RegistrationForm",
});

const currentStep = ref(2);
const email = ref("");
const userType = ref("fisica");

const finalValidation = reactive({
  firstStep: false,
  secondStep: false,
});

const areAllStepsValid = computed(() => {
  return Object.values(finalValidation).every((step) => step === true);
});

const infoStepData = reactive({
  name: "",
  document: "",
  date: "",
  phone: "",
});

const previousUserType = ref(userType.value);

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
  if (currentStep.value === 2 && previousUserType.value !== userType.value) {
    infoStepData.name = "";
    infoStepData.document = "";
    infoStepData.date = "";
    infoStepData.phone = "";
  }
  previousUserType.value = userType.value;
};

const backStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
  previousUserType.value = userType.value;
};

const setEmailData = (emailData) => {
  email.value = emailData.email;
  userType.value = emailData.userType;
};

const setInfoStepData = (field, value) => {
  infoStepData[field] = value;
};

const title = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Seja bem-vindo (a)";
    case 2:
      return userType.value === "fisica" ? "Pessoa Física" : "Pessoa Jurídica";
    case 3:
      return "Senha de acesso";
    case 4:
      return "Revise suas informações";
    default:
      return "";
  }
});

const validateFirstStep = (isEmailValid) => {
  finalValidation.firstStep = isEmailValid;
};
const validateSecondStep = (isValid) => {
  console.log("validateSecondStep", isValid);
  finalValidation.secondStep = isValid;
};
</script>

<template>
  <main>
    <section class="form">
      <RegistrationHeader :title="title" :step="currentStep" />
      <EmailStep
        v-if="currentStep === 1"
        class="form-step"
        :email="email"
        :userType="userType"
        @setEmailData="setEmailData"
        @isEmailValid="validateFirstStep"
      />
      <InfoStep
        v-if="currentStep === 2"
        class="form-step"
        :userType="userType"
        :infoStepData="infoStepData"
        @setInfoStepData="setInfoStepData"
        @isSecondStepValid="validateSecondStep"
      />
      <PassWordStep
        v-if="currentStep === 3"
        class="form-step"
        @nextStep="nextStep"
        @backStep="backStep"
      />
      <div
        v-if="currentStep === 1"
        :class="['submitButton', { disabled: !finalValidation.firstStep }]"
      >
        <button @click="nextStep" :disabled="!finalValidation.firstStep">
          Continuar
        </button>
      </div>
      <div v-else class="sideBySideBtn">
        <div class="backButton">
          <button @click="backStep">Voltar</button>
        </div>
        <div class="submitButton">
          <button :disabled="!areAllStepsValid" @click="nextStep">
            {{ currentStep === 4 ? "Cadastrar" : "Continuar" }}
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    background: transparent;
    width: 90%;
    max-width: 339px;
    height: auto;
    min-height: 90vh;
    margin-top: 50px;

    &-step {
      margin-top: 30px;
    }
  }
}
</style>
