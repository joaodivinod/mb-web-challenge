<script setup>
defineOptions({
  name: "RegistragionHeader",
});
const props = defineProps({
  title: { type: String, required: true },
  step: { type: Number, default: 1, required: true },
});
</script>
<template>
  <header>
    <h2>
      Etapa <span>{{ step }}</span> de 4
    </h2>
    <h1>{{ title }}</h1>
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
