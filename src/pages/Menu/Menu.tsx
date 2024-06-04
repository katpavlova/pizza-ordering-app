import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import styles from './Menu.module.css';
import ProductCard from "../../components/ProductCard/ProductCard";
import { PREFIX } from "../../assets/helpers/api";
import { Product, ProductInteface } from "../../interfaces/product.interface";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";


export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState('');

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(()=>{
					resolve();
				},2000);
			});
			const {data} = await axios.get<ProductInteface[]>(`${PREFIX}/products`, {params:{name}});
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

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);

	};

	

	return(<>
		<div className={styles['head']}>
			<Heading>Menu</Heading>
			<Search placeholder="Введите блюдо или состав" onChange={updateFilter}/>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && products.length >0 && <MenuList products={products}/>}
			{isLoading && <> Загрузка меню...</>}
			{!isLoading && products.length === 0 && <>По вашему запросу ничего не найдено</>}
		</div>
	</>);
}