<script setup>
import { ref, computed, reactive, watch } from "vue";
import RegistrationHeader from "./components/RegistragionHeader.vue";
import EmailStep from "./components/EmailStep.vue";
import InfoStep from "./components/InfoStep.vue";
import PassWordStep from "./components/PassWordStep.vue";

defineOptions({
  name: "RegistrationForm",
});

const currentStep = ref(3); // mudar para o default 1
const email = ref("");
const userType = ref("fisica");

const infoStepData = reactive({
  name: "",
  document: "",
  date: "",
  phone: "",
});

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const backStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const setEmail = (newEmail) => {
  email.value = newEmail;
};

const setUserType = (newUserType) => {
  userType.value = newUserType;
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

watch(userType, () => {
  infoStepData.name = "";
  infoStepData.document = "";
  infoStepData.date = "";
  infoStepData.phone = "";
});
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
        @setEmail="setEmail"
        @setUserType="setUserType"
        @nextStep="nextStep"
        @backStep="backStep"
      />
      <InfoStep
        v-if="currentStep === 2"
        class="form-step"
        :userType="userType"
        :infoStepData="infoStepData"
        @setInfoStepData="setInfoStepData"
        @nextStep="nextStep"
        @backStep="backStep"
      />
      <PassWordStep
        v-if="currentStep === 3"
        class="form-step"
        @nextStep="nextStep"
        @backStep="backStep"
      />
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
