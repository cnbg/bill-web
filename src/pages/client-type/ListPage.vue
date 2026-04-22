<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useClientTypeStore } from '@/stores'
import type { ListQuery, ClientType } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const clientTypeSt = useClientTypeStore()

const selectedClientType = ref<ClientType>({} as ClientType)

const resolveClientTypeId = (clientType: any) => clientType?.value?.id ?? clientType?.id

const viewClientType = (role: any) => {
  const id = resolveClientTypeId(role)
  if (!id) return

  router.push({ name: 'client-type.show', params: { id: id } })
}

const createClientType = () => {
  router.push({ name: 'client-type.create' })
}

const editClientType = (clientType: any) => {
  const id = resolveClientTypeId(clientType)
  if (!id) return

  router.push({ name: 'client-type.edit', params: { id: id } })
}

const deleteClientType = async (clientType: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveClientTypeId(clientType)
    if (!id) return

    await clientTypeSt.deleteItem(id)
    clientTypeSt.items.data = clientTypeSt.items.data.filter(p => p.id !== id)
    clearSelectedClientType()
  }
}

const clearSelectedClientType = () => {
  selectedClientType.value = {} as ClientType
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await clientTypeSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('client_types'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await clientTypeSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="clientTypeSt.items.data" :loading="clientTypeSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="clientTypeSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="clientTypeSt.getItems(query)" severity="secondary" />
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
        <Column v-if="auth.hasPerm('client-type.create', 'client-type.edit', 'client-type.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('client-type.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createClientType()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('client-type.view')" type="button" icon="pi pi-eye" text severity="secondary" @click="viewClientType(data)" />
              <Button v-if="auth.hasPerm('client-type.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editClientType(data)" />
              <Button v-if="auth.hasPerm('client-type.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteClientType(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
