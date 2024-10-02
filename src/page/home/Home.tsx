import React from "react";
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Search from "../../componets/search/Search";
// import Category from "../../componets/category/Category";
import ProductList from "../../componets/productList/ProductList";

import "./home.scss";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// картинки для свипер
import creative01 from "../../assets/mainBanner/creative01.png";
import creative02 from "../../assets/mainBanner/creative02.png";
import creative03 from "../../assets/mainBanner/creative03.png";

const Home: React.FC = () => {
	const { items } = useSelector((state: RootState) => state.data);
	console.log(items);

	return (
		<div className="home">
			<div className="homeBanners">
				<Swiper
					// install Swiper modules
					modules={[Pagination, A11y, Autoplay]}
					spaceBetween={10}
					slidesPerView={1}
					pagination={{ clickable: true }}
					className="swiper-home"
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
				>
					<SwiperSlide className="swiper-home-item"><img src={creative01} alt="" /></SwiperSlide>
					<SwiperSlide className="swiper-home-item"><img src={creative02} alt="" /></SwiperSlide>
					<SwiperSlide className="swiper-home-item"><img src={creative03} alt="" /></SwiperSlide>

				</Swiper>
			</div>
			<Search />
			<h2 className="home-title">Лучший выбор</h2>
			{/* <Category /> */}
			<ProductList />
		</div>
	)
};

export default Home;