import { useEffect, useState, MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
	const [counter, setCounter] = useState<number>(0);

	const addCounter=(e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={addCounter}>Hello World!</Button>
			<Button onClick={addCounter} appearance='big'>Hello World!</Button>
			<Button onClick={addCounter} appearance='small'>Hello World!</Button>

			<Input placeholder='Email' />
		</>
	);
}

export default App;
