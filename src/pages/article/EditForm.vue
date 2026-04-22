<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useArticleStore, useRegionStore } from '@/stores'
import type { Article } from '@/types'

const { t } = useI18n()
const router = useRouter()
const regionSt = useRegionStore()
const articleSt = useArticleStore()

const emit = defineEmits<{
  submit: [article: Article]
  cancel: []
}>()

const canSubmit = computed(() => (
  articleSt.item.name.trim().length > 0
  && articleSt.item.content.trim().length > 0
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', articleSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'article.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in articleSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="article-name">{{ $t('name') }} <span style="color: red">*</span></label>
        <InputText id="article-name" v-model="articleSt.item.name" :placeholder="$t('name')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="article-content">{{ $t('content') }} <span style="color: red">*</span></label>
        <Editor v-model="articleSt.item.content" editorStyle="height: 320px" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="articleSt.creating || articleSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
