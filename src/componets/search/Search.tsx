import React from "react";
import "./search.scss";
import searchIcon from "../../assets/icon/search.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setCurrentPage } from '../../redux/slice/dataSlice';
import { RootState } from '../../redux/store';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const searchQuery = useSelector((state: RootState) => state.data.searchQuery || '');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(e.target.value));
		dispatch(setCurrentPage(1)); // Сброс страницы на 1
	};
	return (
		<div className="search">
			<button className="search-button">
				<img src={searchIcon} alt="Search" />
			</button>
			<input type="text" value={searchQuery} onChange={handleChange} placeholder="Поиск товаров..." />
		</div>
	)
}

export default Search;