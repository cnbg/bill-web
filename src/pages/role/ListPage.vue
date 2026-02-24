<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useRoleStore } from '@/stores'
import MyDataTable from '@/components/MyDataTable.vue'
import type { ListQuery, Role } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const roleSt = useRoleStore()

const cm = ref()
const selectedRole = ref<Role>({} as Role)
const menuModel = ref([] as any[])

if (auth.hasPerm('role.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewRole(selectedRole) })
}
if (auth.hasPerm('role.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteRole(selectedRole) })
}

const viewRole = (role: any) => {
  router.push({ name: 'role.show', params: { id: role.value.id } })
}

const deleteRole = async (role: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = role.value.id
    await roleSt.deleteItem(id)
    roleSt.items.data = await roleSt.items.data.filter(p => p.id !== id)
    clearSelectedRole()
  }
}

const clearSelectedRole = () => {
  selectedRole.value = {} as Role
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await roleSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('roles'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await roleSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedRole" />
      <MyDataTable :value="roleSt.items.data" :loading="roleSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="roleSt.items.total_count"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedRole"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="roleSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="name" :header="$t('title')" />
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
