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
// 添加首页翻译文本
const homeTranslations = {
  'zh-CN': {
    home: {
      welcome: '欢迎来到 Toolkit Playground',
      description: '一站式工具集，提升您的开发效率',
      explore: '探索{name}工具'
    }
  },
  'en': {
    home: {
      welcome: 'Welcome to Toolkit Playground',
      description: 'One-stop toolset to enhance your development efficiency',
      explore: 'Explore {name} tools'
    }
  }
};

// 获取语言管理composable
import { useLanguage } from '~/assets/js/useLanguage';
// 新增: 导入语言工具函数
import { languageUtils } from '~/assets/js/languageUtils';
const { t: $t, currentLanguage } = useLanguage();

// 合并翻译文本到全局翻译对象
// 修改: 使用工具函数处理翻译文本合并
languageUtils.addTranslations(homeTranslations);

// 获取布局中的状态
const selectedCategory = inject('selectedCategory', ref(null));

// 使用新的composable获取分类数据
const { categories } = await import('~/assets/js/useCategories').then(m => m.useCategories());

// 选择分类
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// 监听语言变化以触发重新渲染
// 修改: 使用工具函数创建强制更新机制
const { forceUpdate, triggerUpdate } = languageUtils.createForceUpdate();

// 修改: 使用工具函数设置语言变化监听器
languageUtils.setupLanguageChangeListener(triggerUpdate);

// 添加一个计算属性来触发更新
const displayText = computed(() => {
  return forceUpdate.value ? 'update' : 'update';
});
</script>