<script setup lang="ts">

</script>

<template>
  <DataTable dataKey="id" style="max-width: 100%" resizableColumns columnResizeMode="fit"
             paginator :rows="20" :rowsPerPageOptions="[10, 20, 50, 100]" tableStyle="min-width: 50px"
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
