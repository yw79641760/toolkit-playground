<template>
  <div class="tool-1001">
    <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Base64编解码工具</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 编码区域 -->
      <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
        <h4 class="font-medium mb-2 text-gray-700 dark:text-gray-300">文本编码为Base64</h4>
        <textarea
          v-model="encodeInput"
          placeholder="输入要编码的文本"
          class="w-full h-32 p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
        ></textarea>
        <div class="mt-2 flex space-x-2">
          <button
            @click="encodeText"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            编码
          </button>
          <button
            @click="clearEncode"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
        </div>
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">编码结果:</label>
          <textarea
            v-model="encodeOutput"
            readonly
            class="w-full h-24 p-2 border border-gray-300 rounded bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500"
          ></textarea>
        </div>
      </div>
      
      <!-- 解码区域 -->
      <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
        <h4 class="font-medium mb-2 text-gray-700 dark:text-gray-300">Base64解码为文本</h4>
        <textarea
          v-model="decodeInput"
          placeholder="输入Base64编码"
          class="w-full h-32 p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
        ></textarea>
        <div class="mt-2 flex space-x-2">
          <button
            @click="decodeText"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            解码
          </button>
          <button
            @click="clearDecode"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
        </div>
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">解码结果:</label>
          <textarea
            v-model="decodeOutput"
            readonly
            class="w-full h-24 p-2 border border-gray-300 rounded bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500"
          ></textarea>
        </div>
      </div>
    </div>
    
    <div class="mt-6 p-4 bg-yellow-50 rounded-lg dark:bg-yellow-900/30">
      <h4 class="font-medium text-yellow-800 dark:text-yellow-200">使用说明</h4>
      <ul class="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1 dark:text-yellow-300">
        <li>在左侧输入文本内容，点击"编码"按钮将其转换为Base64格式</li>
        <li>在右侧输入Base64编码，点击"解码"按钮还原为原始文本</li>
        <li>Base64是一种常见的编码方式，用于在传输层安全地传输二进制数据</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 定义组件props
const props = defineProps({
  toolData: {
    type: Object,
    required: true
  }
});

// 编码相关数据
const encodeInput = ref('');
const encodeOutput = ref('');

// 解码相关数据
const decodeInput = ref('');
const decodeOutput = ref('');

// 编码函数
const encodeText = () => {
  try {
    encodeOutput.value = btoa(encodeURIComponent(encodeInput.value));
  } catch (error) {
    encodeOutput.value = '编码失败: ' + error.message;
  }
};

// 解码函数
const decodeText = () => {
  try {
    decodeOutput.value = decodeURIComponent(atob(decodeInput.value));
  } catch (error) {
    decodeOutput.value = '解码失败: ' + error.message;
  }
};

// 清空编码区域
const clearEncode = () => {
  encodeInput.value = '';
  encodeOutput.value = '';
};

// 清空解码区域
const clearDecode = () => {
  decodeInput.value = '';
  decodeOutput.value = '';
};
</script>

<style scoped>
.tool-1001 textarea {
  resize: vertical;
}
</style>