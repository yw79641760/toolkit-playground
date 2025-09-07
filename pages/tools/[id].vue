<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <!-- 使用独立的面包屑组件 -->
      <Breadcrumb 
        :category="breadcrumbData?.category" 
        :subcategory="breadcrumbData?.subcategory" 
        :item="currentItem" 
      />
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
        {{ $t(`categories.${currentItem.id}.name`) }}
      </h2>
      <p class="text-gray-600 mt-2 dark:text-gray-300">{{ $t('tool.description', { name: $t(`categories.${currentItem.id}.name`) }) }}</p>
    </div>
    
    <!-- 修改: 动态加载自定义工具组件 -->
    <div class="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
      <component 
        :is="toolComponent" 
        v-if="toolComponent"
        :tool-data="currentItem"
      />
      <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center dark:border-gray-600">
        <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{{ $t('tool.area') }}</h3>
        <p class="text-gray-600 dark:text-gray-300">{{ $t('tool.description', { name: $t(`categories.${currentItem.id}.name`) }) }}</p>
        <p class="text-gray-500 mt-4 dark:text-gray-400">{{ $t('tool.implementation') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获取路由参数
const route = useRoute();
const router = useRouter();

// 使用新的composable获取分类数据
const { findItemById } = await import('~/assets/js/useCategories').then(m => m.useCategories());

// 根据ID查找当前项
const currentItem = computed(() => {
  const id = parseInt(route.params.id);
  const result = findItemById(id);
  return result ? result.item : null;
});

// 计算面包屑路径
const breadcrumbData = computed(() => {
  const id = parseInt(route.params.id);
  return findItemById(id);
});

// 修改: 动态导入工具组件
const toolComponent = ref(null);

// 监听路由变化，动态加载对应工具组件
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await loadToolComponent(parseInt(newId));
  }
}, { immediate: true });

async function loadToolComponent(id) {
  try {
    // 尝试动态导入对应的工具组件
    // 组件文件命名规则: ~/components/tools/tool-{id}.vue
    const componentModule = await import(`~/components/tools/tool-${id}.vue`);
    toolComponent.value = componentModule.default || componentModule;
  } catch (error) {
    // 如果没有找到对应的组件文件，则使用默认显示
    toolComponent.value = null;
    console.warn(`未找到工具组件 ~/components/tools/tool-${id}.vue:`, error);
  }
}

// 设置页面标题
useHead({
  title: currentItem.value ? `${$t(`categories.${currentItem.value.id}.name`)} - toolkit` : '工具 - toolkit'
});
</script>
