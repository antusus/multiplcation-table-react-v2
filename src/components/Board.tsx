import React, { useState } from 'react';

interface SquareProps {
    id: number
    value: string
    onSquareClick: () => void
}

function Square(props: SquareProps) {

    return <button
        className="square"
        onClick={() => props.onSquareClick()}
        data-testid={'square-' + props.id}
    >
        {props.value}
    </button>
}

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState('');
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
        if (winner) {
            return winner === 'DRAW' ? 'Remis.' : `Wygrał ${winner}! Brawo!`
        }
        return xIsNext ? "Teraz gra X!" : "Teraz gra O!";
    }

    function calculateWinner(nextSquares: string[]): 'X' | 'O' | 'DRAW' | '' {
        let allLinesFull = true;
        for (const line of lines) {
            const lineStr = `${nextSquares[line[0]]}${nextSquares[line[1]]}${nextSquares[line[2]]}`;
            if (lineStr === 'XXX') {
                return 'X';
            } else if (lineStr === 'OOO') {
                return 'O';
            }
            allLinesFull = lineStr.length === 3;
        }
        return allLinesFull ? 'DRAW' : '';
    }

    function onSquareClick(index: number) {
        return () => {
            if (winner) {
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
                    setWinner(winner);
                }
            }
        };
    }

    function resetGame() {
        setSquares(Array(9).fill(""));
        setXIsNext(true);
        setWinner('');
    }

    return (
        <div>
            <div className="status"><p>{showGameState()}</p></div>
            <div className="board">
                <Square id={1} value={squares[0]} onSquareClick={onSquareClick(0)}/>
                <Square id={2} value={squares[1]} onSquareClick={onSquareClick(1)}/>
                <Square id={3} value={squares[2]} onSquareClick={onSquareClick(2)}/>
                <Square id={4} value={squares[3]} onSquareClick={onSquareClick(3)}/>
                <Square id={5} value={squares[4]} onSquareClick={onSquareClick(4)}/>
                <Square id={6} value={squares[5]} onSquareClick={onSquareClick(5)}/>
                <Square id={7} value={squares[6]} onSquareClick={onSquareClick(6)}/>
                <Square id={8} value={squares[7]} onSquareClick={onSquareClick(7)}/>
                <Square id={9} value={squares[8]} onSquareClick={onSquareClick(8)}/>
            </div>
            <div>
                <p>
                    <button onClick={resetGame}>Wyczyść planszę</button>
                </p>
            </div>
        </div>
    );
}
