<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useOrgStore } from '@/stores'
import type { ListQuery, Org } from '@/types'
import MainLayout from '@/layouts/MainLayout.vue'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const orgSt = useOrgStore()

const selectedOrg = ref<Org>({} as Org)

const resolveOrgId = (org: any) => org?.value?.id ?? org?.id

const viewOrg = (role: any) => {
  const id = resolveOrgId(role)
  if (!id) return

  router.push({ name: 'org.show', params: { id: id } })
}

const createOrg = () => {
  router.push({ name: 'org.create' })
}

const editOrg = (org: any) => {
  const id = resolveOrgId(org)
  if (!id) return

  router.push({ name: 'org.edit', params: { id: id } })
}

const deleteOrg = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveOrgId(org)
    if (!id) return

    await orgSt.deleteItem(id)
    orgSt.items.data = orgSt.items.data.filter(p => p.id !== id)
    clearSelectedOrg()
  }
}

const clearSelectedOrg = () => {
  selectedOrg.value = {} as Org
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await orgSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('orgs'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="orgSt.items.data" :loading="orgSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="orgSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="orgSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="isActive" :header="$t('active')" style="width: 9rem;">
          <template #body="{ data }">
            <i :class="['pi', data.isActive ? 'pi-check text-green-600' : 'pi-minus text-gray-300']" />
          </template>
        </Column>
        <Column field="orgType.name" :header="$t('org_type')" />
        <Column field="name" :header="$t('title')" />
        <Column field="balance" :header="$t('balance')" />
        <Column field="okpo" :header="$t('okpo')" />
        <Column field="inn" :header="$t('inn')" />
        <Column field="note" :header="$t('note')" />
        <Column v-if="auth.hasPerm('org.create', 'org.edit', 'org.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('org.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createOrg()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('org.view')" type="button" icon="pi pi-eye" text severity="secondary" @click="viewOrg(data)" />
              <Button v-if="auth.hasPerm('org.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editOrg(data)" />
              <Button v-if="auth.hasPerm('org.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteOrg(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
