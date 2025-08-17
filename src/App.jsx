import React, { use, useEffect } from "react";

import Homepage from "./pages/Homepage";
import Notification from "./pages/NotificationsPage";
import Onboard from "./pages/Onboard";
import Chat from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import GuestOnlyRoute from "./common/GuestOnlyRoute";
import useProfile from "./hooks/useProfile";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./common/ProtectedRoute";
const App = () => {
  useProfile();
  const { theme } = useSelector((state) => state.theme);
  const {authChecked} = useSelector((state) => state.auth);
   if(!authChecked) {
    return <PageLoader/> // or a loading spinner

   }
  
    // Fetch user profile on app load
   
  return (
    <div className="h-full" data-theme={theme}>
      <Routes>
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
            <Layout showSidebar={true}>
              <Homepage />
            </Layout>
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/signup"
          element={
           
             <GuestOnlyRoute> <SignUp /> </GuestOnlyRoute>
           
          }
          
        />
       
       
        <Route
          path="/login"
          element={
           
              <GuestOnlyRoute> <Login /></GuestOnlyRoute>
           
          }
        />
        

       
        <Route path="/onboard" element={ <ProtectedRoute><Onboard /> </ProtectedRoute>} />

       
        <Route
          path="/notifications"
          element={
             <ProtectedRoute>
            <Layout showSidebar={true}>
              <Notification />
            </Layout></ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
            <Layout showSidebar={false}>
              <Chat />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/call/:id" element={<ProtectedRoute><CallPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
