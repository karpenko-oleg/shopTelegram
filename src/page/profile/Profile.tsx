import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectUserProfile, selectUserLoading, selectUserError } from '../../redux/slice/userSlice';

import "./profile.scss";

const UserProfile: React.FC = () => {
	const dispatch = useDispatch();
	const userProfile = useSelector(selectUserProfile);
	const loading = useSelector(selectUserLoading);
	const error = useSelector(selectUserError);

	useEffect(() => {
		// Убедитесь, что скрипт Telegram Web App загружен
		if (window.Telegram && window.Telegram.WebApp) {
			const { initDataUnsafe } = window.Telegram.WebApp;
			if (initDataUnsafe) {
				const { user } = initDataUnsafe;
				const userId = user?.id; // Получаем идентификатор пользователя
				console.log(userId);
				if (userId) {
					// Обновляем состояние пользователя в Redux
					dispatch(fetchUserProfile(userId));
				}
			}
		}
	}, [dispatch]);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div>
			{userProfile ? (
				<div className='userProfile'>
					<div className="userProfile-header">
						<div className="userProfile-header-img"><img src={userProfile.avatarUrl} alt="" /></div>
						<div className="userProfile-header-title">
							<h2><strong>{userProfile.firstName}</strong> <strong>{userProfile.lastName}</strong></h2>
							<h3>{userProfile.userName}</h3>
						</div>
					</div>
					<div className="userProfile-orders">
						пока нет заказов
					</div>
				</div>
			) : (
				<p>Профиль не найден.</p>
			)}
		</div>
	);
};

export default UserProfile;
