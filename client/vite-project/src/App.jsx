import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
//import Post from './Post'
//import Header  from './Header'
import {Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { UserContextProvider } from './UserContext'
import CreatePost from './components/CreatePost'
import PostPage from './components/PostPage'
import EditPost from './components/EditPost'
//import Category from './Category'
//import CatButtons from './CatButtons'
import PostsByCategory from './components/PostsByCategory'
import Footer from './components/Footer'

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/create'} element={<CreatePost/>}/>
          <Route path={'/post/:id'} element={<PostPage/>}/>
          <Route path={"/post/category/:category"} element={<PostsByCategory/>} />
          <Route path={'/edit/:id'} element={<EditPost/>}/>
        </Route>
      </Routes>
      <Footer/>
    </UserContextProvider>

 
  )
}

export default App
