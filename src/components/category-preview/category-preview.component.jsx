import {
	CategoryPrevieContainer,
	Title,
	Preview,
} from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({ title, products }) => {
	return (
		<CategoryPrevieContainer>
			<h2>
				<Title to={title}>{title.toUpperCase()}</Title>
			</h2>
			<Preview>
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPrevieContainer>
	);
};

export default CategoryPreview;
