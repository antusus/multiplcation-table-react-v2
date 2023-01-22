import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Board from '../../components/Board';

test('renders status', () => {
    render(<Board/>);
    const statusElement = screen.getByText(/Teraz gra X!/i);
    expect(statusElement).toBeInTheDocument();
});

test('all board elements are empty', () => {
    render(<Board/>);
    for (let i = 1; i <= 9; i++) {
        const square: HTMLButtonElement = screen.getByTestId(`square-${i}`);
        expect(square).toBeInTheDocument();
        expect(square.textContent).toBe('');
    }
});

test('after clicking on element X is displayed', () => {
    render(<Board/>);
    const square: HTMLButtonElement = screen.getByTestId('square-1');
    fireEvent.click(square);
    expect(square.textContent).toBe('X');
});

test('after clicking on element O will play', () => {
    render(<Board/>);
    fireEvent.click(screen.getByTestId('square-1'));
    const statusElement = screen.getByText(/Teraz gra O!/i);
    expect(statusElement).toBeInTheDocument();
});

test('X and O will switch turns', () => {
    render(<Board/>);
    const square1 = screen.getByTestId('square-1');
    fireEvent.click(square1);
    expect(square1.textContent).toBe('X');
    const square2 = screen.getByTestId('square-2');
    fireEvent.click(square2);
    expect(square2.textContent).toBe('O');
});

test('you cannot click on already clicked square', () => {
    render(<Board/>);
    const square1 = screen.getByTestId('square-1');
    fireEvent.click(square1);
    expect(square1.textContent).toBe('X');
    fireEvent.click(square1);
    expect(square1.textContent).toBe('X');
});

test('winner will be selected', () => {
    render(<Board/>);
    fireEvent.click(screen.getByTestId('square-1')); //X-- --- ---
    fireEvent.click(screen.getByTestId('square-4')); //X-- O-- ---
    fireEvent.click(screen.getByTestId('square-2')); //XX- O-- ---
    fireEvent.click(screen.getByTestId('square-5')); //XX- OO- ---
    fireEvent.click(screen.getByTestId('square-3')); //XXX OO- ---
    const statusElement = screen.getByText(/Wygrał X! Brawo!/i);
    expect(statusElement).toBeInTheDocument();
});

test('when winner is selected you cannot click', () => {
    render(<Board/>);
    fireEvent.click(screen.getByTestId('square-1')); //X-- --- ---
    fireEvent.click(screen.getByTestId('square-4')); //X-- O-- ---
    fireEvent.click(screen.getByTestId('square-2')); //XX- O-- ---
    fireEvent.click(screen.getByTestId('square-5')); //XX- OO- ---
    fireEvent.click(screen.getByTestId('square-3')); //XXX OO- ---
    let square = screen.getByTestId('square-6');
    fireEvent.click(square);
    expect(square.textContent).toBe('');
});

test('game can end with a tie', () => {
    render(<Board/>);
    fireEvent.click(screen.getByTestId('square-1')); //X-- --- ---
    fireEvent.click(screen.getByTestId('square-4')); //X-- O-- ---
    fireEvent.click(screen.getByTestId('square-2')); //XX- O-- ---
    fireEvent.click(screen.getByTestId('square-3')); //XXO O-- ---
    fireEvent.click(screen.getByTestId('square-5')); //XXO OX- ---
    fireEvent.click(screen.getByTestId('square-9')); //XXO OX- --O
    fireEvent.click(screen.getByTestId('square-6')); //XXO OXX --O
    fireEvent.click(screen.getByTestId('square-8')); //XXO OXX -OO
    fireEvent.click(screen.getByTestId('square-7')); //XXO OXX XOO

    const statusElement = screen.getByText(/Remis./i);
    expect(statusElement).toBeInTheDocument();
});

