import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Определите интерфейсы для состояния и данных
interface DataItem {
  _id: string;
  title: string;
  subTitle: string;
  price: string;
  description: string;
  category: number;
  linkImg: string;
}

interface DataState {
  items: DataItem[];
  loading: boolean;
  error: string | null;
  total: number; // Общее количество товаров
  currentPage: number; // Текущая страница
  itemsPerPage: number; // Количество товаров на странице
  selectedCategory: number | null; // Выбранная категория
  searchQuery: string,
}

// Определите начальное состояние
const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  itemsPerPage: 8, // Установите количество товаров на странице
  selectedCategory: null,
  searchQuery: '',
};

export const fetchData = createAsyncThunk<{ products: DataItem[], total: number }, void, { state: { data: DataState } }>(
  'data/fetchData',
  async (_, { getState }) => {
    const { currentPage, itemsPerPage, selectedCategory, searchQuery } = getState().data;
    const url = `http://localhost:3001/api/products?page=${currentPage}&limit=${itemsPerPage}` + 
                (selectedCategory !== null ? `&category=${selectedCategory}` : '') + 
                (searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : '');
    const response = await axios.get(url);
    return response.data;
  }
);

// Создайте slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Сбросить на первую страницу при смене категории
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearData: (state) => {
      state.items = [];
      state.error = null;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null; // Сброс ошибки при новом запросе
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products; // Получаем товары
        state.total = action.payload.total; // Получаем общее количество
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

// Экспортируйте действия и редюсер
export const { setCurrentPage, setSelectedCategory, clearData, setSearchQuery } = dataSlice.actions;
export default dataSlice.reducer;
