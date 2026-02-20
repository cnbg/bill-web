<script setup lang="ts">

</script>

<template>
  <DataTable dataKey="id"
             columnResizeMode="fit" style="max-width: 100%"
             paginator :rows="20" :rowsPerPageOptions="[10, 20, 50, 100]" tableStyle="min-width: 50rem"
             paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
             currentPageReportTemplate="{first} to {last} of {totalRecords}">
    <template #paginatorstart>
      <slot name="paginatorstart" />
    </template>
    <template #paginatorend>
      <slot name="paginatorend" />
    </template>
    <slot />
  </DataTable>
</template>

<style scoped>

</style>
