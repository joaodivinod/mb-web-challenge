<script setup>
import RegistragionHeader from "./components/RegistragionHeader.vue";
import EmailStep from "./components/EmailStep.vue";
defineOptions({
  name: "RegistrationForm",
});
</script>

<template>
  <main>
    <section class="form">
      <RegistragionHeader />
      <EmailStep class="form-email_step" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  & .form {
    background: transparent;
    width: 90%;
    max-width: 330px;
    height: auto;
    min-height: 90vh;
    margin-top: 50px;
    &-email_step {
      margin-top: 30px;
    }
  }
}
</style>
