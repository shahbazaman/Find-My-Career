import React from 'react'
import Page3 from './Page3'
import Page2 from './Page2'
import Page6 from './Page6'
import Page5 from './Page5'
import Cards from './Cards'
const JobSeekersPages = () => {
  return (
    <div>
        <div id="jobs-section"><Cards/></div>
        <Page2/>
        <div id="prep-section"><Page3/></div>  
        <div><Page5/></div> {/*com */}              
        <div id="status-section"><Page6/></div>   
    </div>
  )
}

export default JobSeekersPages