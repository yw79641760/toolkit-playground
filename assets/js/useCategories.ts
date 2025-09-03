interface CategoryItem {
  id: number;
  name: string;
  icon: string;
}

interface Subcategory extends CategoryItem {
  subcategories?: CategoryItem[];
}

interface Category extends CategoryItem {
  subcategories: Subcategory[];
}

interface FindResult {
  item: CategoryItem;
  category: Category;
  subcategory: Subcategory;
}

// 缓存分类数据，避免重复加载
let cachedCategories: Category[] | null = null;

export const useCategories = async () => {
  // 如果已有缓存数据，直接返回
  if (cachedCategories) {
    return {
      categories: cachedCategories,
      findItemById
    };
  }
  
  const config = await import('~/config/categories.json').then(m => m.default || m);
  cachedCategories = config.categories || [];
  
  function findItemById(id: number): FindResult | null {
    if (!cachedCategories) return null;
    
    for (const category of cachedCategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.subcategories) {
          const item = subcategory.subcategories.find(item => item.id === id);
          if (item) {
            return { item, category, subcategory };
          }
        }
      }
    }
    return null;
  }
  
  return {
    categories: cachedCategories,
    findItemById
  };
};