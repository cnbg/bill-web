<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRoleStore } from '@/stores'
import type { Role } from '@/types'

const { t } = useI18n()
const router = useRouter()
const roleSt = useRoleStore()

const emit = defineEmits<{
  submit: [role: Role]
  cancel: []
}>()

const canSubmit = computed(() => (
  roleSt.item.name.trim().length > 0
))

const submitForm = () => {
  if (!canSubmit.value) {
    alert(t('fill_required_fields'))
    return
  }

  emit('submit', roleSt.item)
}

const cancelForm = () => {
  emit('cancel')
  router.push({ name: 'role.list' })
}
</script>

<template>
  <div class="card mt-5">
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <Message v-for="(error, index) in roleSt.errors" :key="`${error}-${index}`" severity="error">
        {{ $t(error) }}
      </Message>

      <div class="flex flex-col gap-2">
        <label for="role-name">{{ $t('active') }} <span style="color: red">*</span></label>
        <Checkbox id="role-active" v-model="roleSt.item.isActive" name="isActive" :value="true" binary />
      </div>

      <div class="flex flex-col gap-2">
        <label for="role-name">{{ $t('name') }} <span style="color: red">*</span></label>
        <InputText id="role-name" v-model="roleSt.item.name" :placeholder="$t('name')" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="role-note">{{ $t('note') }}</label>
        <InputText id="role-note" v-model="roleSt.item.note" :placeholder="$t('note')" />
      </div>

      <div class="flex gap-2 justify-between">
        <Button type="submit" :label="$t('save')" :loading="roleSt.creating || roleSt.updating" />
        <Button type="button" :label="$t('cancel')" severity="secondary" outlined @click="cancelForm" />
      </div>
    </form>
  </div>
</template>
