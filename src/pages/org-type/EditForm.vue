<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useOrgTypeStore } from '@/stores'
import type { OrgType } from '@/types'

const { t } = useI18n()
const router = useRouter()
const orgTypeSt = useOrgTypeStore()

const emit = defineEmits<{
  submit: [orgType: OrgType]
  cancel: []
}>()

const canSubmit = computed(() => (
  orgTypeSt.item.name.trim().length > 0
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', orgTypeSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'org-type.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in orgTypeSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="orgType-name">{{ $t('active') }} <span style="color: red">*</span></label>
        <Checkbox id="orgType-active" v-model="orgTypeSt.item.isActive" name="isActive" :value="true" binary />
      </div>

      <div class="flex flex-col gap-2">
        <label for="orgType-name">{{ $t('name') }} <span style="color: red">*</span></label>
        <InputText id="orgType-name" v-model="orgTypeSt.item.name" :placeholder="$t('name')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="orgTypeSt.creating || orgTypeSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
