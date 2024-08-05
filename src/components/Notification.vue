<template>
  <div
    v-if="message"
    :key="notificationKey"
    :class="['notification-banner', typeClass, { show: showNotification }]"
  >
    <div class="icon">
      {{ type === "error" ? "❌" : "✅" }}
    </div>
    <div class="description">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "error",
  },
});

const showNotification = ref(false);
const notificationKey = ref(0);

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      notificationKey.value++;
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 5000);
    }
  }
);
</script>

<style scoped>
.notification-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  max-width: 350px;
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  font-size: 17px;
  z-index: 1000;
  transition: visibility 0.5s, opacity 0.5s, transform 0.5s;
  transform: translateY(0);
}

.notification-banner.error {
  background-color: red;
}

.notification-banner.success {
  background-color: green;
}

.notification-banner .icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111;
  color: #fff;
  border-radius: 10px;
}

.notification-banner .description {
  flex: 1;
  padding: 16px;
  white-space: nowrap;
  overflow: hidden;
}

.notification-banner.show {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.notification-banner:not(.show) {
  visibility: hidden;
  opacity: 0;
  transform: translateY(30px);
}

/* Animações */
@keyframes expand {
  from {
    max-width: 50px;
  }
  to {
    max-width: 350px;
  }
}

@keyframes shrink {
  from {
    max-width: 350px;
  }
  to {
    max-width: 50px;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.notification-banner.show {
  animation: expand 0.5s, fadeout 0.5s 4.5s;
}
</style>
