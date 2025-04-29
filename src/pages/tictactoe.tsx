import { useState, useEffect } from 'react';
import './styles/app.universal.css'
import './styles/tictactoe.css'
type SquareValue = 'X' | 'O' | null;
type Board = SquareValue[];

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
}

interface WinResult {
  winner: SquareValue;
  line: number[];
}

export default function Tictactoe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');
  const [gameActive, setGameActive] = useState<boolean>(true);

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameActive(true);
    setIsXNext(true);
    setStatus('Next player: X');
  };

  // Initialize game on first render
  useEffect(() => {
    resetGame();
  }, []);

  // Calculate winner
  const calculateWinner = (squares: Board): WinResult | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    
    return null;
  };

  // Check if board is full
  const isBoardFull = (squares: Board): boolean => {
    return squares.every(square => square !== null);
  };

  // Handle click on a square
  const handleClick = (index: number): void => {
    if (board[index] || !gameActive) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const winCombo = calculateWinner(newBoard);
    if (winCombo) {
      setStatus(`Winner: ${winCombo.winner}`);
      setGameActive(false);
    } else if (isBoardFull(newBoard)) {
      setStatus("It's a draw!");
      setGameActive(false);
    } else {
      setIsXNext(!isXNext);
      setStatus(`Next player: ${!isXNext ? 'X' : 'O'}`);
    }
  };

  // Render a square
  const Square = ({ value, onClick, isWinningSquare }: SquareProps) => (
    <button 
      className={`square ${isWinningSquare ? 'winning' : ''} ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`} 
      onClick={onClick}
    >
      {value}
    </button>
  );

  // Render the board
  const renderSquare = (i: number) => {
    const winCombo = calculateWinner(board);
    const isWinningSquare = winCombo && winCombo.line.includes(i);
    
    return (
      <Square
        value={board[i]}
        onClick={() => handleClick(i)}
        isWinningSquare={isWinningSquare ? isWinningSquare : false}
      />
    );
  };

  return (
    <div className="app">
      <div className="game">
        <div className="game-info">
          <h1>Tic Tac Toe</h1>
          <div className="status">{status}</div>
        </div>
        <div className="board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <button className="reset-button" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
}