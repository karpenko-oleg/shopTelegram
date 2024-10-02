import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';
import { RootState } from '../../redux/store';
import "./productItem.scss";

import buttonAdd from "../../assets/icon/buttonAdd.svg";

const ProductItem: React.FC<{ productId: string }> = ({ productId }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state: RootState) => state.data);
	const product = items.find(item => item._id === productId);


	if (!product) return <div>Product not found</div>; // Обработка случая, когда продукт не найден

	const handleAddToCart = () => {
		dispatch(addToCart({ productId, quantity: 1, price: product.price })); // Добавляем товар в корзину с количеством 1
	};


	return (
		<div className="productItem">
			<img src={product.linkImg} alt={product.title} />
			<p>{product.description}</p>
			<h2>{product.title}</h2>
			<h2> {product.description}</h2>
			<h3>Цена: <b>{product.price}₽</b></h3>
			<button onClick={handleAddToCart} className='productItem-add'><img src={buttonAdd} alt="" /></button>
		</div>
	);
};

export default ProductItem;
