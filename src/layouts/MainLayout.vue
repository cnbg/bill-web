<script setup lang="ts">
import MyMenuBar from '@/components/MyMenuBar.vue'
</script>
<template>
  <div class="p-4 overflow-hidden">
    <MyMenuBar />
    <slot />
  </div>
</template>
