<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores'
import ClientPaymentList from '@/components/client/ClientPaymentList.vue'
import ClientChargeList from '@/components/client/ClientChargeList.vue'
import ClientUserList from '@/components/client/ClientUserList.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const client_id = route.params.id as string

const clientSt = useClientStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'client.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await clientSt.getItem(client_id)
  menu.value.push({ label: clientSt.name, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5" v-if="clientSt.item?.account">
      <Tabs value="0">
            <TabList>
                <Tab value="0">{{ $t('payments')}}</Tab>
                <Tab value="1">{{ $t('charges') }}</Tab>
                <Tab value="2">{{ $t('residents') }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <ClientPaymentList :account="clientSt.item.account" />
                </TabPanel>
                <TabPanel value="1">
                    <ClientChargeList :account="clientSt.item.account" />
                </TabPanel>
              <TabPanel value="2">
                <ClientUserList :clientId="clientSt.item.id" />
              </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
  </MainLayout>
</template>

<style>
</style>
