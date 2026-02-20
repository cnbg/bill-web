<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrgStore } from '@/stores'

const route = useRoute()
const orgId = route.params.id as string

const orgSt = useOrgStore()

onMounted(async () => {
  await orgSt.getOne(orgId)
})
</script>

<template>
  <MainLayout>
    <div class="flex flex-wrap gap-4 items-center">
      <Button @click="$router.push({ name: 'org.list' })" outlined severity="contrast" icon="pi pi-chevron-left" size="small" />
      <h1 class="text-xl font-bold">{{ $t('org') }}</h1>
    </div>
    <hr class="my-4" />
    <div class="card">
      {{ orgSt.item.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
