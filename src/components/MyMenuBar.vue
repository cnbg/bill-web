<script setup lang="ts">
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores'

const { t } = useI18n()
const auth = useAuthStore()
const startItems = inject('menu-start-items', [])
const items = inject('menu-items', [])
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <Button
        v-if="startItems.length == 0" icon="pi pi-home" text
        severity="contrast" @click="$router.push({ name: 'home' })" />
      <template v-else>
        <Button v-for="(item, index) in startItems" :key="index"
                :disabled="item.disabled" :icon="item.icon" :label="item.label"
                text severity="contrast" @click="item.command" />
      </template>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <Button @click="$router.push({name: 'auth.profile'})" :label="auth.user.name" icon="pi pi-user" text severity="contrast" />
      </div>
    </template>
  </Menubar>
</template>

<style scoped>

</style>
