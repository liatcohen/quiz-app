import React, { Component } from 'react';
import './App.css';
import Question from './Question/Question'
import myJson from './questions.json'

class App extends Component {

  state = {
    q_number: 0,
    score: undefined,
    isGameOn: true,
    questions: myJson.results,
    number_of_questions: myJson.results.length,
  }

  goToNextQuestion = () => {
      this.setState({ q_number: this.state.q_number + 1 })
  }

  goToPreviousQuestion = () => {
    this.setState({ q_number: this.state.q_number - 1 })
  }
  answerClicked = () => {
    let newQuestions = [...this.state.questions]
    for (let ans of document.forms[0]) {
      if (ans.checked) {
        newQuestions[this.state.q_number].selected = ans.value
        this.setState({questions:newQuestions})
      }
    }
  }
  
  calculateScore = () => {
    let question_score = 100 / this.state.number_of_questions
    let score = 0
    for (let ans of this.state.questions) {
      if (ans.correct_answer === ans.selected) {
        score += question_score
      }
    }
    this.setState({ score: score.toFixed(2) })
  }

  doneClicked = () => {
    this.calculateScore()
    this.setState({ isGameOn: false })
  }

  restart=()=>{
    let newQuestions = [...this.state.questions]
    for (let q of newQuestions){
      q.selected=undefined
    }
    this.setState({questions:newQuestions, q_number:0, isGameOn:true})
  }

  render() {

    return (

      <div className="App">
        <div className="header">Quiz App</div>
        <div className="quiz-box">          
          {this.state.isGameOn ?
            <Question question={this.state.questions[this.state.q_number].question}
              answers={this.state.questions[this.state.q_number].answers}
              selected={this.state.questions[this.state.q_number].selected}
              q_number={this.state.q_number}
              goToPreviousQuestion={this.goToPreviousQuestion}
              goToNextQuestion={this.goToNextQuestion}
              prevDisabled={this.state.q_number === 0}
              lastQuestion={this.state.q_number + 1 === this.state.number_of_questions}
              doneClicked={this.doneClicked} 
              answerClicked={this.answerClicked}/>
            : <div id="end-game-screen">
              <div id="game-over">Game Over!</div>
              <div id="score">Your score is: {this.state.score}</div>
              <button onClick={this.restart}>Restart</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;



