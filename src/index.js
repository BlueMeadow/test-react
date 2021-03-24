import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const _ = require('lodash')

function Square (props) {

  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}


class Board extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      // Attention On fait un tableau squares[COLONNE][LIGNE]
      // Parce qu'on a pas l'habitude et c'est marrant
      squares: Array(7).fill(null).map(() => Array(6).fill(null)),
      isXNext: true
    }
  }

  handleClick(col, lin) {
    console.log(col, lin)
    // Trouver la ligne la plus basse disponible
    const available = this.highestAvailable(this.state.squares[col])

    if(available === this.state.squares[col].length) return

    const squares = _.cloneDeep(this.state.squares)

    squares[col][available] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      isXNext: !this.state.isXNext
    });
  }

  renderSquare(col, lin) {
    return (
      <Square
        value={this.state.squares[col][lin]}
        onClick={() => this.handleClick(col, lin)}
      />
    );
  }

  highestAvailable(array){
    for(let i = 0 ; i < array.length ; i++){
      if(!array[i]) return i
    }
    return array.length
  }


  render() {
    const status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>

        <div className="board-row">
          {this.renderSquare(0, 5)}
          {this.renderSquare(1, 5)}
          {this.renderSquare(2, 5)}
          {this.renderSquare(3, 5)}
          {this.renderSquare(4, 5)}
          {this.renderSquare(5, 5)}
          {this.renderSquare(6, 5)}
        </div>
        <div className="board-row">
          {this.renderSquare(0, 4)}
          {this.renderSquare(1, 4)}
          {this.renderSquare(2, 4)}
          {this.renderSquare(3, 4)}
          {this.renderSquare(4, 4)}
          {this.renderSquare(5, 4)}
          {this.renderSquare(6, 4)}
        </div>
        <div className="board-row">
          {this.renderSquare(0, 3)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(4, 3)}
          {this.renderSquare(5, 3)}
          {this.renderSquare(6, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(0, 2)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(4, 2)}
          {this.renderSquare(5, 2)}
          {this.renderSquare(6, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(0, 1)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(5, 1)}
          {this.renderSquare(6, 1)}
        </div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(1, 0)}
          {this.renderSquare(2, 0)}
          {this.renderSquare(3, 0)}
          {this.renderSquare(4, 0)}
          {this.renderSquare(5, 0)}
          {this.renderSquare(6, 0)}
        </div>
      </div>
    );
  }
}

function coloredPill(colorLetter){
  
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
