import React from 'react';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import Posts from "./features/posts/Posts";
import FullPost from "./features/posts/components/FullPost";
import PostForm from "./features/posts/components/PostForm";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Posts/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/posts/:id" element={<FullPost/>}/>
            <Route path="/new-post" element={<PostForm/>}/>
            <Route path="/*" element={<h1>Not Found! This page does not exist!</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
