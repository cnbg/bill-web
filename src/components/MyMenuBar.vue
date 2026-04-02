<script setup lang="ts">
import { inject } from 'vue'
import { useAuthStore } from '@/stores'

type MenuBarItem = {
  disabled?: boolean
  icon?: string
  label?: string
  command?: () => void | Promise<void>
}

const auth = useAuthStore()
const startItems = inject<MenuBarItem[]>('menu-start-items', [])
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="flex items-center gap-2">
        <Button
          v-if="startItems.length == 0" icon="pi pi-home" text
          severity="contrast" @click="$router.push({ name: 'home' })" />
        <template v-else>
          <Button v-for="(item, index) in startItems" :key="index"
                  :disabled="item.disabled" :icon="item.icon" :label="item.label"
                  text severity="contrast" @click="item.command?.()" />
        </template>
      </div>
    </template>
    <template #center>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <Button @click="$router.push({name: 'auth.profile'})" icon="pi pi-user" text severity="contrast"
         :label="auth.user.org?.name ?? auth.user.name" />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>

</style>
