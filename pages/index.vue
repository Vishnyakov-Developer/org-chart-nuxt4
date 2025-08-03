<template>
  <div class="org-chart-page">
    <OrgChart />
  </div>
</template>

<script setup>
import OrgChart from '../widgets/org-chart/components/OrgChart.vue'
</script>

<style scoped>
.org-chart-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
