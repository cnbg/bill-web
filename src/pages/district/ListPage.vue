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

const selectedDistrict = ref<District>({} as District)

const resolveId = (district: any) => district?.value?.id ?? district?.id

const viewDistrict = (role: any) => {
  const id = resolveId(role)
  if (!id) return

  router.push({ name: 'district.show', params: { id: id } })
}

const createDistrict = () => {
  router.push({ name: 'district.create' })
}

const editDistrict = (org: any) => {
  const id = resolveId(org)
  if (!id) return

  router.push({ name: 'district.edit', params: { id: id } })
}

const deleteDistrict = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveId(org)
    if (!id) return

    await districtSt.deleteItem(id)
    districtSt.items.data = districtSt.items.data.filter(p => p.id !== id)
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
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
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
      <MyDataTable :value="districtSt.items.data" :loading="districtSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="districtSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="districtSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="region.name" :header="$t('region')" />
        <Column field="code" :header="$t('code')" />
        <Column field="name" :header="$t('title')" />
        <Column v-if="auth.hasPerm('district.create', 'district.edit', 'district.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('district.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createDistrict()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('district.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editDistrict(data)" />
              <Button v-if="auth.hasPerm('district.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteDistrict(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
