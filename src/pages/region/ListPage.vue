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

const cm = ref()
const selectedRegion = ref<Region>({} as Region)
const menuModel = ref([] as any[])

if (auth.hasPerm('region.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewRegion(selectedRegion) })
}
if (auth.hasPerm('region.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteRegion(selectedRegion) })
}

const viewRegion = (region: any) => {
  router.push({ name: 'region.show', params: { id: region.value.id } })
}

const deleteRegion = async (region: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = region.value.id
    await regionSt.deleteItem(id)
    regionSt.items.data = await regionSt.items.data.filter(p => p.id !== id)
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
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedRegion" />
      <MyDataTable :value="regionSt.items.data" :loading="regionSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="regionSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedRegion"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="regionSt.getItems(query)" severity="secondary" />
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
