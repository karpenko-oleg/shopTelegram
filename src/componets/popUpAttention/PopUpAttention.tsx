import React from "react";

interface PopUpAttentionProps {
	onConfirm: boolean;
	onCancel: boolean;
}

const PopUpAttention: React.FC<PopUpAttentionProps> = ({ onConfirm, onCancel }) => {
	return (
		<div className="popUpAttention">
			<h2>Подскажите, вы точно хотите удалить товоры?</h2>
			<div className="popUpAttention-button">
				<button onClick={onCancel}>Да</button>
				<button onClick={onConfirm}>Нет</button>
			</div>
		</div>
	)
}

export default PopUpAttention;