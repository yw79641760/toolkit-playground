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
// 添加面包屑翻译文本
const breadcrumbTranslations = {
  'zh-CN': {
    breadcrumb: {
      home: '首页'
    }
  },
  'en': {
    breadcrumb: {
      home: 'Home'
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
languageUtils.addTranslations(breadcrumbTranslations);

const props = defineProps({
  category: Object,
  subcategory: Object,
  item: Object
});

// 修改: 添加响应式变量用于强制更新
// 修改: 使用工具函数创建强制更新机制
const { forceUpdate, triggerUpdate } = languageUtils.createForceUpdate();

// 修改: 监听语言变化事件，强制组件更新
// 修改: 使用工具函数设置语言变化监听器
languageUtils.setupLanguageChangeListener(triggerUpdate);

// 添加一个计算属性来触发更新
const displayText = computed(() => {
  return forceUpdate.value ? 'update' : 'update';
});
</script>