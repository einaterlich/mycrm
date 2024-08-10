import React from 'react'
import { Button } from '../Button'
import './Home.css'

function Home() {
  return (
    <div className='container'>
    <h1>CRM</h1>
    <p>What are you waiting for?</p>
    <div className='container-btns'>
      <Button
        className='btns'
        buttonStyle='btn--outlineWhite'
        buttonSize='btn--large'
      >
        Log In
      </Button>
      <Button
        className='btns'
        buttonStyle='btn--outlineWhite'
        buttonSize='btn--large'
        onClick={console.log('hey')}
      >
        Sign Up <i className='far fa-play-circle' />
      </Button>
    </div>
  </div>
  )
}

export default Home