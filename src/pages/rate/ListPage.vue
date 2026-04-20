<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useRateStore } from '@/stores'
import type { ListQuery, Rate } from '@/types'
import dayjs from 'dayjs'
import MainLayout from '@/layouts/MainLayout.vue'
import MyDataTable from '@/components/MyDataTable.vue'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const rateSt = useRateStore()

const selectedRate = ref<Rate>({} as Rate)

const resolveRateId = (rate: any) => rate?.value?.id ?? rate?.id

const createRate = () => {
  router.push({ name: 'rate.create' })
}

const editRate = (rate: any) => {
  const id = resolveRateId(rate)
  if (!id) return
  router.push({ name: 'rate.edit', params: { id } })
}

const deleteRate = async (rate: any) => {
  const id = resolveRateId(rate)
  if (!id) return

  if (confirm(t('are_you_sure'))) {
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
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
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
      <MyDataTable :value="rateSt.items.data" :loading="rateSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="rateSt.items.totalCount"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="rateSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="name" :header="$t('title')" />
        <Column field="price" :header="$t('price')" />
        <Column field="type" :header="$t('type')">
          <template #body="{ data }">
            {{ $t(data['type']) }}
          </template>
        </Column>
        <Column field="startDate" :header="$t('start')">
          <template #body="{ data }">
            {{ dayjs(data.startDate).format('DD-MM-YYYY') }}
          </template>
        </Column>
        <Column field="endDate" :header="$t('end')">
          <template #body="{ data }">
            {{ data.endDate ? dayjs(data.endDate).format('DD-MM-YYYY') : '' }}
          </template>
        </Column>
        <Column field="isActive" :header="$t('active')">
          <template #body="{ data }">
            <Button :icon="data.isActive ? 'pi pi-check' : 'pi pi-minus'" :severity="data.isActive ? 'success' : 'secondary'" text  />
          </template>
        </Column>
        <Column v-if="auth.hasPerm('rate.create', 'rate.edit', 'rate.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('rate.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createRate(data)" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('rate.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editRate(data)" />
              <Button v-if="auth.hasPerm('rate.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteRate(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
