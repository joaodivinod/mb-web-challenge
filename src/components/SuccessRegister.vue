<script setup>
defineOptions({
  name: "SuccessRegister",
});

const restartRegistration = () => {
  location.reload();
};
</script>

<template>
  <section>
    <div>
      <h1>Cadastro Realizado com sucesso!</h1>
      <h2>Realizar novo cadastro?</h2>
      <div class="submitButton">
        <button @click="restartRegistration">Novo Cadastro</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh;
  & h1 {
    font-size: 30px;
    font-family: $font-roboto;
    margin-top: 20px;
  }
  & h2 {
    font-family: $font-poppins;
    font-size: 16px;
    font-weight: 500;
    margin-top: 30px;
    & span {
      color: $primary-color;
    }
  }
  & button {
    max-width: 80%;
  }
}
</style>
