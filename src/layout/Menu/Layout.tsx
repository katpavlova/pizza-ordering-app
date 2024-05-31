import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import styles from './Layout.module.css';
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from 'classnames';


export function Layout() {
	// const location = useLocation();

	// useEffect(() => {
	// 	console.log(location);
	// }, [location]);

	return(<div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<div className={styles['circle']}></div>
				<div className={styles['name']}>Kate Pavlova</div>
				<div className={styles['email']}>kpavlovaaa@yandex.ru</div>
			</div>
			<div className={styles['menu']}>

				<NavLink to='/' 
					className={({isActive}) => cn(styles['link'], {[styles.active]: isActive} 

					)}>
					Menu 
				</NavLink>
				<NavLink to='/cart' className={({isActive}) => cn(styles['link'], {[styles.active]: isActive} 

				)}>
					Cart 
				</NavLink>
			</div>
			<Button className={styles['exit']}>Exit</Button>

		</div>
		<div>
			<Outlet>
                
			</Outlet>
		</div>
	</div>);
}