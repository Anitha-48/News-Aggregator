import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import SavedNews from "./components/savednews";
import Settings from "./components/settings";
import { useEffect } from "react";
import Podcast from "./components/podcast";
import AdminPodcast from "./components/adminpodcast";
import AdminAnalytics from "./components/adminanalytics";
import AdminUsers from "./components/adminuser";



function App() {
  useEffect(() => {

  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme) {

    document.body.className =
      savedTheme;

  }

}, []);

  return (

    <BrowserRouter>
 <ToastContainer/>
      <Routes>
       

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/saved" element={<SavedNews />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/admin/podcast" element={<AdminPodcast />} />
        <Route path="/analytics" element={<AdminAnalytics />}/>
        <Route path="/admin/users"element={<AdminUsers />}/>
  



      </Routes>

    </BrowserRouter>
  );
}

export default App;

// bus
// https://www.business-standard.com
// https://images.unsplash.com/photo-1497366754035-f200968a6e72


// // politics 
// https://images.unsplash.com/photo-1581091226825-a6a2a5aee158
// https://example.com/women-safety-tamilnadu