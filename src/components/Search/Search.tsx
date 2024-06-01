import styles from './Search.module.css';
import cn from 'classnames';
import { forwardRef, isValidElement } from 'react';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({isValid = true, className, ...props},ref) {
	return (
		<input ref = {ref} 
			className= { cn(styles['input'], className, {
				[styles['invalid']]: isValid
			})} {...props} />
	);
});

export default Search;