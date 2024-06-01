import cn from 'classnames';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';

function ProductCard(props: ProductCardProps) {
	return(
		<Link to={`/product/${props.id}`}>
			<div className={styles['card']}>
				<div className={styles['header']} style={{backgroundImage: `url('${props.image}')`}}>
					<div className={styles['price']}>
						{props.price}
						<span className={styles['currency']}>
                        руб.
						</span>
					</div>
					<button className={styles['add-to-cart']}>
                   В корзину
					</button>
					<div className={styles['rating']}>
						{props.rating}
					</div>

				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>
						{props.title}
					</div>
					<div className={styles['description']}>
						{props.description}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;