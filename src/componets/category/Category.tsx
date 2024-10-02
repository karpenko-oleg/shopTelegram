import React from "react";
import objCategory from "../../assets/obj/objCategory";
import "./category.scss";

const Category: React.FC<{ onCategoryChange: (category: number | null) => void }> = ({ onCategoryChange }) => {
	return (
		<div className="category">
			<ul>
				{objCategory.map((obj) => (
					<li className="" key={obj.id} onClick={() => onCategoryChange(obj.id)}>
						<div className="category-img">
							<img src={obj.img} alt={obj.title} />
						</div>
						<b>{obj.title}</b>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Category;
