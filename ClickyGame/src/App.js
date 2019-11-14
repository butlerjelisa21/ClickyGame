
import React, { Component } from 'react';
import Card from "./components/card/index";
import Wrapper from "./components/wrapper";
import Score from "./components/score";
import cards from "./cards.json";
import './app.css';

class App extends Component {
   // Sets this.state.cards to the cards json array
   state = {
    cards,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.cards.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over! Try Again! \nYour Score: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.cards.find((o, i) => {
      if (o.id === id) {
        if(cards[i].count === 0){
          cards[i].count = cards[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.cards.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }
  // Map over this.state.cards and render a cardCard component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tricky Clicky Game</h1>
          <p className="App-intro">
            Don't click the same image twice!
          </p>
        </header>
      <Wrapper>
        <Score score={this.state.score} highscore={this.state.highscore}></Score>
        {this.state.cards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
      </div>
    );
  }
}
export default App;