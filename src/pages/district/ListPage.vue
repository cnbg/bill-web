<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useDistrictStore } from '@/stores'
import type { ListQuery, District } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const districtSt = useDistrictStore()

const cm = ref()
const selectedDistrict = ref<District>({} as District)
const menuModel = ref([] as any[])

if (auth.hasPerm('district.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewDistrict(selectedDistrict) })
}
if (auth.hasPerm('district.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteDistrict(selectedDistrict) })
}

const viewDistrict = (district: any) => {
  router.push({ name: 'district.show', params: { id: district.value.id } })
}

const deleteDistrict = async (district: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = district.value.id
    await districtSt.deleteItem(id)
    districtSt.items.data = await districtSt.items.data.filter(p => p.id !== id)
    clearSelectedDistrict()
  }
}

const clearSelectedDistrict = () => {
  selectedDistrict.value = {} as District
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await districtSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('districts'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await districtSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedDistrict" />
      <MyDataTable :value="districtSt.items.data" :loading="districtSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="districtSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedDistrict"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="districtSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="region.name" :header="$t('region')" />
        <Column field="name" :header="$t('district')" />
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
