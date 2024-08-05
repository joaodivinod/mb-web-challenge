<script setup>
import { ref, computed, reactive } from "vue";
import RegistrationHeader from "./components/RegistragionHeader.vue";
import EmailStep from "./components/EmailStep.vue";
import InfoStep from "./components/InfoStep.vue";
import PassWordStep from "./components/PassWordStep.vue";
import defaultLoading from "@/components/defaultLoading.vue";
import Notification from "@/components/Notification.vue";
import SuccessRegister from "@/components/SuccessRegister.vue";

defineOptions({
  name: "RegistrationForm",
});

const currentStep = ref(1);
const email = ref("");
const userType = ref("fisica");
const previousUserType = ref(userType.value);
const isLoading = ref(false);
const showSuccessRegister = ref(false);

const notificationMessage = ref("");
const notificationType = ref("error");

const showNotification = (message, type = "error") => {
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    notificationMessage.value = message;
    notificationType.value = type;
  }, 0);
};
const finalValidation = reactive({
  firstStep: false,
  secondStep: false,
  thirdStep: false,
});

const infoStepData = reactive({
  name: "",
  document: "",
  date: "",
  phone: "",
});

const passwordData = reactive({
  password: "",
  confirmPassword: "",
});

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

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return finalValidation.firstStep;
    case 2:
      return finalValidation.secondStep;
    case 3:
      return finalValidation.thirdStep;
    case 4:
      return (
        finalValidation.firstStep &&
        finalValidation.secondStep &&
        finalValidation.thirdStep
      );
    default:
      return false;
  }
});

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

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const response = await fetch("http://localhost:3000/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        userType: userType.value,
        name: infoStepData.name,
        document: infoStepData.document,
        phone: infoStepData.phone,
        date: infoStepData.date,
        password: passwordData.password,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Erro na resposta da API");
    }

    const result = await response.json();
    showNotification("Cadastro realizado com sucesso!", "success");
    showSuccessRegister.value = true;
  } catch (error) {
    console.error("Erro ao enviar dados:", error.message);
    showNotification(error.message, "error");
  } finally {
    isLoading.value = false;
  }
};

const setEmailData = (emailData) => {
  email.value = emailData.email;
  userType.value = emailData.userType;
};

const setInfoStepData = (field, value) => {
  infoStepData[field] = value;
};

const setPasswordData = (field, value) => {
  passwordData[field] = value;
};

const validateFirstStep = (isEmailValid) => {
  finalValidation.firstStep = isEmailValid;
};

const validateSecondStep = (isValid) => {
  finalValidation.secondStep = isValid;
};

const validateThirdStep = (isValid) => {
  finalValidation.thirdStep = isValid;
};
</script>

<template>
  <main>
    <defaultLoading :isLoading="isLoading" />
    <SuccessRegister v-if="showSuccessRegister" />
    <section v-else class="form">
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
        :password="passwordData.password"
        :confirmPassword="passwordData.confirmPassword"
        @passwordsValidity="validateThirdStep"
        @update:password="(value) => setPasswordData('password', value)"
        @update:confirmPassword="
          (value) => setPasswordData('confirmPassword', value)
        "
      />
      <div v-if="currentStep === 4">
        <EmailStep
          class="form-step"
          :isReview="true"
          :email="email"
          :userType="userType"
          @setEmailData="setEmailData"
          @isEmailValid="validateFirstStep"
        />
        <InfoStep
          :userType="userType"
          :infoStepData="infoStepData"
          @setInfoStepData="setInfoStepData"
          @isSecondStepValid="validateSecondStep"
        />
        <PassWordStep
          :password="passwordData.password"
          :confirmPassword="passwordData.confirmPassword"
          @passwordsValidity="validateThirdStep"
          @update:password="(value) => setPasswordData('password', value)"
          @update:confirmPassword="
            (value) => setPasswordData('confirmPassword', value)
          "
        />
      </div>
      <div
        v-if="currentStep === 1"
        :class="['submitButton', { disabled: !isStepValid }]"
      >
        <button @click="nextStep" :disabled="!isStepValid">Continuar</button>
      </div>
      <div v-else-if="currentStep !== 4" class="sideBySideBtn">
        <div class="backButton">
          <button @click="backStep">Voltar</button>
        </div>
        <div class="submitButton">
          <button :disabled="!isStepValid" @click="nextStep">Continuar</button>
        </div>
      </div>
      <div v-if="currentStep === 4" class="sideBySideBtn">
        <div class="backButton">
          <button @click="backStep">Voltar</button>
        </div>
        <div class="submitButton">
          <button :disabled="!isStepValid" @click="handleSubmit">
            Cadastrar
          </button>
        </div>
      </div>
    </section>
    <Notification :message="notificationMessage" :type="notificationType" />
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
    margin-bottom: 50px;

    &-step {
      margin-top: 30px;
    }
  }
}
</style>
