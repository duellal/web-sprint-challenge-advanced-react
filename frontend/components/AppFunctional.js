import React, { useState, useEffect } from 'react'
import axios from 'axios'


// Suggested initial states
const initialState = {
  index: 4,
  x: 2,
  y: 2,
  steps: 0,
  message: '',
  email: '',
  matrix: [[null, null, null], [null, "B", null], [null, null, null]]
}

const url = 'http://localhost:9000/api/result'

export default function AppFunctional(props) {
  const [state, setState] = useState(initialState)

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

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
          ...state,
          message: res.data.message,
          email: ''
        })
      })
      .catch(err => {
        setState({
          ...state,
          message: err.response.data.message,
          email: ''
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

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
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
