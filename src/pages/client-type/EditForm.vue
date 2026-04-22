<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useClientTypeStore } from '@/stores'
import type { ClientType } from '@/types'

const { t } = useI18n()
const router = useRouter()
const clientTypeSt = useClientTypeStore()

const emit = defineEmits<{
  submit: [clientType: ClientType]
  cancel: []
}>()

const canSubmit = computed(() => (
  clientTypeSt.item.name.trim().length > 0
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', clientTypeSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'org-type.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in clientTypeSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="clientType-name">{{ $t('active') }} <span style="color: red">*</span></label>
        <Checkbox id="clientType-active" v-model="clientTypeSt.item.isActive" name="isActive" :value="true" binary />
      </div>

      <div class="flex flex-col gap-2">
        <label for="clientType-name">{{ $t('name') }} <span style="color: red">*</span></label>
        <InputText id="clientType-name" v-model="clientTypeSt.item.name" :placeholder="$t('name')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="clientTypeSt.creating || clientTypeSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
