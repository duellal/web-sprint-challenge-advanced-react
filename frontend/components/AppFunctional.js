import React, { useState } from 'react'
import axios from 'axios'


// Suggested initial states
const initialState = {
  index: 4,
  x: 2,
  y: 2,
  steps: 0,
  message: '',
  email: '',
  matrix: [[null, null, null], [null, 'B', null], [null, null, null]]
}

const url = 'http://localhost:9000/api/result'

export default function AppFunctional(props) {
  const [state, setState] = useState(initialState)

  const postRequest = () => {
    const newRequest = {
      x: state.x,
      y: state.y,
      steps: state.steps,
      email: state.email
    }

    axios
      .post(url, newRequest)
      .then(res => {
        setState({
          message: res.data.message,
          index: 4,
          x: 2,
          y: 2,
          steps: 0,
          email: '',
          matrix: [[null, null, null], [null, 'B', null], [null, null, null]]
        })
      })
      .catch(err => {
        setState({
          ...state,
          message: err.response.data.message
        })
      })
  }

  function onChangeEmail(evt) {
    setState({
      ...state, email: evt.target.value
    })
  }

  function onSubmit(evt) {
    evt.preventDefault()
    postRequest()
  }

  const moveLeft = () => {
    if (state.x === 1) {
      setState({
        ...state,
        message: "You can't go left"
      })
    }
    else {
      const newMatrix = [...state.matrix]
      newMatrix[state.y - 1][state.x - 1] = null;
      newMatrix[state.y - 1][state.x - 2] = 'B'

      setState({
        ...state,
        x: state.x - 1,
        index: state.index - 1,
        steps: state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  const moveUp = () => {
    if (state.y === 1) {
      setState({
        ...state,
        message: "You can't go up"
      })
    }
    else {
      const newMatrix = [...state.matrix]
      newMatrix[state.y - 1][state.x - 1] = null;
      newMatrix[state.y - 2][state.x - 1] = 'B'

      setState({
        ...state,
        y: state.y - 1,
        index: state.index - 3,
        steps: state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  const moveRight = () => {
    if (state.x === 3) {
      setState({
        ...state,
        message: "You can't go right"
      })
    }
    else {
      const newMatrix = [...state.matrix]
      newMatrix[state.y - 1][state.x - 1] = null;
      newMatrix[state.y - 1][state.x] = 'B'

      setState({
        ...state,
        x: state.x + 1,
        index: state.index + 1,
        steps: state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  const moveDown = () => {
    if (state.y === 3) {
      setState({
        ...state,
        message: "You can't go down"
      })
    }
    else {
      const newMatrix = [...state.matrix]
      newMatrix[state.y - 1][state.x - 1] = null;
      newMatrix[state.y][state.x - 1] = 'B'

      setState({
        ...state,
        y: state.y + 1,
        index: state.index + 3,
        steps: state.steps + 1,
        matrix: newMatrix,
        message: ''
      })
    }
  }

  const handleReset = () => {
    //tried setState(initialState), but the matrix would not reset
    setState({
      index: 4,
      x: 2,
      y: 2,
      steps: 0,
      message: '',
      email: '',
      matrix: [[null, null, null], [null, 'B', null], [null, null, null]]
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({state.x}, {state.y})</h3>
        <h3 id="steps">You moved {state.steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
              {idx === state.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={moveLeft}>LEFT</button>
        <button id="up" onClick={moveUp}>UP</button>
        <button id="right" onClick={moveRight}>RIGHT</button>
        <button id="down" onClick={moveDown}>DOWN</button>
        <button id="reset" onClick={handleReset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email"
          type="email"
          placeholder="type email"
          value={state.email}
          onChange={onChangeEmail}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
