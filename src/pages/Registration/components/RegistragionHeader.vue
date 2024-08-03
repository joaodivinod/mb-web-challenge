<script setup>
defineOptions({
  name: "RegistragionHeader",
});
</script>
<template>
  <header>
    <h2>Etapa <span>1</span> de 4</h2>
    <h1>Seja bem vindo (a)</h1>
  </header>
</template>
<style lang="scss" scoped>
header {
  & h1 {
    font-size: 30px;
    font-family: $font-roboto;
    margin-top: 20px;
  }
  & h2 {
    font-family: $font-poppins;
    font-size: 16px;
    font-weight: 500;
    & span {
      color: $primary-color;
    }
  }
}
</style>
