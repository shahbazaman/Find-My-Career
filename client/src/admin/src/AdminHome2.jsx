import React from 'react'
import AdminDashboard from './components/AdminDashboard'
import AdminNavigationBar from '../src/components/AdminNavigationBar'

const Home2 = () => {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f8f9fa", 
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }}> 
      {/* Navbar Container */}
      <div style={{ width: "100%", zIndex: 1000 }}>
        <AdminNavigationBar />
      </div> 

      {/* Main Content Area */}
      <div 
        id="top" 
        style={{ 
          padding: "20px 10px", // Reduced horizontal padding for mobile
          maxWidth: "1200px", 
          margin: "0 auto", 
          width: "100%",
          flex: 1
        }}
      >
        <AdminDashboard />
      </div>
    </div>
  )
}
export default Home2