<script setup lang="ts">
</script>

<template>
  <DataTable dataKey="id" style="max-width: 100%" resizableColumns columnResizeMode="fit"
             paginator :rows="20" :rowsPerPageOptions="[10, 20, 50, 100]" tableStyle="min-width: 20px"
             paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
             currentPageReportTemplate="{first} to {last} of {totalRecords}" removableSort>
    <template #header>
      <slot name="header" />
    </template>
    <template #paginatorstart>
      <slot name="paginatorstart" />
    </template>
    <template #paginatorend>
      <slot name="paginatorend" />
    </template>
    <template #empty>
      <slot name="empty">
        <div class="text-center lowercase">{{ $t('empty_data') }}</div>
      </slot>
    </template>
    <template #loading>
      <slot name="loading">
        <span class="lowercase">{{ $t('loading') }} ...</span>
      </slot>
    </template>
    <slot />
  </DataTable>
</template>

<style scoped>

</style>
