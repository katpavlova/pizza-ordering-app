import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import styles from './Menu.module.css';
import ProductCard from "../../components/ProductCard/ProductCard";
import { PREFIX } from "../../assets/helpers/api";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";


export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	// const getMenu = async () => {
	// 	try {
	// 		const res = await fetch(`${PREFIX}/products`);
	// 		if (!res.ok){
	// 			return;
	// 		}
	// 		const data = await res.json() as Product[];
	// 		setProducts(data);
	// 	} catch (e) {
	// 		console.error(e);
	// 		return;
	// 	}
	// };

	const getMenu = async () => {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(()=>{
					resolve();
				},2000);
			});
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			console.error(e);
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return(<>
		<div className={styles['head']}>
			<Heading>Menu</Heading>
			<Search placeholder="Введите блюдо или состав"/>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && <MenuList products={products}/>}
			{isLoading && <> Загрузка меню...</>}
			
		</div>
	</>);
}