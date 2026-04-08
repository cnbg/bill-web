<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores'

const auth = useAuthStore()

const blocks = ref([
  {
    name: 'reference',
    perms: ['region.view', 'district.view', 'address.view', 'org-type.view', 'client-type.view'],
    items: [
      { label: 'regions', route: 'region.list', perm: 'region.view' },
      { label: 'districts', route: 'district.list', perm: 'district.view' },
      { label: 'addresses', route: 'address.list', perm: 'address.view' },
      { label: 'org_types', route: 'org-type.list', perm: 'org-type.view' },
      { label: 'client_types', route: 'client-type.list', perm: 'client-type.view' },
    ],
  },
  {
    name: 'billing',
    perms: ['org.view', 'user.view', 'client.view', 'charge.view', 'payment.view', 'expense.view', 'balance.view'],
    items: [
      { label: 'orgs', route: 'org.list', perm: 'org.view' },
      { label: 'clients', route: 'client.list', perm: 'client.view' },
      { label: 'residents', route: 'user.list', perm: 'user.view' },
      { label: 'charges', route: 'charge.list', perm: 'charge.view' },
      { label: 'payments', route: 'payment.list', perm: 'payment.view' },
      { label: 'expenses', route: 'expense.list', perm: 'expense.view' },
      { label: 'balance', route: 'balance.list', perm: 'balance.view' },
    ],
  },
  {
    name: 'support',
    perms: ['article.view'],
    items: [
      { label: 'articles', route: 'article.list', perm: 'article.view' },
    ],
  },
  {
    name: 'settings',
    perms: ['role.view', 'rate.view', 'fine.view'],
    items: [
      { label: 'rate', route: 'rate.list', perm: 'rate.view' },
      { label: 'fine', route: 'fine.list', perm: 'fine.view' },
      { label: 'roles', route: 'role.list', perm: 'role.view' },
    ],
  },
])
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-8 mt-5">
      <div v-for="(block, index) in blocks" :key="index" class="">
        <template v-if="auth.hasPerm(...block.perms)">
          <h1 class="text-2xl">{{ $t(block.name) }}</h1>
          <hr class="my-3 border-gray-400" />
          <div class="flex flex-wrap gap-4">
            <Button
              v-for="(item, idx) in block.items" :key="idx"
              @click="$router.push({name: item.route})" v-show="auth.hasPerm(item.perm)"
              outlined severity="secondary" :label="$t(item.label)" class="" />
          </div>
        </template>
      </div>
    </div>
  </MainLayout>
</template>
