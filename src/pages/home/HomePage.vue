<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import MainLayout from '@/layouts/MainLayout.vue'

const { t } = useI18n()
const auth = useAuthStore()

const blocks = ref([
  {
    name: t('reference'),
    perms: ['region.view', 'district.view', 'address.view', 'org-type.view', 'client-type.view'],
    items: [
      { label: t('regions'), route: 'region.list', perm: 'region.view' },
      { label: t('districts'), route: 'district.list', perm: 'district.view' },
      { label: t('addresses'), route: 'address.list', perm: 'address.view' },
      { label: t('org_types'), route: 'org-type.list', perm: 'org-type.view' },
      { label: t('client_types'), route: 'client-type.list', perm: 'client-type.view' },
    ],
  },
  {
    name: t('billing'),
    perms: ['org.view', 'user.view', 'client.view', 'charge.view', 'payment.view', 'expense.view', 'fine.view', 'balance.view'],
    items: [
      { label: t('orgs'), route: 'org.list', perm: 'org.view' },
      { label: t('users'), route: 'user.list', perm: 'user.view' },
      { label: t('clients'), route: 'client.list', perm: 'client.view' },
      { label: t('charges'), route: 'charge.list', perm: 'charge.view' },
      { label: t('payments'), route: 'payment.list', perm: 'payment.view' },
      { label: t('expenses'), route: 'expense.list', perm: 'expense.view' },
      { label: t('fines'), route: 'fine.list', perm: 'fine.view' },
      { label: t('balance'), route: 'balance.list', perm: 'balance.view' },
    ],
  },
  {
    name: t('support'),
    perms: ['article.view'],
    items: [
      { label: t('articles'), route: 'article.list', perm: 'article.view' },
    ],
  },
  {
    name: t('settings'),
    perms: ['role.view', 'perm.view'],
    items: [
      { label: t('roles'), route: 'role.list', perm: 'role.view' },
      { label: t('perms'), route: 'perm.list', perm: 'perm.view' },
    ],
  },
])
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-8 mt-5">
      <div v-for="(block, index) in blocks" :key="index" class="">
        <template v-if="auth.hasPerm(...block.perms)">
          <h1 class="text-2xl">{{ block.name }}</h1>
          <hr class="my-3 border-gray-400" />
          <div class="flex flex-wrap gap-4">
            <Button
              v-for="(item, idx) in block.items" :key="idx"
              @click="$router.push({name: item.route})" v-show="auth.hasPerm(item.perm)"
              outlined severity="secondary" :label="item.label" class="" />
          </div>
        </template>
      </div>
    </div>
  </MainLayout>
</template>
