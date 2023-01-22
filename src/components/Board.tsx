import React, { useState } from 'react';

interface SquareProps {
    value: string
    onSquareClick: () => void
}

function Square(props: SquareProps) {

    return <button
        className="square"
        onClick={() => props.onSquareClick()}
    >
        {props.value}
    </button>
}

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [xIsNext, setXIsNext] = useState(true);
    const [gameIsFinished, setGameIsFinished] = useState(false);
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function showGameState() {
        if (gameIsFinished) {
            return `Wygrał ${xIsNext ? 'O' : 'X'}! Brawo!`
        }
        return xIsNext ? "Teraz gra X!" : "Teraz gra O!";
    }

    function calculateWinner(nextSquares: string[]): 'X' | 'O' | null {
        for (const line of lines) {
            const lineStr = `${nextSquares[line[0]]}${nextSquares[line[1]]}${nextSquares[line[2]]}`;
            console.log(`${line} = ${lineStr}`);
            if (lineStr === 'XXX') {
                return 'X';
            } else if (lineStr === 'OOO') {
                return 'O';
            }
        }
        return null;
    }

    function onSquareClick(index: number) {
        return () => {
            if (gameIsFinished) {
                return;
            }
            const nextSquares = squares.slice();
            const currentValue = nextSquares[index];
            if (currentValue === '') {
                nextSquares[index] = xIsNext ? 'X' : 'O';
                setSquares(nextSquares);
                setXIsNext(!xIsNext);
                const winner = calculateWinner(nextSquares);
                if (winner) {
                    setGameIsFinished(true);
                }
            }
        };
    }

    function resetGame() {
        setSquares(Array(9).fill(""));
        setXIsNext(true);
        setGameIsFinished(false);
    }

    return (
        <div>
            <div className="status"><p>{showGameState()}</p></div>
            <div className="board">
                <Square value={squares[0]} onSquareClick={onSquareClick(0)}/>
                <Square value={squares[1]} onSquareClick={onSquareClick(1)}/>
                <Square value={squares[2]} onSquareClick={onSquareClick(2)}/>
                <Square value={squares[3]} onSquareClick={onSquareClick(3)}/>
                <Square value={squares[4]} onSquareClick={onSquareClick(4)}/>
                <Square value={squares[5]} onSquareClick={onSquareClick(5)}/>
                <Square value={squares[6]} onSquareClick={onSquareClick(6)}/>
                <Square value={squares[7]} onSquareClick={onSquareClick(7)}/>
                <Square value={squares[8]} onSquareClick={onSquareClick(8)}/>
            </div>
            <div>
                <p>
                    <button onClick={resetGame}>Wyczyść planszę</button>
                </p>
            </div>
        </div>
    );
}
