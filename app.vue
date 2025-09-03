<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// 在Nuxt 3中，我们使用<script setup>而不是普通的<script>

// 提供全局状态
const selectedCategory = ref(null);
const selectedItem = ref(null);

provide('selectedCategory', selectedCategory);
provide('selectedItem', selectedItem);
</script>