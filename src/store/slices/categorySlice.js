import { createSlice } from '@reduxjs/toolkit';

// Helper function to calculate category counts
const calculateCategoryCounts = (products, categories) => {
  const counts = {};
  
  categories.forEach(category => {
    counts[category.name] = products.filter(product => 
      product.categories && product.categories.includes(category.id)
    ).length;
  });
  
  return counts;
};

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categoryCounts: {},
    isLoading: false,
    error: null
  },
  reducers: {
    setCategoryCounts: (state, action) => {
      const { products, categories } = action.payload;
      state.categoryCounts = calculateCategoryCounts(products, categories);
    },
    updateCategoryCounts: (state, action) => {
      state.categoryCounts = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setCategoryCounts, 
  updateCategoryCounts, 
  setLoading, 
  setError 
} = categorySlice.actions;

// Selector
export const selectCategoryCounts = (state) => state.categories.categoryCounts;
export const selectCategoryCount = (categoryName) => (state) => 
  state.categories.categoryCounts[categoryName] || 0;

export default categorySlice.reducer;