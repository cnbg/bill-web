<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDistrictStore, useRegionStore } from '@/stores'
import type { District } from '@/types'

const { t } = useI18n()
const router = useRouter()
const regionSt = useRegionStore()
const districtSt = useDistrictStore()

const emit = defineEmits<{
  submit: [district: District]
  cancel: []
}>()

const canSubmit = computed(() => (
  (districtSt.item.regionId ?? '').trim().length > 0
  && districtSt.item.code.trim().length > 0
  && districtSt.item.name.trim().length > 0
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', districtSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'district.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in districtSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="district-region">{{ $t('region') }} <span style="color: red">*</span></label>
        <Select id="district-region" v-model="districtSt.item.regionId" :options="regionSt.items.data"
                optionLabel="name" optionValue="id" :placeholder="$t('select')" />
      </div>


      <div class="flex flex-col gap-2">
        <label for="district-code">{{ $t('code') }} <span style="color: red">*</span></label>
        <InputText id="district-code" v-model="districtSt.item.code" :placeholder="$t('code')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="district-name">{{ $t('name') }} <span style="color: red">*</span></label>
        <InputText id="district-name" v-model="districtSt.item.name" :placeholder="$t('name')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="districtSt.creating || districtSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
