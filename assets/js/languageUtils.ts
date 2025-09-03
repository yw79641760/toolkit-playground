// 语言工具函数集合
export const languageUtils = {
  // 添加翻译文本到全局对象
  addTranslations(translations) {
    if (typeof window !== 'undefined' && window.$t && window.$t.messages) {
      Object.keys(translations).forEach(lang => {
        // 确保目标语言对象存在
        if (!window.$t.messages[lang]) {
          window.$t.messages[lang] = {};
        }
        Object.assign(window.$t.messages[lang], translations[lang]);
      });
    }
  },
  
  // 创建强制更新机制
  createForceUpdate() {
    const forceUpdate = ref(false);
    
    const triggerUpdate = () => {
      forceUpdate.value = !forceUpdate.value;
    };
    
    return {
      forceUpdate: readonly(forceUpdate),
      triggerUpdate
    };
  },
  
  // 设置语言变化监听器
  setupLanguageChangeListener(callback) {
    const handler = () => {
      callback();
    };
    
    onMounted(() => {
      window.addEventListener('languageChanged', handler);
    });
    
    onUnmounted(() => {
      window.removeEventListener('languageChanged', handler);
    });
    
    return handler;
  }
};