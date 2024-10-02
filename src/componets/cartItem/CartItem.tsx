import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromCart, updateItemQuantity } from '../../redux/slice/cartSlice';
import "./cartItem.scss";


import deleteProduct from "../../assets/cart/delete.svg";
import PopUpAttention from '../popUpAttention/PopUpAttention';


interface CartItemProps {
	productId: string; // ID товара
	quantity: number; // Количество товара
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity }) => {
	const [visseibli, setVisible] = useState(false);
	const dispatch = useDispatch();
	const { items } = useSelector((state: RootState) => state.data);
	const product = items.find(item => item._id === productId);

	const handleRemove = () => {
		setVisible(true);
	}

	const handleRemoveTrue = () => {
		dispatch(removeFromCart(productId));
		setVisible(false);
	};

	const handleRemoveFalse = () => {
		setVisible(false);
	};

	const handleQuantityChange = (newQuantity: number) => {
		const validQuantity = Math.max(1, newQuantity); // Убедитесь, что количество не меньше 1
		dispatch(updateItemQuantity({ productId, quantity: validQuantity })); // Обновляем количество товара
	};

	const increaseQuantity = () => {
		handleQuantityChange(quantity + 1); // Увеличиваем количество
	};

	const decreaseQuantity = () => {
		handleQuantityChange(quantity - 1); // Уменьшаем количество
	};

	if (!product) {
		return null; // Если продукт не найден, ничего не отображаем
	}

	return (
		<div className="cartItem">
			<img src={product.linkImg} alt={product.title} />
			<div className="cartItem-info">
				<h3>{product.title}</h3>
				<div className="cartItem-info-price">
					<p><b>Цена</b>: {parseFloat(product.price).toFixed(2)}₽</p>
					<div className="cartItem-info-price-count">
						<button onClick={increaseQuantity}>+</button>
						<span>{quantity}</span> {/* Отображаем текущее количество */}
						<button onClick={decreaseQuantity}>-</button>
					</div>
				</div>
				<p className='cartItem-info-sum'><b>Сумма</b>: {(parseFloat(product.price) * quantity).toFixed(2)}₽</p>
				<button className='deleteProductItem' onClick={handleRemove}><img src={deleteProduct} alt="" /></button>
				{
					visseibli && (<PopUpAttention onConfirm={handleRemoveFalse} onCancel={handleRemoveTrue} />)
				}
			</div>
		</div>
	);
};

export default CartItem;
