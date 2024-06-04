import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from './Layout.module.css';
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { RootState } from "@reduxjs/toolkit/query";


export function Layout() {
	// const location = useLocation();

	// useEffect(() => {
	// 	console.log(location);
	// }, [location]);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);
	const items = useSelector((s: RootState) => s.cart.items);

	useEffect(() => 
	{
		dispatch(getProfile());
	}, [dispatch]);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

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
				<p className={styles['link_p']}>{items.reduce((acc, item) => acc += item.count, 0)}</p>
			</div>
			<Button className={styles['exit']} onClick={logout}>Exit</Button>

		</div>
		<div className={styles['content']}>
			<Outlet>
                
			</Outlet>
		</div>
	</div>);
}