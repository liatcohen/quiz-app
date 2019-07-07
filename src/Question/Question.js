import React, { Component } from 'react';
import './Question.css';

class question extends Component {

  render() {

    return (
      <div>
        <form id="form">
          <p id="question">{this.props.question}</p>
          <div className="answers">
            {this.props.answers.map(ans => {
              return (<div key={ans} id="input"><input type="radio" name="answer" value={ans}
                onChange={this.props.answerClicked}
                checked={ans === this.props.selected} />{ans}</div>)
            })}
          </div>
        </form>
        <div className="buttons">
          <button id="leftBtn"
            onClick={this.props.goToPreviousQuestion}
            disabled={this.props.prevDisabled}>
            <i className="fas fa-arrow-left"></i>  prev</button>
          {this.props.lastQuestion ?
            <button className="rightBtn" onClick={this.props.doneClicked}>Done</button>
            : <button className="rightBtn" onClick={this.props.goToNextQuestion}>next  <i className="fas fa-arrow-right"></i></button>}
        </div>
      </div>
    );
  }
}

export default question;
