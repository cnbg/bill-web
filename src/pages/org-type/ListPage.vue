<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useOrgTypeStore } from '@/stores'
import type { ListQuery, OrgType } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const orgTypeSt = useOrgTypeStore()

const selectedOrgType = ref<OrgType>({} as OrgType)

const resolveOrgTypeId = (orgType: any) => orgType?.value?.id ?? orgType?.id

const viewOrgType = (role: any) => {
  const id = resolveOrgTypeId(role)
  if (!id) return

  router.push({ name: 'org-type.show', params: { id: id } })
}

const createOrgType = () => {
  router.push({ name: 'org-type.create' })
}

const editOrgType = (orgType: any) => {
  const id = resolveOrgTypeId(orgType)
  if (!id) return

  router.push({ name: 'org-type.edit', params: { id: id } })
}

const deleteOrgType = async (orgType: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveOrgTypeId(orgType)
    if (!id) return

    await orgTypeSt.deleteItem(id)
    orgTypeSt.items.data = orgTypeSt.items.data.filter(p => p.id !== id)
    clearSelectedOrgType()
  }
}

const clearSelectedOrgType = () => {
  selectedOrgType.value = {} as OrgType
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await orgTypeSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('org_types'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgTypeSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="orgTypeSt.items.data" :loading="orgTypeSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="orgTypeSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="orgTypeSt.getItems(query)" severity="secondary" />
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
        <Column v-if="auth.hasPerm('org-type.create', 'org-type.edit', 'org-type.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('org-type.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createOrgType()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('org-type.view')" type="button" icon="pi pi-eye" text severity="secondary" @click="viewOrgType(data)" />
              <Button v-if="auth.hasPerm('org-type.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editOrgType(data)" />
              <Button v-if="auth.hasPerm('org-type.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteOrgType(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
