<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useExpenseStore } from '@/stores'
import type { Expense } from '@/types'

const { t } = useI18n()
const router = useRouter()
const expenseSt = useExpenseStore()

const emit = defineEmits<{
  submit: [expense: Expense]
  cancel: []
}>()

const canSubmit = computed(() => (
  expenseSt.item.amount > 0
  && expenseSt.item.note.trim().length > 0
  && expenseSt.item.month > 0
  && expenseSt.item.year >= new Date().getFullYear()
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', expenseSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'expense.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in expenseSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="expense-note">{{ $t('note') }} <span style="color: red">*</span></label>
        <InputText id="expense-note" v-model="expenseSt.item.note" :placeholder="$t('note')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="expense-note">{{ $t('amount') }} <span style="color: red">*</span></label>
        <InputNumber id="expense-note" v-model="expenseSt.item.amount" :placeholder="$t('amount')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="expense-year">{{ $t('year') }} <span style="color: red">*</span></label>
        <InputNumber id="expense-year" v-model="expenseSt.item.year" :placeholder="$t('year')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="expense-note">{{ $t('month') }} <span style="color: red">*</span></label>
        <InputNumber id="expense-note" v-model="expenseSt.item.month" :placeholder="$t('month')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="expenseSt.creating || expenseSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
