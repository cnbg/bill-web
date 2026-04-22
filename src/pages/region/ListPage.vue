<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useRegionStore } from '@/stores'
import type { ListQuery, Region } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const regionSt = useRegionStore()

const selectedRegion = ref<Region>({} as Region)

const resolveId = (region: any) => region?.value?.id ?? region?.id

const viewRegion = (role: any) => {
  const id = resolveId(role)
  if (!id) return

  router.push({ name: 'region.show', params: { id: id } })
}

const createRegion = () => {
  router.push({ name: 'region.create' })
}

const editRegion = (org: any) => {
  const id = resolveId(org)
  if (!id) return

  router.push({ name: 'region.edit', params: { id: id } })
}

const deleteRegion = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveId(org)
    if (!id) return

    await regionSt.deleteItem(id)
    regionSt.items.data = regionSt.items.data.filter(p => p.id !== id)
    clearSelectedRegion()
  }
}

const clearSelectedRegion = () => {
  selectedRegion.value = {} as Region
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await regionSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('regions'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await regionSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="regionSt.items.data" :loading="regionSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="regionSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="regionSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="code" :header="$t('code')" />
        <Column field="name" :header="$t('title')" />
        <Column v-if="auth.hasPerm('region.create', 'region.edit', 'region.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('region.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createRegion()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('region.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editRegion(data)" />
              <Button v-if="auth.hasPerm('region.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteRegion(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
