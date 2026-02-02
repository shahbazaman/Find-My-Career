import React from 'react'
import AdminDashboard from './components/AdminDashboard'
import AdminNavigationBar from '../src/components/AdminNavigationBar'
const Home2 = () => {
  return (
    <div>       
      <div><AdminNavigationBar/></div> 
      <div id="top"><AdminDashboard/></div>
    </div>
  )
}
export default Home2