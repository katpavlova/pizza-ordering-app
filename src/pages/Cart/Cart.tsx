import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { ProductInteface } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../assets/helpers/api";

export function Cart() {
	const items = useSelector((s: RootState) => s.cart.items);
	const [cartProducts, setCartProducts] = useState<ProductInteface[]>([]);

	const getItem = async (id: number) => {
		const {data} = await axios.get<ProductInteface>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async() => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return(<>
		<Heading>Корзина</Heading>
		{items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product){
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product} />;
		})}
	</>);
}