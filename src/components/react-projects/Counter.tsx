import { useState } from 'react';

export default function Counter({
	children,
	count: initialCount,
}: {
	children: JSX.Element;
	count: number;
}) {
	const [count, setCount] = useState(initialCount);
	const add = () => setCount((i) => i + 1);
	const subtract = () => setCount((i) => i - 1);

	return (
		<>
			<div className="counter">
				<button className='hover:cursor-pointer bg-red-500' onClick={subtract}>-</button>
				<pre>{count}</pre>
				<button className='hover:cursor-pointer' onClick={add}>+</button>
			</div>
			<div className="counter-message">{children}</div>
		</>
	);
}
