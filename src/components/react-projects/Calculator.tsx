import { useState, useRef } from 'react';

interface Props {
	children: JSX.Element;
}

type Operator = "+" | "−" | "÷" | "×";
type Input = number | Operator;

const OPERATORS = ["+", "−", "×", "÷"];
const OPERATIONS = {
	"+": (a: number, b: number) => a + b,
	"−": (a: number, b: number) => a - b,
	"×": (a: number, b: number) => a * b,
	"÷": (a: number, b: number) => a !== 0 ? a / b : "Undefined"
}

function isOperator(char: any): Operator | false {
	if(OPERATORS.includes(char)) {
		return char;
	}

	return false;

  }

export default function Calculator(props: Props) {

	

	const [operation, setOperation] = useState("");
	const [input, setInput] = useState("0");
	const inputsRef = useRef<Input[]>([]);

	const appendNumber = (char: string) => {
		if (input === "0") {
			setInput(char);
			return;
		}
		setInput(input + char);
	}

	const appendOperator = (operator: Operator) => {
		//If operator is the same as previous operator, do nothing
		if(input.at(-1) === operator) return;

		if(input.at(-1) === "+"){
			setInput(input.slice(0, -1) + operator);
			return;
		}

		if(input.at(-1) === "−"){
			setInput(input.slice(0, -1) + operator);
			return;
		}

		if(input.at(-1) === "×"){
			setInput(input.slice(0, -1) + operator);
			return;
		}

		if(input.at(-1) === "÷"){
			setInput(input.slice(0, -1) + operator);
			return;
		}

		setInput(input + operator)
	}

	function clear() {
		setInput("0");
		inputsRef.current = [];
	}

	function handleOperation(getResult: string) {
		if(getResult !== "=") return;

		inputsRef.current.push(parseFloat(input));

		let result = 0 as number | "Undefined";
		let operationCache = '';

		input.split("").forEach((char, index) => {
			if (index === 0) {
				operationCache = char;
				return;
			}

			if( result === "Undefined"){
				return result;
			}

			const operator = isOperator(char);
			if (operator) {
				if(result === 0){
					result = parseFloat(operationCache);
					operationCache = '';
				} else {
					console.log(result);
					result = OPERATIONS[operator](result, parseFloat(operationCache));
					operationCache = '';
				}
			} 

			
		});


		if (inputsRef.current.length === 3) {
			const [a, op, b] = inputsRef.current.splice(0, 3) as [
				number,
				Operator,
				number,
			];
			let result = 0;
			if (op === "+") {
				result = a + b;
			} else if (op === "−") {
				result = a - b;
			} else if (op === "÷") {
				result = a / b;
			} else if (op === "×") {
				result = a * b;
			}

			setInput(result.toString());
		} else {
			setInput("");
		}
	}

	return (
		<section className="flex justify-center items-center h-screen m-0 bg-gray-300">
			<div className="bg-gray-900 rounded-2xl p-5 shadow-2xl">
				<div className="w-full flex justify-center items-center gap-2.5 mb-2.5">
					<div className='flex flex-col justify-center items-center'>
						<input value={operation} type="text" id="display" readOnly className="w-60 h-6 text-sm text-right px-3 bg-[#dbefdf] border-none rounded-t-lg" />
						<input value={input} type="text" id="display" readOnly className="w-60 h-8 text-xl text-right px-3 pt-0 pb-2 bg-[#dbefdf] border-none rounded-b-lg" />
					</div>

				</div>
				<div className="grid grid-cols-4 gap-2.5">
					<button onClick={clear} id="clear" className="w-[50px] h-[50px] border-none rounded-full bg-gray-400 text-white hover:cursor-pointer hover:bg-gray-100 hover:text-gray-400 text-xl transition duration-300 ease-linear">AC</button>
					<button onClick={clear} id="clear" className="w-[50px] h-[50px] border-none rounded-full bg-gray-400 text-white hover:cursor-pointer hover:bg-gray-100 hover:text-gray-400 transition duration-300 ease-linear">
						<span className="text-4xl relative top-[-4px]">±</span>
					</button>
					<button onClick={clear} id="clear" className="w-[50px] h-[50px] border-none rounded-full bg-gray-400 text-white hover:cursor-pointer hover:bg-gray-100 hover:text-gray-400 text-xl transition duration-300 ease-linear">%</button>
					<button onClick={() => appendOperator("÷")} className="w-[50px] h-[50px] border-none rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-300 text-white transition duration-300 ease-linear flex justify-center items-center p-0" data-value="/">
						<span className="text-4xl relative top-[-3px]">÷</span>
					</button>
					<button onClick={() => appendNumber("7")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="7">7</button>
					<button onClick={() => appendNumber("8")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="8">8</button>
					<button onClick={() => appendNumber("9")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="9">9</button>
					<button onClick={() => appendOperator("×")} className="w-[50px] h-[50px] border-none rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-300 text-white transition duration-300 ease-linear flex justify-center items-center p-0" data-value="+">
						<span className="text-4xl relative top-[-3px]">×</span>
					</button>
					<button onClick={() => appendNumber("4")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="4">4</button>
					<button onClick={() => appendNumber("5")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="5">5</button>
					<button onClick={() => appendNumber("6")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="6">6</button>
					<button onClick={() => appendOperator("−")} className="w-[50px] h-[50px] border-none rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-300 text-white transition duration-300 ease-linear flex justify-center items-center p-0" data-value="+">
						<span className="text-4xl relative top-[-3px]">−</span>
					</button>
					<button onClick={() => appendNumber("1")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="1">1</button>
					<button onClick={() => appendNumber("2")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="2">2</button>
					<button onClick={() => appendNumber("3")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="3">3</button>
					<button onClick={() => appendOperator("+")} className="w-[50px] h-[50px] border-none rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-300 text-white transition duration-300 ease-linear flex justify-center items-center p-0" data-value="+">
						<span className="text-4xl relative top-[-3px]">+</span>
					</button>
					<button className='hide'></button>
					<button onClick={() => appendNumber("0")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value="0">0</button>
					<button onClick={() => appendNumber(".")} className="w-[50px] h-[50px] text-2xl border-none rounded-full cursor-pointer bg-[#92e9fa] hover:bg-sky-300" data-value=".">.</button>
					<button onClick={() => handleOperation("=")} className="w-[50px] h-[50px] border-none rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-300 text-white transition duration-300 ease-linear flex justify-center items-center p-0" data-value="+">
						<span className="text-4xl relative top-[-3px]">=</span>
					</button>
				</div>

			</div>




		</section>
	);
}