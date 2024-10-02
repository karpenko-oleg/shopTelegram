import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import CartItem from '../../componets/cartItem/CartItem';
import { useNavigate } from 'react-router-dom';
import { clearCart } from "../../redux/slice/cartSlice";
import PopUpAttention from '../../componets/popUpAttention/PopUpAttention';

import "./cart.scss";
import cartEmpty from "../../assets/cart/cartEmpty.png";
import cartDelete from "../../assets/cart/delete.svg";

const Cart: React.FC = () => {
	const dispatch = useDispatch();
	const { items, totalAmount, totalCount } = useSelector((state: RootState) => state.cart);
	const [visiblePopUp, setvisiblePopUp] = useState(false)
	const handleDeleteProduct = () => {
		setvisiblePopUp(true);
	}
	const handleOnCancel = () => {
		dispatch(clearCart());
		setvisiblePopUp(false);
	};
	const handleonConfirm = () => {
		setvisiblePopUp(false);
	}

	return (
		<div className="cart">
			{items.length > 0 ? (
				<>
					<div className='cart-title'><b>Корзина</b><i onClick={handleDeleteProduct}><img src={cartDelete} alt="" /></i></div>
					{visiblePopUp && (<PopUpAttention onConfirm={handleonConfirm} onCancel={handleOnCancel} />)}
					{items.map(item => (
						<CartItem
							key={item.productId}
							productId={item.productId}
							quantity={item.quantity}
							images={item.linkImg}
						/>
					))}
					<div className='cartInfo'>
						<p><b>Всего товаров</b>: {totalCount}</p>
						<p><b>Общая сумма</b>: {totalAmount.toFixed(2)}₽</p>
					</div>

				</>
			) : (
				<CatrEmpty />
			)}
		</div>
	);
};

export default Cart;

const CatrEmpty = () => {
	const navigate = useNavigate();
	const handleClickHome = () => {
		navigate('/');
	};
	return (
		<div className="cartEmpty">
			<h2>Ваша корзина пустая!</h2>
			<img src={cartEmpty} alt="" />
			<p>Вернитесь на главную страницу, чтобы&nbsp;начать покупки</p>
			<button onClick={handleClickHome}>Вернуться на главную</button>
		</div>
	)
}
