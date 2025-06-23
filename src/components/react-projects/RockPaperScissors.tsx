import { useReducer, useState } from "react";
import RockPaperScissorsCard from "./ui/RockPaperScissorsCard";


const SELECTIONS = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors"
} as const;

type Selection = typeof SELECTIONS[keyof typeof SELECTIONS];

const SELECTION_DATA: { [key in Selection]: { icon: string, text: string } } = {
    [SELECTIONS.ROCK]: { icon: "🪨", text: "Rock" },
    [SELECTIONS.PAPER]: { icon: "📄", text: "Paper" },
    [SELECTIONS.SCISSORS]: { icon: "✂️", text: "Scissors" },
}

const WINNING_COMBOS: { [key in Selection]: Selection } = {
    [SELECTIONS.ROCK]: SELECTIONS.SCISSORS,
    [SELECTIONS.PAPER]: SELECTIONS.ROCK,
    [SELECTIONS.SCISSORS]: SELECTIONS.PAPER,
}

type GameResult = "win" | "lose" | "draw";

const RESULT_DATA: { [key in GameResult]: { icon: string, text: string } } = {
    win: { icon: "😄🎉🌟", text: "You Won" },
    lose: { icon: "😵", text: "You Lost" },
    draw: { icon: "◻️", text: "It's a Draw" },
}

// CUSTOM HOOK ----------
interface GameState {
    phase: "playing" | "result";
    playerSelection: Selection | null;
    aiSelection: Selection | null;
    result: GameResult | null;
}

type GameAction = { type: "PLAY"; payload: { playerSelection: Selection } } | { type: "RESET" }

const selectionOptions = Object.values(SELECTIONS);


// Initial state of the game
const getInitialState = (): GameState => {
    return {
        phase: "playing",
        playerSelection: null,
        aiSelection: null,
        result: null
    }
}

//useReduce setup

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case "PLAY":
            const { playerSelection } = action.payload;

            //1. AI makes its move
            const aiSelection = selectionOptions[Math.floor(Math.random() * selectionOptions.length)];

            //2. Determine the winner
            let result: GameResult;
            if (playerSelection === aiSelection) {
                result = 'draw';
            } else if (WINNING_COMBOS[playerSelection] === aiSelection) {
                result = 'win';
            } else {
                result = 'lose';
            }

            //3. Return the new state object
            return {
                phase: 'result',
                playerSelection,
                aiSelection,
                result
            }
        case 'RESET':
            return getInitialState();
        default:
            return state;
    }
}

//Custom Hood definition
const useRockPaperScissors = () => {
    const [gameState, dispatch] = useReducer(gameReducer, getInitialState());

    const handlePlay = (playerSelection: Selection) => {
        dispatch({ type: "PLAY", payload: { playerSelection } })
    }

    const handleReset = () => {
        dispatch({ type: "RESET" });
    };

    return {
        gameState,
        handlePlay,
        handleReset
    }
}


const RockPaperScissors = () => {
    const { gameState, handlePlay, handleReset } = useRockPaperScissors();
    const { phase, playerSelection, aiSelection, result } = gameState;

    const selectionOptions = Object.values(SELECTIONS);

    return (
        <>
            <h1 className="text-center">{
                phase === "playing" ?
                    "Pick your Weapon" :
                    `You chose ${playerSelection}, AI chose ${aiSelection}`
            }</h1>
            <div className="flex justify-center gap-4">


                {
                    phase === 'playing' ?

                        <>
                            {selectionOptions.map((selection) => (
                                <RockPaperScissorsCard
                                    key={selection}
                                    onClick={() => handlePlay(selection)}
                                    icon={SELECTION_DATA[selection].icon}
                                    name={SELECTION_DATA[selection].text}
                                />
                            ))}
                        </>
                        :


                        <div className="flex flex-col items-center">
                            <p className="text-4xl self-center text-center my-2">{RESULT_DATA[result!].icon}</p>
                            <p className="my-2 text-2xl text-center font-bold">{RESULT_DATA[result!].text}</p>
                            <button onClick={handleReset} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white mt-2 font-bold py-2 px-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:cursor-pointer transition duration-300 ease-in-out">Play again</button>

                        </div>
                }
            </div>
        </>
    )
}

export default RockPaperScissors