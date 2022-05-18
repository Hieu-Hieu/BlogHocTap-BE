import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Blog from "./pages/Blog";
import Search from "./pages/Search";
import PrivateRoute from "./component/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/createpost" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route exact path="/editpost/:slug" element={<EditPost />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/blog/:slug" element={<Blog />} />
        <Route exact path="/search/:query" element={<Search />} />
        <Route exact path="/hashtag/:query" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
