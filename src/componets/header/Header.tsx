
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


import cartImg from "../../assets/navigation/cart.svg";
import logo from "../../assets/header/logo.svg";

import "./header.scss";
const Header: React.FC = () => {
	const { totalAmount, totalCount } = useSelector((state: RootState) => state.cart);

	// роутинг в корзину
	const navigate = useNavigate();
	const handleClickCart = () => {
		navigate('/cart');
	};
	const handleClickHome = () => {
		navigate('/');
	};


	return (
		<div className="header">
			<div onClick={handleClickHome} className="header-logo"><img src={logo} alt="" /></div>
			<div onClick={handleClickCart} className="header-cart">
				<div className="header-price"><strong>{totalAmount} ₽</strong><br /><strong>{totalCount} шт.</strong></div>
				<div className="header-cartimg"><img src={cartImg} alt="" /></div>
			</div>
		</div>
	)
}

export default Header;