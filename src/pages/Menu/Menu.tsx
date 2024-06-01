import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import styles from './Menu.module.css';
import ProductCard from "../../components/ProductCard/ProductCard";


export function Menu() {
	return(<>
		<div className={styles['head']}>
			<Heading>Menu</Heading>
			<Search placeholder="Введите блюдо или состав"/>
		</div>
		<div>
			<ProductCard 
				id={1}
				title='Pizza'
				description="tomato cheese meat"
				rating={4.5}
				price={350}
				image='/image.png'
			/>
		</div>
	</>);
}