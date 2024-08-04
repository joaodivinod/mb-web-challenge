<script setup>
import { defineProps } from "vue";

defineOptions({
  name: "inputError",
});

const props = defineProps({
  errorMessage: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p>{{ props.errorMessage }}</p>
</template>

<style lang="scss" scoped>
p {
  font-family: $font-poppins;
  font-weight: 400;
  color: rgb(247, 16, 16);
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
