import React from 'react'
import './Help.css';
export default function Help({isOpen}) {
  return (
    <div  className={`content ${isOpen ? 'shifted' : ''}`}>
    <div className='main-content'>
    <h1 >Help</h1>
    <p>Need help? We are here for you!</p>
    <p>1.The purpose of this app is to generate fitness plan for the user accourding to their preferences</p>
    <p>2.Click on Generate Plan on the top bar in home page to get started</p> 
    <p>3.Please remember  to sign in before generating plan so your plan would be saved</p>
    <p>4.Click on My Plan on the top bar to see your plan</p>
    <p>5.Click on the side menu to get the other features</p>
    </div>
    </div>
  )
}
