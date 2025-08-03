<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Добавляем мета-теги для запрета масштабирования
useHead({
  meta: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
  ],
})
</script>

<style>
/* Глобальные стили для запрета масштабирования */
html {
  zoom: 1 !important;
  -webkit-text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
  -ms-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
}

body {
  zoom: 1 !important;
  -webkit-text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
  -ms-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
}

/* Запрет масштабирования для всех элементов */
* {
  zoom: 1 !important;
  -webkit-text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
  -ms-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
}
</style>
