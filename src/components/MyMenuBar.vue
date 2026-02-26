<script setup lang="ts">
import { inject } from 'vue'
import { useAuthStore } from '@/stores'

const auth = useAuthStore()
const startItems = inject('menu-start-items', [])
const items = inject('menu-items', [])
</script>

<template>
  <Toolbar :model="items">
    <template #start>
      <div class="flex items-center gap-2">
        <Button
          v-if="startItems.length == 0" icon="pi pi-home" text
          severity="contrast" @click="$router.push({ name: 'home' })" />
        <template v-else>
          <Button v-for="(item, index) in startItems" :key="index"
                  :disabled="item.disabled" :icon="item.icon" :label="item.label"
                  text severity="contrast" @click="item.command" />
        </template>
      </div>
    </template>
    <template #center>
      <div class="flex items-center gap-2">
        <Button :label="auth.user.org.name" severity="secondary" text />
      </div>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <Button @click="$router.push({name: 'auth.profile'})" :label="auth.user.name" icon="pi pi-user" text severity="contrast" />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>

</style>
