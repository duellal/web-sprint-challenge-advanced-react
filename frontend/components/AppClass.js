import React from 'react'
import axios from 'axios'

const url = 'http://localhost:9000/api/result'

export default class AppClass extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 4,
      x: 2,
      y: 2,
      steps: 0,
      message: '',
      email: '',
      matrix: [[null, null, null], [null, 'B', null], [null, null, null]]
    }
  }


  postRequest = () => {
    const newRequest = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email
    }

    axios
      .post(url, newRequest)
      .then(res => {
        this.setState({
          ...this.state,
          message: res.data.message,
          email: ''
        })
      })
      .catch(err => {
        this.setState({
          ...this.state,
          message: err.response.data.message,
        })
      })
  }

  onChangeEmail = (evt) => {
    this.setState({
      ...this.state, email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    this.postRequest()
  }

  moveLeft = () => {
    if (this.state.x === 1) {
      this.setState({
        ...this.state,
        message: "You can't go left"
      })
    }
    else {
      const newMatrix = [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x - 1] = null;
      newMatrix[this.state.y - 1][this.state.x - 2] = 'B'

      this.setState({
        ...this.state,
        x: this.state.x - 1,
        index: this.state.index - 1,
        steps: this.state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  moveUp = () => {
    if (this.state.y === 1) {
      this.setState({
        ...this.state,
        message: "You can't go up"
      })
    }
    else {
      const newMatrix = [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x - 1] = null;
      newMatrix[this.state.y - 2][this.state.x - 1] = 'B'

      this.setState({
        ...this.state,
        y: this.state.y - 1,
        index: this.state.index - 3,
        steps: this.state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  moveRight = () => {
    if (this.state.x === 3) {
      this.setState({
        ...this.state,
        message: "You can't go right"
      })
    }
    else {
      const newMatrix = [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x - 1] = null;
      newMatrix[this.state.y - 1][this.state.x] = 'B'

      this.setState({
        ...this.state,
        x: this.state.x + 1,
        index: this.state.index + 1,
        steps: this.state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  moveDown = () => {
    if (this.state.y === 3) {
      this.setState({
        ...this.state,
        message: "You can't go down"
      })
    }
    else {
      const newMatrix = [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x - 1] = null;
      newMatrix[this.state.y][this.state.x - 1] = 'B'

      this.setState({
        ...this.state,
        y: this.state.y + 1,
        index: this.state.index + 3,
        steps: this.state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  handleReset = () => {
    //tried setState(initialState), but the matrix would not reset
    this.setState({
      index: 4,
      x: 2,
      y: 2,
      steps: 0,
      message: '',
      email: '',
      matrix: [[null, null, null], [null, 'B', null], [null, null, null]]
    })
  }

  render() {
    return (
      <div id="wrapper" className={this.props.className} >
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.moveLeft}>LEFT</button>
          <button id="up" onClick={this.moveUp}>UP</button>
          <button id="right" onClick={this.moveRight}>RIGHT</button>
          <button id="down" onClick={this.moveDown}>DOWN</button>
          <button id="reset" onClick={this.handleReset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email"
            type="email"
            placeholder="type email"
            value={this.state.email}
            onChange={this.onChangeEmail}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}