<script setup>
import { computed, reactive, watch, onMounted } from "vue";
import inputError from "@/components/inputError.vue";
import {
  validateName,
  validateCPF,
  validateCNPJ,
  validateDate,
  formatDate,
  formatPhone,
  validatePhone,
} from "@/utils/validations.js";

const props = defineProps({
  userType: { type: String, default: "fisica", required: true },
  infoStepData: { type: Object, required: true },
});

const emit = defineEmits(["setInfoStepData", "isSecondStepValid"]);

const errors = reactive({
  name: "",
  document: "",
  date: "",
  phone: "",
});

const touched = reactive({
  name: false,
  document: false,
  date: false,
  phone: false,
});

const isLegalPerson = computed(() => props.userType === "juridica");

const isFormValid = computed(() => {
  return (
    props.infoStepData.name &&
    !errors.name &&
    props.infoStepData.document &&
    !errors.document &&
    props.infoStepData.date &&
    !errors.date &&
    props.infoStepData.phone &&
    !errors.phone
  );
});

const validateField = (field) => {
  if (!touched[field]) return;
  switch (field) {
    case "name":
      errors.name = validateName(props.infoStepData.name, isLegalPerson.value);
      break;
    case "document":
      errors.document = isLegalPerson.value
        ? validateCNPJ(props.infoStepData.document)
        : validateCPF(props.infoStepData.document);
      break;
    case "date":
      errors.date = validateDate(props.infoStepData.date);
      break;
    case "phone":
      errors.phone = validatePhone(props.infoStepData.phone);
      break;
  }
};

const handleInput = (field, event) => {
  let value = event.target.value;
  touched[field] = true;
  if (field === "document") {
    value = value.replace(/\D/g, "");
    props.infoStepData[field] = formatDocument(value);
  } else if (field === "phone") {
    value = value.replace(/\D/g, "");
    props.infoStepData[field] = formatPhone(value);
  } else if (field === "date") {
    value = value.replace(/\D/g, "");
    props.infoStepData[field] = formatDate(value);
  } else {
    props.infoStepData[field] = value;
  }
  emit("setInfoStepData", field, props.infoStepData[field]);
  emit("isSecondStepValid", isFormValid.value);
  validateField(field);
};

const formatDocument = (value) => {
  if (isLegalPerson.value) {
    return value
      .slice(0, 14)
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  } else {
    return value
      .slice(0, 11)
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }
};

const validateAllFields = () => {
  validateField("name");
  validateField("document");
  validateField("date");
  validateField("phone");
  emit("isSecondStepValid", isFormValid.value);
};

watch(
  () => [
    props.infoStepData.name,
    props.infoStepData.document,
    props.infoStepData.date,
    props.infoStepData.phone,
  ],
  () => {
    validateAllFields();
  }
);

onMounted(() => {
  validateAllFields();
});
</script>

<template>
  <section class="stepContainer">
    <div class="defaultInput">
      <h3>{{ isLegalPerson ? "Nome da Empresa" : "Nome" }}</h3>
      <input
        type="text"
        v-model="props.infoStepData.name"
        :placeholder="isLegalPerson ? 'Nome da Empresa' : 'Nome'"
        @input="handleInput('name', $event)"
      />
      <inputError
        v-if="touched.name && errors.name"
        :errorMessage="errors.name"
      />
    </div>
    <div class="defaultInput">
      <h3>{{ isLegalPerson ? "CNPJ" : "CPF" }}</h3>
      <input
        type="text"
        v-model="props.infoStepData.document"
        :placeholder="isLegalPerson ? 'CNPJ da empresa' : 'CPF'"
        @input="handleInput('document', $event)"
        :maxlength="isLegalPerson ? 18 : 14"
      />
      <inputError
        v-if="touched.document && errors.document"
        :errorMessage="errors.document"
      />
    </div>
    <div class="defaultInput">
      <h3>{{ isLegalPerson ? "Data de Abertura" : "Data de Nascimento" }}</h3>
      <input
        type="text"
        v-model="props.infoStepData.date"
        :placeholder="
          isLegalPerson ? 'Data de abertura da empresa' : 'Data de Nascimento'
        "
        @input="handleInput('date', $event)"
        maxlength="10"
      />
      <inputError
        v-if="touched.date && errors.date"
        :errorMessage="errors.date"
      />
    </div>
    <div class="defaultInput">
      <h3>Telefone</h3>
      <input
        type="text"
        v-model="props.infoStepData.phone"
        :placeholder="isLegalPerson ? 'Telefone da empresa' : 'Telefone'"
        @input="handleInput('phone', $event)"
        maxlength="15"
      />
      <inputError
        v-if="touched.phone && errors.phone"
        :errorMessage="errors.phone"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stepContainer {
}
</style>
