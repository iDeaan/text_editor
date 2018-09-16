import React, { Component } from 'react';
import { markdown } from 'markdown';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      inputTransformed: '',
      selectedMarkdown: 'markdown'
    }
  }

  returnTransformedInput(inputValue) {
    const { selectedMarkdown } = this.state;

    let inputTransformed = '';
    switch (selectedMarkdown) {
      case 'markdown':
        inputTransformed = markdown.toHTML(inputValue);
        break;
      default:
        inputTransformed = markdown.toHTML(inputValue);
    }
    return inputTransformed;
  }

  handleInput(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const { inputValue } = this.state;
    const transformedInput = this.returnTransformedInput(inputValue);

    return (
      <div className="app-container">
        <div className="markdown-container">
          <div className="transform-container">
            <div className="title">Input text</div>
            <div className="text-container input-container">
              <textarea
                onChange={(event) => this.handleInput(event)}
                value={inputValue}
                rows="4"
                cols="50"
                placeholder="Input text here"
              />
            </div>
          </div>
          <div className="transform-container">
            <div className="title">HTML</div>
            <div className="text-container html-container">
              {transformedInput}
            </div>
          </div>
          <div className="transform-container">
            <div className="title">Result</div>
            <div className="text-container result-container">
              <div dangerouslySetInnerHTML={{ __html: transformedInput }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
