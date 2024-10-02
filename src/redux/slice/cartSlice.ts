import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
//   productId: string; // ID товара
//   quantity: number; // Количество товара в корзине
// }

// interface CartState {
//   items: CartItem[]; // Список товаров в корзине
//   totalAmount: number; // Общая сумма
// }

// const initialState: CartState = {
//   items: [],
//   totalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const existingItem = state.items.find(item => item.productId === action.payload.productId);
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity; // Увеличиваем количество, если товар уже в корзине
//       } else {
//         state.items.push(action.payload); // Добавляем новый товар в корзину
//       }
//       state.totalAmount += action.payload.quantity; // Обновляем общую сумму
//     },
    
//     removeFromCart(state, action: PayloadAction<string>) {
//       const index = state.items.findIndex(item => item.productId === action.payload);
//       if (index !== -1) {
//         state.totalAmount -= state.items[index].quantity; // Уменьшаем общую сумму
//         state.items.splice(index, 1); // Удаляем товар из корзины
//       }
//     },
//     clearCart(state) {
//       state.items = []; // Очищаем корзину
//       state.totalAmount = 0; // Сбрасываем общую сумму
//     },
//     updateItemQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
//       const existingItem = state.items.find(item => item.productId === action.payload.productId);
//       if (existingItem) {
//         state.totalAmount += action.payload.quantity - existingItem.quantity; // Обновляем общую сумму
//         existingItem.quantity = action.payload.quantity; // Обновляем количество товара
//       }
//     },
//   },
// });

// // Экспортируем действия и редюсер
// export const { addToCart, removeFromCart, clearCart, updateItemQuantity } = cartSlice.actions;
// export default cartSlice.reducer;


interface CartState {
  items: CartItem[];
  totalAmount: number; // Общая сумма
  totalCount: number; // Общее количество товаров
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount += action.payload.price * action.payload.quantity;
      state.totalCount += action.payload.quantity; // Обновляем общее количество
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.items.findIndex(item => item.productId === action.payload);
      if (index !== -1) {
        state.totalAmount -= state.items[index].price * state.items[index].quantity; // Уменьшаем общую сумму
        state.totalCount -= state.items[index].quantity; // Уменьшаем общее количество
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalCount = 0;
    },
    updateItemQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        state.totalAmount += (action.payload.quantity - existingItem.quantity) * existingItem.price; // Обновляем общую сумму
        state.totalCount += action.payload.quantity - existingItem.quantity; // Обновляем общее количество
        existingItem.quantity = action.payload.quantity;
      }
    },
  },
});

// Экспортируем действия и редюсер
export const { addToCart, removeFromCart, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
