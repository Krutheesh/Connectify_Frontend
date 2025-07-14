import React, { useEffect } from 'react'

import Homepage from './pages/Homepage'
import Notification from './pages/NotificationsPage'
import Onboard from './pages/Onboard'
import Chat from './pages/ChatPage'
import CallPage from './pages/CallPage'
import {Routes,Route } from 'react-router'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProtectedRoute from './common/ProtectedRoute'
import GuestOnlyRoute from './common/GuestOnlyRoute'
import useProfile from './hooks/useProfile'
import Layout from './components/Layout'
import { useSelector } from 'react-redux'

const App = () => {
  const {loading,error,fetchProfile} = useProfile()
  const {theme} = useSelector((state) => state.theme)
  useEffect(() => {
    // Fetch user profile on app load
    fetchProfile();
  }, []);
  return (
    
    <div className='h-full' data-theme={theme} >
    
    <Routes>
  {/* ✅ Homepage - Authenticated & Onboarded users only */}
  <Route
    path="/"
    element={
      
        <Layout showSidebar={true}>
        <Homepage />
        </Layout>
      
    }
  />

  {/* ✅ Signup/Login - Only accessible to guests */}
  <Route
    path="/signup"
    element={
      <GuestOnlyRoute>
        <SignUp />
      </GuestOnlyRoute>
    }
  />
  <Route
    path="/login"
    element={
      <GuestOnlyRoute>
        <Login />
      </GuestOnlyRoute>
    }
  />

  {/* ✅ Onboard - Authenticated but not onboarded */}
  <Route
    path="/onboard"
    element={
      
        <Onboard />
      
    }
  />

  {/* ✅ Other protected routes */}
  <Route
    path="/notifications"
    element={

      
         <Layout showSidebar={true}>
        <Notification /></Layout>
      
    }
  />
  <Route
    path="/chat/:id"
    element={
      
        <Layout showSidebar={false}>
        <Chat /></Layout>
      
    }
  />
  <Route
    path="/call/:id"
    element={
      
        <CallPage />
      
    }
  />
</Routes>
    
    
  
    </div>
  )
}

export default App
