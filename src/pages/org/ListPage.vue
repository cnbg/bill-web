<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Org } from '@/types'
import { useAuthHttp } from '@/composables'

const orgs = ref<Org[]>([])

const loadOrgs = async () => {
  const { data } = await useAuthHttp('/org/list').get().json()
  orgs.value = data.value.data as Org[]
}

onMounted(async () => {
  await loadOrgs()
})
</script>

<template>
  <MainLayout>
    <div class="p-4">
      <div class="flex flex-wrap gap-4">
        <Button @click="$router.push({ name: 'home' })" outlined severity="contrast" icon="pi pi-chevron-left" />
        <h1 class="text-3xl font-bold underline">
          {{ $t('orgs') }}
        </h1>
      </div>
      <hr class="my-4" />
      <div class="card">
        <DataTable :value="orgs" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                   paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                   currentPageReportTemplate="{first} to {last} of {totalRecords}">
          <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text @click="loadOrgs" severity="secondary" />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-download" text severity="secondary" />
          </template>
          <Column field="name" :header="$t('title')"></Column>
        </DataTable>
      </div>
    </div>
  </MainLayout>
</template>

<style>
</style>
