// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchData, setCurrentPage, setSelectedCategory } from '../../redux/slice/dataSlice';
// import { RootState } from '../../redux/store';
// import ProductItem from '../productItem/ProductItem';
// import Category from '../category/Category';
// import './productList.scss';

// const ProductList: React.FC = () => {
// 	const dispatch = useDispatch();
// 	const { items, loading, error, total, currentPage, itemsPerPage, selectedCategory, searchQuery } = useSelector((state: RootState) => state.data);

// 	// useEffect(() => {
// 	// 	dispatch(fetchData()); // Здесь теперь будет передаваться правильный массив
// 	// }, [dispatch, currentPage, selectedCategory]);
// 	useEffect(() => {
// 		const fetchDataAsync = async () => {
// 			try {
// 				await dispatch(fetchData());
// 			} catch (error) {
// 				console.error('Failed to fetch data:', error);
// 			}
// 		};
// 		fetchDataAsync();
// 	}, [dispatch, currentPage, selectedCategory]);

// 	const totalPages = Math.ceil(total / itemsPerPage);

// 	const handlePageChange = (page: number) => {
// 		dispatch(setCurrentPage(page));
// 	};

// 	const handleCategoryChange = (category: number | null) => {
// 		dispatch(setSelectedCategory(category));
// 	};
// 	const filteredProducts = items.filter((product) =>
// 		product.title.toLowerCase().includes(searchQuery.toLowerCase())
// 	);
// 	console.log('Items:', items);
// 	console.log('Search Query:', searchQuery);
// 	console.log('Filtered Products:', filteredProducts);

// 	if (loading) return <div>Loading...</div>;
// 	if (error) return <div>Error: {error}</div>;

// 	return (
// 		<div className="">
// 			<Category onCategoryChange={handleCategoryChange} />
// 			<h2 className="home-title">Товары по лучшей цене</h2>
// 			<div className="product-container">
// 				{items.length > 0 ? (
// 					items.map(product => (
// 						<ProductItem key={product._id} productId={product._id} />
// 					))
// 				) : (
// 					<div>No products available</div>
// 				)}
// 			</div>

// 			<div className="pagination">
// 				{Array.from({ length: totalPages }, (_, index) => (
// 					<button
// 						key={index + 1}
// 						onClick={() => handlePageChange(index + 1)}
// 						disabled={currentPage === index + 1}
// 					>
// 						{index + 1}
// 					</button>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default ProductList;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setCurrentPage, setSelectedCategory } from '../../redux/slice/dataSlice';
import { RootState } from '../../redux/store';
import ProductItem from '../productItem/ProductItem';
import Category from '../category/Category';
import './productList.scss';

const ProductList: React.FC = () => {
	const dispatch = useDispatch();
	const { items, loading, error, total, currentPage, itemsPerPage, selectedCategory, searchQuery } = useSelector((state: RootState) => state.data);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch, currentPage, selectedCategory, searchQuery]); // Добавьте searchQuery

	const totalPages = Math.ceil(total / itemsPerPage);

	const handlePageChange = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const handleCategoryChange = (category: number | null) => {
		dispatch(setSelectedCategory(category));
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="">
			<Category onCategoryChange={handleCategoryChange} />
			<h2 className="home-title">Товары по лучшей цене</h2>
			<div className="product-container">
				{items.length > 0 ? (
					items.map(product => (
						<ProductItem key={product._id} productId={product._id} />
					))
				) : (
					<div>No products available</div>
				)}
			</div>
			<div className="pagination">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => handlePageChange(index + 1)}
						disabled={currentPage === index + 1}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default ProductList;
