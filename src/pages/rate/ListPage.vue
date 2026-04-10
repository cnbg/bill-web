<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useRateStore } from '@/stores'
import type { ListQuery, Rate } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const rateSt = useRateStore()

const cm = ref()
const selectedRate = ref<Rate>({} as Rate)
const menuModel = ref([] as any[])

if (auth.hasPerm('rate.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewRate(selectedRate) })
}
if (auth.hasPerm('rate.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteRate(selectedRate) })
}

const viewRate = (rate: any) => {
  router.push({ name: 'rate.show', params: { id: rate.value.id } })
}

const deleteRate = async (rate: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = rate.value.id
    await rateSt.deleteItem(id)
    rateSt.items.data = await rateSt.items.data.filter(p => p.id !== id)
    clearSelectedRate()
  }
}

const clearSelectedRate = () => {
  selectedRate.value = {} as Rate
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await rateSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('rates'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await rateSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedRate" />
      <MyDataTable :value="rateSt.items.data" :loading="rateSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="rateSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedRate"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="rateSt.getItems(query)" severity="secondary" />
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
