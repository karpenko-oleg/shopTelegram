import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserProfile {
  chatId: string;
	firstName: string;
	lastName: string;
	userName: string;
	orders: [];
	avatarUrl: string;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk<UserProfile, string>(
  'user/fetchUserProfile',
  async (userId) => {
    try {
      const response = await axios.get('http://localhost:3001/api/profile', {
        params: { userId }, // Передаем userId как параметр
      });
      return response.data; // Возвращаем данные пользователя
    } catch (error) {
      // Обработка ошибок
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Ошибка загрузки профиля');
      }
      throw new Error('Ошибка загрузки профиля');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

export const selectUserProfile = (state: { user: UserState }) => state.user.profile;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;
