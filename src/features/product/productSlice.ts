import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productData from "../../data/products.json";

export interface CategoryCard {
  id: string;
  title: string;
  desc: string;
  image: string;
}

export interface ProductItem {
  id: number;
  categoryId: string;
  name: string;
  brand: string;
  color: string;
  rating: number;
  price: number;
  image: string;
}

interface ProductFilters {
  category: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  brand: string;
  color: string;
}

interface ProductState {
  categoryCards: CategoryCard[];
  products: ProductItem[];
  filters: ProductFilters;
}

const initialState: ProductState = {
  categoryCards: productData.categoryCards,
  products: productData.products,
  filters: {
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    brand: "",
    color: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ key: keyof ProductFilters; value: string }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilter, clearFilters } = productSlice.actions;
export default productSlice.reducer;
