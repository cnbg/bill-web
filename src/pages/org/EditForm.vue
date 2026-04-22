<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useOrgStore, useOrgTypeStore } from '@/stores'
import type { Org } from '@/types'

const { t } = useI18n()
const router = useRouter()
const orgSt = useOrgStore()
const orgTypeSt = useOrgTypeStore()

const emit = defineEmits<{
  submit: [org: Org]
  cancel: []
}>()

const canSubmit = computed(() => (
  (orgSt.item.orgTypeId ?? '').trim().length > 0
  && (orgSt.item.name ?? '').trim().length > 0
  && !!orgSt.item.balance
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', orgSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'org.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in orgSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="org-name">{{ $t('active') }} <span style="color: red">*</span></label>
        <Checkbox id="org-active" v-model="orgSt.item.isActive" name="isActive" :value="true" binary />
      </div>


      <div class="flex flex-col gap-2">
        <label for="org-type">{{ $t('org_type') }} <span style="color: red">*</span></label>
        <Select id="org-type" v-model="orgSt.item.orgTypeId" :options="orgTypeSt.items.data"
                optionLabel="name" optionValue="id" :placeholder="$t('select')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="org-name">{{ $t('title') }} <span style="color: red">*</span></label>
        <InputText id="org-name" v-model="orgSt.item.name" :placeholder="$t('title')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="org-name">{{ $t('balance') }} <span style="color: red">*</span></label>
        <InputNumber id="org-balance" v-model="orgSt.item.balance" :placeholder="$t('balance')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="org-okpo">{{ $t('okpo') }}</label>
        <InputText id="org-okpo" v-model="orgSt.item.okpo" :placeholder="$t('okpo')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="org-inn">{{ $t('inn') }}</label>
        <InputText id="org-inn" v-model="orgSt.item.inn" :placeholder="$t('inn')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="org-note">{{ $t('note') }}</label>
        <InputText id="org-note" v-model="orgSt.item.note" :placeholder="$t('note')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="orgSt.creating || orgSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
