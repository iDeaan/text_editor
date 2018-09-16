import React, { Component } from 'react';
import { markdown } from 'markdown';
import returnCustomMarkdown from '../../helpers/returnCustomMarkdown';
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
      case 'custom-markdown':
        inputTransformed = returnCustomMarkdown(inputValue);
        break;
      default:
        inputTransformed = markdown.toHTML(inputValue);
    }
    return inputTransformed;
  }

  handleInput(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleMarkdownChange(event) {
    this.setState({ selectedMarkdown: event.target.value })
  }

  render() {
    const { inputValue, selectedMarkdown } = this.state;
    const transformedInput = this.returnTransformedInput(inputValue);

    return (
      <div className="app-container">
        <div className="select-markdown">
          Select markdown:
          <select id="lang" onChange={(event) => this.handleMarkdownChange(event)} value={selectedMarkdown}>
            <option value="markdown">Default Markdown</option>
            <option value="custom-markdown">Custom Markdown</option>
          </select>
        </div>
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
