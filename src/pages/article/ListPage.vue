<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { Article, ListQuery } from '@/types'
import { useArticleStore, useAuthStore } from '@/stores'
import { FilterMatchMode } from '@primevue/core/api'
import { convertFilters, convertSort } from '@/utils'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const articleSt = useArticleStore()

const selectedArticle = ref<Article>({} as Article)

const resolveId = (article: any) => article?.value?.id ?? article?.id

const viewArticle = (role: any) => {
  const id = resolveId(role)
  if (!id) return

  router.push({ name: 'article.show', params: { id: id } })
}

const createArticle = () => {
  router.push({ name: 'article.create' })
}

const editArticle = (org: any) => {
  const id = resolveId(org)
  if (!id) return

  router.push({ name: 'article.edit', params: { id: id } })
}

const deleteArticle = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveId(org)
    if (!id) return

    await articleSt.deleteItem(id)
    articleSt.items.data = articleSt.items.data.filter(p => p.id !== id)
    clearSelectedArticle()
  }
}

const clearSelectedArticle = () => {
  selectedArticle.value = {} as Article
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await articleSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('articles'), disabled: true },
])

provide('menu-start-items', menu)

const filterInitial = {
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
}
const filters = ref(filterInitial)

const updateFilter = async () => {
  query.value.filter = convertFilters(filters.value)
  page.value = 0
  await articleSt.getItems(query.value)
}

const clearFilters = async () => {
  filters.value = filterInitial
  await updateFilter()
}

const updateSort = async (event: any) => {
  query.value.sort = convertSort(event)
  await articleSt.getItems(query.value)
}

onMounted(async () => {
  await updateFilter()
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="articleSt.items.data" :loading="articleSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="articleSt.items.totalCount"
                   v-model:filters="filters" filterDisplay="row" sortMode="multiple"
                   @update:filters="updateFilter"
                   @update:multiSortMeta="updateSort"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #header>
          <div class="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <Button :label="$t('clear')" icon="pi pi-times" text @click="clearFilters" severity="secondary" />
            </div>
            <div></div>
            <div></div>
          </div>
        </template>
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="articleSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="name" :header="$t('title')">
          <template #body="{ data }">
            {{ data.name }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column v-if="auth.hasPerm('article.create', 'article.edit', 'article.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('article.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createArticle()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('article.view')" type="button" icon="pi pi-eye" text severity="secondary" @click="viewArticle(data)" />
              <Button v-if="auth.hasPerm('article.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editArticle(data)" />
              <Button v-if="auth.hasPerm('article.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteArticle(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
