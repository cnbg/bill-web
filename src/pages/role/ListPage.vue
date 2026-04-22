<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useRoleStore } from '@/stores'
import type { ListQuery, Role } from '@/types'
import MainLayout from '@/layouts/MainLayout.vue'
import MyDataTable from '@/components/MyDataTable.vue'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const roleSt = useRoleStore()

const selectedRole = ref<Role>({} as Role)

const resolveRoleId = (role: any) => role?.value?.id ?? role?.id

const viewRole = (role: any) => {
  const id = resolveRoleId(role)
  if (!id) return

  router.push({ name: 'role.show', params: { id: id } })
}

const createRole = () => {
  router.push({ name: 'role.create' })
}

const editRole = (role: any) => {
  const id = resolveRoleId(role)
  if (!id) return

  router.push({ name: 'role.edit', params: { id: id } })
}

const deleteRole = async (role: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveRoleId(role)
    if (!id) return

    await roleSt.deleteItem(id)
    roleSt.items.data = roleSt.items.data.filter(p => p.id !== id)
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
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
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
      <MyDataTable :value="roleSt.items.data" :loading="roleSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="roleSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="roleSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="isActive" :header="$t('active')" style="width: 9rem;">
          <template #body="{ data }">
            <i :class="['pi', data.isActive ? 'pi-check text-green-600' : 'pi-minus text-gray-300']" />
          </template>
        </Column>
        <Column field="name" :header="$t('title')" />
        <Column field="note" :header="t('note')" />
        <Column v-if="auth.hasPerm('role.create', 'role.edit', 'role.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('role.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createRole()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('role.view')" type="button" icon="pi pi-eye" text severity="secondary" @click="viewRole(data)" />
              <Button v-if="auth.hasPerm('role.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editRole(data)" />
              <Button v-if="auth.hasPerm('role.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteRole(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
