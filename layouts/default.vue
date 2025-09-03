<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    <!-- 导航栏 -->
    <header class="bg-white shadow dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex justify-start items-center">
            <!-- 修改: 为logo添加指向首页的链接 -->
            <NuxtLink to="/">
              <img src="/assets/images/logo.png" alt="网站logo" class="h-12 w-auto mr-3">
            </NuxtLink>
            <!-- 修改: 为网站标题添加指向首页的链接 -->
            <NuxtLink to="/" class="text-2xl font-bold text-gray-900 mr-4 dark:text-white">
              {{ $t('site.title') }}
            </NuxtLink>
            <nav class="hidden md:block">
              <ul class="flex space-x-8">
                <li v-for="category in categories" :key="category.id">
                  <a 
                    @click="selectCategory(category)" 
                    class="cursor-pointer text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
                    :class="{ 'text-blue-600 dark:text-blue-400': selectedCategory?.id === category.id }"
                  >
                    {{ $t(`categories.${category.id}.name`) }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div class="flex items-center">
            <!-- 新增: 问题反馈按钮 -->
            <a 
              href="https://github.com/yw79641760/toolkit-playground/issues/new?title=%E9%97%AE%E9%A2%98%E5%8F%8D%E9%A6%88&labels=bug"
              target="_blank"
              class="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors mr-2"
              :aria-label="$t('nav.feedback')"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </a>
            
            <!-- 修改: 语言选择按钮和下拉菜单 -->
            <div class="relative">
              <button 
                @click="toggleLanguageDropdown"
                class="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                :aria-label="$t('nav.language')"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                </svg>
              </button>
              
              <div 
                v-show="showLanguageDropdown"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10"
              >
                <button 
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                  :class="{ 'bg-blue-100 dark:bg-blue-900': currentLanguage === 'zh-CN' }"
                  @click="setLanguage('zh-CN')"
                >
                  简体中文
                </button>
                <button 
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                  :class="{ 'bg-blue-100 dark:bg-blue-900': currentLanguage === 'en' }"
                  @click="setLanguage('en')"
                >
                  English
                </button>
              </div>
            </div>
            
            <button 
              @click="toggleDarkMode"
              class="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors ml-2"
              :aria-label="isDark ? $t('nav.lightMode') : $t('nav.darkMode')"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- 侧边栏 -->
      <aside v-if="selectedCategory" class="bg-white shadow-md hidden md:block dark:bg-gray-800 flex flex-col"
             :class="sidebarCollapsed ? 'w-20' : 'w-64'">
        <div class="flex-1 py-4">
          <ul>
            <li v-for="subcategory in selectedCategory.subcategories" :key="subcategory.id">
              <div 
                @click="toggleSubcategory(subcategory)" 
                class="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                <div class="flex items-center">
                  <span class="text-lg mr-2">{{ subcategory.icon || '📁' }}</span>
                  <span v-if="!sidebarCollapsed" class="font-medium">{{ $t(`categories.${subcategory.id}.name`) }}</span>
                </div>
                <span v-if="subcategory.subcategories && !sidebarCollapsed">
                  <svg 
                    class="w-4 h-4 transition-transform dark:text-gray-300" 
                    :class="{ 'transform rotate-180': subcategory.expanded }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </div>
              
              <ul v-if="subcategory.subcategories" 
                  class="pl-6 bg-gray-50 dark:bg-gray-700"
                  :class="[sidebarCollapsed ? 'py-2' : '', subcategory.expanded ? '' : 'hidden']">
                <li v-for="item in subcategory.subcategories" :key="item.id">
                  <NuxtLink 
                    :to="`/tools/${item.id}`"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-600 flex items-center"
                    :class="{ 
                      'text-blue-600 dark:text-blue-400 font-bold': selectedItem?.id === item.id,
                      'font-bold': isCurrentRoute(item.id)
                    }"
                    :style="{ color: isCurrentRoute(item.id) ? 'rgb(22,93,255)' : '' }"
                  >
                    <span class="text-base" :class="sidebarCollapsed ? '' : 'mr-2'">{{ item.icon || '🔧' }}</span>
                    <span v-if="!sidebarCollapsed">{{ $t(`categories.${item.id}.name`) }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div class="py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="px-4">
            <button @click="toggleSidebar" 
                    class="flex items-center justify-center w-full py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded">
              <svg v-if="sidebarCollapsed" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-1 container mx-auto px-4 py-6 bg-white dark:bg-gray-900">
        <slot />
      </main>
    </div>

    <footer class="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-600 dark:text-gray-400 text-sm">
            {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
          </div>
          <div class="mt-4 md:mt-0">
            <ul class="flex space-x-6">
              <li>
                <a href="#" class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm">{{ $t('footer.about') }}</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm">{{ $t('footer.privacy') }}</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm">{{ $t('footer.terms') }}</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm">{{ $t('footer.contact') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 使用新的composable获取分类数据
const { categories } = await import('~/assets/js/useCategories').then(m => m.useCategories());

// 获取语言管理composable
const { currentLanguage, setLanguage, t: $t } = await import('~/assets/js/useLanguage').then(m => m.useLanguage());

// 响应式状态
const selectedCategory = inject('selectedCategory', ref(null));
const selectedItem = inject('selectedItem', ref(null));
const isDark = ref(false);
const sidebarCollapsed = ref(false);
// 新增: 语言下拉菜单显示状态
const showLanguageDropdown = ref(false);

// 选择一级分类
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// 展开/折叠二级分类
const toggleSubcategory = (subcategory) => {
  subcategory.expanded = !subcategory.expanded;
};

// 切换侧边栏收起状态
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// 暗黑模式切换
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};

// 根据当前主题设置更新DOM和状态
const updateDarkMode = (isDarkMode) => {
  isDark.value = isDarkMode;
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 新增: 切换语言下拉菜单显示状态
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

// 新增: 点击其他地方关闭语言下拉菜单
const handleClickOutside = (event) => {
  const languageButton = document.querySelector('[aria-label="语言选择"]');
  if (languageButton && !languageButton.contains(event.target)) {
    showLanguageDropdown.value = false;
  }
};

// 初始化暗黑模式
onMounted(() => {
  // 检查本地存储或系统偏好
  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    updateDarkMode(true);
  } else {
    updateDarkMode(false);
  }
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // 只有在用户没有手动设置主题时才跟随系统变化
    if (!('theme' in localStorage)) {
      updateDarkMode(e.matches);
    }
  });
  
  // 页面刷新时初始化selectedCategory
  // 通过当前路由判断应该选择哪个分类
  const route = useRoute();
  if (route.path.startsWith('/tools/')) {
    const id = parseInt(route.params.id);
    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.subcategories) {
          const item = subcategory.subcategories.find(item => item.id === id);
          if (item) {
            selectedCategory.value = category;
            // 展开包含当前项目的子分类
            subcategory.expanded = true;
            break;
          }
        }
      }
      if (selectedCategory.value) break;
    }
  }
  
  // 新增: 添加点击事件监听器以关闭语言下拉菜单
  document.addEventListener('click', handleClickOutside);
  
  // 监听语言变化事件
  window.addEventListener('languageChanged', handleLanguageChange);
});

// 在组件卸载时清理事件监听器
onUnmounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateDarkMode);
  // 新增: 移除点击事件监听器
  document.removeEventListener('click', handleClickOutside);
  // 移除语言变化监听器
  window.removeEventListener('languageChanged', handleLanguageChange);
});

// 处理语言变化事件
const handleLanguageChange = (event) => {
  // 语言变化时不需要刷新页面，只需要重新渲染组件
  // 这里可以添加任何需要在语言切换时执行的逻辑
};

// 添加判断当前路由的函数
const route = useRoute();
const isCurrentRoute = (id) => {
  return route.path === `/tools/${id}`;
};

// 提供categories给子组件使用
provide('categories', categories);
</script>