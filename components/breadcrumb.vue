<template>
  <nav class="mb-4 bg-gray-100 px-4 py-2 rounded dark:bg-gray-700">
    <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
      <li>
        <span>{{ $t('breadcrumb.home') }}</span>
      </li>
      <li>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </li>
      <li v-if="category">
        <span>{{ $t(`categories.${category.id}.name`) }}</span>
      </li>
      <li v-if="category">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </li>
      <li v-if="subcategory">
        <span>{{ $t(`categories.${subcategory.id}.name`) }}</span>
      </li>
      <li v-if="subcategory">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </li>
      <li v-if="item" class="text-gray-900 font-medium dark:text-white">
        <span>{{ $t(`categories.${item.id}.name`) }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
// 修改: 使用标准的$t函数
const { locale } = useI18n();

const props = defineProps({
  category: Object,
  subcategory: Object,
  item: Object
});


</script>
