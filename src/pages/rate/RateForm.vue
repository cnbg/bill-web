<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRateStore } from '@/stores'
import type { Rate } from '@/types'

const { t } = useI18n()
const router = useRouter()
const rateSt = useRateStore()

const emit = defineEmits<{
  submit: [rate: Omit<Rate, 'id'>]
  cancel: []
}>()

const form = reactive(rateSt.item)

const typeOptions = computed(() => ([
  { label: t('fix'), value: 'fix' },
  { label: t('member'), value: 'member' },
  { label: t('msquare'), value: 'area' },
]))

const canSubmit = computed(() => (
  form.name.trim().length > 0
  && !!form.type
  && !!form.price
  && !!form.startDate
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  const payload: Omit<Rate, 'id'> = {
    name: String(form.name).trim(),
    type: String(form.type),
    price: Number(form.price),
    note: String(form.note).trim(),
    startDate: String(form.startDate),
    endDate: String(form.endDate),
    isActive: Boolean(form.isActive)
  }

  emit('submit', payload as any)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'rate.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in rateSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="rate-name">{{ $t('name') }} <span style="color: red">*</span></label>
        <InputText id="rate-name" v-model="form.name" :placeholder="$t('name')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="rate-type">{{ $t('type') }} <span style="color: red">*</span></label>
        <Select id="rate-type" v-model="form.type" :options="typeOptions" optionLabel="label" optionValue="value" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="rate-price">{{ $t('price') }} <span style="color: red">*</span></label>
        <InputNumber id="rate-price" v-model="form.price" mode="decimal" :min="0" :placeholder="$t('price')" fluid />
      </div>

      <div class="flex flex-col gap-2">
        <label for="rate-start">{{ $t('start') }} <span style="color: red">*</span></label>
        <InputText id="rate-start" v-model="form.startDate" type="date" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="rate-end">{{ $t('end') }}</label>
        <InputText id="rate-end" v-model="form.endDate" type="date" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="rate-note">{{ $t('note') }}</label>
        <InputText id="rate-note" v-model="form.note" :placeholder="$t('note')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="rateSt.creating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
