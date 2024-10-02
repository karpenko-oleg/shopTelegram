
import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

import "./navigation.scss";
import homeImg from "../../assets/navigation/home.svg";
import favoriteImg from "../../assets/navigation/favorite.svg";
import profillImg from "../../assets/navigation/profill.svg";
import cartImg from "../../assets/navigation/cart.svg";

const Navigation: React.FC = () => {
	const { totalCount } = useSelector((state: RootState) => state.cart);
	const navigate = useNavigate();
	const handleClickHome = () => {
		navigate('/');
	};
	const handleClickCart = () => {
		navigate('/cart');
	};
	const handleClickProfile = () => {
		navigate('/profile');
	};
	return (
		<div className="navigation">
			<ul>
				<li onClick={handleClickHome}><img src={homeImg} alt="Home" /></li>
				<li><img src={favoriteImg} alt="Home" /></li>
				<li onClick={handleClickCart}><img src={cartImg} alt="Home" />{totalCount ? <i className="infoTotalCount">{totalCount}</i> : ""}</li>
				<li onClick={handleClickProfile}><img src={profillImg} alt="profile" /></li>
			</ul>
		</div>
	);
};

export default Navigation;

