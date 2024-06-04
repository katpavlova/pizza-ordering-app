import { useDispatch } from "react-redux";
import { CartItemProps } from "./CartItem.props";
import { AppDispatch } from "../../store/store";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";
import styles from '../ProductCard/ProductCard.module.css';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = (e: MouseEvent) => {
		dispatch(cartActions.add(props.id));
	};
	const decrease = (e: MouseEvent) => {
		dispatch(cartActions.add(props.id));
	};
	const remove = (e: MouseEvent) => {
		dispatch(cartActions.add(props.id));
	};


	return(

		<div className={styles['card']}>
			<div className={styles['header']} style={{backgroundImage: `url('${props.image}')`}}>
				<div className={styles['price']}>
					{props.price}
					<span className={styles['currency']}>
                        руб.
					</span>
				</div>
				


			</div>
			<div className={styles['footer']}>
				<div className={styles['title']}>
					{props.name}
				</div>

			</div>
			<div className={styles['buttons']}>
				<button className={styles['cartItem-button']} onClick={increase}>
                   +
				</button>
				<div>{props.count}</div>
				<button className={styles['cartItem-button']} onClick={decrease}>
                   -
				</button>
				<button className={styles['cartItem-button']} onClick={remove}>
                   сброс
				</button>
			</div>
		</div>

	);
}

export default CartItem;