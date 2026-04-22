<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRegionStore } from '@/stores'
import type { Region } from '@/types'

const { t } = useI18n()
const router = useRouter()
const regionSt = useRegionStore()

const emit = defineEmits<{
  submit: [region: Region]
  cancel: []
}>()

const canSubmit = computed(() => (
  regionSt.item.code.trim().length > 0
  && regionSt.item.name.trim().length > 0
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', regionSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'region.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in regionSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="region-code">{{ $t('code') }} <span style="color: red">*</span></label>
        <InputText id="region-code" v-model="regionSt.item.code" :placeholder="$t('code')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="region-name">{{ $t('name') }} <span style="color: red">*</span></label>
        <InputText id="region-name" v-model="regionSt.item.name" :placeholder="$t('name')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="regionSt.creating || regionSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
