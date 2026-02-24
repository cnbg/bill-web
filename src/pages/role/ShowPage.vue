<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermStore, useRoleStore } from '@/stores'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute()
const router = useRouter()
const roleId = route.params.id as string

const roleSt = useRoleStore()
const permSt = usePermStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'role.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await roleSt.getItem(roleId)
  menu.value.push({ label: roleSt.item.name, disabled: true })
  await permSt.getItems()
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <div class="flex flex-col gap-10">
        <div v-for="(perms, group) in permSt.groupedItems" :key="group">
          <h1 class="text-lg font-bold mb-3">{{ $t(group) }}</h1>
          <div class="flex flex-wrap gap-4">
            <Button
              v-for="(action, index) in perms" :key="index"
              :label="$t(action)" outlined style="min-width: 150px" size="small"
              :icon="roleSt.hasPerm(`${group}.${action}`) ? 'pi pi-check' : 'pi pi-minus'"
              :severity="roleSt.hasPerm(`${group}.${action}`) ? 'success' : 'secondary'"
              @click="roleSt.togglePerm(roleId, `${group}.${action}`, !roleSt.hasPerm(`${group}.${action}`))"
            />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style>
</style>
