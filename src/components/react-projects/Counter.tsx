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
			<div className="counter flex justify-center items-center gap-4 p-4 rounded-lg shadow-md bg-gray-100">
				<button className='hover:cursor-pointer bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300' onClick={subtract}>-</button>
				<pre className="text-xl font-mono text-gray-800">{count}</pre>
				<button className='hover:cursor-pointer bg-green-500 font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300' onClick={add}>+</button>
			</div>
			<div className="counter-message">{children}</div>
		</>
	);
}
