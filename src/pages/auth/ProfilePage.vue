<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores'
import { Org } from '@/types'

const { t } = useI18n()
const auth = useAuthStore()

const currentOrg = ref<Org>(auth.user.org as Org)

const logout = async () => {
  if (confirm(t('are_you_sure'))) {
    await auth.logout()
  }
}

onMounted(async () => {
  await auth.profile()
})
</script>

<template>
  <MainLayout>
    <div v-if="Object.keys(auth.user).length > 0" class="max-w-screen-sm flex flex-col align-center gap-10 mx-auto my-6">
      <div class="flex justify-between items-center gap-5">
        <div class="flex flex-wrap gap-5 items-center">
          <Avatar v-if="auth.user.photo" :image="auth.user.photo" size="xlarge" @click="$router.push('/')" class="cursor-pointer" />
          <Avatar v-else icon="pi pi-user" size="xlarge" @click="$router.push('/')" class="cursor-pointer" />
          <div>
            <div class="font-bold lg:text-3xl text-xl">{{ auth.user.name }}</div>
            <div class="text-gray-500 lg:text-lg text-md">{{ auth.user.email }}</div>
          </div>
        </div>
        <Button icon="pi pi-sign-out" :label="$t('logout')" @click="logout" outlined severity="secondary" />
      </div>
      <div class="flex flex-col gap-5">
        <div>
          <h1 class="text-lg font-bold mb-2">{{ $t('org') }}</h1>
          <div class="flex flex-wrap gap-2 items-center">
            <Select
              v-model="currentOrg" :options="auth.user.orgs" optionLabel="name"
              :placeholder="$t('select_org')" class="min-w-40" size="small" />
            <Button
              :label="$t('switch_org')" severity="secondary" outlined size="small"
              @click="auth.setOrg(currentOrg, true)" :disabled="currentOrg.id == auth.user.org?.id" />
          </div>
        </div>
        <div>
          <h1 class="text-lg font-bold mb-2">{{ $t('roles') }}</h1>
          <div class="flex flex-wrap gap-2">
            <Tag v-for="(role,index) in auth.user.roles" :key="index" :value="role" severity="secondary" />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        <h1 class="w-full">{{ $t('language') }}</h1>
        <Button v-for="locale in auth.locales" @click="auth.setLocale(locale.key, true); $i18n.locale = locale.key"
                :key="locale.key" :label="locale.name" outlined size="small"
                :severity="locale.key === auth.locale ? 'primary' : 'secondary'"
                :icon="locale.key === auth.locale ? 'pi pi-check' : 'pi pi-minus'" />
      </div>
      <div class="flex flex-wrap gap-4">
        <h1 class="w-full">{{ $t('theme') }}</h1>
        <Button v-for="theme in ['dark', 'light']" :label="$t(theme)"
                @click="auth.setTheme(theme, true)" outlined size="small"
                :severity="auth.theme === theme ? 'primary' : 'secondary'"
                :icon="auth.theme === theme ? 'pi pi-check' : 'pi pi-minus'"
        />
      </div>
    </div>
  </MainLayout>
</template>

<style>

</style>
