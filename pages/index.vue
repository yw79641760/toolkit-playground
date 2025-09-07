<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center py-12">
      <h2 class="text-4xl font-bold text-gray-800 mb-4 dark:text-white">{{ $t('home.welcome') }}</h2>
      <p class="text-xl text-gray-600 mb-8 dark:text-gray-300">{{ $t('home.description') }}</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="category in categories" 
          :key="category.id"
          @click="selectCategory(category)"
          class="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800 dark:hover:shadow-gray-700/50"
        >
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{{ $t(`categories.${category.id}.name`) }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ $t('home.explore', { name: $t(`categories.${category.id}.name`) }) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获取布局中的状态
const selectedCategory = inject('selectedCategory', ref(null));

// 使用新的composable获取分类数据
const { categories } = await import('~/assets/js/useCategories').then(m => m.useCategories());

// 选择分类
const selectCategory = (category) => {
  selectedCategory.value = category;
};
</script>
