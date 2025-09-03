// 语言资源映射
const messages = {
  'zh-CN': {
    site: {
      title: 'Toolkit'
    },
    nav: {
      feedback: '问题反馈',
      language: '语言选择',
      lightMode: '切换到浅色模式',
      darkMode: '切换到深色模式'
    },
    footer: {
      copyright: '© {year} Toolkit Playground. 保留所有权利.',
      about: '关于我们',
      privacy: '隐私政策',
      terms: '使用条款',
      contact: '联系我们'
    },
    categories: {
      '1': { name: '开发工具' },
      '101': { name: '代码处理' },
      '102': { name: '文本处理' },
      '2': { name: '图片处理' }, 
      '201': { name: '图片编辑' },
      '3': { name: '网络工具' },
      '301': { name: 'IP查询' },
      '1001': { name: 'Base64编解码' },
      '1002': { name: 'JSON格式化' },
      '1003': { name: '时间戳转换' },
      '1004': { name: '文本对比' },
      '1005': { name: '正则表达式' },
      '2001': { name: '图片压缩' },
      '2002': { name: '格式转换' },
      '3001': { name: 'IP地址查询' }
    }
  },
  'en': {
    site: {
      title: 'Toolkit'
    },
    nav: {
      feedback: 'Feedback',
      language: 'Language',
      lightMode: 'Switch to light mode',
      darkMode: 'Switch to dark mode'
    },
    footer: {
      copyright: '© {year} Toolkit Playground. All rights reserved.',
      about: 'About Us',
      privacy: 'Privacy Policy', 
      terms: 'Terms of Use',
      contact: 'Contact Us'
    },
    categories: {
      '1': { name: 'Development Tools' },
      '101': { name: 'Code Processing' },
      '102': { name: 'Text Processing' },
      '2': { name: 'Image Processing' },
      '201': { name: 'Image Editing' },
      '3': { name: 'Network Tools' },
      '301': { name: 'IP Query' },
      '1001': { name: 'Base64 Encode/Decode' },
      '1002': { name: 'JSON Formatter' },
      '1003': { name: 'Timestamp Converter' },
      '1004': { name: 'Text Comparison' },
      '1005': { name: 'Regular Expression' },
      '2001': { name: 'Image Compression' },
      '2002': { name: 'Format Conversion' },
      '3001': { name: 'IP Address Lookup' }
    }
  }
};

export const useLanguage = () => {
  // 获取当前语言，优先级：localStorage > 浏览器默认语言 > 默认中文
  const getCurrentLanguage = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('language')) {
      return localStorage.getItem('language');
    }
    
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || navigator.languages[0];
      if (browserLang.startsWith('zh')) {
        return 'zh-CN';
      } else if (browserLang.startsWith('en')) {
        return 'en';
      }
    }
    
    return 'zh-CN'; // 默认语言
  };

  // 响应式当前语言
  const currentLanguage = ref(getCurrentLanguage());

  // 设置语言
  const setLanguage = (lang) => {
    currentLanguage.value = lang;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    // 触发语言更新事件
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  // 获取翻译文本
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = messages[currentLanguage.value];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // 如果当前语言没有翻译，回退到中文
        value = messages['zh-CN'];
        for (const k of keys) {
          value = value?.[k];
        }
        break;
      }
    }
    
    // 处理参数替换
    if (typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match;
      });
    }
    
    return value || key;
  };

  // 全局属性
  if (process.client) {
    window.$t = t;
    // 添加messages到全局$t函数上，供其他组件合并翻译文本使用
    window.$t.messages = messages;
  }

  return {
    currentLanguage: readonly(currentLanguage),
    setLanguage,
    t
  };
};