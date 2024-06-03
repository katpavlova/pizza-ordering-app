import { Await, useLoaderData, useParams } from "react-router-dom";
import { ProductInteface } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
	const {id} = useParams();
	const data = useLoaderData() as {data: ProductInteface};

	return <>
		<Suspense fallback={'Загрузка...'}>
			<Await
				resolve={data.data}>
				{({data}:{data: ProductInteface})=> (
					<>Product - {data.price}</>
				)}
			</Await>
		</Suspense>
	</>;
}