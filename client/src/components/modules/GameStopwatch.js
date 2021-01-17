import React, { useState, useRef, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import './App.css';

class GameTimer extends Component{
    constructor(props) {
        super(props);
        // Initialize Default State
        this.state = {element: <FontAwesomeIcon icon={faClock} />};
      } 

      App = () => {
        const [timer, setTimer] = useState(3595)
        const [isActive, setIsActive] = useState(false)
        const [isPaused, setIsPaused] = useState(false)
        const increment = useRef(null)
      
        handleStart = () => {
          setIsActive(true)
          setIsPaused(true)
          increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
          }, 1000)
        }
      
        handlePause = () => {
          clearInterval(increment.current)
          setIsPaused(false)
        }
      
        handleResume = () => {
          setIsPaused(true)
          increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
          }, 1000)
        }
      
        handleReset = () => {
          clearInterval(increment.current)
          setIsActive(false)
          setIsPaused(false)
          setTimer(0)
        }
      
        formatTime = () => {
          const getSeconds = `0${(timer % 60)}`.slice(-2)
          const minutes = `${Math.floor(timer / 60)}`
          const getMinutes = `0${minutes % 60}`.slice(-2)
          const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
      
          return `${getHours} : ${getMinutes} : ${getSeconds}`
        }
      
        return (
          <div className="app">
            <h3>React Stopwatch {element}</h3>
            <div className='stopwatch-card'>
              <p>{formatTime()}</p>
              <div className='buttons'>
                {
                  !isActive && !isPaused ?
                    <button onClick={handleStart}>Start</button>
                    : (
                      isPaused ? <button onClick={handlePause}>Pause</button> :
                        <button onClick={handleResume}>Resume</button>
                    )
                }
                <button onClick={handleReset} disabled={!isActive}>Reset</button>
              </div>
            </div>
          </div>
        );
      }
}

export default GameTimer;