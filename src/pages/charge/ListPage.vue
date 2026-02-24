<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { ListQuery, Charge } from '@/types'
import { useAuthStore, useChargeStore } from '@/stores'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const chargeSt = useChargeStore()

const cm = ref()
const selectedCharge = ref<Charge>({} as Charge)
const menuModel = ref([] as any[])

if (auth.hasPerm('charge.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewCharge(selectedCharge) })
}
if (auth.hasPerm('charge.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteCharge(selectedCharge) })
}

const viewCharge = (charge: any) => {
  router.push({ name: 'charge.show', params: { id: charge.value.id } })
}

const deleteCharge = async (charge: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = charge.value.id
    await chargeSt.deleteItem(id)
    chargeSt.items.data = await chargeSt.items.data.filter(p => p.id !== id)
    clearSelectedCharge()
  }
}

const clearSelectedCharge = () => {
  selectedCharge.value = {} as Charge
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await chargeSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('charges'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await chargeSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedCharge" />
      <MyDataTable :value="chargeSt.items.data" :loading="chargeSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="chargeSt.items.total_count"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedCharge"
                   @rowContextmenu="cm.show($event.originalEvent)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="chargeSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="account" :header="$t('account')" />
        <Column field="amount" :header="$t('amount')" />
        <Column field="status" :header="$t('status')">
          <template #body="{ data, field }">
            <Tag :value="data.status ? $t(data.status) : ''" :severity="data.status == 'completed' ? 'success' : 'secondary'" />
          </template>
        </Column>
        <Column field="year" :header="$t('year')" />
        <Column field="month" :header="$t('month')" />
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
